import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { ANCHORS } from "@/config/routes";

export function Einladung() {
  return (
    <section className="einladung" aria-label="Einladung">
      <Reveal className="wrap" as="div">
        <h2 className="einladung-title">
          <span>Vielleicht beginnt hier</span>
          <span>ein anderer Blick auf deinen Körper.</span>
        </h2>

        <div className="einladung-details">
          <p>Samstag, 4. Juli 2026 · 10 – 14 Uhr</p>
          <p>Naturplatz Draußen Zuhause, Schledehausen</p>
          <p className="bring">Bring nur dich selbst mit.</p>
        </div>

        <p className="einladung-price">49 €</p>

        <Button href={ANCHORS.buchung} data-testid="einladung-cta">
          Ich möchte dabei sein
        </Button>
      </Reveal>
    </section>
  );
}
