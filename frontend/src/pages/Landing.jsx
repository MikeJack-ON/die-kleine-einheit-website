import "@/styles/landing.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/features/landing/sections/Hero";
import { Idee } from "@/features/landing/sections/Idee";
import { Erlebnis } from "@/features/landing/sections/Erlebnis";
import { Moeglich } from "@/features/landing/sections/Moeglich";
import { Haltung } from "@/features/landing/sections/Haltung";
import { Einladung } from "@/features/landing/sections/Einladung";
import { BookingSection } from "@/features/booking/BookingSection";

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
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
