# Architecture — Die kleine Einheit · Workshop Platform (Release 1.0)

This document records the **why** behind the key technical decisions so a future
engineer can extend the system confidently without re-reading every file.

Source of truth for product/UX: `Workshop-Landing-Page-Developer-Specification-v1.0` (frozen).

---

## 1. High-level shape

A modular monolith. One FastAPI app, one React SPA, one MongoDB.
Backend is split into **domain modules** that talk only through each other's
**public service functions** — never another module's collections or models.

```
Dependency direction (one-way, acyclic):
  catalog  ←  bookings  ←  payments  ←  notifications
                                ↑              ↑
                          (event bus is the decoupling seam)
```

Why a modular monolith and not microservices: at this stage it gives clean
seams and future extractability without the operational cost of distributed
systems. Each module can later become a service because boundaries are explicit.

---

## 2. Domains

| Module | Owns | Public surface |
|---|---|---|
| `catalog` | Workshops as **Products** (price tiers, session, cutoff) | `get_workshop`, `resolve_active_price` |
| `bookings` | Booking aggregate + **state machine** | `create_booking`, `transition`, `get_booking` |
| `payments` | Stripe behind `PaymentProvider`, `payment_transactions` | `create_checkout`, `get_status`, `handle_webhook` |
| `notifications` | Email + WhatsApp behind provider interfaces | event consumers + providers |

### Why "Booking = Product object"
Price/currency/tier are resolved from the catalog **server-side** and stored on
the booking. Adding workshops, dates or ticket types is **data**, not code.

### Booking state machine
`draft → pending → paid → confirmed → cancelled`, enforced by an explicit
`ALLOWED_TRANSITIONS` table. Illegal transitions raise (409). `status_history`
is an append-only event log per booking — the future CRM/analytics read model.

---

## 3. Payments — confidence design

- **Stripe is the first `PaymentProvider`, not the architecture.** All Stripe
  specifics live in `stripe_provider.py`. Swapping providers = new adapter.
- **Server-authoritative amounts.** The client never sends a price; it is read
  from the catalog. Verified: 49 € → 4900 cents at Stripe.
- **Idempotent confirmation.** `_apply_paid()` uses an atomic
  `find_one_and_update({session_id, payment_status != paid})` to claim the paid
  transition exactly once. This is the guard against: duplicate webhooks,
  webhook + poll races, and repeated polling.
- **Dual confirmation path.** The Stripe webhook *and* the `/danke` status poll
  both call `_apply_paid()`. Either one finalizes the order; the idempotency
  guard makes double-delivery safe. The system therefore tolerates a missing or
  delayed webhook.
- **Webhook path** is `/api/webhook/stripe` (integration-library mandated;
  documented deviation from the spec's `/api/stripe-webhook`, internal only).

---

## 4. Events & notifications

- **In-process event bus** (`core/events.py`). Every `publish()` is persisted to
  `event_log` (structured, queryable observability) *before* dispatch to
  subscribers. Handler failures are isolated (logged, never crash the publisher).
- **Notifications are pure consumers.** They subscribe to `PaymentConfirmed` and
  contain **no Stripe and no payment logic**. Payments publish the event with no
  knowledge of who consumes it. Adding SMS/Push/CRM/AI = implement the provider
  interface + `subscribe()`; zero change to Booking or Payment.
- **Lifecycle events:** `BookingCreated`, `CheckoutStarted`, `CheckoutCancelled`,
  `PaymentConfirmed`, `ConfirmationEmailSent`, `WhatsAppPrepared`,
  `WebhookReceived`.
- **Graceful degradation.** Missing `RESEND_API_KEY` → email is logged as
  `skipped`; the booking still reaches `confirmed`. WhatsApp R1.0 is a
  click-to-chat `wa.me` link (no API), behind `MessagingProvider` so Twilio/Meta
  drops in later.

> Note: the in-process bus is synchronous. At launch volume this is correct.
> The documented scale path (R1.1) is a durable queue/worker behind the same
> `event_bus.publish` interface — consumers do not change.

---

## 5. Frontend

- Section-per-component landing (one thought per screen). Reusable primitives:
  `Button`, `Chip`, `Reveal`, `SubpageShell`, `Icons`.
- All dynamic facts live in `config/workshop.js`; media in `config/assets.js`
  (final hero video / images are a one-line swap, no layout change).
- API access centralized in `lib/api/*` over a single axios client using
  `REACT_APP_BACKEND_URL`.
- React escapes interpolated values by default (XSS-safe in the UI). The email
  HTML escapes user input explicitly (`htmllib.escape`).

---

## 6. Configuration & secrets

All config via environment variables, no hardcoded secrets, no silent defaults
for required values (fail-fast). Integration keys are optional at boot so the
app runs before every integration is wired.

Backend: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `STRIPE_API_KEY`,
`RESEND_API_KEY`, `SENDER_EMAIL`, `WHATSAPP_BUSINESS_NUMBER`.
Frontend: `REACT_APP_BACKEND_URL`.

---

## 7. Collections

| Collection | Purpose | Key indexes |
|---|---|---|
| `workshops` | catalog | `slug` (unique) |
| `bookings` | registrations + lifecycle | `email`, `status`, `created_at`, `stripe_session_id` (sparse) |
| `payment_transactions` | payment record + idempotency | `session_id` (unique), `booking_id` |
| `event_log` | every published event | `type`, `at` |
| `notifications_log` | per-channel delivery audit | `booking_id` |

---

## 8. Known deferrals (intentional, R1.1+)

- Resend domain `events@…` sender (R1.0 uses `info@…`).
- WhatsApp Business API (R1.0 = click-to-chat).
- Durable job queue for notifications.
- Admin booking dashboard.
- Restrictive CORS allow-list at the production domain.
