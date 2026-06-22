# PRD — Die kleine Einheit · Workshop Landing Platform (Release 1.0)

## Original problem statement
Build the technical foundation of a workshop business, starting with the "Körperintelligenz"
live-workshop landing page (Release 1.0). Source of truth: frozen Developer Specification v1.0
(German copy, design tokens, screens 1–7, legal pages). Execution in disciplined sprints with a
formal engineering review after each. The foundation must scale toward membership, CRM, digital
products, mobile, AI, analytics — without rebuilding.

## Tech stack / architecture
- Frontend: React 19 (CRA/Craco), React Router 7, React Query, Framer Motion, Tailwind + CSS vars.
- Backend: FastAPI (async, Motor), modular monolith: catalog ← bookings ← payments ← notifications.
- DB: MongoDB. Payments: Stripe (emergentintegrations) behind PaymentProvider. Email: Resend behind
  EmailProvider. WhatsApp: click-to-chat (wa.me) behind MessagingProvider. In-process event bus +
  structured event_log + notifications_log. See /app/ARCHITECTURE.md.

## Core requirements (static)
Landing (7 screens, verbatim) → Booking → Stripe Checkout → Payment → Thank-You (/danke) →
Confirmation Email → WhatsApp confirmation → Legal pages → SEO foundation → Deployment.

## What's implemented (2026-06-21)
- Sprint 0 Foundation, Sprint 1 Landing (screens 1–6 + header/footer), Sprint 2 Booking + Catalog,
  Sprint 3 Stripe Checkout (idempotent webhook + status poll), Sprint 4 Event system + Notifications
  (Resend + WhatsApp, 7 lifecycle events), Sprint 5 Thank-You flow, Sprint 6 Legal + SEO.
- Verified live: full journey draft→pending→paid→confirmed with Stripe test card.
- RC validation done; fixed HTML email escaping + missing CheckoutCancelled emission.
- Deployment health check: PASS.

## Known deferrals / non-code go-live gates
- Email INACTIVE until RESEND_API_KEY set (provider degrades to 'skipped').
- Production secrets: Stripe live key + STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, CORS_ORIGINS→prod domain.
- DNS: Resend SPF/DKIM/DMARC for info@die-kleine-einheit.de; domain→deployment + TLS.
- LEGAL placeholders (operator address/PLZ, USt-IdNr, hosting provider) must be filled before public launch.
- Contact number corrected to +49 179 2589296 everywhere (authorized override of spec's 0175).

## Backlog (Release 1.1+)
- WhatsApp Business API (Twilio/Meta), admin booking dashboard, durable notification queue,
  multi-workshop UI, analytics dashboard, sender events@die-kleine-einheit.de, OG share image.

## Stripe Checkout presentation upgrade (2026-06-22)
- Bypassed emergentintegrations hardcoded "Payment" name: create_checkout_session now uses raw
  stripe SDK (dynamic product_data name + description), preserving emergent proxy + webhook_url merge.
  Status polling & webhook handling still go through emergentintegrations (unchanged).
- Product name = "Workshop {workshop.title}" -> "Workshop Körperintelligenz" (fully dynamic).
- Product description = date, time · location · price · "Anbieter: Die kleine Einheit".
- 7 metadata fields confirmed: bookingId, workshopTitle, workshopDate, customerName, customerEmail,
  amount, environment. Verified live via Stripe test session + status endpoint regression. Deploy-ready.

## Next action items
1. Fill legal placeholders. 2. Deploy. 3. Set production secrets + restart. 4. Configure Stripe live
   webhook. 5. Resend DNS. 6. Live smoke test (book→pay→confirm). 
