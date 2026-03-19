# CLAUDE.md — Nodemation Web

## Project Overview
AI automation agency marketing website. Single-page React app with a cinematic full-screen hero (HLS video, framer-motion animations). Built with the same tech stack as Axios Cloud.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Build | Vite 5 |
| UI Framework | React 18 |
| Styling | Tailwind CSS v3 + Custom CSS |
| Icons | lucide-react |
| Animation | framer-motion |
| Video | hls.js (HLS stream via Mux) |

## Design Language
- **Background**: `#070612` (deep purple-black)
- **Foreground**: `#ffffff`
- **Aesthetic**: Dark, cinematic, premium — left-aligned content, full-screen video on the right
- **Fonts**: Inter (sans) + Playfair Display (serif italic accent)
- **Feel**: AI-forward, modern agency, high-trust

## Project Structure
```
/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── lib/utils.js            # cn() helper
│   └── components/
│       └── Hero.jsx            # Full-screen hero section
├── public/favicon.svg
├── components.json
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Running Locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Hero Section Architecture
- **Video**: HLS stream from Mux via `hls.js`. Shifted 200px right, scaled 1.2x from left origin, `object-fit: cover`.
- **Left vignette**: Gradient `#070612 → transparent` covers left 55% to blend video into content.
- **Bottom fade**: `h-40` gradient from `#070612 → transparent` at bottom.
- **BlurIn**: `opacity 0→1, blur 10px→0, y 20→0` (framer-motion, used for badge / subtitle / CTAs).
- **SplitText**: Splits heading text by words, staggers each with `y 40→0, opacity 0→1` (0.08s word delay).
- **Heading**: Line 1 block, Lines 2+3 inline. "Business." uses `font-serif italic` (Playfair Display).

## Styling Notes
- `overflow-x: hidden` on `html, body` — do NOT add to any component root div (breaks `position: sticky`)
- Tailwind `foreground` / `background` tokens are hardcoded hex (not CSS vars) — simplifies setup
- Add new sections with Tailwind classes first; custom CSS only when Tailwind can't express it

## Adding shadcn/ui Components
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
```
Note: `components.json` uses `cssVariables: false` — shadcn will use Tailwind classes directly.
