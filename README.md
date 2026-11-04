# NCA Safe Space — Frontend

Next.js 14 (App Router) · TypeScript · Tailwind CSS (RTL via logical utilities) · React Query · Zustand · PWA.

## Run

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

Production + PWA (service worker only registers in production):

```bash
npm run build && npm start
```

Sign in with a demo account (shown on the login page):

| Role   | Email                       | Password   |
|--------|-----------------------------|------------|
| Admin  | kondajoseph019@gmail.com    | Admin#2026 |
| Staff  | staff@nca.org               | Staff#2026 |
| Viewer | viewer@nca.org              | View#2026  |

## Structure

```
src/app
  login/                 Login (email, password, role, EN/AR)
  (app)/layout.tsx       Auth guard + sidebar + header + mobile bottom menu
  (app)/dashboard/       Stat cards, trend chart, status chart, map
  (app)/cases/           List: filters, sort, pagination
  (app)/cases/new/       Add case form (role-gated)
  (app)/cases/[id]/      Case details + status update (Admin/Staff)
  (app)/reports/         KPIs, cases by region/status, monthly table, CSV export
  (app)/settings/        Language, theme (system/light/dark), push permission, clear offline cache
  (app)/help/            FAQ + contact form (opens mail app; address in src/lib/config.ts)
  (app)/profile/         Account info, install app, log out
src/components           UI pieces
src/lib                  api.ts (REST client), store.ts (Zustand), i18n.ts, types, mock data
public                   manifest.webmanifest, sw.js, icons
```

## Hooking up your backend

`src/lib/api.ts` uses mock data until `NEXT_PUBLIC_API_URL` is set, then calls `GET /cases`, `POST /cases` and `PATCH /cases/:id` (body: `{ status }`).

## Before production

- Replace the demo login in `src/app/login/page.tsx` with real server-side auth (httpOnly cookie) and remove the demo accounts box and `DEMO_ACCOUNTS`.
- Role checks in the UI are cosmetic; enforce roles on the API.
- Swap the SVG `CaseMap` for Leaflet/Mapbox with real coordinates.
- Add shadcn/ui (`npx shadcn@latest init`) if you want its components.
- Push notifications need a VAPID key and a subscription endpoint on the backend; `sw.js` already displays incoming pushes.
- This project was written without network access, so run `npm install && npm run typecheck && npm run build` first and fix anything that surfaces.
