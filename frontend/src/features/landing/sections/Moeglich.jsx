import { Reveal } from "@/components/shared/Reveal";

export function Moeglich() {
  return (
    <section className="moeglich" aria-label="Was möglich wird">
      <Reveal className="wrap" as="div">
        <p className="moeglich-text">
          <span>Vielleicht geht es nicht darum, mehr zu tun.</span>
          <span>Sondern anders wahrzunehmen.</span>
        </p>
      </Reveal>
    </section>
  );
}
