import { Reveal } from "@/components/shared/Reveal";
import { ASSETS } from "@/config/assets";

export function Erlebnis() {
  return (
    <section
      className="erlebnis"
      id="erlebnis"
      aria-label="Das Erlebnis"
      style={{ "--erlebnis-img": `url(${ASSETS.erlebnisImage})` }}
    >
      <Reveal className="wrap" as="div">
        <h2 className="erlebnis-title">Einfach gehen.</h2>
        <p className="erlebnis-sub">Und spüren, wie leicht sich das anfühlt.</p>
      </Reveal>
    </section>
  );
}
