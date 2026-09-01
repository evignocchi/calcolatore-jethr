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
  chart-naspi: "#0E8F82"
  chart-fondo-garanzia: "#5B6B7A"
  chart-inail: "#B8622E"
  chart-tfr: "#7A6FBE"
  footer-black: "#000000"
  jetbot-white: "#F4F7F5"
  jetbot-black: "#000000"
  jetbot-accent: "#DDEA57"
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
  ring-card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px 20px"
  jetbot-card:
    backgroundColor: "{colors.jetbot-black}"
    textColor: "{colors.jetbot-white}"
    rounded: "{rounded.lg}"
    padding: "20px"
  tab-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
  tab-button-active:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
---

# Design System: Simulatore RAL → netto

## Overview

**Creative North Star: "The Verified Ledger"**

Un calcolatore che si comporta come un documento fiscale onesto, non come un'app finanziaria che promette. Ogni cifra che mostra è già stata verificata a mano contro fonti primarie (`processo/assunzioni-e-fonti.md`), e l'interfaccia lo dimostra invece di dirlo: nessun numero appare senza il percorso che lo spiega, nessuna sezione fuori dal perimetro dichiarato resta ambigua. Il fondo caldo color carta e il verde brand JetHR danno un tono accogliente e non clinico a un argomento (le tasse) che di solito è arido; il nero pieno del footer — lo stesso del sito Jet HR reale — ancora il prototipo al brand senza doverlo dire a parole.

La sezione risultato si legge come un cruscotto a due percorsi: un tab "Dipendente" e un tab "Azienda" condividono lo stesso grafico a ciambella e la stessa lista di voci, perché sono due letture della stessa RAL, non due funzionalità diverse. Il grafico e la lista sostituiscono la vecchia griglia di stat-card di un round precedente: stessa ambizione (numeri protagonisti, leggibilità), composizione più densa e più adatta a mostrare una scomposizione proporzionale a colpo d'occhio. Tutto resta dentro la stessa identità cromatica e tipografica del resto della pagina — non è un'identità nuova innestata sopra, è lo stesso sistema con più gerarchia.

**Key Characteristics:**
- Superfici piatte, nessuna ombra decorativa: la profondità viene da bordi sottili e contrasto tonale (crema/bianco/nero), non da elevazione.
- Un solo accento saturo (il verde JetHR) nel sistema principale, usato con parsimonia: numeri positivi, link, checkmark, badge attivi, il segmento "netto"/"RAL" del grafico a ciambella in entrambi i tab.
- Le trattenute (contributi, imposte) sono sempre in rosso mattone caldo, mai in rosso puro: coerente con la palette calda della pagina.
- Tipografia unica (Wix Madefor Display) per tutto il sito: la gerarchia viene da peso e dimensione, mai da un secondo font.
- Un'unica eccezione cromatica deliberata: la card "JetBot" usa la palette di brand Jet HR (nero, bianco carta, verde/giallo `#DDEA57`) invece della palette del calcolatore — è un rimando esplicito al brand più ampio, confinato a quella card sola, mai esteso al resto della pagina.

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

### Chart (grafico a ciambella e voci)
Estensione dei colori del grafico oltre i quattro già in Primary/Secondary, riservata al ring e alle icone delle voci — mai al resto dell'interfaccia:
- **Verde ciambella** (`#0EA37A`): segmento "Netto" (tab Dipendente) o "RAL" (tab Azienda) — sempre il segmento più grande, sempre lo stesso verde a prescindere dal tab.
- **Teal NASpI** (`#0E8F82`), **Ardesia Fondo Garanzia** (`#5B6B7A`), **Ruggine INAIL** (`#B8622E`), **Indaco TFR** (`#7A6FBE`): le quattro voci solo lato azienda, tonalità coerenti per saturazione/luminosità con blu-contributi, ambra-regionale e viola-comunale già esistenti.

### JetBot (eccezione confinata)
- **Bianco carta Jet** (`#F4F7F5`), **Nero Jet** (`#000000`), **Verde/giallo Jet** (`#DDEA57`): usati esclusivamente dentro la card "Chiedi a JetBot". Non compaiono altrove nella pagina.

### Named Rules
**La regola dell'accento raro.** Il verde JetHR non diventa mai un colore di sfondo esteso: resta su testo, bordi, badge e barre sottili. Quando serve un colore di sfondo saturo (es. badge "stima"), si usa l'ambra dedicato, non il verde.

**La regola dell'eccezione confinata.** Una palette diversa da quella principale (JetBot) è ammessa solo dentro il perimetro di un singolo componente dichiarato come tale, mai come inizio di una seconda identità visiva della pagina.

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

### Tab Switch (Dipendente / Azienda)
- **Style:** pillola contenitore (`--bg`, bordo 1px, raggio 999px, padding 4px); ogni tab è a sua volta una pillola.
- **Stato attivo:** sfondo bianco + bordo 1px `--border`, testo `--text`. Stato inattivo: nessuno sfondo, testo `--muted`. Nessuna ombra a marcare l'attivo — solo sfondo e bordo.
- **Comportamento:** cambia contemporaneamente il grafico a ciambella, il numero al centro, il titolo e il contenuto della lista voci — sono due letture della stessa RAL, non due pagine.

