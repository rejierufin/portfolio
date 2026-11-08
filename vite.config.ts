import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Dev-time security headers. In production these MUST be set at the
    // reverse proxy (Nginx) along with CSP, HSTS, and a stricter
    // Permissions-Policy. Do not duplicate them in Nginx config blindly -
    // some headers (e.g. CSP) need values that differ between dev and prod.
    headers: {
      // No framing header here: the cloud preview embeds this dev server in a
      // frame on another origin. Set X-Frame-Options at the proxy in production.
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
})
