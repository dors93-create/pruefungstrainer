# Prüfungstrainer – Kenntnisse für Beratung und Vertrieb

Lern-App für die Prüfungsvorbereitung. Läuft komplett im Browser und kann kostenlos über **GitHub Pages** veröffentlicht werden.

## Funktionen

- **Profile:** Jede Person legt beim ersten Öffnen ein Profil an und hat ihren eigenen Lernstand. Mehrere Profile pro Browser sind möglich.
- **Prüfungssimulation** mit 15, 30 oder 50 zufälligen Fragen. Bestanden bei **mehr als 50 %**. Die Auswertung kommt erst am Ende.
- **Zuletzt falsch:** alle Fragen, die beim letzten Versuch falsch beantwortet wurden.
- **Schwächste Fragen:** sortiert nach Fehlerquote (falsch ÷ gesamt beantwortet).
- **Fehleransicht** nach jeder Runde und im **Verlauf**: eigene Antwort, richtige Antwort, ggf. Erklärung. Fehler lassen sich direkt wiederholen.
- **Dashboard:** Lernstand, bearbeitete Fragen, bestandene Prüfungen, Ergebnisverlauf, schwächste Fragen, Lernstand je Thema.
- **Fragen-Bereich:** Fragen anlegen, bearbeiten, löschen und als `fragen.js` exportieren.

Gewertet wird nach dem Prinzip „alles oder nichts“: Eine Frage zählt nur als richtig, wenn genau die richtigen Antworten angekreuzt sind.

## Wo liegen die Daten?

Profile und Lernstand werden **nur im Browser des jeweiligen Geräts** gespeichert (localStorage). Es gibt keinen Server.

- Jede Person nutzt die App auf ihrem eigenen Gerät. Dadurch können beliebig viele gleichzeitig lernen.
- Gerät wechseln: im Profil **„Fortschritt sichern“** (lädt eine `.json` herunter) und auf dem neuen Gerät **„Fortschritt laden“**.
- Browserdaten löschen oder ein privates Fenster löscht den Lernstand.

## Veröffentlichen auf GitHub Pages (einmalig)

1. Auf [github.com](https://github.com) einloggen → oben rechts **+** → **New repository**.
2. Name z. B. `pruefungstrainer`, Sichtbarkeit **Public** (GitHub Pages ist im kostenlosen Tarif nur bei öffentlichen Repos möglich) → **Create repository**.
3. Im neuen Repo auf **„uploading an existing file“** klicken und diese Dateien hineinziehen:
   `index.html`, `style.css`, `app.js`, `fragen.js`, `README.md` → **Commit changes**.
4. **Settings** → links **Pages** → unter *Build and deployment*: Source **Deploy from a branch**, Branch **main**, Ordner **/ (root)** → **Save**.
5. Nach 1–2 Minuten steht oben auf der Pages-Seite der Link, z. B.
   `https://<dein-github-name>.github.io/pruefungstrainer/` – diesen Link an die Gruppe schicken.

## Neue Fragen einpflegen

**Variante A – in der App (empfohlen):**
1. In der App auf **Fragen** → **Neue Frage**, ausfüllen, richtige Antworten ankreuzen, speichern.
   Die Frage gilt jetzt erst einmal nur im eigenen Browser.
2. **„fragen.js exportieren“** klicken. Die Datei wird heruntergeladen.
3. Im GitHub-Repo **Add file → Upload files** → die neue `fragen.js` hochladen (ersetzt die alte) → **Commit changes**.
4. Nach 1–2 Minuten haben alle die neuen Fragen. Danach in der App **„Lokale Änderungen verwerfen“** klicken, damit nichts doppelt gepflegt wird.

**Variante B – direkt auf GitHub:** `fragen.js` im Repo öffnen → Stift-Symbol → einen Eintrag nach diesem Muster ergänzen → **Commit changes**.

```js
{
  "id": "s200",                 // eindeutig, z. B. "s" + Seitenzahl
  "thema": "Kosten",
  "seite": 200,
  "kontext": "Ausgangslage (optional)",
  "frage": "Welche Aussagen treffen zu?",
  "mehrfach": true,             // true = mehrere Antworten möglich (1., 2., 3.), false = genau eine (a, b, c)
  "optionen": ["Antwort 1", "Antwort 2", "Antwort 3"],
  "richtig": [0, 2],            // Positionen der richtigen Antworten, ab 0 gezählt
  "erklaerung": "optional"
},
```

Wichtig: Die `id` einer bestehenden Frage nicht ändern, sonst geht der Lernstand zu dieser Frage verloren.

## Lokal ausprobieren

`index.html` per Doppelklick im Browser öffnen. Es wird kein Server benötigt.
