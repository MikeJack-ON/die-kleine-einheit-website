import html as htmllib

CONTACT_EMAIL = "info@die-kleine-einheit.de"
CONTACT_PHONE = "+49 179 2589296"

EMAIL_SUBJECT = "Deine Anmeldung ist bestätigt – Körperintelligenz, 4. Juli"


def render_confirmation_email(name: str) -> tuple[str, str, str]:
    safe_name = htmllib.escape(name)
    text = f"""Hallo {name},

wir freuen uns sehr über deine Anmeldung zum Live-Workshop „Körperintelligenz"! Deine Buchung ist nun abgeschlossen.

**Deine Anmeldedaten:**

*   **Workshop:** Körperintelligenz
*   **Datum:** Samstag, 4. Juli 2026
*   **Uhrzeit:** 10:00 – 14:00 Uhr
*   **Ort:** Naturplatz Draußen Zuhause, Schledehausen

Deine Zahlung wurde erfolgreich über Stripe verarbeitet. Den separaten Zahlungsbeleg findest du in der E-Mail von Stripe.

**Was du mitbringen solltest:**

*   Kleidung, in der du dich frei bewegen kannst. Barfuß ist willkommen!
*   Kleidung, die dem Wetter angepasst ist.
*   Eine offene Haltung und Neugier.

Für dein leibliches Wohl ist gesorgt: Wasser, Tee und kleine Snacks sind vor Ort verfügbar.

**Bitte sei ca. 5-10 Minuten vor Beginn vor Ort, damit wir pünktlich starten können.**

Falls du Fragen hast oder uns etwas mitteilen möchtest, antworte einfach auf diese E-Mail oder kontaktiere uns:
E-Mail: {CONTACT_EMAIL}
Telefon: {CONTACT_PHONE}

Wir freuen uns darauf, dich am 4. Juli in Schledehausen zu sehen!

Herzliche Grüße,

Michael Kletschke
Die kleine Einheit

---
Dieses ist eine automatische Benachrichtigung. Bitte prüfe ggf. deinen Spam-Ordner, falls die E-Mail nicht eintrifft."""

    html = f"""<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background:#ecf2f2;font-family:Helvetica,Arial,sans-serif;color:#16292a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecf2f2;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:560px;">
          <tr><td style="background:#173a3c;padding:24px 28px;color:#eef4f4;font-weight:bold;letter-spacing:.18em;font-size:14px;">DIE KLEINE EINHEIT</td></tr>
          <tr><td style="padding:28px;">
            <p style="font-size:16px;line-height:1.5;margin:0 0 16px;">Hallo {safe_name},</p>
            <p style="font-size:16px;line-height:1.5;margin:0 0 16px;">wir freuen uns sehr über deine Anmeldung zum Live-Workshop „Körperintelligenz"! Deine Buchung ist nun abgeschlossen.</p>
            <p style="font-size:15px;font-weight:bold;margin:0 0 8px;">Deine Anmeldedaten:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.6;margin:0 0 16px;">
              <tr><td><strong>Workshop:</strong> Körperintelligenz</td></tr>
              <tr><td><strong>Datum:</strong> Samstag, 4. Juli 2026</td></tr>
              <tr><td><strong>Uhrzeit:</strong> 10:00 – 14:00 Uhr</td></tr>
              <tr><td><strong>Ort:</strong> Naturplatz Draußen Zuhause, Schledehausen</td></tr>
            </table>
            <p style="font-size:15px;line-height:1.5;margin:0 0 16px;">Deine Zahlung wurde erfolgreich über Stripe verarbeitet. Den separaten Zahlungsbeleg findest du in der E-Mail von Stripe.</p>
            <p style="font-size:15px;font-weight:bold;margin:0 0 8px;">Was du mitbringen solltest:</p>
            <ul style="font-size:15px;line-height:1.6;margin:0 0 16px;padding-left:20px;">
              <li>Kleidung, in der du dich frei bewegen kannst. Barfuß ist willkommen!</li>
              <li>Kleidung, die dem Wetter angepasst ist.</li>
              <li>Eine offene Haltung und Neugier.</li>
            </ul>
            <p style="font-size:15px;line-height:1.5;margin:0 0 16px;">Für dein leibliches Wohl ist gesorgt: Wasser, Tee und kleine Snacks sind vor Ort verfügbar.</p>
            <p style="font-size:15px;line-height:1.5;margin:0 0 16px;"><strong>Bitte sei ca. 5-10 Minuten vor Beginn vor Ort, damit wir pünktlich starten können.</strong></p>
            <p style="font-size:15px;line-height:1.5;margin:0 0 4px;">Falls du Fragen hast oder uns etwas mitteilen möchtest, antworte einfach auf diese E-Mail oder kontaktiere uns:</p>
            <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">E-Mail: {CONTACT_EMAIL}<br/>Telefon: {CONTACT_PHONE}</p>
            <p style="font-size:15px;line-height:1.5;margin:0 0 16px;">Wir freuen uns darauf, dich am 4. Juli in Schledehausen zu sehen!</p>
            <p style="font-size:15px;line-height:1.5;margin:0 0 4px;">Herzliche Grüße,</p>
            <p style="font-size:15px;line-height:1.5;margin:0;">Michael Kletschke<br/>Die kleine Einheit</p>
          </td></tr>
          <tr><td style="padding:18px 28px;border-top:1px solid #e3eaea;color:#5b7070;font-size:12px;line-height:1.5;">Dieses ist eine automatische Benachrichtigung. Bitte prüfe ggf. deinen Spam-Ordner, falls die E-Mail nicht eintrifft.</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

    return EMAIL_SUBJECT, text, html


def render_whatsapp_message(name: str) -> str:
    return (
        f"Hallo {name}, das ist deine Bestätigung für den Körperintelligenz Workshop "
        f"am 4. Juli 2026 in Schledehausen! Alle Details findest du in deiner E-Mail. "
        f"Bei Fragen: {CONTACT_PHONE}"
    )
