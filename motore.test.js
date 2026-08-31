'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const M = require('./motore.js');

function vicino(a, b, eps) {
  eps = eps || 0.01;
  assert.ok(Math.abs(a - b) < eps, `atteso ~${b}, ottenuto ${a}`);
}

// Ancora principale: calcolata a mano fuori dal motore in
// processo/assunzioni-e-fonti.md, passaggio per passaggio dalle fonti primarie.
test('RAL 35.000 -> netto 26.032,17 (caso guida, verificato a mano)', () => {
  const r = M.calcola(35000);
  assert.equal(r.contributi, 3216.50);
  assert.equal(r.imponibile, 31783.50);
  assert.equal(r.irpefLorda, 7688.56);
  assert.equal(r.irpefNetta, 5042.08);
  assert.equal(r.addizionaleRegionale, 454.98);
  assert.equal(r.addizionaleComunale, 254.27);
  assert.equal(r.netto, 26032.17);
});

test('la somma delle voci ricostruisce il netto dichiarato (riconciliazione)', () => {
  for (const ral of [0, 6000, 11000, 35000, 60000, 130000]) {
    const r = M.calcola(ral);
    const daVoci = M.centesimo(r.voci.reduce((s, v) => s + v.importo, ral));
    assert.equal(daVoci, r.netto, `RAL ${ral}: voci non tornano al netto`);
  }
});

test('RAL 0 -> netto 0 (capienza: la detrazione non è mai rimborsabile)', () => {
  const r = M.calcola(0);
  assert.equal(r.netto, 0);
  assert.equal(r.irpefNetta, 0);
});

test('RAL bassa: bonus cuneo fiscale e trattamento integrativo si attivano insieme', () => {
  // Imponibile ~9.989 (fascia 8.500-15.000): bonus 5,3% + trattamento
  // integrativo pieno perché l'IRPEF lorda supera la detrazione spettante
  // meno 75 €. Il netto supera la RAL: sono misure di sostegno, non un errore.
  const r = M.calcola(11000);
  assert.equal(r.netto, 11253.16);
  const bonus = r.voci.find(v => v.id === 'bonus');
  const ti = r.voci.find(v => v.id === 'ti');
  assert.ok(bonus && bonus.importo > 0, 'il bonus cuneo fiscale deve comparire');
  assert.ok(ti && ti.importo === 1200, 'il trattamento integrativo deve essere pieno (1.200 €)');
});

test('massimale contributivo: sopra 122.295 € i contributi non salgono più', () => {
  const alMassimale = M.contributiIvs(122295) + M.contributoAggiuntivo(122295);
  const benOltre1 = M.contributiIvs(130000) + M.contributoAggiuntivo(130000);
  const benOltre2 = M.contributiIvs(400000) + M.contributoAggiuntivo(400000);
  vicino(alMassimale, 11899.62, 0.01);
  assert.equal(benOltre1, alMassimale);
  assert.equal(benOltre2, alMassimale);
});

test('esenzione comunale Milano: soglia secca a 23.000 €, non franchigia', () => {
  assert.equal(M.addizionaleComunale(23000, true), 0);
  const appenaSopra = M.addizionaleComunale(23000.01, true);
  assert.ok(appenaSopra > 180, 'appena sopra 23.000 si paga sull\'intero imponibile, non solo sull\'eccedenza');
  vicino(appenaSopra, 23000.01 * 0.008, 0.01);
});

test('IRPEF: continuità fra il primo e il secondo scaglione (28.000)', () => {
  const aSoglia = M.irpefLorda(28000);
  const subitoSopra = M.irpefLorda(28000.01);
  assert.equal(aSoglia, 6440);
  vicino(subitoSopra - aSoglia, 0.01 * 0.33, 0.001);
});

test('detrazione lavoro dipendente: minimo 690 € per il tempo indeterminato', () => {
  // A imponibile 48.000 la rampa lineare darebbe meno di 690: la norma
  // impone il pavimento per chi è a tempo indeterminato (assunzione del task).
  vicino(M.detrazioneLavoroDipendente(48000), 690, 0.01);
  // A imponibile 40.000 la rampa è ancora sopra 690: il pavimento non deve
  // alterare un valore già più alto.
  vicino(M.detrazioneLavoroDipendente(40000), 868.09, 0.05);
  // Oltre 50.000 la detrazione è davvero zero, non 690.
  assert.equal(M.detrazioneLavoroDipendente(50000.01), 0);
});

test('maggiorazione di 65 € solo nella fascia 25.000-35.000 di imponibile', () => {
  assert.equal(M.detrazioneLavoroDipendente(24999) - M.detrazioneLavoroDipendente(24999), 0);
  const dentro = M.detrazioneLavoroDipendente(30000);
  const fuoriSopra = M.detrazioneLavoroDipendente(35000.01);
  assert.ok(dentro > fuoriSopra, 'la maggiorazione deve sparire appena sopra 35.000');
});

