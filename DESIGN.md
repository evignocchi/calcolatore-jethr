---
name: Simulatore RAL → netto
description: Calcolatore RAL → netto per Jet HR, con un percorso narrativo verificabile passo per passo
colors:
  page-cream: "#F5F5F0"
  surface-white: "#ffffff"
  border-warm: "#E3E2DA"
  ink: "#11150A"
  ink-muted: "#68675F"
  jethr-green: "#0E6B52"
  jethr-green-tint: "#E8F2EC"
  deduction-red: "#8A3B2B"
  estimate-amber-bg: "#FBF3E3"
  estimate-amber-fg: "#8A5A00"
  chart-net: "#0EA37A"
  chart-contributi: "#2A78D6"
  chart-addizionale-regionale: "#C98500"
  chart-addizionale-comunale: "#4A3AA7"
  footer-black: "#000000"
typography:
  display:
    fontFamily: "Wix Madefor Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.55rem, 4vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.2
  stat-hero:
    fontFamily: "Wix Madefor Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.1rem, 5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.1
  body:
    fontFamily: "Wix Madefor Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Wix Madefor Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "#2A2E22"
  button-secondary:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  stat-card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "18px 18px 16px"
---

# Design System: Simulatore RAL → netto

## Overview

**Creative North Star: "The Verified Ledger"**

Un calcolatore che si comporta come un documento fiscale onesto, non come un'app finanziaria che promette. Ogni cifra che mostra è già stata verificata a mano contro fonti primarie (`processo/assunzioni-e-fonti.md`), e l'interfaccia lo dimostra invece di dirlo: nessun numero appare senza il percorso che lo spiega, nessuna sezione fuori dal perimetro dichiarato resta ambigua. Il fondo caldo color carta e il verde brand JetHR danno un tono accogliente e non clinico a un argomento (le tasse) che di solito è arido; il nero pieno del footer — lo stesso del sito Jet HR reale — ancora il prototipo al brand senza doverlo dire a parole.

La sezione risultato usa un linguaggio da "stat dashboard" (numeri protagonisti in card, mini-barre proporzionali) deliberatamente scelto dall'utente per leggibilità e impatto, pur restando dentro la stessa identità cromatica e tipografica del resto della pagina — non è un'identità nuova innestata sopra, è lo stesso sistema con più gerarchia.

**Key Characteristics:**
- Superfici piatte, nessuna ombra decorativa: la profondità viene da bordi sottili e contrasto tonale (crema/bianco/nero), non da elevazione.
- Un solo accento saturo (il verde JetHR), usato con parsimonia: numeri positivi, link, checkmark, badge attivi.
- Le trattenute (contributi, imposte) sono sempre in rosso mattone caldo, mai in rosso puro: coerente con la palette calda della pagina.
- Tipografia unica (Wix Madefor Display) per tutto il sito: la gerarchia viene da peso e dimensione, mai da un secondo font.

## Colors

Palette ristretta e calda: un fondo crema, superfici bianche, un solo verde di brand, un rosso mattone per le sottrazioni, un ambra tenue riservato alle stime dichiarate.

### Primary
- **Verde JetHR** (`#0E6B52`): l'unico accento saturo del sistema. Link, badge "verificato", checkmark del perimetro, numeri positivi nella cascata (detrazioni, bonus).

### Secondary
- **Rosso mattone** (`#8A3B2B`): ogni importo che viene sottratto dalla RAL — contributi, IRPEF, addizionali — nella cascata, nelle stat-card e nelle mini-barre. Mai un rosso puro/allarme: resta dentro la temperatura calda della palette.

### Tertiary
- **Ambra stima** (fondo `#FBF3E3`, testo `#8A5A00`): riservato esclusivamente ai valori dichiarati come stima (costo azienda), mai usato per il netto verificato. La distinzione cromatica è la dichiarazione di incertezza.