### Grafico a ciambella (componente distintivo)
- SVG, non canvas: un `<circle>` per segmento con `stroke-dasharray`/`stroke-dashoffset`, capi arrotondati, distacco netto (6 unità di viewBox) tra le porzioni così colore e voce si distinguono a colpo d'occhio — coerentemente con lo stesso distacco applicato alla lista voci accanto. Nessuna porzione "vuota": i segmenti coprono sempre l'intero cerchio perché rappresentano una scomposizione completa (netto+trattenute = RAL; RAL+aggiunte = costo azienda). Un distacco troppo ampio va evitato sulle porzioni minoritarie: accorcia l'arco al punto che, con i capi arrotondati, si legge come una pillola dritta invece che come una fetta curva — per questo il distacco resta piccolo e ogni porzione ha una lunghezza minima (4 unità) così anche una voce piccolissima resta un archetto visibile invece di sparire.
- **Dimensioni:** anello 200×200px, stroke 16px, foro utile ~168px; il blocco di testo al centro è vincolato a 128px di larghezza (non semplicemente centrato su tutto il riquadro) per restare sempre dentro il foro, mai sopra lo stroke colorato.
- **Centro:** numero grande (stessa scala di Stat Hero) con **auto-fit del font-size**: calcolato sul testo finale (non durante l'animazione, che conta sempre verso l'alto da zero ed è quindi più stretta) misurando `scrollWidth` contro lo spazio disponibile, da 1.5rem fino a un minimo di 0.8rem — necessario perché l'importo può variare da poche centinaia a oltre un milione di euro. Sotto, una didascalia piccola in `--muted` (es. "74% della RAL", "+33% sulla RAL").
- **Sotto la card:** riga mensilità con icona matita + testo, un `<select>` nativo invisibile sovrapposto per l'interazione — non un popover custom.
- **Regola:** i segmenti derivano sempre da campi già calcolati dal motore, mai da una formula scritta nell'interfaccia.
- **Regola:** il numero al centro non va mai a capo (`white-space:nowrap`) e non deve mai sconfinare sullo stroke colorato — verificare con importi realisticamente estremi (RAL vicina a 1.000.000 €), non solo con il caso guida da 35.000 €.

### Lista voci (componente distintivo, condiviso dai due tab)
- Righe non a card: icona colorata (tinta 22 dell'esadecimale + colore pieno) in un quadrato 38px raggio 10px, nome + eventuale bottone "Spiega", didascalia/fonte in `--muted`, importo a destra (rosso per le trattenute dipendente, verde per le voci di costo azienda — il segno cambia, non il significato: "+"/"−" segue chi paga cosa).
- Separatore 1px `--border` tra righe, nessuno sull'ultima.
- **Regola:** mai annidare una card dentro un'altra card — la lista vive dentro un unico contenitore (`.colonna-lista`), le righe non sono card proprie.

### JetBot Card (eccezione cromatica confinata)
- **Background:** gradiente radiale scuro (`#1c1f18` verso `#000`), mai un nero piatto — dà profondità senza usare ombre.
- **Contenuto:** icona chat in tinta verde/giallo Jet su fondo verde/giallo trasparente, badge pillola "Assistente", titolo bianco, descrizione in bianco attenuato, riga CTA in verde/giallo con freccia che si sposta al hover.
- **Interazione:** l'intera card è un bottone; click o invio aprono lo stesso assistente già usato altrove (nessuna logica nuova, solo un punto d'accesso in più).
- **Regola:** unica card della pagina che non usa la palette principale — per questo la sua estensione è limitata a se stessa (vedi regola dell'eccezione confinata).

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
- **Do** derivare i segmenti del grafico a ciambella e le voci della lista sempre da campi già calcolati dal motore (`Motore.calcola`/`Motore.costoAzienda`), mai da una formula scritta nell'interfaccia.
- **Do** tenere la palette JetBot (nero/bianco carta/verde-giallo) confinata alla sua card: è l'unica eccezione cromatica ammessa, e resta tale.

### Don't:
- **Don't** aggiungere `box-shadow` decorativi o glow colorati: il sistema è piatto per scelta (eccezione nota e da correggere: il bottone flottante `.assist-fab` ha ancora un'ombra verde `rgba(14,107,82,.35)` sopravvissuta a un round precedente — il detector automatico della skill la segnala come "dark-glow"; da sistemare in un round dedicato, non qui).
- **Don't** usare rosso puro/allarme per le trattenute: restano nel rosso mattone caldo (#8A3B2B) coerente con la palette.
- **Don't** annidare una card dentro un'altra card (icona/riga della lista voci dentro la sua card contenitore, o simili).
- **Don't** introdurre un secondo font: la gerarchia viene da peso e dimensione di Wix Madefor Display, mai da un font diverso per "sembrare tecnico" o "sembrare importante".
- **Don't** lasciare un segmento "vuoto"/grigio nel grafico a ciambella: i segmenti rappresentano sempre una scomposizione completa e reale, mai una barra di progresso con una porzione "non ancora usata".
