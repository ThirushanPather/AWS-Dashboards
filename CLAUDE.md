# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is an npm workspaces monorepo. The only active package is `packages/dashboard-poc` — a React + Vite + Tailwind CSS 4 app that contains three independent dashboards deployed to AWS S3/CloudFront.

```
dashboard-library/
├── packages/dashboard-poc/   # The sole workspace package
│   ├── src/
│   │   ├── components/       # Shared UI primitives (Card, KPICard, BarChartCard, LineChartCard, PieChartCard, Layout)
│   │   ├── dashboards/       # One folder per dashboard, each with its own Dashboard.jsx + main-*.jsx entry
│   │   │   ├── collections/
│   │   │   ├── credit/
│   │   │   └── risk/
│   │   └── data/             # Static JSON data files (one per dashboard)
│   ├── collections/          # Per-dashboard index.html entry points (Vite roots for production builds)
│   ├── credit/
│   ├── risk/
│   └── index.html            # Dev-server entry (loads RiskDashboard by default)
└── scripts/                  # Windows .bat scripts for AWS deploy and CloudFront setup
```

## Commands

All commands run from the repo root unless noted.

```bash
# Dev server (serves RiskDashboard via the default index.html)
npm run dev:poc

# Lint
npm run lint --workspace=packages/dashboard-poc

# Build individual dashboards (Windows — uses DASHBOARD env var)
npm run build:collections --workspace=packages/dashboard-poc   # → dist/collections/
npm run build:credit      --workspace=packages/dashboard-poc   # → dist/credit/
npm run build:risk        --workspace=packages/dashboard-poc   # → dist/risk/

# Build all three
npm run build:all --workspace=packages/dashboard-poc

# Deploy to S3 + configure CloudFront (Windows only)
scripts\deploy.bat
scripts\setup-cloudfront.bat
```

There are no tests in this project.

## Build system: multi-entry Vite pattern

`vite.config.js` switches its **root** directory based on the `DASHBOARD` env var:

- Dev (`DASHBOARD` unset): root is the package root, entry is `index.html`, base is `/`.
- Production (`DASHBOARD=risk` etc.): root becomes the matching subfolder (`risk/`, `credit/`, `collections/`), entry is that folder's `index.html`, base is `./` (relative) so assets resolve correctly from any S3 subfolder path.

Each dashboard subfolder's `index.html` imports its own `main-*.jsx` directly (e.g. `src/dashboards/risk/main-risk.jsx`). Adding a new dashboard requires: a `src/dashboards/<name>/` folder, a matching `<name>/index.html`, a `src/data/<name>.json`, and a new `build:<name>` script in `package.json`.

## Architecture

**Shared components** in `src/components/` are deliberately thin wrappers:
- `Card` — applies the glassmorphism style (`bg-white/10 backdrop-blur-md border-white/20`)
- `KPICard`, `LineChartCard`, `BarChartCard`, `PieChartCard` — accept data + key props, render Recharts inside a `Card`
- `Layout` — full-screen background image wrapper (`/background.jpg` from `public/`)

**Dashboard components** (`*Dashboard.jsx`) import directly from `../../data/<name>.json` and from `../../components/`. They own all data-transformation logic inline. There is no state management, routing, or API layer — data is entirely static JSON bundled at build time.

**Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin, no `tailwind.config.js`). The glassmorphism design (white/10 backgrounds, backdrop-blur, white/20 borders) is the established visual style for the Risk and Credit dashboards. The Collections dashboard uses a lighter `bg-gray-50` theme instead.

## AWS infrastructure

- **S3 bucket**: `dashboard-poc-tjn` (public static website hosting), AWS profile `dashboard-poc`, region `us-east-1`
- **CloudFront**: fronts the S3 website endpoint (not the S3 REST endpoint) using `http-only` origin protocol; `CachePolicyId 658327ea...` (AWS Managed-CachingOptimized)
- **URL structure**: each dashboard lives at `/<name>/` — e.g. `/risk/`, `/credit/`, `/collections/`
- The `deploy.bat` script handles build → bucket creation → public policy → sync in one pass; HTML files are synced separately with explicit `--content-type text/html` to avoid S3's binary content-type default