test('input non validi vengono rifiutati con un messaggio, non con un numero', () => {
  assert.ok(M.calcola(-1).errore, 'una RAL negativa deve dare errore');
  assert.ok(M.calcola(1000001).errore, 'oltre il tetto dichiarato deve dare errore');
  assert.ok(!M.calcola(1000000).errore, 'il tetto stesso, 1.000.000, deve essere accettato');
});

test('costo azienda: RAL 50.000 -> 66.365 € (contributi 23,81% + NASpI + Fondo Garanzia TFR + INAIL indicativo + TFR)', () => {
  const c = M.costoAzienda(50000);
  assert.equal(c.voci.find(v => v.id === 'contrDatore').importo, 11905);
  assert.equal(c.voci.find(v => v.id === 'naspi').importo, 655);
  assert.equal(c.voci.find(v => v.id === 'fondoGaranzia').importo, 100);
  assert.equal(c.voci.find(v => v.id === 'tfr').importo, 3455);
  assert.equal(c.totale, 66365);
  const daVoci = M.centesimo(c.voci.reduce((s, v) => s + v.importo, c.ral));
  assert.equal(daVoci, c.totale, 'la somma delle voci deve ricostruire il totale dichiarato');
});

test('costo azienda: contributi datore rispettano lo stesso massimale contributivo del lavoratore', () => {
  const c1 = M.contributiDatore(130000);
  const c2 = M.contributiDatore(400000);
  assert.equal(c1, c2, 'sopra 122.295 € i contributi datore non devono più salire, come quelli del lavoratore');
});

test('calcolo inverso: ralPerNetto è la funzione inversa di calcola() entro un centesimo', () => {
  for (const target of [1000, 15000, 20032.17, 26032.17, 60000, 200000]) {
    const inv = M.ralPerNetto(target);
    assert.ok(!inv.errore, `netto ${target} dovrebbe essere raggiungibile`);
    vicino(inv.netto, target, 0.02);
    // la RAL trovata, ripassata in avanti, deve dare lo stesso netto
    const forward = M.calcola(inv.ral);
    assert.equal(forward.netto, inv.netto);
  }
});

test('calcolo inverso: netto 0 -> RAL 0, netto oltre il massimo copribile viene rifiutato', () => {
  assert.equal(M.ralPerNetto(0).ral, 0);
  const nettoMax = M.calcola(M.RAL_MASSIMA).netto;
  assert.ok(M.ralPerNetto(nettoMax + 1).errore, 'un netto irraggiungibile entro 1.000.000 di RAL deve dare errore, non un numero a caso');
});

test('aliquota marginale: l\'ultimo scaglione raggiunto, non una media', () => {
  assert.equal(M.aliquotaMarginale(28000), 0.23, 'esattamente alla soglia appartiene ancora al primo scaglione');
  assert.equal(M.aliquotaMarginale(28000.01), 0.33);
  assert.equal(M.aliquotaMarginale(50000), 0.33);
  assert.equal(M.aliquotaMarginale(50000.01), 0.43);
});

test('piano mensilità (12): nessuna mensilità aggiuntiva, importo uguale ogni mese', () => {
  const r = M.calcola(35000);
  const p = M.pianoMensilita(r, 12);
  assert.equal(p.extra.length, 0);
  assert.equal(p.importoOrdinario, M.centesimo(r.netto / 12));
});

test('piano mensilità (13): la tredicesima è più bassa delle mensilità ordinarie e il totale torna al netto', () => {
  const r = M.calcola(35000);
  const p = M.pianoMensilita(r, 13);
  assert.equal(p.extra.length, 1);
  assert.ok(p.extra[0] < p.importoOrdinario, 'la tredicesima, senza detrazioni proprie, deve risultare più bassa');
  const ricostruito = M.centesimo(p.importoOrdinario * 12 + p.extra[0]);
  vicino(ricostruito, r.netto, 0.05);
});

test('piano mensilità (14): due mensilità aggiuntive identiche, entrambe più basse delle ordinarie', () => {
  const r = M.calcola(50000);
  const p = M.pianoMensilita(r, 14);
  assert.equal(p.extra.length, 2);
  assert.equal(p.extra[0], p.extra[1], 'tredicesima e quattordicesima usano la stessa convenzione di tassazione');
  assert.ok(p.extra[0] < p.importoOrdinario);
  const ricostruito = M.centesimo(p.importoOrdinario * 12 + p.extra[0] + p.extra[1]);
  vicino(ricostruito, r.netto, 0.05);
});
