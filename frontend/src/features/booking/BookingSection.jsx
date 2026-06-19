import { Reveal } from "@/components/shared/Reveal";
import { WORKSHOP } from "@/config/workshop";
import { Summary } from "./Summary";
import { BookingForm } from "./BookingForm";

export function BookingSection() {
  return (
    <section className="buchung" id="buchung" aria-label="Anmeldung">
      <Reveal className="wrap" as="div">
        <h2 className="buchung-title">Anmeldung</h2>
        <p className="buchung-intro">Ein paar Felder — dann ist deine Entscheidung abgeschlossen.</p>

        <Summary />
        <BookingForm />

        <div className="booking-contact" data-testid="booking-contact">
          <p>Fragen vor der Anmeldung?</p>
          <a href={`mailto:${WORKSHOP.contact.email}`}>{WORKSHOP.contact.email}</a>
          <span> · </span>
          <a href={`tel:${WORKSHOP.contact.phone.replace(/\s/g, "")}`}>{WORKSHOP.contact.phone}</a>
        </div>
      </Reveal>
    </section>
  );
}
