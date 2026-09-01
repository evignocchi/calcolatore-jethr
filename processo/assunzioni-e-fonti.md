# Assunzioni e fonti

Task: Product Builder @ Jet HR — calcolatore RAL → netto. Perimetro dichiarato dal
brief: impiegato privato, tempo indeterminato, residente a Milano, nessuna
agevolazione particolare. Questo documento fissa cosa il prototipo assume, su
quali fonti, e cosa lascia fuori — così le semplificazioni sono un elenco
verificabile, non una scusa.

## Perimetro

- Impiegato del settore privato, tempo indeterminato, rapporto attivo tutto il
  2026 (365/365).
- Domicilio fiscale a Milano (Lombardia) per l'intero anno.
- Un solo datore di lavoro, un solo reddito, nessun altro reddito complessivo.
- Nessun familiare a carico, nessun onere deducibile o detraibile ulteriore.
- Nessun benefit, premio di risultato, straordinario, welfare.
- Iscrizione ordinaria al Fondo Pensioni Lavoratori Dipendenti (FPLD), aliquota
  standard: non tiene conto di CCNL, settore, fondi di solidarietà o fondi
  sanitari, che cambiano la contribuzione effettiva e non sono deducibili dalla
  sola RAL.
- RAL = imponibile previdenziale = base imponibile fiscale prima dei contributi
  del lavoratore (nessuna componente variabile o in natura).
- Il risultato è il **netto annuale di competenza 2026** (il carico fiscale
  maturato su quella RAL), diviso per 12 o 13 mensilità come media — non è
  l'importo del singolo cedolino, perché le addizionali si versano a rate dopo
  il conguaglio.

## Fuori perimetro (esplicitamente, non per dimenticanza)

