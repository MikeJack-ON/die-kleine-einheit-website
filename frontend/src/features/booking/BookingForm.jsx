import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { LockIcon } from "@/components/shared/Icons";
import { ROUTES } from "@/config/routes";
import { WORKSHOP } from "@/config/workshop";
import { createBooking } from "@/lib/api/booking";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAY_ERROR =
  "Die Bezahlung lässt sich gerade nicht starten. Bitte versuch es erneut oder schreib uns an info@die-kleine-einheit.de.";

export function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    consentTerms: false,
    consentPrivacy: false,
    consentPhoto: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | created | error

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Bitte gib deinen Namen ein.";
    if (!EMAIL_RE.test(form.email)) next.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    if (!form.consentTerms) next.consentTerms = "Erforderlich.";
    if (!form.consentPrivacy) next.consentPrivacy = "Erforderlich.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    try {
      await createBooking({
        workshop_slug: WORKSHOP.slug,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        consent_terms: form.consentTerms,
        consent_privacy: form.consentPrivacy,
        consent_photo_video: form.consentPhoto,
      });
      // Sprint 3 replaces this with: window.location.href = checkoutUrl
      setStatus("created");
    } catch (e) {
      setStatus("error");
    }
  };

  if (status === "created") {
    return (
      <div className="booking-note" data-testid="checkout-pending-note">
        Deine Anmeldedaten wurden erfasst (Status: Entwurf). Die Weiterleitung zur Stripe-Zahlung
        wird in Sprint 3 aktiviert.
      </div>
    );
  }

  return (
    <form
      className="booking-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      noValidate
    >
      {status === "error" ? (
        <p className="booking-error" data-testid="booking-error">
          {PAY_ERROR}
        </p>
      ) : null}

      <div className="field">
        <label htmlFor="b-name">Name</label>
        <input
          id="b-name"
          type="text"
          autoComplete="name"
          placeholder="Vor- und Nachname"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          data-testid="booking-name"
        />
        {errors.name ? <p className="error">{errors.name}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="b-mail">E-Mail</label>
        <input
          id="b-mail"
          type="email"
          autoComplete="email"
          placeholder="dein@beispiel.de"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          data-testid="booking-email"
        />
        <p className="hint">Hierhin kommt deine Bestätigung mit allen Details.</p>
        {errors.email ? <p className="error">{errors.email}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="b-tel">Mobil — optional, für die WhatsApp-Bestätigung</label>
        <input
          id="b-tel"
          type="tel"
          autoComplete="tel"
          placeholder="+49 …"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          data-testid="booking-phone"
        />
        <p className="hint">Nur für die Anmeldebestätigung — keine Werbung.</p>
      </div>

      <label className="consent" data-testid="consent-terms">
        <input
          type="checkbox"
          checked={form.consentTerms}
          onChange={(e) => update("consentTerms", e.target.checked)}
        />
        <span>
          Ich habe die{" "}
          <Link to={ROUTES.teilnahmebedingungen} target="_blank" rel="noopener noreferrer">
            Teilnahmebedingungen
          </Link>{" "}
          gelesen und nehme auf eigene Verantwortung teil.
          {errors.consentTerms ? <span className="error"> {errors.consentTerms}</span> : null}
        </span>
      </label>

      <label className="consent" data-testid="consent-privacy">
        <input
          type="checkbox"
          checked={form.consentPrivacy}
          onChange={(e) => update("consentPrivacy", e.target.checked)}
        />
        <span>
          Ich bin mit der Verarbeitung meiner Daten gemäß{" "}
          <Link to={ROUTES.datenschutz} target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung
          </Link>{" "}
          einverstanden.
          {errors.consentPrivacy ? <span className="error"> {errors.consentPrivacy}</span> : null}
        </span>
      </label>

      <label className="consent" data-testid="consent-photo">
        <input
          type="checkbox"
          checked={form.consentPhoto}
          onChange={(e) => update("consentPhoto", e.target.checked)}
        />
        <span>
          Freiwillig: Während des Workshops dürfen Foto-/Videoaufnahmen von mir entstehen und für die
          Öffentlichkeitsarbeit von Die kleine Einheit genutzt werden. Keine Voraussetzung für die
          Teilnahme, jederzeit widerrufbar.
        </span>
      </label>

      <Button
        type="submit"
        className="booking-submit"
        disabled={status === "submitting"}
        data-testid="booking-submit"
      >
        {status === "submitting" ? "Einen Moment …" : "Anmeldung abschließen"}
      </Button>

      <p className="pay-trust">
        <LockIcon />
        Sichere Bezahlung über Stripe
      </p>
    </form>
  );
}
