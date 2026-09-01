# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Utente generico che vuole stimare il proprio netto per curiosità personale — nessuna trattativa o offerta di lavoro specifica sullo sfondo, analogo ai calcolatori RAL → netto generici reperibili online. Non è un candidato che sta valutando un'offerta Jet HR né un recruiter che la spiega: è chiunque voglia capire quanto gli resta in tasca partendo da una RAL.

## Product Purpose

Stimare il netto annuale e mensile a partire dalla RAL per il caso standard (impiegato privato, tempo indeterminato, residente a Milano, nessuna agevolazione), mostrando come si arriva al risultato invece di restituire solo un numero. Nasce come prototipo per il task "Product Builder" di Jet HR.

## Positioning

A differenza dei calcolatori RAL/netto generici che restituiscono solo un totale, questo mostra l'intero percorso — cascata RAL → contributi → imponibile → imposte → detrazioni → netto — cita la fonte normativa di ogni voce, e ha un assistente deterministico che spiega i singoli passaggi leggendo solo i valori già calcolati dal motore, senza mai inventare un numero fuori dal perimetro dichiarato.

## Operating Context

Pagina singola, nessun account, nessun salvataggio lato server. Un solo input reale (la RAL); si apre `index.html` direttamente (nessun passo di build, nessuna dipendenza). Costo azienda e calcolo inverso (netto desiderato → RAL) esistono come funzioni secondarie, collassate, non in competizione visiva col percorso principale.

## Capabilities and Constraints

- Caso coperto: impiegato del settore privato, tempo indeterminato, residente a Milano per l'intero anno, nessun familiare a carico, nessuna agevolazione/benefit/premio, iscrizione ordinaria al Fondo Pensioni Lavoratori Dipendenti (aliquota standard, non CCNL-specifica).
- RAL accettata fino a 1.000.000 €; oltre, l'input viene rifiutato esplicitamente invece di restituire un numero falsamente preciso.
- Il netto è un calcolo verificato (fonti incrociate + esempio ricalcolato a mano in `processo/assunzioni-e-fonti.md`); il costo azienda è una stima dichiarata come tale (l'INAIL usa un tasso indicativo, non quello reale della lavorazione).
- Esplicitamente fuori perimetro, non per dimenticanza: altri comuni/regioni, CCNL/inquadramento/settore, nucleo familiare e altri redditi, agevolazioni fiscali particolari. L'assistente lo dichiara quando gli si chiede qualcosa fuori da questo perimetro, invece di inventare.
- `motore.js` è l'unica fonte di verità del calcolo: interfaccia e assistente leggono i suoi valori, non ricalcolano formule proprie.

## Brand Commitments

Nome prodotto: "Simulatore RAL → netto". Marcato esplicitamente come prototipo per il task Product Builder — Jet HR (footer, tag in header). Sistema di design già stabilito nel CSS, da preservare ed estendere, non reinventare:

- Pagina: sfondo caldo off-white `--bg:#F5F5F0`, superfici `--card:#ffffff`, bordi `--border:#E3E2DA`.
- Testo: quasi-nero `--text:#11150A`, secondario `--muted:#68675F`.
- Accento brand: verde `--accent:#0E6B52` con tint `--accent-bg:#E8F2EC`.
- Stati: rosso mattone `--neg:#8A3B2B` per le trattenute, ambra `--stima-bg/--stima-fg` per i valori dichiarati come stima.
- Footer del sito in nero puro `#000000`, a imitazione del footer reale di Jet HR.
- Font: Wix Madefor Display (Google Fonts), fallback di sistema se offline.

## Evidence on Hand

Fonti primarie verificate e incrociate in `processo/assunzioni-e-fonti.md` (INPS, Normattiva, Regione Lombardia, Comune di Milano), con verifica incrociata indipendente dove possibile. Esempio di calcolo a mano (RAL 35.000 € → netto 26.032,17 €) usato come caso guida e come test di regressione in `motore.test.js`. Nessuna testimonianza, cliente o dato di utilizzo reale da citare: è un prototipo di valutazione, non un prodotto in produzione.

## Product Principles

1. Un'unica fonte di verità per il calcolo (`motore.js`): interfaccia e assistente leggono, non ricalcolano.
2. Trasparenza sul perimetro: ogni assunzione è dichiarata ed esplicita; su una domanda fuori perimetro si dice "non lo so" invece di inventare un numero.
3. Percorso narrativo, non solo un risultato: si mostra come si arriva al netto, non solo il numero finale.
4. Coerenza col sistema di design esistente: nuovi elementi riusano i token già stabiliti invece di introdurne di nuovi.

## Accessibility & Inclusion

Nessun requisito specifico dell'utente confermato oltre le buone pratiche già in uso, da preservare: `aria-live` sul risultato, `aria-hidden` sulle icone decorative, `focus-visible` sugli elementi interattivi, focus trap ed Esc-to-close sul dialog nativo dell'assistente.
