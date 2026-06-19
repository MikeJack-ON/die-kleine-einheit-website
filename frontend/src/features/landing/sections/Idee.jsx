import { Reveal } from "@/components/shared/Reveal";

export function Idee() {
  return (
    <section className="idee" aria-label="Die Idee">
      <Reveal className="wrap" as="div">
        <p className="idee-statement">
          <span>Dein Körper ist selten das Problem.</span>
          <span>Er sucht nur Sicherheit.</span>
        </p>
      </Reveal>
    </section>
  );
}
