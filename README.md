# Calcola il costo aziendale e il netto di un dipendente dalla RAL

Prototipo per il task Product Builder di Jet HR. Due direzioni sullo stesso
motore: **da una RAL** il costo per l'azienda e il netto per il dipendente,
voce per voce; **da un netto desiderato** la RAL necessaria a ottenerlo.

**Caso coperto**: impiegato del settore privato, tempo indeterminato,
residente a Milano, anno intero, nessuna agevolazione — le semplificazioni
suggerite dal task stesso. Il netto dipendente è un **calcolo verificato**
(fonti incrociate, esempio ricalcolato a mano). Il costo azienda è una
**stima** dichiarata: l'INAIL usa un tasso indicativo, non quello reale della
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