### Neutral
- **Crema pagina** (`#F5F5F0`): sfondo di base e della sidebar — la superficie "ambiente".
- **Bianco superficie** (`#ffffff`): card, stage centrale, sezioni di dettaglio — la superficie "in primo piano".
- **Inchiostro** (`#11150A`): testo primario, quasi nero ma mai #000 puro sulle superfici chiare.
- **Inchiostro attenuato** (`#68675F`): etichette, testo secondario, didascalie.
- **Bordo caldo** (`#E3E2DA`): unico colore di bordo in tutto il sistema.
- **Nero footer** (`#000000`): riservato al solo footer del sito, a imitazione diretta del footer Jet HR reale — l'unica superficie scura della pagina.

### Named Rules
**La regola dell'accento raro.** Il verde JetHR non diventa mai un colore di sfondo esteso: resta su testo, bordi, badge e barre sottili. Quando serve un colore di sfondo saturo (es. badge "stima"), si usa l'ambra dedicato, non il verde.

## Typography

**Display & Body Font:** Wix Madefor Display (fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif — degradazione pulita quando Google Fonts non è raggiungibile).

**Character:** Un sans-serif geometrico ma caldo, mai tecnico/mono: comunica precisione senza freddezza, coerente con "documento fiscale onesto" più che "app fintech".

### Hierarchy
- **Display** (700, 1.55rem–2.1rem responsive, line-height 1.2): titolo principale dello stage (`<h1>`).
- **Stat Hero** (800, 2.1rem–2.75rem responsive, line-height 1.1, tabular-nums): il netto annuale, l'unico numero a questa scala nella pagina.
- **Title** (700, 1.3rem): titoli di sezione (`<h2>`).
- **Body** (400, 16px, line-height 1.55): testo corrente, spiegazioni, didascalie lunghe.
- **Label** (600, 0.78–0.9rem): etichette di stat-card, badge, intestazioni di tabella.

### Named Rules
**La regola dei numeri tabulari.** Ogni cifra monetaria o percentuale usa `font-variant-numeric: tabular-nums`, per restare allineata quando cambia (animazione del contatore, selezione mensilità).

## Layout

Griglia a due colonne a piena larghezza (`grid-template-columns: minmax(280px,340px) 1fr`): sidebar sinistra (perimetro della simulazione, sticky) e stage destro (il calcolatore). Sotto i 900px la griglia collassa a una colonna, sidebar sopra lo stage.

Prima del calcolo, lo stage centra verticalmente solo input e bottone (`margin:auto 0` su un flex container); dopo il calcolo il contenuto fluisce normalmente dall'alto, senza logica JS dedicata — la centratura è un effetto collaterale di `[hidden]` sulle sezioni successive.

Le sezioni a piena larghezza post-risultato ("Potrebbe interessarti anche", footer) usano il pattern "esterno piena larghezza, interno contenuto": `.sez-full` per il padding, `.contenuto{max-width:760px}` centrato dentro (960px nel footer, per ospitare le due colonne assunzioni/fonti affiancate).

Ritmo verticale: 56px tra sezioni maggiori, 20px tra blocchi correlati dentro una sezione, 12–14px tra elementi di uno stesso gruppo (stat-card, righe delle mini-barre).

## Elevation & Depth

