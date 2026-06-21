import "@/styles/subpage.css";
import { SubpageShell } from "@/components/shared/SubpageShell";

export default function Impressum() {
  return (
    <SubpageShell>
      <div className="legal" data-testid="impressum-page">
        <h1>Impressum</h1>
        <p className="stand">Stand: Juni 2026</p>

        <h2>Anbieter</h2>
        <p>
          Die kleine Einheit
          <br />
          Physio · Training · Performance
        </p>

        <h2>Diensteanbieter i.S.d. § 5 DDG</h2>
        <p>
          Michael Kletschke
          <br />
          [Anschrift des Anbieters]
          <br />
          [Postleitzahl Ort des Anbieters]
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: +49 179 2589296
          <br />
          E-Mail: info@die-kleine-einheit.de
        </p>

        <h2>Umsatzsteuer-Identifikationsnummer</h2>
        <p>[USt-IdNr. — sofern vorhanden]</p>

        <h2>Redaktionell Verantwortlicher i.S.d. § 18 Abs. 2 MStV</h2>
        <p>
          Michael Kletschke
          <br />
          [Anschrift des Anbieters]
          <br />
          [Postleitzahl Ort des Anbieters]
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Verbraucher haben die Möglichkeit, eine Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO
          zu nutzen. Die Schlichtungsstelle ist die Europäische Kommission unter{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          .
        </p>

        <h2>Haftungsausschluss</h2>
        <h3>1. Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
          Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich.
        </p>
        <h3>2. Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht
          erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
        <h3>3. Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
          des jeweiligen Erstellers bzw. Autors. Downloads und Kopien dieser Seite sind nur für den
          privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht
          vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
          werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie dennoch auf eine
          Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </div>
    </SubpageShell>
  );
}
