# Dove va la tua RAL — netto 2026

Prototipo per il task Product Builder di Jet HR: da una RAL, il netto annuale
e mensile che percepisce il dipendente, e ogni voce trattenuta al lordo lungo
la strada.

**Caso coperto**: impiegato del settore privato, tempo indeterminato,
residente a Milano, anno intero, nessuna agevolazione — le semplificazioni
suggerite dal task stesso. Il resto del dominio (altri comuni, CCNL, nucleo
familiare, costo azienda) è esplicitamente fuori perimetro; il perché è in
[`processo/assunzioni-e-fonti.md`](processo/assunzioni-e-fonti.md).

## Come si apre

Doppio clic su `index.html` — nessuna dipendenza, nessun passo di build,
funziona anche offline. `motore.js` deve stare nella stessa cartella.

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