- **Calcolo inverso netto → RAL.** Il brief chiede RAL → netto; non è una
  funzione facilmente invertibile in forma chiusa per via delle soglie non
  monotone (l'esenzione comunale, ad esempio, è un gradino secco). Aggiungerlo
  richiederebbe una ricerca numerica e amplierebbe lo scope oltre il caso
  richiesto.
- **Altri comuni/regioni.** L'addizionale regionale e comunale usate sono
  specifiche di Lombardia/Milano; cambiano per ogni comune italiano.
- **CCNL, inquadramento, settore.** Il 9,19% è la contribuzione IVS ordinaria
  FPLD: fondi di solidarietà, fondi sanitari e previdenza complementare
  variano per contratto e non sono ricavabili dalla sola RAL.
- **Nucleo familiare, altri redditi, oneri deducibili/detraibili personali.**
- **Costo azienda.** Il prototipo calcola solo il netto del lavoratore, non il
  costo totale per il datore (contributi datoriali, INAIL, TFR, ecc.).
- **RAL sopra 1.000.000 €.** Oltre questa soglia il modello a input singolo
  smette di essere realistico; il calcolatore rifiuta l'input con un messaggio
  esplicito piuttosto che restituire un numero falsamente preciso.

## Fonti primarie, verificate indipendentemente

Ogni fonte sotto è stata cercata e letta direttamente (non copiata da terzi),
poi incrociata con almeno una seconda fonte indipendente dove possibile.

| Voce | Regola | Fonte primaria | Verifica incrociata |
|---|---|---|---|
| Contributi IVS lavoratore | 9,19% dell'imponibile; +1% sulla quota oltre 56.224 € | INPS, circolare 6/2026 (30/01/2026) | Comunicato INPS "Lavoratori dipendenti: limite minimo di retribuzione giornaliera 2026" (stessi importi: 56.224 € e massimale 122.295 €) |
| Massimale contributivo | 122.295 € annui (per chi è privo di anzianità contributiva al 31/12/1995) | INPS, circolare 6/2026 | come sopra |
| IRPEF, scaglioni 2026 | 23% fino a 28.000 · 33% da 28.000 a 50.000 (ridotto dal 35%) · 43% oltre 50.000 | L. 30 dicembre 2025, n. 199, art. 1 c. 3-4 | Ipsoa/Wolters Kluwer, "IRPEF 2026: come si calcola" (agg. 15/01/2026); Assimpredil Ance, suggerimento 7/2 dell'8/01/2025 |
| Detrazione lavoro dipendente | art. 13 TUIR: 1.955 € fino a 15.000 di reddito; decrescente fino a 50.000; +65 € tra 25.000 e 35.000 | TUIR, art. 13 (comma modificato da L. 207/2024) | Ipsoa (conferma il minimo 1.955 € e la "no tax area" a 8.500 €); Assimpredil Ance |
| Bonus/ulteriore detrazione (cuneo fiscale) | Bonus 7,1%/5,3%/4,8% se reddito ≤ 20.000 (esente, non riduce l'IRPEF ma aumenta il netto); ulteriore detrazione 1.000 € fissa 20-32k, poi decrescente fino a 40k | L. 207/2024, art. 1 c. 4-9 | Ipsoa, Assimpredil Ance (stessi importi e soglie) |
| Trattamento integrativo | fino a 1.200 €/anno se reddito ≤ 15.000 e IRPEF lorda > detrazione lavoro dipendente − 75 € | D.L. 3/2020, art. 1, come richiamato da L. 207/2024 | Ipsoa |
| Addizionale regionale Lombardia | 1,23% / 1,58% / 1,72% / 1,73% su scaglioni 15.000/28.000/50.000 | Regione Lombardia — pagina ufficiale "Addizionale Regionale all'IRPEF" | — (fonte primaria diretta dell'ente impositore) |
| Addizionale comunale Milano | aliquota unica 0,8%; esenzione (non franchigia) fino a 23.000 € di imponibile | Comune di Milano — pagina ufficiale "Addizionale comunale Irpef", delibera C.C. 36/2013 e 46/2020 | — (fonte primaria diretta dell'ente impositore) |

## Esempio di calcolo verificato a mano

RAL 35.000 €, profilo del prototipo:

| Passaggio | Importo |
|---|---:|
| RAL | 35.000,00 € |
| Contributi INPS (9,19%) | −3.216,50 € |
| Imponibile IRPEF | 31.783,50 € |
| IRPEF lorda (23% + 33% sull'eccedenza) | 7.688,56 € |
| Detrazione lavoro dipendente (+65 €) | −1.646,48 € |
| Ulteriore detrazione (cuneo fiscale) | −1.000,00 € |
| IRPEF netta | 5.042,08 € |
| Addizionale regionale Lombardia | −454,98 € |
| Addizionale comunale Milano | −254,27 € |
| **Netto annuale** | **26.032,17 €** |
| Media su 13 mensilità | 2.002,47 € |
| Media su 12 mensilità | 2.169,35 € |

Verificato passo per passo a mano, non solo dal motore: i due percorsi
coincidono al centesimo.

## Convenzione di arrotondamento

Arrotondamento al centesimo (metodo commerciale, mezzo in su) su ogni voce
intermedia; il netto è la somma delle voci già arrotondate, non un totale
ricalcolato a parte — così il grafico di scomposizione della RAL in pagina
chiude sempre esattamente al 100%. Quando ci sono integrazioni di legge
(bonus cuneo fiscale o trattamento integrativo, reddito imponibile basso), il
segmento "Netto" del grafico le esclude — non provengono dalla RAL, quindi
lasciarle dentro farebbe superare il 100% — e compaiono invece in una nota
sotto la legenda, con lo stesso importo già mostrato nella cascata.

## Mensilità

Il brief chiede "netto annuale e mensile". Il risultato principale mostra la
media su 12, 13 o 14 mensilità a scelta (13 di default, la più comune per un
impiegato privato), dichiarando esplicitamente che è una media e non
l'importo del singolo cedolino. La stessa scelta di mensilità alimenta anche
il calcolo inverso (netto mensile desiderato → RAL).

### Piano mensilità: una stima illustrativa, non un cedolino

Sotto il netto medio mensile, se la mensilità scelta è 13 o 14, un piccolo
grafico mostra come il netto annuale si distribuisce tra le mensilità
ordinarie e quelle aggiuntive (tredicesima, quattordicesima) — `Motore.
pianoMensilita()`, che riusa il netto annuale già verificato, non lo
ricalcola. Con 12 mensilità il grafico resta nascosto: non c'è nessuna
mensilità aggiuntiva da mostrare.

La convenzione usata per la mensilità aggiuntiva è quella standard dei
software paghe italiani: stessa aliquota IVS del resto dell'anno, IRPEF
all'**aliquota marginale** (quella dell'ultimo scaglione raggiunto
dall'imponibile annuo, non gli scaglioni progressivi ricalcolati da zero) e
**nessuna detrazione propria** — le detrazioni mensili sono già "consumate"
dalle 12 mensilità ordinarie. Per questo la tredicesima risulta sempre più
bassa delle mensilità ordinarie, un effetto reale e non un artefatto del
modello.

Quello che il grafico **non** prova a mostrare è la rateizzazione delle
addizionali regionale e comunale su un mese preciso: a differenza
dell'aliquota marginale sulla tredicesima, il numero di rate e il mese di
partenza sono una scelta del sostituto d'imposta (del software paghe), non
fissata dalla legge in modo univoco — esattamente la stessa ragione per cui
il netto principale resta una media annua e non un cedolino. Le addizionali
restano quindi implicitamente spalmate sulle mensilità ordinarie. Per questo
il grafico è marcato **stima illustrativa**, un livello di fiducia più basso
persino del costo azienda: utile a capire *perché* la tredicesima è più
bassa, non un calendario di pagamenti preciso.

## Estensioni oltre il perimetro del brief

Il brief chiede RAL → netto dipendente. Due estensioni sono state aggiunte
dopo, esplicitamente fuori dal perimetro minimo. Nel secondo passaggio di
refinement sono state anche retrocesse a sezioni secondarie e collassate
della pagina, per non competere visivamente con il percorso principale — la
logica di calcolo non è cambiata, è cambiato solo quanto spazio occupano.
Vanno lette con un livello di fiducia diverso dal resto:

### Costo azienda — stima, non calcolo verificato

Il netto dipendente è uniforme per ogni impiegato privato: stesse regole
IRPEF, stesse detrazioni, indipendentemente dal settore. Il costo azienda no:
dipende da variabili che la RAL da sola non contiene.

| Voce | Aliquota | Solidità |
|---|---:|---|
| Contributi IVS datore | 23,81% (33% totale − 9,19% lavoratore) | Stessa fonte già verificata (INPS, circolare 101/2024) |
| NASpI | 1,31% | Aliquota ordinaria stabile dal 2013 (L. 92/2012, art. 2 c. 25) |
| Fondo Garanzia TFR | 0,20% | INPS — scheda di servizio dedicata |
| TFR maturando | 6,91% (RAL/13,5 = 7,41%, meno lo 0,5% versato all'INPS) | Confermato dal blog di Jet HR stesso, incrociato con un manuale tecnico di payroll |
| **INAIL** | **0,50%, tasso indicativo** | **Non verificabile dalla sola RAL**: il tasso reale dipende dalla "voce di tariffa" della lavorazione dell'azienda (da 0,4% a oltre 8%), pubblicata da INAIL per singola azienda, non per mansione |

Per questo il costo azienda è marcato in pagina come **stima**, distinto dal
netto dipendente marcato come **calcolo verificato**. Esclusi esplicitamente:
CIGO/CIGS e fondi di solidarietà bilaterali, che dipendono da settore e
dimensione aziendale in un modo che non è deducibile dalla sola RAL.

### Calcolo inverso (netto → RAL)

`ralPerNetto()` risolve per bisezione: non c'è una formula chiusa perché il
netto non è ovunque monotono in RAL (le soglie di legge creano piccoli salti
all'ingiù, es. l'esenzione comunale di Milano). La bisezione converge entro
un centesimo lontano dalle soglie; in loro prossimità il valore resta
"circa", non un valore unico. La pagina lo segnala attivamente: se la RAL
trovata cade entro 300 € (di imponibile o di RAL, a seconda della soglia) da
uno dei punti noti del motore diretto, mostra un avviso nel risultato, non
solo nel dettaglio. L'input accetta anche un netto mensile (con la
mensilità di riferimento), convertito in target annuale prima di risolvere.

### Assistente alla simulazione

Non è un chatbot generico: è un livello di spiegazione sopra il motore,
attivabile da un bottone "Chiedi all'assistente" sotto il risultato o dai
bottoni "Spiega" su ogni voce della cascata e del costo azienda — le due
entry point aprono lo stesso pannello (drawer laterale su desktop, foglio
dal basso su mobile), non due componenti diversi.

Ogni risposta è costruita da `S.calc`/`S.costo`, cioè dall'output già
prodotto da `Motore.calcola()`/`costoAzienda()` per la RAL corrente:
l'assistente non contiene una sola formula propria. L'unica eccezione è il
confronto tra due RAL ("confronta 35.000 con 45.000"), che chiama di nuovo
`Motore.calcola()` — lo stesso motore, un nuovo input — mai una formula
riscritta a mano. Le domande libere sono interpretate con un
riconoscimento di parole chiave deterministico, non un modello linguistico:
non c'è un backend, quindi niente testo generato che possa inventare un
numero non presente nella simulazione. Su temi fuori dal perimetro
dichiarato (altri comuni, carichi di famiglia, CCNL, part-time, partita
IVA...) l'assistente lo dice esplicitamente e rimanda a questo documento,
invece di azzardare una stima.

### L'insight sul welfare esente

Un confronto, non un calcolo verificato: quanto costa all'azienda e quanto
arriva al dipendente scegliendo 1.000 € di welfare esente (L. 207/2024,
esente sia fiscalmente sia contributivamente) invece di 1.000 € di RAL in
più. Sul lato costo azienda, INAIL e TFR restano inclusi per prudenza — la
loro esenzione sul welfare non è verificata in questo prototipo, quindi il
risparmio mostrato è una stima conservativa, non un limite superiore.
