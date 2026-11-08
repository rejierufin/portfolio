import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Theme } from '../lib/theme'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Topographic contour lines: two fbm fields drive a banded height, and the
// distance to the nearest band edge becomes the line alpha. Ashima 2D simplex.
const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uLine;
  uniform float uOpacity;
  uniform float uDensity;
  uniform float uWidth;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.55;
    for (int i = 0; i < 5; i++) {
      sum += amp * snoise(p);
      p = p * 2.03 + 7.0;
      amp *= 0.5;
    }
    return sum;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * 2.7;
    float t = uTime * 0.035;

    float height = fbm(p + vec2(t, -t * 0.65));
    height += 0.45 * fbm(p * 0.62 - vec2(t * 0.45, t * 0.3));

    float bands = height * uDensity;
    float distanceToBand = abs(fract(bands + 0.5) - 0.5);
    float line = 1.0 - smoothstep(0.0, uWidth, distanceToBand);

    vec2 edge = smoothstep(0.0, 0.34, vUv) * (1.0 - smoothstep(0.62, 1.0, vUv));
    float mask = edge.x * edge.y;

    float glow = exp(-dot(p * 0.75, p * 0.75)) * 0.18;
    float alpha = clamp(line * 0.9 + glow, 0.0, 1.0) * uOpacity * mask;

    gl_FragColor = vec4(uLine, alpha);
  }
`

type ContourFieldProps = { theme: Theme }

function srgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return new THREE.Vector3(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  )
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function ContourField({ theme }: ContourFieldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    } catch {
      // No WebGL: the CSS gradient behind the canvas stands in.
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    host.appendChild(renderer.domElement)

    const startTheme = readTheme()
    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uLine: { value: srgb(startTheme === 'dark' ? '#79d8c6' : '#0f6f66') },
        uOpacity: { value: startTheme === 'dark' ? 0.3 : 0.22 },
        uDensity: { value: 7.5 },
        uWidth: { value: 0.07 },
      },
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    mesh.frustumCulled = false
    scene.add(mesh)

    const resize = () => {
      const width = Math.max(1, host.clientWidth)
      const height = Math.max(1, host.clientHeight)
      renderer.setSize(width, height, false)
      const ratio = renderer.getPixelRatio()
      material.uniforms.uResolution.value.set(width * ratio, height * ratio)
      renderer.render(scene, camera)
    }

    resize()
    window.addEventListener('resize', resize)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()
    let frame = 0

    if (reduceMotion) {
      material.uniforms.uTime.value = 24
      renderer.render(scene, camera)
    } else {
      const tick = () => {
        material.uniforms.uTime.value = clock.getElapsedTime()
        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      materialRef.current = null
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  useEffect(() => {
    const material = materialRef.current
    if (!material) return
    const isDark = theme === 'dark'
    material.uniforms.uLine.value.copy(srgb(isDark ? '#79d8c6' : '#0f6f66'))
    material.uniforms.uOpacity.value = isDark ? 0.3 : 0.22
  }, [theme])

  return <div ref={hostRef} className="contour-field" aria-hidden="true" />
}
