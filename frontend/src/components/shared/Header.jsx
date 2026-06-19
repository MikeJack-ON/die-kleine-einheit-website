import { Button } from "@/components/shared/Button";
import { ANCHORS } from "@/config/routes";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a href={ANCHORS.top} className="brand" data-testid="header-brand">
          <b>DIE KLEINE EINHEIT</b>
          <span>Physio · Training · Performance</span>
        </a>
        <Button href={ANCHORS.buchung} size="sm" className="header-cta" data-testid="header-cta">
          Platz sichern
        </Button>
      </div>
    </header>
  );
}
