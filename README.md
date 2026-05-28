# Knee Rehab Tracker

A 6-week progressive knee rehabilitation program tracker — built for daily use, not dusty PDFs.

## Live App

[rehab.fjacosta.app](https://rehab.fjacosta.app)

---

## What It Does

A mobile-first progressive overload rehab tracker for left knee recovery. Each day has a structured rehab circuit + full workout with checkbox tracking that persists across sessions. Every exercise links out to a YouTube form video. Progress is saved to `localStorage` — close the app, come back days later, your progress is still there.

**6-week structure:**
- Week 1 — Foundation & Activation
- Week 2 — Building Tolerance
- Week 3 — Strength Building
- Week 4 — Functional Integration
- Week 5 — Strength & Conditioning
- Week 6 — Peak & Assess

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 18 (Vite) |
| Hosting | Cloudflare Pages |
| Persistence | `localStorage` (key: `kr3`) |
| Fonts | Bebas Neue + JetBrains Mono |
| Deploy | Push to `main` → Cloudflare Pages auto-deploys |

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/frankjacostap/knee-rehab-app.git
cd knee-rehab-app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Build & Deploy

### Automatic (recommended)
Push to `main` → Cloudflare Pages auto-deploys.

### Manual
```bash
npm run build
npx wrangler pages deploy dist --project-name=knee-rehab-app
```

### First-time Cloudflare Setup
```bash
npx wrangler login
npx wrangler pages project create knee-rehab-app
```

Then in Cloudflare Dashboard → Workers & Pages → knee-rehab-app → Custom Domains → add `rehab.fjacosta.app`.

---

## Project Structure

```
knee-rehab-app/
├── src/
│   ├── App.jsx       ← All app logic and UI (single-component architecture)
│   └── main.jsx      ← React entry point
├── index.html        ← Vite entry shell
├── vite.config.js
├── package.json
└── README.md
```

---

## Key Features

- Checkbox persistence — progress saved to localStorage, survives app close
- YouTube form links — every exercise has a "Form" button linking to a search
- Progress tracking — per-day % and per-week % completion bars
- Day picker — jump between any day of any week
- Mobile-first — designed for phone use at the gym
- Pain monitoring reminder — built-in safety prompt on every session

---

## Data & Storage

Progress is stored in `localStorage` under the key `kr3`. Structure:

```json
{
  "0-0-0": true,
  "0-0-1": true,
  "1-3-2": true
}
```

Keys are `week-day-exerciseIndex` (all 0-based). To reset all progress, open the browser console and run:

```js
localStorage.removeItem('kr3')
```

---

## Design System

Swiss Brutalist Minimalism:

- Warm off-white background (`#f5f3f0`)
- Near-black text (`#0a0a0a`)
- No rounded corners on structural elements
- Bebas Neue for display headings, JetBrains Mono for body text

---

## Roadmap

- [ ] Rest timer between sets
- [ ] Weight/rep logging per exercise
- [ ] Week-over-week progress charts
- [ ] Export session summary as PDF
- [ ] Dark/light mode toggle

---

*Part of [fjacosta.app](https://fjacosta.app)*
