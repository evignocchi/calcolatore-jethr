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
ricalcolato a parte — così la tabella mostrata in pagina chiude sempre.

## Mensilità

Il brief chiede "netto annuale e mensile". Il prototipo mostra la **media su
13 mensilità** come valore principale (convenzione più comune per un impiegato
privato) e la media su 12 come alternativa, dichiarando esplicitamente che è
una media e non l'importo del singolo cedolino — la tredicesima non gode delle
stesse detrazioni mensili e il conguaglio annuale riequilibra le differenze.
