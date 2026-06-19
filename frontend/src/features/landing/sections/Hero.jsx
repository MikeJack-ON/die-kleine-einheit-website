import { Button } from "@/components/shared/Button";
import { Chip } from "@/components/shared/Chip";
import { CalendarIcon, PinIcon } from "@/components/shared/Icons";
import { ANCHORS } from "@/config/routes";
import { ASSETS } from "@/config/assets";

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Körperintelligenz — Live-Workshop">
      {ASSETS.heroVideo ? (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={ASSETS.heroPoster || undefined}
          data-testid="hero-video"
        >
          <source src={ASSETS.heroVideo} />
        </video>
      ) : null}

      <div className="wrap hero-content">
        <p className="hero-eyebrow reveal is-visible">Live-Workshop · Schledehausen</p>

        <h1 className="hero-title reveal is-visible">
          <span>Körper</span>
          <span>Intelligenz</span>
        </h1>

        <p className="hero-sub reveal is-visible">Dein Gehirn bestimmt, wie du dich bewegst.</p>

        <div className="hero-meta reveal is-visible">
          <Chip icon={CalendarIcon} data-testid="hero-chip-date">
            Sa · 4. Juli 2026 · 10–14 Uhr
          </Chip>
          <Chip icon={PinIcon} data-testid="hero-chip-location">
            Naturplatz Draußen Zuhause, Schledehausen
          </Chip>
        </div>

        <div className="hero-cta reveal is-visible">
          <Button href={ANCHORS.buchung} data-testid="hero-primary-cta">
            Platz sichern – Frühbucher 49 €
          </Button>
          <Button href={ANCHORS.erlebnis} variant="ghost" data-testid="hero-secondary-cta">
            Was dich erwartet
          </Button>
        </div>

        <p className="hero-note reveal is-visible">Begrenzte Plätze · max. 20 Teilnehmer</p>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="bar" />
        <span>Mehr</span>
      </div>
    </section>
  );
}