Sistema piatto per scelta, non per omissione: nessun `box-shadow` decorativo in tutta la pagina (eccetto il bottone flottante dell'assistente, un'eccezione nota da rivedere — vedi Don't). La profondità viene da bordo sottile (`1px solid var(--border)`) più contrasto tonale tra crema/bianco/nero, mai da ombra.

### Named Rules
**La regola del piatto-per-difetto.** Ogni nuova superficie (card, riquadro, sezione) usa bordo + contrasto tonale, mai `box-shadow`. Un'ombra è sempre un segnale che si sta cercando profondità nel posto sbagliato.

## Shapes

Raggio coerente per ruolo: 16px per le sezioni contenitore grandi (`.risultato`, `.vedi-anche-riquadro`), 12px per le card (stat-card, dettaglio-trattenute, sidebar), 8–9px per bottoni/input/select, forma a pillola (999px) per tag e badge, cerchio pieno per il bottone flottante dell'assistente. Nessun angolo vivo (0px) in tutto il sistema.

## Components

### Buttons
- **Shape:** raggio 8–9px, mai a pillola.
- **Primary (`.cta`):** sfondo inchiostro (#11150A), testo bianco, hover più chiaro (#2A2E22). Usato per l'azione principale ("Calcola il netto").
- **Secondary (`.secondario-cta`):** sfondo bianco, bordo inchiostro, hover inverte a sfondo inchiostro/testo bianco.
- **Focus:** outline 2px verde JetHR, offset 2px — coerente su tutti gli elementi interattivi del sito.

### Stat Cards (componente distintivo di questa sezione)
- **Corner Style:** 12px.
- **Background:** bianco su fondo verde tenuto (`--accent-bg`) del contenitore risultato — due livelli di superficie, non uno.
- **Border:** 1px `--border`.
- **Contenuto:** etichetta piccola (label, muted) sopra, valore grande (stat-value) sotto; la card del netto annuale ha riga propria a piena larghezza per ospitare il valore più grande senza andare a capo, le altre tre stanno in griglia a 3 colonne (1 su mobile).
- **Regola:** mai annidare una card dentro un'altra card.

### Mini-barre (componente distintivo)
- Traccia grigia (`--bg`) alta 7px, riempimento colorato proporzionale all'importo più alto tra le voci mostrate (mai proporzionale alla RAL: sarebbero tutte minuscole). Colore per voce coerente con la barra di scomposizione esistente più in basso nella pagina (stesso codice colore in due punti diversi della stessa vista = stesso significato).

### Tags / Badge
- **Style:** forma a pillola, tre varianti — `.tag.scope` (informativo, bordo sottile, sfondo bianco), `.tag.verificato` (verde su tint verde), `.tag.stima` (ambra su tint ambra, sempre con icona "i").

### Cards / Containers generiche
- **Corner Style:** 12–16px secondo il ruolo (vedi Shapes).
- **Background:** bianco su crema, o crema su bianco — mai due bianchi sovrapposti senza un bordo a separarli.
- **Shadow Strategy:** nessuna (vedi Elevation & Depth).
- **Border:** 1px `--border` costante.

### Inputs / Fields
- **Style:** bordo 1–1.5px grigio chiaro, raggio 8–9px, sfondo bianco.
- **Focus:** outline 2px verde JetHR, bordo che vira al verde.

### Navigation
- Nessuna navigazione tradizionale: la sidebar è informativa (perimetro), non un menu. L'unico controllo di navigazione è lo scroll e i link di ancoraggio (`Vedi tutte le assunzioni →`).

## Do's and Don'ts

### Do:
- **Do** riusare `--accent` (#0E6B52) solo su testo, bordi e barre sottili — mai come sfondo esteso.
- **Do** usare `font-variant-numeric: tabular-nums` su ogni cifra che può cambiare o animare.
- **Do** mantenere un solo bordo (`--border`, #E3E2DA) e un solo raggio per ruolo in tutto il sistema, invece di introdurne di nuovi per componente.
- **Do** colorare le mini-barre e la barra di scomposizione con lo stesso codice colore per voce (coerenza semantica tra le due viste della stessa RAL).

### Don't:
- **Don't** aggiungere `box-shadow` decorativi o glow colorati: il sistema è piatto per scelta (eccezione nota e da correggere: il bottone flottante `.assist-fab` ha ancora un'ombra verde `rgba(14,107,82,.35)` sopravvissuta a un round precedente — il detector automatico della skill la segnala come "dark-glow"; da sistemare in un round dedicato, non qui).
- **Don't** usare rosso puro/allarme per le trattenute: restano nel rosso mattone caldo (#8A3B2B) coerente con la palette.
- **Don't** annidare una card dentro un'altra card (stat-card dentro dettaglio-trattenute, o simili).
- **Don't** introdurre un secondo font: la gerarchia viene da peso e dimensione di Wix Madefor Display, mai da un font diverso per "sembrare tecnico" o "sembrare importante".
