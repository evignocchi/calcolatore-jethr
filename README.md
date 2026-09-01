# Calcola lo stipendio netto a partire dalla RAL

Prototipo per il task Product Builder di Jet HR. Prima il risultato, poi la
spiegazione, poi l'approfondimento: **netto → dove va la RAL → dettaglio
delle voci → assistente → come si calcola → variabili del modello →
confronto con un'altra RAL → strumenti secondari**, tutto alimentato dallo
stesso motore, mai da formule duplicate nell'interfaccia. Prima del calcolo
la pagina mostra solo l'input e il contesto minimo — nessun risultato vuoto,
nessuna sezione della simulazione ancora inesistente.

Un **assistente alla simulazione** (pannello laterale su desktop, foglio
dal basso su mobile) spiega i singoli passaggi a richiesta: legge solo i
valori già calcolati dal motore, non ricalcola nulla, e su una domanda
fuori dal perimetro dichiarato (altri comuni, carichi di famiglia, CCNL...)
lo dice esplicitamente invece di inventare un numero. Una sezione compatta
("Il tuo netto dipende da queste variabili") rende visibile lo stesso
perimetro senza dover aprire la documentazione, e un confronto tra due RAL
mostra quanto del lordo in più arriva davvero al netto — utile per chi
valuta un'offerta o una negoziazione salariale.

Il costo per l'azienda e il calcolo inverso (da un netto desiderato alla RAL
necessaria) restano nel prototipo ma come strumenti secondari, visibili solo
dopo aver eseguito una simulazione: utili, ma non in competizione visiva con
il percorso principale RAL → netto.

**Caso coperto**: impiegato del settore privato, tempo indeterminato,
residente a Milano, anno intero, nessuna agevolazione — le semplificazioni
suggerite dal task stesso. Il netto è un **calcolo verificato** (fonti
incrociate, esempio ricalcolato a mano). Il costo azienda è una **stima**
dichiarata: l'INAIL usa un tasso indicativo, non quello reale della
lavorazione dell'azienda. Il resto del dominio (altri comuni, CCNL, nucleo
familiare) resta fuori perimetro; il perché è in
[`processo/assunzioni-e-fonti.md`](processo/assunzioni-e-fonti.md).

## Come si apre

Doppio clic su `index.html` — nessuna dipendenza, nessun passo di build.
`motore.js` deve stare nella stessa cartella. La pagina carica il font Wix
Madefor Display da Google Fonts; senza rete usa il font di sistema, il resto
funziona lo stesso.

## Come si verificano i numeri

```
node --test motore.test.js
```

Node 18 o successivo, zero dipendenze esterne. Lo stesso `motore.js` gira
nella pagina e nei test: nessuna logica duplicata. Il caso guida (RAL 35.000
→ netto 26.032,17 €) è calcolato a mano in
[`processo/assunzioni-e-fonti.md`](processo/assunzioni-e-fonti.md) e
confrontato con l'output del motore in un test dedicato.

## I file

| File | Che cos'è |
|---|---|
| `index.html` | l'interfaccia — input RAL, bottone calcola, output |
| `motore.js` | il calcolo, separato per poterlo provare fuori dal browser |
| `motore.test.js` | la matrice di prova |
| `processo/assunzioni-e-fonti.md` | perimetro, fonti primarie verificate, esempio di calcolo a mano |
