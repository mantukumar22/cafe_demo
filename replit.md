# Brewed Bliss Café

A luxury single-page café website with a React frontend and Express backend. Visitors can browse the menu, learn about the café, view the gallery, and send contact messages.

## Run & Operate

- `pnpm --filter @workspace/cafe-website run dev` — run the React frontend (reads PORT from env)
- `pnpm --filter @workspace/api-server run dev` — run the Express API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS, Framer Motion, react-icons, react-hook-form + Zod, sonner toasts
- API: Express 5
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Email: Nodemailer (Gmail SMTP, optional — gracefully skipped if env vars absent)

## Where things live

- `artifacts/cafe-website/src/components/` — all page section components (Navbar, Hero, About, Menu, Services, Gallery, Testimonials, Contact, WhatsAppButton, Footer)
- `artifacts/cafe-website/src/pages/Home.tsx` — assembles all sections
- `artifacts/api-server/src/routes/contact.ts` — contact form → Nodemailer
- `artifacts/api-server/src/routes/menu.ts` — static menu data
- `lib/api-spec/openapi.yaml` — source of truth for API contracts
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — generated Zod schemas (do not edit)

## Architecture decisions

- Contract-first: OpenAPI spec drives both server-side Zod validation and client-side React Query hooks via Orval codegen.
- Nodemailer email is optional — the contact form always returns success even if `EMAIL_USER`/`EMAIL_PASS` env vars are absent, so the site works without email config.
- Menu data is hardcoded in the API route (no database needed for this read-only catalog).
- All fonts (Playfair Display, Lato) are loaded from Google Fonts at the top of `index.css` before Tailwind imports.
- Colors use HSL CSS custom properties that feed the entire Tailwind/shadcn design system.

## Product

A luxury café landing page with: sticky transparent-to-solid navbar, full-screen hero with animations, about section with counters, filterable menu grid (live API data), services cards with hover glows, masonry gallery with lightbox, testimonials carousel, contact form with email delivery, floating WhatsApp button, and a dark footer.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Environment variables

Optional (for contact form email delivery):
- `EMAIL_USER` — Gmail address used to send emails
- `EMAIL_PASS` — Gmail App Password (not your regular password — generate at myaccount.google.com/apppasswords)
- `RECEIVER_EMAIL` — Address that receives contact form submissions (defaults to `EMAIL_USER`)

## Gotchas

- After any change to `lib/api-spec/openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen` before using the updated types.
- Google Fonts `@import url(...)` must be the absolute first line in `index.css` — PostCSS will silently fail if it appears after `@import "tailwindcss"`.
- `pnpm run build` needs `PORT` and `BASE_PATH` env vars (provided by workflows). Use `typecheck` for local validation instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
