import "@/styles/subpage.css";
import { Link } from "react-router-dom";
import { SubpageShell } from "@/components/shared/SubpageShell";
import { ROUTES } from "@/config/routes";

export default function Teilnahmebedingungen() {
  return (
    <SubpageShell>
      <div className="legal" data-testid="teilnahmebedingungen-page">
        <h1>Teilnahmebedingungen für den Live-Workshop „Körperintelligenz“</h1>
        <p className="stand">Stand: Juni 2026</p>

        <p>
          Diese Teilnahmebedingungen regeln die Beziehung zwischen dem Teilnehmer und dem
          Veranstalter für den Live-Workshop „Körperintelligenz“.
        </p>

        <h2>1. Veranstalter und Leistungsumfang</h2>
        <p>
          Veranstalter ist:
          <br />
          Michael Kletschke
          <br />
          [Anschrift des Veranstalters]
          <br />
          [Postleitzahl Ort des Veranstalters]
          <br />
          E-Mail: info@die-kleine-einheit.de
          <br />
          Telefon: +49 179 2589296
        </p>
        <p>
          Der Leistungsumfang des Workshops „Körperintelligenz“ ergibt sich aus der Beschreibung auf
          der Website zum Zeitpunkt der Buchung. Dies beinhaltet eine ca. 4-stündige
          Live-Veranstaltung am 4. Juli 2026 von 10–14 Uhr auf dem Naturplatz Draußen Zuhause in
          Schledehausen. Die Teilnahme umfasst die angeleitete Workshop-Einheit, ggf. Bereitstellung
          von Wasser/Tee und Snacks vor Ort.
        </p>

        <h2>2. Anmeldung und Vertragsschluss</h2>
        <p>
          Die Anmeldung erfolgt über das auf der Website bereitgestellte Buchungsformular und die
          anschließende Bezahlung über den Zahlungsdienstleister Stripe. Mit Abschluss des
          Buchungsvorgangs und erfolgreicher Zahlung kommt ein verbindlicher Vertrag zwischen dem
          Teilnehmer und dem Veranstalter zustande. Der Vertragstext (diese Bedingungen,
          Buchungsdaten) wird dem Teilnehmer per E-Mail bestätigt.
        </p>

        <h2>3. Preise und Zahlung</h2>
        <p>Die Workshop-Gebühr beträgt:</p>
        <ul>
          <li>
            <strong>Frühbucherpreis:</strong> 49 € (gültig bis einschließlich 26. Juni 2026)
          </li>
          <li>
            <strong>Regulärer Preis:</strong> 79 € (ab dem 27. Juni 2026)
          </li>
        </ul>
        <p>
          Die Zahlung erfolgt ausschließlich über Stripe. Die Bezahlung ist sofort nach Buchung
          fällig.
        </p>

        <h2>4. Stornierung und Widerruf</h2>
        <p>
          Ein gesetzliches Widerrufsrecht für den gebuchten Workshop besteht gemäß § 312g Abs. 2 Nr. 9
          BGB nicht.
        </p>
        <ul>
          <li>
            <strong>Kulanzregelung zur Stornierung:</strong> Teilnehmer können bis einschließlich 27.
            Juni 2026 kostenfrei von der Teilnahme zurücktreten. In diesem Fall wird die gezahlte
            Gebühr vollständig erstattet. Eine Stornierung muss schriftlich (per E-Mail an
            info@die-kleine-einheit.de) erfolgen.
          </li>
          <li>
            <strong>Nach dem 27. Juni 2026</strong> ist eine kostenfreie Stornierung nicht mehr
            möglich. Bei einer kurzfristigeren Absage des Teilnehmers (weniger als 7 Tage vor
            Workshop-Beginn) wird die volle Teilnahmegebühr erhoben.
          </li>
          <li>
            <strong>Krankheitsbedingte Absage:</strong> In Einzelfällen kann bei nachweislich
            kurzfristiger Erkrankung (ärztliches Attest erforderlich) eine individuelle Kulanzregelung
            zur Erstattung oder Gutschrift für einen zukünftigen Workshop getroffen werden. Dies liegt
            im Ermessen des Veranstalters.
          </li>
        </ul>

        <h2>5. Absage durch den Veranstalter</h2>
        <p>
          Sollte der Veranstalter den Workshop aus dringenden Gründen (z. B. höhere Gewalt, Erkrankung
          des Veranstalters, Nichterreichen der Mindestteilnehmerzahl) absagen müssen, werden die
          Teilnehmer unverzüglich informiert. In diesem Fall erfolgt eine vollständige Rückerstattung
          der bereits geleisteten Teilnahmegebühr. Weitergehende Ansprüche sind ausgeschlossen.
        </p>

        <h2>6. Eigenverantwortung und Gesundheit</h2>
        <p>
          Jeder Teilnehmer ist für seine körperliche und geistige Gesundheit während des Workshops
          selbst verantwortlich. Die Teilnahme am Workshop setzt eine normale körperliche
          Belastbarkeit voraus. Die Inhalte des Workshops stellen keine medizinische Behandlung,
          Diagnose oder Therapie dar und ersetzen nicht den Besuch bei einem Arzt oder Therapeuten.
          Teilnehmer mit gesundheitlichen Einschränkungen werden gebeten, vor der Anmeldung Rücksprache
          mit ihrem Arzt zu halten und den Veranstalter über relevante Einschränkungen zu informieren,
          die die Teilnahme oder die Ausführung von Übungen beeinflussen könnten. Die Teilnahme erfolgt
          auf eigenes Risiko.
        </p>

        <h2>7. Haftung</h2>
        <p>
          Die Haftung des Veranstalters für leichte Fahrlässigkeit wird ausgeschlossen, soweit dies
          gesetzlich zulässig ist. Die Haftung für Vorsatz und grobe Fahrlässigkeit sowie für Schäden
          an Leben, Körper und Gesundheit, die auf einer fahrlässigen Pflichtverletzung des
          Veranstalters oder einer vorsätzlichen oder fahrlässigen Pflichtverletzung eines
          gesetzlichen Vertreters oder Erfüllungsgehilfen des Veranstalters beruhen, bleibt
          unbeschränkt. Die Haftung für die Verletzung wesentlicher Vertragspflichten
          (Kardinalpflichten) ist auf den vertragstypischen, vorhersehbaren Schaden begrenzt, soweit
          nicht nach vorstehendem Satz unbeschränkt gehaftet wird. Wesentliche Vertragspflichten sind
          solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst
          ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf.
        </p>

        <h2>8. Foto- und Videoaufnahmen</h2>
        <p>
          Während des Workshops können Foto- und Videoaufnahmen zu Dokumentations- und
          Öffentlichkeitsarbeitszwecken angefertigt werden. Mit der Anmeldung erklären Sie sich damit
          einverstanden, dass solche Aufnahmen, auf denen Sie abgebildet sind, für die
          Öffentlichkeitsarbeit von „Die kleine Einheit“ genutzt werden dürfen (z. B. auf der Website,
          in sozialen Medien). Diese Einwilligung ist freiwillig und kann jederzeit schriftlich
          widerrufen werden. Eine Teilnahme am Workshop ist nicht von dieser Einwilligung abhängig.
          Detaillierte Informationen hierzu finden Sie in der Datenschutzerklärung.
        </p>

        <h2>9. Datenschutz</h2>
        <p>
          Die Verarbeitung Ihrer personenbezogenen Daten erfolgt gemäß unserer{" "}
          <Link to={ROUTES.datenschutz}>Datenschutzerklärung</Link>, die Sie jederzeit einsehen
          können.
        </p>

        <h2>10. Anwendbares Recht</h2>
        <p>Für alle Rechtsbeziehungen gilt deutsches Recht.</p>
      </div>
    </SubpageShell>
  );
}
