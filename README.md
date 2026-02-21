# 🦵 Knee Rehab Tracker

> A 6-week progressive knee rehabilitation program tracker — built for daily use, not dusty PDFs.

![status](https://img.shields.io/badge/status-live-brightgreen)
![stack](https://img.shields.io/badge/stack-React%20%2B%20Cloudflare-orange)

## Live App

🔗 [rehab.fjacosta.app](https://rehab.fjacosta.app)

---

## What It Does

A mobile-first progressive overload rehab tracker for left knee recovery. Each day has a structured rehab circuit + full workout with checkbox tracking that persists across sessions. Every exercise links out to a YouTube form video. Progress is saved via Cloudflare KV storage — close the app, come back days later, your progress is still there.

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
| UI | React (Vite) |
| Hosting | Cloudflare Pages |
| Persistence | `window.storage` (Cloudflare KV via Claude artifact API) |
| Fonts | SF Pro Display / System |
| Deploy | GitHub → Cloudflare Pages (auto on push to `main`) |

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/frankjacostap-ui/knee-rehab-app.git
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
Push to `main` → GitHub Actions triggers → Cloudflare Pages auto-deploys.

### Manual
```bash
npm run build
npx wrangler pages deploy dist --project-name=knee-rehab-app
```

### First-time Cloudflare Setup
```bash
# Authenticate with Cloudflare
npx wrangler login

# Create the Pages project (one time only)
npx wrangler pages project create knee-rehab-app
```

Then in Cloudflare Dashboard:
1. Go to **Workers & Pages → knee-rehab-app → Custom Domains**
2. Add `knee-rehab.fjacosta.app`
3. DNS record is auto-created (domain is on Cloudflare)

---

## Project Structure

```
knee-rehab-app/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Auto-deploy to Cloudflare Pages on push to main
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx               ← All app logic and UI (single-component architecture)
│   └── main.jsx              ← React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Key Features

- ✅ **Checkbox persistence** — progress saved to storage, survives app close
- 📹 **YouTube form links** — every exercise has a "Watch Form" button
- 📊 **Progress tracking** — per-day % and per-week % completion
- 📅 **Day picker** — jump between any day of any week
- 📱 **Mobile-first** — designed for phone use at the gym
- ⚠️ **Pain monitoring reminder** — built-in safety prompt on every session

---

## Data & Storage

Progress is stored via `window.storage` under the key `kr3`. Structure:

```json
{
  "0-0-0": true,   // week 0, day 0, exercise 0 = checked
  "0-0-1": true,
  "1-3-2": true
}
```

To reset all progress: open browser console and run:
```js
window.storage.delete('kr3')
```

---

## Design System

This app follows the **fjacosta.app Swiss Brutalist Minimalism** design system with modifications for a dark health/fitness context:

- Dark navy gradient background (`#0a1628 → #1a2744`)
- Green accents (`#66bb6a`) for rehab exercises
- Blue accents (`#42a5f5`) for workout exercises
- Orange accents (`#ffa726`) for cardio finishers
- Zero rounded corners on structural elements (pill shapes only on badges/buttons)
- System font stack: `SF Pro Display, -apple-system, sans-serif`

---

## Roadmap

- [ ] Rest timer between sets
- [ ] Weight/rep logging per exercise
- [ ] Week-over-week progress charts
- [ ] Export session summary as PDF
- [ ] Dark/light mode toggle

---

## Notes

- App is built as a single JSX component — intentional for simplicity and portability
- The `V` object maps every exercise name to a YouTube search query string
- Encoding artifacts in exercise names (e.g. `Â½`, `Ã—`) are from original data — sanitize if copy/pasting exercise data
- Week/day indexing is 0-based internally, 1-based in UI

---

*Part of [fjacosta.app](https://fjacosta.app) — a hub for personal creative and utility apps.*
