import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "@/styles/subpage.css";
import { SubpageShell } from "@/components/shared/SubpageShell";
import { ROUTES } from "@/config/routes";
import { WORKSHOP } from "@/config/workshop";
import { getCheckoutStatus } from "@/lib/api/checkout";

const MAX_ATTEMPTS = 6;
const POLL_INTERVAL = 2000;

export default function Danke() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  // Silently finalize the backend flow (marks paid -> confirmed, triggers notifications).
  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      if (cancelled || attempts >= MAX_ATTEMPTS) return;
      attempts += 1;
      try {
        const data = await getCheckoutStatus(sessionId);
        if (data.payment_status === "paid" || data.status === "expired") return;
      } catch (e) {
        // non-blocking — the page still celebrates the decision
      }
      if (!cancelled) setTimeout(poll, POLL_INTERVAL);
    };
    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <SubpageShell>
      <div data-testid="danke-page">
        <h1>Schön, dass du dabei bist.</h1>
        <p className="lead">
          Deine Anmeldung für <strong>Körperintelligenz</strong> ist abgeschlossen.
        </p>

        <div className="note-box" data-testid="danke-details">
          <p>Samstag, 4. Juli 2026 · 10–14 Uhr</p>
          <p>Naturplatz Draußen Zuhause, Schledehausen</p>
        </div>

        <p className="danke-hinweis">
          Deine Anmeldebestätigung mit allen wichtigen Infos schicken wir dir gleich per E-Mail.
          Falls du auch eine WhatsApp-Nachricht wünschst, erhältst du diese in Kürze. Bitte prüfe
          auch deinen Spam-Ordner.
        </p>

        <h2>Damit du gut vorbereitet bist</h2>
        <ul className="prep-list">
          <li>Beweg dich frei und unbeschwert.</li>
          <li>Barfuß im Gras ist willkommen.</li>
          <li>Zieh Kleidung an, die dem Wetter und deinem Wohlbefinden entspricht.</li>
          <li>Für Wasser, Tee und eine kleine Stärkung ist gesorgt.</li>
          <li>Sei bitte ein paar Minuten vor 10 Uhr da.</li>
        </ul>

        <p className="danke-contact">
          <a href={`mailto:${WORKSHOP.contact.email}`}>{WORKSHOP.contact.email}</a>
          {" · "}
          <a href={`tel:${WORKSHOP.contact.phone.replace(/\s/g, "")}`}>{WORKSHOP.contact.phone}</a>
        </p>

        <Link to={ROUTES.home} className="btn" data-testid="danke-home-cta">
          Zur Startseite
        </Link>
      </div>
    </SubpageShell>
  );
}
