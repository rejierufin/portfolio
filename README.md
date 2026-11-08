# Rejie Rufin — portfolio

A one-page portfolio for a freight forwarding and shipping operations specialist: a fixed profile rail,
a bento home screen, an experience timeline, capability cards and a contact block, over an animated
topographic contour background. Light and dark themes, and an app-style layout on phones.

Stack: Vite 6, React 19, TypeScript, plain CSS custom properties, Three.js, React Router 7 (installed,
unused), Phosphor icons, Poppins.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run lint
```

## Where the content lives

| What | Where |
|---|---|
| Name, role, contact details, availability, home headline, stats, marquee | `src/data/profile.ts` |
| Experience entries | `jobs` in `src/data/profile.ts` |
| Skill groups and the "How I work" steps | `skillGroups` and `capabilities` in `src/data/profile.ts` |
| Portrait | `src/data/profile.ts` → `avatarSrc`, and the file in `public/` |
| Page structure | `src/App.tsx` and the components in `src/components/` |
| Colours, type scale | `src/styles/tokens.css` |
| Layout, rail and phone shell | `src/styles/layout.css` |
| Section styling | `src/styles/sections.css` |
| Reveal and marquee motion | `src/styles/motion.css` |
| SEO, share image, favicon | `index.html`, `public/favicon.svg` |

## Swapping in a photo

The rail shows `public/avatar.svg` (a monogram) until a photo exists. Save your portrait as
`public/portrait.jpg` — the component already looks for it and falls back to the monogram if the file is
missing. A 2:3 or 4:5 crop works best; the frame crops from 25% down the image so faces stay in view.

Naming it something else? Change `portraitSrc` in `src/data/profile.ts`, and point the
`<link rel="preload">` in `index.html` at the same file.

## Notes

- The contour background is a Three.js fragment shader in `src/components/ContourField.tsx`. It pauses
  to a still frame when the visitor prefers reduced motion, and falls back to a CSS gradient if WebGL is
  unavailable.
- `prefers-reduced-motion` also switches off the scroll reveals and the marquee.
- Below 1024px the fixed rail becomes a compact header with a sticky section bar.
