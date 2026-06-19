import { Link } from "react-router-dom";
import { ROUTES, ANCHORS } from "@/config/routes";
import { WORKSHOP } from "@/config/workshop";

export function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="wrap">
        <a href={ANCHORS.top} className="footer-brand" data-testid="footer-brand">
          <b>DIE KLEINE EINHEIT</b>
        </a>

        <div className="footer-contact">
          <a href={`mailto:${WORKSHOP.contact.email}`} data-testid="footer-email">
            {WORKSHOP.contact.email}
          </a>
          <a href={`tel:${WORKSHOP.contact.phone.replace(/\s/g, "")}`} data-testid="footer-phone">
            {WORKSHOP.contact.phone}
          </a>
        </div>

        <nav className="footer-links">
          <Link to={ROUTES.impressum} data-testid="footer-impressum">
            Impressum
          </Link>
          <Link to={ROUTES.datenschutz} data-testid="footer-datenschutz">
            Datenschutz
          </Link>
          <Link to={ROUTES.teilnahmebedingungen} data-testid="footer-teilnahmebedingungen">
            Teilnahmebedingungen
          </Link>
        </nav>

        <p className="footer-copy">
          © 2026 Die kleine Einheit · Michael Kletschke · Körperintelligenz, 4. Juli 2026 in Schledehausen
        </p>
      </div>
    </footer>
  );
}
