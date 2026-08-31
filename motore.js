/* Motore di calcolo RAL -> netto. Script classico (non ES module) così
   funziona sia in Node (per i test) sia aperto con file:// nel browser.
   Caso coperto: impiegato privato, tempo indeterminato, Milano, anno
   intero, nessuna agevolazione. Vedi processo/assunzioni-e-fonti.md. */
(function (root) {
  'use strict';

  var RAL_MASSIMA = 1000000;

  var K = {
    inps: { aliquota: 0.0919, aliquotaAggiuntiva: 0.01, primaFascia: 56224, massimale: 122295 },
    irpef: { scaglioni: [[28000, 0.23], [50000, 0.33], [Infinity, 0.43]] },
    detrLavoro: { sogliaBassa: 15000, sogliaAlta: 50000, minimoTempoIndeterminato: 690, maggiorazione: 65, maggiorazioneDa: 25000, maggiorazioneA: 35000 },
    cuneo: { sogliaBonus: 20000, sogliaUltFissa: 32000, sogliaUltZero: 40000, ultImporto: 1000 },
    trattIntegrativo: { sogliaReddito: 15000, importo: 1200, scarto: 75 },
    lombardia: { scaglioni: [[15000, 0.0123], [28000, 0.0158], [50000, 0.0172], [Infinity, 0.0173]] },
    milano: { esenzioneFinoA: 23000, aliquota: 0.008 },
    // Costo azienda: le prime quattro voci sono aliquote nazionali stabili;
    // INAIL è l'eccezione, un tasso indicativo dichiarato (vedi
    // processo/assunzioni-e-fonti.md), non uno dei tassi ufficiali di
    // tariffa, che dipendono dalla lavorazione dell'azienda, non dalla RAL.
    costoAzienda: { ivsDatore: 0.2381, naspi: 0.0131, fondoGaranziaTfr: 0.0020, inailIndicativo: 0.0050, tfr: 0.0691 }
  };

  // Arrotondamento commerciale al centesimo. +1e-9 evita che errori di
  // rappresentazione binaria (es. 1.005 memorizzato come 1.00499...) tronchino
  // verso il basso invece di arrotondare a mezzo in su.
  function centesimo(x) {
    var segno = x < 0 ? -1 : 1;
    return segno * Math.round((Math.abs(x) + 1e-9) * 100) / 100;
  }

  // L'art. 13 TUIR impone il troncamento a quattro cifre decimali sui
  // rapporti che determinano la detrazione da lavoro dipendente: non è un
  // arrotondamento a fine calcolo, è tagliare la frazione prima di
  // moltiplicarla. Un semplice round-alla-fine sposta il risultato di alcuni
  // centesimi rispetto al valore dovuto per legge.
  function troncaQuattro(x) {
    return Math.trunc((x + 1e-9) * 10000) / 10000;
  }

  function perScaglioni(base, scaglioni) {
    var imposta = 0, precedente = 0;
    for (var i = 0; i < scaglioni.length; i++) {
      var tetto = scaglioni[i][0], aliquota = scaglioni[i][1];
      var quota = Math.min(Math.max(base - precedente, 0), tetto - precedente);
      imposta += quota * aliquota;
      precedente = tetto;
      if (base <= tetto) break;
    }
    return imposta;
  }

  function contributiIvs(ral) {
    var base = Math.min(ral, K.inps.massimale);
    return base * K.inps.aliquota;
  }

  function contributoAggiuntivo(ral) {
    var base = Math.min(ral, K.inps.massimale);
    return Math.max(0, base - K.inps.primaFascia) * K.inps.aliquotaAggiuntiva;
  }

  function contributi(ral) {
    return contributiIvs(ral) + contributoAggiuntivo(ral);
  }

  function imponibile(ral) {
    return ral - contributi(ral);
  }

  function irpefLorda(imp) {
    return perScaglioni(imp, K.irpef.scaglioni);
  }

  // Art. 13 TUIR. Il minimo di 690 € per il tempo indeterminato evita che la
  // rampa lineare tra 28.000 e 50.000 scenda sotto quella soglia prima di
  // azzerarsi davvero a 50.000.
  function detrazioneLavoroDipendente(imp) {
    var D = K.detrLavoro, base;
    if (imp <= D.sogliaBassa) base = 1955;
    else if (imp <= 28000) base = 1910 + 1190 * troncaQuattro((28000 - imp) / 13000);
    else if (imp <= D.sogliaAlta) base = Math.max(D.minimoTempoIndeterminato, 1910 * troncaQuattro((D.sogliaAlta - imp) / 22000));
    else base = 0;
    var maggiorazione = (imp > D.maggiorazioneDa && imp <= D.maggiorazioneA) ? D.maggiorazione : 0;
    return base + maggiorazione;
  }

  // Cuneo fiscale L. 207/2024: sotto i 20.000 un bonus esente (non riduce
  // l'imposta, si somma al netto); tra 20.000 e 40.000 una detrazione.
  function bonusCuneoFiscale(imp) {
    if (imp > K.cuneo.sogliaBonus) return 0;
    var pct = imp <= 8500 ? 0.071 : imp <= 15000 ? 0.053 : 0.048;
    return imp * pct;
  }

  function ulterioreDetrazione(imp) {
    var C = K.cuneo;
    if (imp <= C.sogliaBonus || imp > C.sogliaUltZero) return 0;
    if (imp <= C.sogliaUltFissa) return C.ultImporto;
    return C.ultImporto * (C.sogliaUltZero - imp) / 8000;
  }

  // Capienza: le detrazioni abbattono l'imposta ma non sono rimborsabili.
  // Si consuma prima la detrazione da lavoro dipendente, poi l'ulteriore.
  function applicaCapienza(lorda, detrLav, detrUlt) {
    var usoLav = Math.min(detrLav, lorda);
    var usoUlt = Math.min(detrUlt, lorda - usoLav);
    return { usoLav: usoLav, usoUlt: usoUlt, irpefNetta: Math.max(0, lorda - usoLav - usoUlt) };
  }

  // La norma confronta l'imposta lorda con la detrazione SPETTANTE (art. 13),
  // non con quella effettivamente assorbita dopo la capienza: sono due
  // importi diversi ogni volta che la capienza taglia la detrazione.
  function trattamentoIntegrativo(imp, lorda, detrLavSpettante) {
    var T = K.trattIntegrativo;
    if (imp > T.sogliaReddito) return 0;
    return lorda > (detrLavSpettante - T.scarto) ? T.importo : 0;
  }

  function addizionale(imp, dovuta, scaglioni) {
    if (!dovuta) return 0;
    return perScaglioni(imp, scaglioni);
  }

  function addizionaleRegionale(imp, dovuta) {
    return addizionale(imp, dovuta, K.lombardia.scaglioni);
  }

  function addizionaleComunale(imp, dovuta) {
    if (!dovuta || imp <= K.milano.esenzioneFinoA) return 0;
    return imp * K.milano.aliquota;
  }

  // Aliquota marginale: quella dell'ultimo scaglione raggiunto
  // dall'imponibile annuo (non una media pesata sugli scaglioni
  // attraversati). E' l'aliquota con cui i software paghe tassano una
  // mensilita' aggiuntiva (tredicesima/quattordicesima), non gli scaglioni
  // progressivi ricalcolati da zero.
  function aliquotaMarginale(imp) {
    var scaglioni = K.irpef.scaglioni;
    for (var i = 0; i < scaglioni.length; i++) {
      if (imp <= scaglioni[i][0]) return scaglioni[i][1];
    }
    return scaglioni[scaglioni.length - 1][1];
  }

  // Piano illustrativo delle mensilita': come il netto annuale (calc.netto,
  // gia' verificato) si distribuisce tra le mensilita' ordinarie e le
  // eventuali mensilita' aggiuntive (tredicesima/quattordicesima).
  // Convenzione standard payroll: la mensilita' aggiuntiva e' tassata
  // all'aliquota marginale, senza le detrazioni mensili (gia' "consumate"
  // dalle 12 mensilita' ordinarie) — per questo e' sempre piu' bassa.
  // Le addizionali regionale/comunale NON vengono isolate su un mese preciso:
  // la loro rateizzazione e' una scelta del sostituto d'imposta, non fissata
  // per legge, quindi restano spalmate implicitamente sulle mensilita'
  // ordinarie. E' per questo che il risultato e' una stima illustrativa del
  // pattern (utile a capire perche' la tredicesima "sembra" piu' bassa), non
  // un cedolino verificato come il netto annuale da cui parte.
  function pianoMensilita(calc, numeroMensilita) {
    if (numeroMensilita === 12) {
      return { ordinarie: 12, importoOrdinario: centesimo(calc.netto / 12), extra: [] };
    }
    var numeroExtra = numeroMensilita - 12;
    var aliquota = aliquotaMarginale(calc.imponibile);
    var lordoExtra = calc.ral / numeroMensilita;
    var ivsExtra = lordoExtra * K.inps.aliquota;
    var impExtra = lordoExtra - ivsExtra;
    var nettoExtra = centesimo(lordoExtra - ivsExtra - impExtra * aliquota);
    var extra = [];
    for (var i = 0; i < numeroExtra; i++) extra.push(nettoExtra);
    var totaleExtra = centesimo(nettoExtra * numeroExtra);
    var importoOrdinario = centesimo((calc.netto - totaleExtra) / 12);
    return { ordinarie: 12, importoOrdinario: importoOrdinario, extra: extra };
  }

  function calcola(ralInput) {
    if (typeof ralInput !== 'number' || !isFinite(ralInput) || ralInput < 0) {
      return { errore: 'RAL non valida. Inserisci un numero maggiore o uguale a zero.' };
    }
    if (ralInput > RAL_MASSIMA) {
      return { errore: 'Il calcolatore copre RAL fino a 1.000.000 €. Oltre questa cifra il modello a input singolo non descrive più un caso realistico.' };
    }

    var ral = ralInput;
    var ivs = contributiIvs(ral);
    var agg = contributoAggiuntivo(ral);
    var imp = centesimo(imponibile(ral));
    var lorda = centesimo(irpefLorda(imp));
    var detrLav = detrazioneLavoroDipendente(imp);
    var detrUlt = ulterioreDetrazione(imp);
    var cap = applicaCapienza(lorda, detrLav, detrUlt);
    var irpefNetta = centesimo(cap.irpefNetta);
    var dovuteAddizionali = irpefNetta > 0;
    var addReg = centesimo(addizionaleRegionale(imp, dovuteAddizionali));
    var addCom = centesimo(addizionaleComunale(imp, dovuteAddizionali));
    var bonus = centesimo(bonusCuneoFiscale(imp));
    var ti = centesimo(trattamentoIntegrativo(imp, lorda, detrLav));

    var voci = [
      { id: 'ivs', tipo: 'contributo', label: 'Contributi INPS (9,19%)', importo: -centesimo(ivs), base: ral, fonte: 'inps6' }
    ];
    if (agg > 0) voci.push({ id: 'aggiuntivo', tipo: 'contributo', label: 'Contributo aggiuntivo 1% (oltre 56.224 €)', importo: -centesimo(agg), base: ral, fonte: 'inps6' });
    voci.push({ id: 'irpef', tipo: 'imposta', label: 'IRPEF netta', importo: irpefNetta > 0 ? -irpefNetta : 0, base: imp, fonte: 'l199', dettaglio: { lorda: lorda, detrLavUsata: centesimo(cap.usoLav), detrUltUsata: centesimo(cap.usoUlt) } });
    if (addReg > 0) voci.push({ id: 'addreg', tipo: 'imposta', label: 'Addizionale regionale Lombardia', importo: -addReg, base: imp, fonte: 'lomb' });
    if (addCom > 0) voci.push({ id: 'addcom', tipo: 'imposta', label: 'Addizionale comunale Milano', importo: -addCom, base: imp, fonte: 'milano' });
    if (bonus > 0) voci.push({ id: 'bonus', tipo: 'integrazione', label: 'Bonus cuneo fiscale (esente)', importo: bonus, base: imp, fonte: 'l207c4' });
    if (ti > 0) voci.push({ id: 'ti', tipo: 'integrazione', label: 'Trattamento integrativo', importo: ti, base: imp, fonte: 'dl3' });

    var netto = voci.reduce(function (s, v) { return s + v.importo; }, ral);
    netto = centesimo(netto);

    return {
      ral: ral,
      imponibile: imp,
      irpefLorda: lorda,
      contributi: centesimo(ivs + agg),
      irpefNetta: irpefNetta,
      addizionaleRegionale: addReg,
      addizionaleComunale: addCom,
      integrazioni: centesimo(bonus + ti),
      voci: voci,
      netto: netto,
      mensile13: centesimo(netto / 13),
      mensile12: centesimo(netto / 12)
    };
  }

  // Costo azienda: stima, non calcolo verificato come il netto dipendente.
  // Le prime quattro voci sono aliquote nazionali stabili; l'INAIL è un tasso
  // indicativo (vedi K.costoAzienda.inailIndicativo) perché il tasso reale
  // dipende dalla lavorazione dell'azienda, non deducibile dalla sola RAL.
  function contributiDatore(ral) { return centesimo(Math.min(ral, K.inps.massimale) * K.costoAzienda.ivsDatore); }
  function naspi(ral) { return centesimo(ral * K.costoAzienda.naspi); }
  function fondoGaranziaTfr(ral) { return centesimo(ral * K.costoAzienda.fondoGaranziaTfr); }
  function inailIndicativo(ral) { return centesimo(ral * K.costoAzienda.inailIndicativo); }
  // RAL/13,5 = 7,41% di accantonamento lordo, meno lo 0,5% versato
  // all'INPS (Fondo Adeguamento Pensioni): 6,91% netto. Fonte: blog Jet HR
  // "TFR in busta paga", incrociata con un manuale tecnico di payroll.
  function tfrMaturando(ral) { return centesimo(ral * K.costoAzienda.tfr); }

  function costoAzienda(ralInput) {
    if (typeof ralInput !== 'number' || !isFinite(ralInput) || ralInput < 0 || ralInput > RAL_MASSIMA) {
      return { errore: 'RAL non valida.' };
    }
    var ral = ralInput;
    var voci = [
      { id: 'contrDatore', label: 'Contributi INPS a carico azienda (23,81%)', importo: contributiDatore(ral), fonte: 'inps101' },
      { id: 'naspi', label: 'NASpI (1,31%)', importo: naspi(ral), fonte: 'naspi' },
      { id: 'fondoGaranzia', label: 'Fondo Garanzia TFR (0,20%)', importo: fondoGaranziaTfr(ral), fonte: 'fgtfr' },
      { id: 'inail', label: 'INAIL (tasso indicativo 0,50%)', importo: inailIndicativo(ral), fonte: 'inail' },
      { id: 'tfr', label: 'TFR maturando (6,91%)', importo: tfrMaturando(ral), fonte: 'tfr' }
    ];
    var totale = centesimo(voci.reduce(function (s, v) { return s + v.importo; }, ral));
    return { ral: ral, voci: voci, totale: totale };
  }

  // Calcolo inverso: da un netto annuale desiderato, la RAL che lo produce.
  // Il netto non è ovunque monotono in RAL (le soglie del motore diretto
  // creano piccoli salti all'ingiù): la bisezione converge correttamente
  // quasi ovunque, ma vicino a una soglia il risultato è "circa", non un
  // valore unico. Lo dichiariamo in UI, non solo qui.
  function ralPerNetto(nettoTarget) {
    if (typeof nettoTarget !== 'number' || !isFinite(nettoTarget) || nettoTarget < 0) {
      return { errore: 'Netto non valido. Inserisci un numero maggiore o uguale a zero.' };
    }
    var nettoMax = calcola(RAL_MASSIMA).netto;
    if (nettoTarget > nettoMax) {
      return { errore: 'Netto troppo alto per il tetto di 1.000.000 € di RAL coperto dal calcolatore.' };
    }
    var basso = 0, alto = RAL_MASSIMA;
    for (var i = 0; i < 60; i++) {
      var meta = (basso + alto) / 2;
      var r = calcola(meta);
      if (r.netto < nettoTarget) basso = meta; else alto = meta;
      if (alto - basso < 0.005) break;
    }
    var ral = centesimo((basso + alto) / 2);
    var risultato = calcola(ral);
    return { ral: ral, netto: risultato.netto, scarto: centesimo(risultato.netto - nettoTarget) };
  }

  var API = {
    calcola: calcola,
    costoAzienda: costoAzienda,
    ralPerNetto: ralPerNetto,
    contributiDatore: contributiDatore,
    naspi: naspi,
    fondoGaranziaTfr: fondoGaranziaTfr,
    inailIndicativo: inailIndicativo,
    tfrMaturando: tfrMaturando,
    contributiIvs: contributiIvs,
    contributoAggiuntivo: contributoAggiuntivo,
    imponibile: imponibile,
    irpefLorda: irpefLorda,
    detrazioneLavoroDipendente: detrazioneLavoroDipendente,
    ulterioreDetrazione: ulterioreDetrazione,
    bonusCuneoFiscale: bonusCuneoFiscale,
    applicaCapienza: applicaCapienza,
    trattamentoIntegrativo: trattamentoIntegrativo,
    addizionaleRegionale: addizionaleRegionale,
    addizionaleComunale: addizionaleComunale,
    aliquotaMarginale: aliquotaMarginale,
    pianoMensilita: pianoMensilita,
    centesimo: centesimo,
    RAL_MASSIMA: RAL_MASSIMA,
    K: K
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.Motore = API;
})(typeof window !== 'undefined' ? window : this);
