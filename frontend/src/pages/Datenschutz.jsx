import "@/styles/subpage.css";
import { Link } from "react-router-dom";
import { SubpageShell } from "@/components/shared/SubpageShell";
import { ROUTES } from "@/config/routes";

export default function Datenschutz() {
  return (
    <SubpageShell>
      <div className="legal" data-testid="datenschutz-page">
        <h1>Datenschutzerklärung</h1>
        <p className="stand">Stand: Juni 2026</p>

        <p>
          Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der
          Verarbeitung personenbezogener Daten im Rahmen unserer Website sowie der damit verbundenen
          Dienste.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung ist:
          <br />
          Die kleine Einheit
          <br />
          Michael Kletschke
          <br />
          [Anschrift des Anbieters]
          <br />
          [Postleitzahl Ort des Anbieters]
          <br />
          E-Mail: info@die-kleine-einheit.de
          <br />
          Telefon: +49 179 2589296
        </p>

        <h2>2. Datenerhebung und -verarbeitung</h2>
        <p>
          Wir verarbeiten Ihre personenbezogenen Daten nur, soweit dies zur Bereitstellung unserer
          Dienste, zur Erfüllung vertraglicher Pflichten oder zur Wahrung unserer berechtigten
          Interessen erforderlich ist. Die genauen Daten, Zwecke und Rechtsgrundlagen der
          Verarbeitung sind jeweils unten aufgeführt.
        </p>

        <h3>2.1. Besucherdaten &amp; Server-Logs</h3>
        <p>
          Wenn Sie unsere Website besuchen, werden automatisch Informationen von Ihrem Browser an
          unseren Server übermittelt. Diese Informationen werden temporär in sogenannten
          Server-Logfiles gespeichert. Hierzu gehören:
        </p>
        <ul>
          <li>Browsertyp und -version</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer-URL (die zuvor besuchte Seite)</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p>
          Diese Daten werden zum Zweck der Systemsicherheit, zur Optimierung unserer Dienste und für
          statistische Auswertungen verwendet. Eine Zusammenführung dieser Daten mit anderen
          Datenquellen wird nicht vorgenommen. Die Rechtsgrundlage für die Erhebung dieser Daten ist
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung einer sicheren und
          funktionierenden Website).
        </p>

        <h3>2.2. Buchung &amp; Zahlungsabwicklung (Stripe)</h3>
        <p>Wenn Sie einen Workshop buchen, erheben wir folgende Daten:</p>
        <ul>
          <li>Name (Vor- und Nachname)</li>
          <li>E-Mail-Adresse</li>
          <li>Optional: Mobilfunknummer für WhatsApp-Bestätigung</li>
        </ul>
        <p>
          Diese Daten werden zur Abwicklung Ihrer Anmeldung und zur Kontaktaufnahme bezüglich des
          Workshops benötigt. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
        </p>
        <p>
          Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe. Hierbei werden Ihre
          Zahlungsdaten (z. B. Kreditkartendaten) direkt an Stripe übermittelt. Stripe verarbeitet
          diese Daten gemäß seiner eigenen Datenschutzerklärung und den geltenden Gesetzen. Wir
          erhalten von Stripe lediglich eine Bestätigung über die erfolgreiche Zahlung sowie
          Metadaten zu Ihrer Buchung (z. B. Name, E-Mail-Adresse, die Tatsache der Zahlung, aber
          keine vollständigen Zahlungsdaten). Stripe kann Ihre Daten auch in die USA übermitteln;
          hierfür liegen entsprechende Standardvertragsklauseln (SCC) vor. Rechtsgrundlage für die
          Einbindung und Nutzung von Stripe im Checkout-Prozess ist Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren
          und effizienten Zahlungsabwicklung).
          <br />
          Stripe Datenschutzerklärung:{" "}
          <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer">
            https://stripe.com/de/privacy
          </a>
        </p>

        <h3>2.3. E-Mail-Bestätigung &amp; Kommunikation (Resend)</h3>
        <p>
          Nach erfolgreicher Buchung erhalten Sie eine Bestätigungs-E-Mail an die von Ihnen
          angegebene Adresse. Diese E-Mail kann auch zusätzliche Informationen und
          Vorbereitungshinweise zum Workshop enthalten. Für den Versand nutzen wir den Dienstleister
          Resend; Ihre Daten werden gemäß dessen Datenschutzrichtlinien verarbeitet. Wir speichern
          Ihre E-Mail-Adresse für die Dauer der relevanten Kommunikation und gesetzlichen
          Aufbewahrungsfristen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer reibungslosen Kommunikation).
        </p>

        <h3>2.4. WhatsApp-Bestätigung (optional)</h3>
        <p>
          Falls Sie uns Ihre Mobilfunknummer mitteilen, kann diese zur Übermittlung der
          Anmeldebestätigung über WhatsApp genutzt werden. Die Verarbeitung erfolgt hier
          ausschließlich zur Erfüllung der vertraglichen Verpflichtung und zur reibungslosen
          Kommunikation. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Die
          Nutzung von WhatsApp unterliegt den Nutzungsbedingungen und Datenschutzrichtlinien von
          WhatsApp (Meta Platforms).
          <br />
          WhatsApp/Meta Datenschutzerklärung:{" "}
          <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer">
            https://www.whatsapp.com/legal/privacy-policy-eea
          </a>
        </p>

        <h3>2.5. Hosting</h3>
        <p>
          Unsere Website wird gehostet bei:
          <br />
          [Name des Hosting-Anbieters]
          <br />
          [Anschrift des Hosting-Anbieters]
          <br />
          Der Hosting-Anbieter ist beauftragt, Daten in unserem Auftrag zu verarbeiten
          (Auftragsverarbeitung gemäß Art. 28 DSGVO).
        </p>

        <h3>2.6. Cookies</h3>
        <p>
          Wir verwenden auf unserer Website keine Cookies, die über notwendige technische Funktionen
          hinausgehen (z. B. für die Anmeldung, den Checkout-Prozess oder essentielle
          Website-Funktionalitäten). Jegliche Art von Tracking-, Analyse- oder Marketing-Cookies wird
          nicht eingesetzt.
        </p>

        <h2>3. Betroffenenrechte</h2>
        <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li>
            <strong>Recht auf Auskunft:</strong> Sie können Auskunft über Ihre von uns gespeicherten
            personenbezogenen Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Berichtigung:</strong> Sie können die Berichtigung unrichtiger Daten
            verlangen.
          </li>
          <li>
            <strong>Recht auf Löschung:</strong> Sie können die Löschung Ihrer personenbezogenen
            Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </li>
          <li>
            <strong>Recht auf Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung
            der Verarbeitung Ihrer Daten verlangen.
          </li>
          <li>
            <strong>Recht auf Datenübertragbarkeit:</strong> Sie können verlangen, Ihre Daten in
            einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
          </li>
          <li>
            <strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten
            widersprechen, wenn die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht.
          </li>
          <li>
            <strong>Recht auf Widerruf einer Einwilligung:</strong> Sofern Sie uns eine Einwilligung
            zur Datenverarbeitung erteilt haben, können Sie diese jederzeit widerrufen. Der Widerruf
            berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.
          </li>
          <li>
            <strong>Recht auf Beschwerde bei einer Aufsichtsbehörde:</strong> Sie haben das Recht,
            sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
          </li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte wenden Sie sich bitte an die unter Punkt 1 genannte
          verantwortliche Stelle.
        </p>

        <h2>4. Foto- und Videoaufnahmen (freiwillige Einwilligung)</h2>
        <p>
          Während des Workshops können Foto- und Videoaufnahmen zu Dokumentations- und
          Öffentlichkeitsarbeitszwecken von den Teilnehmern angefertigt werden. Diese Aufnahmen können
          auf der Website von „Die kleine Einheit“, in sozialen Medien oder anderen Werbematerialien
          veröffentlicht werden.
        </p>
        <p>
          Die Teilnahme an solchen Aufnahmen ist <strong>freiwillig</strong>. Sie können Ihre
          Einwilligung jederzeit ohne Angabe von Gründen widerrufen. Der Widerruf wird wirksam, sobald
          er uns mitgeteilt wurde. Ein Widerruf wirkt für die Zukunft und betrifft keine bereits
          veröffentlichten Aufnahmen. Die Teilnahme am Workshop ist nicht von dieser Einwilligung
          abhängig. Rechtsgrundlage für die Verarbeitung bei erteilter Einwilligung ist Art. 6 Abs. 1
          lit. a DSGVO.
        </p>

        <h2>5. Links zu externen Diensten</h2>
        <p>
          Unsere Website enthält Links zu externen Diensten wie Stripe, WhatsApp und ggf. Google
          Fonts. Für die Datenschutzpraktiken dieser Dienste sind diese selbst verantwortlich. Wir
          empfehlen Ihnen, die jeweiligen Datenschutzerklärungen dieser Dienste zu lesen.
        </p>

        <h2>6. Aktualisierung der Datenschutzerklärung</h2>
        <p>
          Wir behalten uns das Recht vor, diese Datenschutzerklärung anzupassen, um sie stets auf dem
          neuesten Stand zu halten oder an geänderte rechtliche oder technische Gegebenheiten
          anzupassen. Die jeweils aktuelle Fassung finden Sie auf unserer Website.
        </p>

        <p className="muted">
          Siehe auch:{" "}
          <Link to={ROUTES.teilnahmebedingungen}>Teilnahmebedingungen</Link> ·{" "}
          <Link to={ROUTES.impressum}>Impressum</Link>
        </p>
      </div>
    </SubpageShell>
  );
}
