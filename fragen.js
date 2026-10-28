// Fragenkatalog des Prüfungstrainers.
// Neue Fragen am einfachsten im Bereich "Fragen" der App anlegen und danach "fragen.js exportieren".
// Felder: id (eindeutig), thema, seite, kontext (optional), frage, mehrfach (true = mehrere Antworten möglich),
//         optionen (Antworttexte), richtig (Positionen der richtigen Antworten, ab 0 gezählt), erklaerung (optional)
window.FRAGEN = [
  {
    "id": "g9",
    "thema": "Finanzinstrumente & Risiken",
    "seite": 9,
    "kontext": "Das Kreditwesengesetz enthält eine Begriffsbestimmung zu Finanzinstrumenten.",
    "frage": "Welche Anlageformen fallen unter diesen Oberbegriff?",
    "mehrfach": true,
    "optionen": [
      "Aktien",
      "Spareinlagen",
      "Anleihen",
      "Zertifikate",
      "Immobilien",
      "Bargeld"
    ],
    "richtig": [
      0,
      2,
      3
    ]
  },
  {
    "id": "g23",
    "thema": "Finanzinstrumente & Risiken",
    "seite": 23,
    "kontext": "Sie erläutern Ihrer Kundin die Basisrisiken der Wertpapieranlage, insbesondere das Liquiditätsrisiko.",
    "frage": "Welche Aussage zu diesem Basisrisiko ist richtig?",
    "mehrfach": false,
    "optionen": [
      "Das Risiko, Vermögenswerte nicht mehr jederzeit zu marktgerechten Preisen verkaufen zu können",
      "Es handelt sich um das Risiko, dass der Emittent seine Zins- und Tilgungsverpflichtungen nicht mehr erfüllen kann",
      "Ein Liquiditätsrisiko besteht bei Fremdwährungsanleihen, wenn der zu Grunde liegende Devisenkurs sinkt",
      "Ein Liquiditätsrisiko besteht, wenn der Anleger arbeitslos wird",
      "Ein Liquiditätsrisiko besteht bei kreditfinanzierten Wertpapieranlagen"
    ],
    "richtig": [
      0
    ]
  },
  {
    "id": "g29",
    "thema": "Finanzinstrumente & Risiken",
    "seite": 29,
    "kontext": "Zertifikate weisen spezielle Risiken auf, wie beispielsweise das Korrelationsrisiko.",
    "frage": "Welches Risiko steckt dahinter?",
    "mehrfach": false,
    "optionen": [
      "Totalverlustrisiko bei Insolvenz des Zertifikate-Emittenten",
      "Risiko einer vorzeitigen Kündigung des Zertifikates",
      "Risiko steigender Marktzinsen",
      "Risiko staatlicher Eingriffe in den Zertifikate-Markt",
      "Abhängigkeit von der Wertentwicklung des Basiswertes"
    ],
    "richtig": [
      4
    ]
  },
  {
    "id": "g32",
    "thema": "Wirtschaft & Geldanlage",
    "seite": 32,
    "kontext": "Eine Geldanlageform erfüllt in der Regel nicht alle Merkmale des Vermögensanlagedreiecks. Der Kunde muss deshalb individuell Prioritäten setzen. Sie erläutern Ihrem Kunden die Spannungsfelder des Vermögensanlagedreiecks anhand typischer Bankeinlagen.",
    "frage": "Welche Aussagen treffen zu?",
    "mehrfach": false,
    "optionen": [
      "Das Sparbuch zeichnet sich durch hohe Rendite und Sicherheit aus.",
      "Sparbriefe weisen eine hohe Liquidität, aber niedrige Rendite auf.",
      "Tagesgelder bieten hohe Sicherheit und hohe Liquidität.",
      "Ein Festgeld bietet hohe Renditen bei geringer Liquidität."
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "g35",
    "thema": "Wirtschaft & Geldanlage",
    "seite": 35,
    "kontext": "Das „magische Viereck“ steht für die durch das sogenannte Stabilitätsgesetz vorgegebenen wirtschaftspolitischen Ziele.",
    "frage": "Welche Ziele gehören dazu?",
    "mehrfach": true,
    "optionen": [
      "Preisstabilität",
      "gerechte Finanzpolitik",
      "stetiges und angemessenes Wirtschaftswachstum",
      "hoher Arbeitslosengrad",
      "außenwirtschaftliches Gleichgewicht",
      "funktionierende Zahlungsmärkte"
    ],
    "richtig": [
      0,
      2,
      4
    ]
  },
  {
    "id": "g45",
    "thema": "Wirtschaft & Geldanlage",
    "seite": 45,
    "kontext": "Eine hohe Inflationsrate im Euroraum kann Auslöser für eine restriktivere Geldpolitik der Europäischen Zentralbank (EZB) sein.",
    "frage": "Welche Maßnahmen kann die EZB in dieser Situation ergreifen?",
    "mehrfach": false,
    "optionen": [
      "Senkung des Leitzinses",
      "Ausweitung ihres Anleihekaufprogramms",
      "Erhöhung des Mindestreservesatzes",
      "Verstärkte Kreditvergabebereitschaft",
      "Erhöhung der Geldmenge"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "g54",
    "thema": "Gewerberecht & FinVermV",
    "seite": 54,
    "kontext": "Eine Anlageberatung, für die die Bereichsausnahme des Kreditwesengesetzes (KWG) in Anspruch genommen werden soll, muss bestimmte Bedingungen erfüllen.",
    "frage": "Welche Bedingungen gelten hierfür?",
    "mehrfach": true,
    "optionen": [
      "Vermittlung ausschließlich von offenen Investmentvermögen",
      "Vermittlung von Investmentvermögen (KAGB) oder Vermögensanlagen (VermAnlG)",
      "Vermittlung von Aktien und Anleihen (KWG)",
      "Verkauf von von der BaFin zum Vertrieb genehmigten Produkten",
      "Ausschließliche Betreibung von Anlageberatung und Anlagevermittlung"
    ],
    "richtig": [
      1,
      4
    ]
  },
  {
    "id": "g57",
    "thema": "Gewerberecht & FinVermV",
    "seite": 57,
    "kontext": "Ein Finanzanlagenvermittler/-berater muss nach § 34f GewO bestimmte Voraussetzungen erfüllen, um eine Erlaubnis zu erhalten.",
    "frage": "Welche gehören dazu?",
    "mehrfach": false,
    "optionen": [
      "Beratungs- und Vermittlungspflicht",
      "Geeignetheits- und Angemessenheitsprüfung",
      "Zuverlässigkeit, geordnete Vermögensverhältnisse, Berufshaftpflichtversicherung, Sachkundenachweis",
      "Erreichbarkeit, geordnete Finanzen, Berufsunfähigkeitsversicherung, Fachkundenachweis",
      "Informations- und Dokumentationspflicht"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "g63",
    "thema": "Gewerberecht & FinVermV",
    "seite": 63,
    "kontext": "Der Finanzanlagenberater/-vermittler hat nach Finanzanlagenvermittlungsverordnung (FinVermV) statusbezogene Informationspflichten.",
    "frage": "Welche Pflichten gehören dazu?",
    "mehrfach": true,
    "optionen": [
      "Mündliche Mitteilung der Angaben unverzüglich nach Geschäftsabschluss",
      "Angaben zu Name und Anschrift aller für ihn tätigen Mitarbeiter",
      "Mitteilung aller erforderlichen Angaben in Textform",
      "Angaben zu Familienname, Vorname, betriebliche Anschrift, Telefonnummer und E-Mail-Adresse",
      "Angabe der Anschrift, Telefonnummer und E-Mail-Adresse der zuständigen Registrierungsbehörde",
      "Angabe der Registrierungsnummer, unter der er im Register eingetragen ist"
    ],
    "richtig": [
      2,
      3,
      5
    ]
  },
  {
    "id": "g67",
    "thema": "Gewerberecht & FinVermV",
    "seite": 67,
    "kontext": "Im Rahmen der Anlageberatung sind Sie auch zur Einholung von Informationen über Ihren Kunden verpflichtet.",
    "frage": "Welche Information gehört dazu?",
    "mehrfach": false,
    "optionen": [
      "Zielmarktpräferenzen",
      "Verlustpräferenzen",
      "Fondsartpräferenzen",
      "Nachhaltigkeitspräferenzen",
      "ESG-Toleranz"
    ],
    "richtig": [
      3
    ]
  },
  {
    "id": "g69",
    "thema": "Gewerberecht & FinVermV",
    "seite": 69,
    "kontext": "Die Finanzanlagenvermittlungsverordnung schreibt eine Geeignetheitsprüfung bei der Finanzanlagenberatung vor.",
    "frage": "Welche Aussagen sind richtig?",
    "mehrfach": true,
    "optionen": [
      "Das empfohlene offene Investmentvermögen muss den Anlagechancen des Anlegers entsprechen",
      "Die Anlagerisiken müssen für den Anleger entsprechend seiner Anlageziele finanziell tragbar sein",
      "Die empfohlene Finanzanlage muss den Anlagezielen des Anlegers entsprechen",
      "Die Liquiditätsrisiken der Anlage müssen den Liquiditätsmöglichkeiten des Anlegers entsprechen",
      "Der Anleger muss die Anlagerisiken mit seinen Kenntnissen und Erfahrungen verstehen können",
      "Der Anleger erhält eine umfassende Beschreibung der Anlagerisiken, um die Geeignetheit feststellen zu können"
    ],
    "richtig": [
      1,
      2,
      4
    ]
  },
  {
    "id": "g72",
    "thema": "Gewerberecht & FinVermV",
    "seite": 72,
    "kontext": "Die Finanzanlagenvermittlungsverordnung verpflichtet den Gewerbetreibenden, dem Kunden rechtzeitig vor Vertragsabschluss Informationen über die empfohlene Finanzanlage zur Verfügung zu stellen.",
    "frage": "In welcher Kurzversion ist dies zulässig?",
    "mehrfach": false,
    "optionen": [
      "Geeignetheitserklärung",
      "Basisinformationsblatt",
      "Verkaufsprospekt",
      "Halbjahresbericht",
      "Depoteröffnungsantrag"
    ],
    "richtig": [
      1
    ]
  },
  {
    "id": "g79",
    "thema": "Gewerberecht & FinVermV",
    "seite": 79,
    "kontext": "Die Finanzanlagenvermittlungsverordnung (FinVermV) schreibt eine allgemeine Verhaltenspflicht für die Anlageberatung bzw. die Anlagevermittlung vor.",
    "frage": "Welche Aussage hierzu ist zutreffend?",
    "mehrfach": false,
    "optionen": [
      "Durchführung der Tätigkeit unter Beachtung der Anzeige-, Aufzeichnungs- und Prüfungspflichten",
      "Durchführung der Tätigkeit mit der erforderlichen Sachkenntnis, Sorgfalt und Gewissenhaftigkeit im Interesse des Anlegers",
      "Der Finanzanlagenvermittler/-berater hat dem Anleger jederzeit alle Aufklärungen und Nachweise über seine Geschäftstätigkeiten im Interesse der Geeignetheit zu geben",
      "Durchführung der Tätigkeit mit Sachkunde und unter Berücksichtigung der BVI-Wohlverhaltensregeln und des Datenschutzes",
      "Durchführung der Tätigkeit unter Beachtung der Angemessenheit und erforderlichen Risikoaufklärung für einen geeigneten Anlageerfolg"
    ],
    "richtig": [
      1
    ]
  },
  {
    "id": "g82",
    "thema": "Recht & Verbraucherschutz",
    "seite": 82,
    "kontext": "Zu den Arten der Geschäftsfähigkeit natürlicher Personen gehört auch die Geschäftsunfähigkeit.",
    "frage": "In welchen Fällen liegt diese vor?",
    "mehrfach": true,
    "optionen": [
      "unvollendetes 7. Lebensjahr",
      "bei einer vorübergehenden Geistestätigkeit",
      "bei einer andauernden krankhaften Störung der Geistestätigkeit",
      "nach Vollendung des 7. Lebensjahres",
      "bei betreuten Volljährigen",
      "unvollendetes 18. Lebensjahr"
    ],
    "richtig": [
      0,
      2
    ]
  },
  {
    "id": "g92",
    "thema": "Recht & Verbraucherschutz",
    "seite": 92,
    "kontext": "Berater und Vermittler von Finanzanlageprodukten müssen die allgemeinen Sorgfaltspflichten des Geldwäschegesetzes (GWG) beachten.",
    "frage": "Welche gehören dazu?",
    "mehrfach": true,
    "optionen": [
      "Identifizierung des Vertragspartners bei Begründung der Geschäftsbeziehung",
      "Einholung von Informationen über Zweck und angestrebte Art der Geschäftsbeziehung",
      "Ergänzende Legitimationsprüfung des wirtschaftlich Berechtigten gemäß Abgabenordnung",
      "Zustimmung des wirtschaftlich Berechtigten bei Kündigung der Geschäftsbeziehung",
      "Empfehlung von gemäß dem GWG angemessenen Finanzinstrumenten",
      "Feststellung der Identität des wirtschaftlich Berechtigten"
    ],
    "richtig": [
      0,
      1,
      5
    ]
  },
  {
    "id": "g96",
    "thema": "Recht & Verbraucherschutz",
    "seite": 96,
    "kontext": "Ihr Kunde möchte bei seiner Hausbank einen größeren Betrag als Festgeld anlegen und erkundigt sich vorab über die aktuelle Einlagensicherung bei Banken. Die Hausbank Ihres Kunden ist Mitglied im Bundesverband deutscher Banken.",
    "frage": "Welche Antworten sind richtig?",
    "mehrfach": true,
    "optionen": [
      "Es greift die Zusicherung der deutschen Bundesregierung, dass alle Einlagen in Deutschland sicher sind.",
      "Es greift die gesetzliche Gewährträgerhaftung.",
      "Bis zu einem Anlagebetrag von 100.000 EUR greift die gesetzliche Einlagensicherung.",
      "Bei Anlagebeträgen über 100.000 EUR greift die freiwillige Einlagensicherung deutscher Banken, jedoch ohne gesetzlichen Anspruch hierauf.",
      "Unabhängig von der Höhe des Anlagebetrages greift die Institutssicherung deutscher Privatbanken."
    ],
    "richtig": [
      2,
      3
    ]
  },
  {
    "id": "g99",
    "thema": "Recht & Verbraucherschutz",
    "seite": 99,
    "kontext": "Ihr Auszubildender möchte neue Kunden akquirieren, indem er sich Adressen aus dem Telefonbuch heraussucht, die in der Nähe Ihrer Geschäftsräume liegen.",
    "frage": "Kann er diese für einen telefonischen Erstkontakt nutzen?",
    "mehrfach": false,
    "optionen": [
      "Ja, wenn er sich zu Beginn des Telefonates versichert, dass er mit der Person, die im Telefonbuch steht, auch tatsächlich verbunden ist",
      "Ja, wenn er Ihren Namen, Adresse, Telefonnummer und Registernummer angibt",
      "Nein, da die telefonische Ansprache von Kunden auf Finanzanlageprodukte generell verboten ist",
      "Ja, wenn seine Nummer auf dem Telefondisplay des Kunden nicht unterdrückt wird",
      "Nein, da die ausdrückliche Zustimmung des Kunden hierzu fehlt"
    ],
    "richtig": [
      4
    ]
  },
  {
    "id": "g104",
    "thema": "Recht & Verbraucherschutz",
    "seite": 104,
    "kontext": "Die Verarbeitung und Nutzung personenbezogener Daten ist grundsätzlich untersagt.",
    "frage": "Welche Ausnahmen gelten?",
    "mehrfach": true,
    "optionen": [
      "Erlaubnis und Anordnung durch die BaFin",
      "Einwilligung des Betroffenen",
      "Erlaubnis und Anordnung durch das Bundesdatenschutzgesetz",
      "Einwilligung des Produktgebers",
      "Erlaubnis und Anordnung durch den Datenschutzbeauftragten",
      "Einwilligung durch den Compliance-Beauftragten"
    ],
    "richtig": [
      1,
      2
    ]
  },
  {
    "id": "g107",
    "thema": "Recht & Verbraucherschutz",
    "seite": 107,
    "kontext": "Bezüglich der Aufsicht bestimmter Marktteilnehmer spricht man vom sogenannten indirekten Verbraucherschutz.",
    "frage": "Welche Grundlagen hierzu sind richtig?",
    "mehrfach": true,
    "optionen": [
      "Das Bundesamt für Finanzanlagen (BaFin) überwacht die Einhaltung der Finanzanlagenvermittlungsverordnung",
      "Die Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) überwacht Kapitalanlagegesellschaften und Depotbanken",
      "Die Gewerbeaufsicht überwacht die dem KWG zugeordneten Finanzanlagevermittler",
      "Die Gewerbeaufsicht überwacht und erteilt Genehmigungen für die § 34f GewO zugeordneten Finanzanlagenvermittler",
      "Das Bundesministerium für Verbraucherschutz überwacht die Anbieter von Finanzanlagen"
    ],
    "richtig": [
      1,
      3
    ]
  },
  {
    "id": "s6",
    "thema": "Grundlagen Investmentvermögen",
    "seite": 6,
    "kontext": "Der DAX ist der wichtigste Index für den deutschen Aktienmarkt.",
    "frage": "Welche Werte sind hier enthalten?",
    "mehrfach": false,
    "optionen": [
      "90 größte deutsche Unternehmen",
      "30 größte Unternehmen nach Aktienkurs",
      "40 größte Unternehmen hinsichtlich Streubesitz-Marktkapitalisierung",
      "50 bedeutendste Unternehmen hinsichtlich Unternehmensgewinn"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "s10",
    "thema": "Grundlagen Investmentvermögen",
    "seite": 10,
    "kontext": "Offene Investmentvermögen werden als Sondervermögen aufgelegt.",
    "frage": "Was bedeutet dies für den Anleger?",
    "mehrfach": false,
    "optionen": [
      "zusätzliche Kosten",
      "Schutz im Fall der Insolvenz der Kapitalverwaltungsgesellschaft",
      "Risikostreuung auf mehrere Anleger",
      "Verlustgarantie durch die Verwahrstelle",
      "keine Depotführungsgebühren"
    ],
    "richtig": [
      1
    ]
  },
  {
    "id": "s12",
    "thema": "Grundlagen Investmentvermögen",
    "seite": 12,
    "kontext": "Offene Investmentvermögen weisen eine besondere gesetzlich geregelte Struktur auf.",
    "frage": "Was sind die typischen Merkmale?",
    "mehrfach": true,
    "optionen": [
      "breite Risikostreuung",
      "professionelles Fondsmanagement",
      "individuell wählbare Laufzeit",
      "Anlegerschutz durch die Bonität der Kapitalverwaltungsgesellschaft",
      "Flexible Anlagestrategie"
    ],
    "richtig": [
      0,
      1
    ]
  },
  {
    "id": "s14",
    "thema": "Grundlagen Investmentvermögen",
    "seite": 14,
    "kontext": "Offene Investmentvermögen weisen einige spezielle Chancen gegenüber anderen Anlageformen auf.",
    "frage": "Welche gehören dazu?",
    "mehrfach": false,
    "optionen": [
      "professionelles Fondsmanagement, Cost-Average-Effekt, Diversifikation",
      "Volatilität, Flexibilität, Recht auf Anteilsrückgabe",
      "Insolvenzschutz, Anlegerschutz, Verlustbegrenzung",
      "Kostenvorteil gegenüber Direktanlagen, Vielfalt, Zinsgarantie"
    ],
    "richtig": [
      0
    ]
  },
  {
    "id": "s17",
    "thema": "Grundlagen Investmentvermögen",
    "seite": 17,
    "kontext": "Offene Investmentvermögen weisen einige spezielle Chancen gegenüber anderen Anlageformen auf. Dazu gehört auch der Cost-Average-Effekt.",
    "frage": "Wann kann sich dieser Effekt positiv auswirken?",
    "mehrfach": false,
    "optionen": [
      "bei der Einmalanlage zum richtigen Timing",
      "bei regelmäßiger Anlage gleichbleibender Beträge in ein offenes Investmentvermögen",
      "bei der Entnahme von Investmentanteilen aus einem Fondsdepot bei sinkenden Anteilspreisen",
      "bei der Einmalanlage in offene Investmentvermögen mit geringer Volatilität"
    ],
    "richtig": [
      1
    ]
  },
  {
    "id": "s28",
    "thema": "Nachhaltigkeit",
    "seite": 28,
    "kontext": "Ihr Kunde möchte mit seiner Investition in einen offenen Rentenfonds einen positiven Nachhaltigkeitsbeitrag im Sinne der EU-Offenlegungsverordnung leisten. Dabei sind ihm allgemein ökologische und soziale Aspekte wichtig.",
    "frage": "Welche Fondskategorie kommt für ihn in Frage?",
    "mehrfach": false,
    "optionen": [
      "Artikel 3 Rentenfonds",
      "Artikel 4 Rentenfonds",
      "Artikel 5 Rentenfonds",
      "Artikel 6 Rentenfonds",
      "Artikel 8 Rentenfonds",
      "Artikel 9 Rentenfonds"
    ],
    "richtig": [
      4
    ]
  },
  {
    "id": "s30",
    "thema": "Nachhaltigkeit",
    "seite": 30,
    "kontext": "Offene Investmentvermögen bieten auch die Möglichkeit zur nachhaltigen Investition.",
    "frage": "Welche Kriterien gelten für diese Form der Investition?",
    "mehrfach": false,
    "optionen": [
      "DSG-Kriterien",
      "SRRI-Kriterien",
      "ESG-Kriterien",
      "EU-Offenlegungskriterien",
      "Green-Deal-Kriterien"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "s35",
    "thema": "KVG & Verwahrstelle",
    "seite": 35,
    "frage": "Welche Aufgabe nimmt die Kapitalverwaltungsgesellschaft (KVG) wahr?",
    "mehrfach": false,
    "optionen": [
      "Verwahrung der Investmentanteile",
      "Festlegung der Anlageziele des Anlegers",
      "Verwaltung des Sondervermögens im Namen der Anleger",
      "Aufsicht der Verwahrstelle",
      "Ausgabe und Rücknahme der Investmentanteile"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "s37",
    "thema": "KVG & Verwahrstelle",
    "seite": 37,
    "frage": "Welche Aufgaben nimmt die Verwahrstelle wahr?",
    "mehrfach": true,
    "optionen": [
      "Verwahrung der Investmentanteile",
      "Depotkontoführung für die Anlegeranteile",
      "Verwaltung des Sondervermögens im Namen der Anleger",
      "Aufsicht der Kapitalverwaltungsgesellschaft",
      "Ausgabe und Rücknahme der Investmentanteile",
      "Mitwirkung bei der Anteilspreisberechnung"
    ],
    "richtig": [
      0,
      4,
      5
    ]
  },
  {
    "id": "s39",
    "thema": "Kosten",
    "seite": 39,
    "kontext": "Sie informieren Ihre Kundin über die Kostenstruktur eines offenen Investmentvermögens.",
    "frage": "Welche Aussage trifft zu?",
    "mehrfach": false,
    "optionen": [
      "Der Ausgabeaufschlag ist einmalig vom Anleger an die Verwahrstelle zu zahlen",
      "Die Depotführungsgebühr wird dem Anleger jährlich von der Verwahrstelle in Rechnung gestellt",
      "Transaktionskosten fallen bei jedem Anteilskauf bzw. Anteilsverkauf an",
      "Die Kapitalverwaltungsgesellschaft erhält die Verwaltungsvergütung",
      "Die Verwahrstelle erhält eine Performance-Fee bei zusätzlicher Wertentwicklung des Sondervermögens"
    ],
    "richtig": [
      3
    ]
  },
  {
    "id": "s52",
    "thema": "Basisinformationsblatt",
    "seite": 52,
    "kontext": "Das Basisinformationsblatt enthält unter anderem eine Angabe zum Summary Risk Indicator (SRI) des beschriebenen Investmentvermögens.\nEinstufungsskala: 1 (geringes Risiko) – 7 (hohes Risiko)",
    "frage": "Was berücksichtigt dieser Indikator?",
    "mehrfach": true,
    "optionen": [
      "Kostenrisiko in Form der TER",
      "Inflationsrisiko in Form der Inflationsrate",
      "Marktrisiko in Form der Volatilität",
      "Kursschwankungsrisiko in Form der Duration",
      "Kreditrisiko in Form der Emittentenbonität",
      "Ertragsrisiko in Form der Nachsteuerrendite"
    ],
    "richtig": [
      2,
      4
    ]
  },
  {
    "id": "s54",
    "thema": "Basisinformationsblatt",
    "seite": 54,
    "kontext": "Das KAGB definiert die Mindestanforderungen an das Basisinformationsblatt (BIB).",
    "frage": "Welche Informationen sind gesetzlich vorgeschrieben?",
    "mehrfach": true,
    "optionen": [
      "Performance-Szenarien",
      "Zielmarkt",
      "empfohlene Anlagedauer",
      "Nachhaltigkeits-Szenarien",
      "empfohlener Mindestanlagebetrag",
      "Depotführungsgebühren"
    ],
    "richtig": [
      0,
      1,
      2
    ]
  },
  {
    "id": "s56",
    "thema": "Basisinformationsblatt",
    "seite": 56,
    "kontext": "Das Basisinformationsblatt enthält die wesentlichen Informationen rund um das einzelne Investmentvermögen.",
    "frage": "Welche Informationen sind gesetzlich vorgeschrieben?",
    "mehrfach": true,
    "optionen": [
      "Aktuelle Aufstellung der Vermögenswerte im Sondervermögen",
      "Anlagebedingungen",
      "empfohlene Anlagedauer",
      "Interessenkonflikte",
      "Kosten-Szenarien",
      "Performance-Szenarien"
    ],
    "richtig": [
      2,
      5
    ]
  },
  {
    "id": "s60",
    "thema": "Fondspreise & Anteilklassen",
    "seite": 60,
    "kontext": "Ein offenes Investmentvermögen kann mit unterschiedlichen Anteilklassen angeboten werden.",
    "frage": "Wie können sich diese unterscheiden?",
    "mehrfach": true,
    "optionen": [
      "Anlagepolitik",
      "Verwahrstelle",
      "gesetzliche Grundlage",
      "Gebührenstruktur",
      "Verwendung der Erträge",
      "steuerliche Behandlung"
    ],
    "richtig": [
      3,
      4
    ]
  },
  {
    "id": "s63",
    "thema": "Fondspreise & Anteilklassen",
    "seite": 63,
    "kontext": "Ein Aktienfonds weist folgende Daten auf:\nAktienvermögen: 100.000.000 EUR\nLiquiditätsreserve: 5.000.000 EUR\nVerbindlichkeiten: 10.000.000 EUR\nAnzahl der ausgegebenen Anteile: 10.000.000 Stück\nAusgabeaufschlag: 5 %",
    "frage": "Berechnen Sie den Rücknahmepreis je Anteil (ggf. kaufmännisch gerundet).",
    "mehrfach": false,
    "optionen": [
      "9,50 EUR",
      "9,98 EUR",
      "10,50 EUR",
      "11,03 EUR",
      "11,50 EUR",
      "11,60 EUR"
    ],
    "richtig": [
      0
    ],
    "erklaerung": "(100.000.000 + 5.000.000 − 10.000.000) EUR / 10.000.000 Anteile = 9,50 EUR. Der Ausgabeaufschlag fällt nur beim Kauf an, nicht bei der Rücknahme."
  },
  {
    "id": "s81",
    "thema": "OGAW-Regeln",
    "seite": 81,
    "kontext": "Für offene OGAW-Investmentvermögen sieht das Kapitalanlagegesetzbuch besonders strenge Regelungen vor.",
    "frage": "Welche Regelungen gelten?",
    "mehrfach": false,
    "optionen": [
      "Ein OGAW darf nicht in Wertpapiere investieren",
      "Ein OGAW kann nur von semiprofessionellen Anlegern erworben werden",
      "Ein OGAW darf in Geldmarktinstrumente, Anleihen und Aktien investieren",
      "Ein OGAW darf bis max. 20 % des Wertes des Sondervermögens Kredite aufnehmen",
      "Ein OGAW muss mindestens 5 % in jeden Emittenten investieren"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "s83",
    "thema": "OGAW-Regeln",
    "seite": 83,
    "kontext": "Für offene OGAW-Investmentvermögen gilt die 5-10-40-Regel.",
    "frage": "Was besagt diese Regel?",
    "mehrfach": true,
    "optionen": [
      "Mindestens 5 % des Sondervermögens müssen in Geldmarktinstrumente investiert werden",
      "Mindestens 40 % des Sondervermögens müssen in Aktien investiert werden",
      "Mindestens 5 und maximal 40 verschiedene Wertpapiere müssen im Sondervermögen enthalten sein",
      "Maximal 5 % des Sondervermögens dürfen in einen einzelnen Emittenten investiert werden",
      "Ausnahmsweise dürfen bis zu 10 % des Sondervermögens in einen einzelnen Emittenten investiert werden"
    ],
    "richtig": [
      3,
      4
    ]
  },
  {
    "id": "s89",
    "thema": "Anleihen & Ratings",
    "seite": 89,
    "kontext": "Für Anleihen und offene Investmentvermögen werden Ratings angeboten, die sich in ihrer Ausrichtung unterscheiden.",
    "frage": "Welche Merkmale treffen zu?",
    "mehrfach": true,
    "optionen": [
      "Ratings für Anleihen beurteilen die Bonität des Anleiheemittenten",
      "Fondsratings vergleichen die Wertentwicklung verschiedener Investmentvermögen",
      "Ratings für Anleihen beurteilen das Durationsrisiko des Anleiheemittenten",
      "Fondsratings vergleichen die Leistungen des Fondsmanagements unter Berücksichtigung beispielsweise der Berufserfahrung",
      "Ratings für Anleihen vergleichen die Kursentwicklung verschiedener Anleihen"
    ],
    "richtig": [
      0,
      3
    ]
  },
  {
    "id": "s91",
    "thema": "Anleihen & Ratings",
    "seite": 91,
    "kontext": "Rentenfonds gibt es mit unterschiedlichen Anlageschwerpunkten.",
    "frage": "Wählen Sie ein zutreffendes Beispiel aus.",
    "mehrfach": false,
    "optionen": [
      "EZB-Anleihen",
      "Privatanleihen",
      "Unternehmensanleihen",
      "Exchange Traded Anleihen",
      "Kryptoanleihen"
    ],
    "richtig": [
      2
    ]
  },
  {
    "id": "s103",
    "thema": "Fondsarten & AIF",
    "seite": 103,
    "kontext": "Mit einem offenen Infrastruktur-Sondervermögen haben auch Privatanleger die Möglichkeit, in Infrastruktur-Sachwerte zu investieren. Bei der Anteilsrückgabe gilt es jedoch einige Einschränkungen zu beachten.",
    "frage": "Welche gehören dazu?",
    "mehrfach": true,
    "optionen": [
      "Mindesthaltedauer der Anteile von 12 Monaten",
      "Mindesthaltedauer der Anteile von 24 Monaten",
      "Feste Rückgabetermine mindestens 1 x pro Jahr",
      "Feste Rückgabetermine maximal 4 x pro Jahr",
      "Rückgabe maximal 1 x im Halbjahr",
      "Rückgabefrist von 24 Monaten"
    ],
    "richtig": [
      1,
      2,
      4
    ]
  },
  {
    "id": "s111",
    "thema": "Fondsarten & AIF",
    "seite": 111,
    "kontext": "Spezial-AIF sind nur für einen bestimmten Anlegerkreis zulässig.",
    "frage": "Wer gehört zu diesem Anlegerkreis?",
    "mehrfach": false,
    "optionen": [
      "Privatanleger mit einer maximalen Anlagesumme von 10.000 EUR",
      "institutionelle Anleger",
      "Unternehmen, die ausschließlich in Gewerbeimmobilien investieren wollen",
      "Anleger, die auch einen Totalverlust tragen können",
      "semiprofessionelle Anleger mit einer Mindestanlagesumme von 100.000 EUR"
    ],
    "richtig": [
      1
    ]
  },
  {
    "id": "s115",
    "thema": "Fondsarten & AIF",
    "seite": 115,
    "kontext": "Ihre Kundin investiert seit vielen Jahren ausschließlich in Anleihen. Von einem Freund hat sie den Tipp erhalten, dass man mit Hedgefonds die Risiken eines anleihelastigen Depots begrenzen kann.",
    "frage": "Auf welche Risiken dieser Fondsart weisen Sie Ihre Kundin hin?",
    "mehrfach": true,
    "optionen": [
      "Hedgefonds weisen ein Totalverlustrisiko auf",
      "Hedgefonds investieren zur Begrenzung des Zinsänderungsrisikos überwiegend in Aktien",
      "Für Hedgefonds gelten besondere Rücknahmebedingungen",
      "Hedgefonds können von einem Privatanleger nur als Single-Hedgefonds erworben werden",
      "Privatanleger können nur in Dach-Hedgefonds investieren",
      "Hedgefonds weisen eine 24-monatige Mindesthaltedauer auf"
    ],
    "richtig": [
      0,
      2,
      4
    ]
  },
  {
    "id": "s122",
    "thema": "Kosten",
    "seite": 122,
    "kontext": "Eine besondere Gestaltungsform offener Investmentvermögen sind die sog. No-load-Fonds.",
    "frage": "Welches besondere Merkmal kennzeichnet diese Fondsart?",
    "mehrfach": false,
    "optionen": [
      "keine Verwaltungsvergütung",
      "keine Verwahrstellenvergütung",
      "kein aktives Fondsmanagement",
      "kein Ausgabeaufschlag",
      "keine Depotführungsgebühren"
    ],
    "richtig": [
      3
    ]
  },
  {
    "id": "s124",
    "thema": "Kosten",
    "seite": 124,
    "kontext": "Die Kosten im Zusammenhang mit einer Kapitalanlage verringern die Rendite. Aus diesem Grund möchte Ihre Kundin Frau Margot Garstner in einen Exchange Traded Funds (ETFs) investieren. Sie hat gelesen, dass diese gegenüber den meisten anderen offenen Investmentvermögen einen Kostenvorteil bieten.",
    "frage": "Welchen Kostenvorteil nennen Sie Frau Garstner?",
    "mehrfach": false,
    "optionen": [
      "Kein Ausgabeaufschlag",
      "Keine Verwaltungsvergütung",
      "Keine Depotführungsgebühr",
      "Keine Verwahrstellenvergütung",
      "Keine Kaufspesen bei Anteilskauf über die Börse"
    ],
    "richtig": [
      0
    ]
  },
  {
    "id": "s131",
    "thema": "Depot & Kontoformen",
    "seite": 131,
    "kontext": "Bei Depotkonten gibt es unterschiedliche Vergütungsmodelle.",
    "frage": "Welche Aussagen treffen zu?",
    "mehrfach": true,
    "optionen": [
      "Beim Und-Konto können alle Kontoinhaber einzeln und gemeinsam verfügen",
      "Ein Oder-Konto kann von den Kontoinhabern nur gemeinsam eröffnet werden",
      "Beim Einzelkonto für Minderjährige ist dieser mit Erreichen des 18. Lebensjahres alleine verfügungsberechtigt.",
      "Beim Oder-Konto können alle Kontoinhaber einzeln verfügen",
      "Beim Und-Konto kann die Kontoeröffnung einzeln erfolgen bei gemeinsamer Kontoauflösung",
      "Beim Einzelkonto können beide Kontoinhaber einzeln verfügen"
    ],
    "richtig": [
      1,
      2,
      3
    ]
  },
  {
    "id": "s135",
    "thema": "Sparpläne & Dynamisierung",
    "seite": 135,
    "kontext": "Ihr Kunde möchte seine Vermögenswirksamen Leistungen in einen Fondssparplan investieren.",
    "frage": "Wie hoch muss der Aktienanteil des ausgewählten Investmentvermögens sein?",
    "mehrfach": false,
    "optionen": [
      "20 %",
      "30 %",
      "40 %",
      "51 %",
      "60 %",
      "80 %"
    ],
    "richtig": [
      4
    ]
  },
  {
    "id": "s141",
    "thema": "Sparpläne & Dynamisierung",
    "seite": 141,
    "frage": "Was beschreibt die Dynamisierung bei einem Investment-Sparplan?",
    "mehrfach": false,
    "optionen": [
      "Die Erhöhung der Aktienquote im Sondervermögen bei sinkender Volatilität.",
      "Die automatische Erhöhung der Sparrate in regelmäßigen Abständen.",
      "Die Wechselwirkung zwischen Kursgewinnen und Inflation.",
      "Die Absicherung des Portfolios durch garantierte Mindestrenditen."
    ],
    "richtig": [
      1
    ]
  },
  {
    "id": "s143",
    "thema": "Sparpläne & Dynamisierung",
    "seite": 143,
    "frage": "Welche Aussagen zu den Ausgestaltungsmöglichkeiten der Dynamisierung bei Investment-Sparplänen treffen zu?",
    "mehrfach": true,
    "optionen": [
      "Die Dynamisierung kann sowohl prozentual als auch in festen Euro-Beträgen erfolgen.",
      "Eine einmal vereinbarte Dynamisierung kann im Laufe des Sparplans nicht mehr geändert werden.",
      "Anleger können die Dynamisierung in der Regel aussetzen oder stoppen.",
      "Dynamisierungen sind im Rahmen der privaten Altersvorsorge gesetzlich vorgeschrieben.",
      "Die Höhe der Dynamisierung ist von der Kapitalmarktentwicklung abhängig."
    ],
    "richtig": [
      0,
      2
    ]
  },
  {
    "id": "s145",
    "thema": "Sparpläne & Dynamisierung",
    "seite": 145,
    "kontext": "Ihre Kundin schließt bei Ihnen einen Investment-Sparplan über einen international ausgerichteten Rentenfonds ab und verfolgt damit einen langfristigen Anlagehorizont. Sie schlagen ihr eine Dynamisierung vor, um mit zunehmendem Einkommen auch schrittweise ein höheres Fondsvermögen aufzubauen.",
    "frage": "Welche weiteren Vorteile dieser zusätzlichen Sparplanausgestaltung nennen Sie Ihrer Kundin?",
    "mehrfach": false,
    "optionen": [
      "Schutz vor unerwarteten Kursschwankungen",
      "Profitieren von sinkenden Ausgabeaufschlägen",
      "Reduzierung des Kaufkraftverlustes",
      "Automatischer Wechsel in risikoärmere Anlageklassen"
    ],
    "richtig": [
      2
    ]
  }
];
