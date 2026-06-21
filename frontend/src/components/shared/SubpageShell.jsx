import { Link } from "react-router-dom";
import { Footer } from "@/components/shared/Footer";
import { ROUTES } from "@/config/routes";

export function SubpageShell({ children }) {
  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <div className="wrap">
          <Link to={ROUTES.home} className="brand" data-testid="subpage-brand">
            <b>DIE KLEINE EINHEIT</b>
          </Link>
          <Link to={ROUTES.home} className="subpage-back" data-testid="subpage-back">
            ← Zurück
          </Link>
        </div>
      </div>

      <main className="subpage-main">
        <div className="wrap">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
