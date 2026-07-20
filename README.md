# Danny Kim Portfolio

A responsive portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Structure

- `app/` contains route composition, metadata, and global theme tokens.
- `components/home/` contains the homepage sections.
- `components/collage/` contains the animated collage and its dialog behavior.
- `components/case-study/` contains reusable case-study article sections.
- `lib/projects/data/` contains one content record per project.

## Styling

Static component styling uses Tailwind utilities. Custom CSS is limited to the
collage keyframes, coordinated exit states, global theme tokens, and the
reduced-motion policy.
