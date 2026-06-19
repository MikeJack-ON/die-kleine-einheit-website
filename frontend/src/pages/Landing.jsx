import "@/styles/landing.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/features/landing/sections/Hero";
import { Idee } from "@/features/landing/sections/Idee";
import { Erlebnis } from "@/features/landing/sections/Erlebnis";
import { Moeglich } from "@/features/landing/sections/Moeglich";
import { Haltung } from "@/features/landing/sections/Haltung";
import { Einladung } from "@/features/landing/sections/Einladung";

export default function Landing() {
  return (
    <div className="landing" data-testid="landing-page">
      <Header />
      <main>
        <Hero />
        <Idee />
        <Erlebnis />
        <Moeglich />
        <Haltung />
        <Einladung />

        {/* Sprint 2: Booking form (Screen 7) replaces this anchor placeholder. */}
        <section className="buchung-placeholder" id="buchung" aria-label="Buchung">
          <div className="wrap" data-testid="buchung-placeholder">
            Buchung — Sprint 2
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
