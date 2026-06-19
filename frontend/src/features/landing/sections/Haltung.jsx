import { Reveal } from "@/components/shared/Reveal";
import { ASSETS } from "@/config/assets";

export function Haltung() {
  return (
    <section className="haltung" aria-label="Haltung">
      <Reveal className="wrap" as="div">
        <img
          className="haltung-portrait"
          src={ASSETS.portraitImage}
          alt="Michael Kletschke"
          loading="lazy"
          data-testid="haltung-portrait"
        />
        <div className="haltung-text">
          <h2>Ich suche nicht, was an dir falsch ist.</h2>
          <p>
            Du hast vielleicht gelernt, gegen deinen Körper zu arbeiten. Ich bin überzeugt: er ist
            längst auf deiner Seite.
          </p>
          <p className="name">Michael Kletschke</p>
        </div>
      </Reveal>
    </section>
  );
}
