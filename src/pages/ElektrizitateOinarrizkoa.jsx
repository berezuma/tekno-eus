import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, ArrowRight, RotateCcw, Lightbulb, GitBranch, Calculator } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

/* ---- SECTION WRAPPER ---- */
const Section = ({ id, icon, title, color, children }) => (
  <section id={id} className="mb-14">
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white`}>{icon}</div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {children}
  </section>
);

/* ============================================================
   OSAGAI ELEKTRONIKOAK
   ============================================================ */
const OSAGAIAK = [
  {
    emoji: '🔋',
    name: 'Pila / Bateria',
    symbol: '+  —',
    color: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    tagColor: 'bg-yellow-500',
    desc: 'Energia elektrikoaren iturria. Polo positiboa (+) eta negatiboa (−) ditu. Adibideak: 1,5V AA pila, 9V bloke-pila, 12V autoko bateria.',
    tip: 'Tentsioa (V) ematen du. Korrontea polo positibotik irten eta negatiborako itzultzen da.',
  },
  {
    emoji: '〰',
    name: 'Erresistentzia',
    symbol: 'R (Ω)',
    color: 'bg-slate-100 border-slate-300 text-slate-800',
    tagColor: 'bg-slate-600',
    desc: 'Korrontea mugatzen duen osagaia. Ohmetan (Ω) neurtzen da. Kolore-bandak balioa adierazten dute.',
    tip: 'Adibidea: 220Ω erresistentzia LED baten aurrean jartzea — gehiegizko korrontea saihesteko.',
  },
  {
    emoji: '💡',
    name: 'LED',
    symbol: '▷|',
    color: 'bg-amber-50 border-amber-300 text-amber-800',
    tagColor: 'bg-amber-500',
    desc: 'Argia igortzen duen diodoa (Light Emitting Diode). Norabide bakarrean utzi du korrontea igarotzen. ~2V eta ~20mA behar ditu.',
    tip: 'Beti erresistentzia batekin erabili, ez dadin erre. I = (V − 2) / R formularekin kalkulatu.',
  },
  {
    emoji: '🔌',
    name: 'Etengailua',
    symbol: '○—/—○',
    color: 'bg-blue-50 border-blue-300 text-blue-800',
    tagColor: 'bg-blue-600',
    desc: 'Zirkuitua ireki (eten) edo itxi (konektatuta) egiten du. Irekita badago, korrontea ez da igarotzen.',
    tip: 'Etxeko argi-interruptore bat etengailu bat da: ixten dugunean zirkuitua osatzen da eta argia pizten da.',
  },
  {
    emoji: '〜',
    name: 'Kondentsagailua',
    symbol: 'C (F)',
    color: 'bg-violet-50 border-violet-300 text-violet-800',
    tagColor: 'bg-violet-600',
    desc: 'Karga elektrikoa gordetzen duen osagaia. Faradiotan (F) neurtzen da. Kargatu eta descargatu egin daiteke azkar.',
    tip: 'Flasheko kameran erabiltzen da: arin kargatzen da eta momentu batean energia guztia argitara botzen du.',
  },
];

const OsagaiElektronikoak = () => {
  const [active, setActive] = useState(0);
  const os = OSAGAIAK[active];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Component selector */}
      <div className="flex overflow-x-auto border-b border-slate-200">
        {OSAGAIAK.map((o, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-5 py-3 text-xs font-semibold transition-all border-b-2 ${
              active === i
                ? 'border-amber-500 text-amber-700 bg-amber-50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="text-xl">{o.emoji}</span>
            <span className="hidden sm:inline">{o.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{os.emoji}</span>
              <div>
                <div className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold ${os.tagColor} mb-1`}>
                  {os.symbol}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{os.name}</h3>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">{os.desc}</p>
            <div className={`flex items-start gap-3 p-3 rounded-xl border ${os.color}`}>
              <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{os.tip}</p>
            </div>
          </div>

          {/* Mini circuit using this component */}
          <div className="bg-slate-50 rounded-xl p-5 flex flex-col items-center justify-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Adibide-zirkuitua</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="flex flex-col items-center">
                <div className="px-3 py-2 bg-yellow-200 border-2 border-yellow-500 rounded-lg text-sm font-bold text-yellow-800">🔋 9V</div>
              </div>
              <div className="h-px w-5 bg-slate-400"></div>
              <div className={`px-3 py-2 border-2 rounded-lg text-sm font-bold ${os.color}`}>
                {os.emoji} {os.name.split('/')[0].trim()}
              </div>
              {active !== 0 && (
                <>
                  <div className="h-px w-5 bg-slate-400"></div>
                  <div className="px-3 py-2 bg-amber-100 border-2 border-amber-400 rounded-full text-sm">💡</div>
                </>
              )}
              <div className="h-px w-5 bg-slate-400"></div>
              <div className="h-px w-5 bg-slate-400" style={{ transform: 'rotate(90deg)', width: '1px', height: '20px' }}></div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center italic">Korrontea pilaren + poletik osagaien artetik igarotzen da eta − polora itzultzen da</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   OHM KALKULAGAILUA
   ============================================================ */
const OhmCalculator = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [solveFor, setSolveFor] = useState('voltage');

  const calculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    if (solveFor === 'voltage'    && !isNaN(I) && !isNaN(R)) setVoltage((I * R).toFixed(3));
    if (solveFor === 'current'    && !isNaN(V) && !isNaN(R)) setCurrent((V / R).toFixed(3));
    if (solveFor === 'resistance' && !isNaN(V) && !isNaN(I)) setResistance((V / I).toFixed(3));
  };

  const fields = [
    { key: 'voltage',    label: 'Tentsioa (V)',       unit: 'V', value: voltage,     setter: setVoltage,     dotColor: 'bg-yellow-400' },
    { key: 'current',    label: 'Intentsitatea (I)',   unit: 'A', value: current,     setter: setCurrent,     dotColor: 'bg-blue-500' },
    { key: 'resistance', label: 'Erresistentzia (R)', unit: 'Ω', value: resistance,  setter: setResistance,  dotColor: 'bg-rose-500' },
  ];

  const V = parseFloat(voltage), I = parseFloat(current), R = parseFloat(resistance);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Triangle visual */}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ohm-en Triangelua</p>
          <div className="relative w-36 h-36">
            {/* Triangle background */}
            <svg viewBox="0 0 144 144" className="w-full h-full">
              <polygon points="72,8 136,136 8,136" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2"/>
              <line x1="8" y1="72" x2="136" y2="72" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,3"/>
            </svg>
            {/* Labels */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
              <span className="text-2xl font-black text-yellow-500">V</span>
            </div>
            <div className="absolute bottom-6 left-6 text-center">
              <span className="text-xl font-black text-blue-500">I</span>
            </div>
            <div className="absolute bottom-6 right-6 text-center">
              <span className="text-xl font-black text-rose-500">R</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-2">
            Estali nahi duzuna:<br/>
            <span className="font-mono font-bold">V=I×R · I=V/R · R=V/I</span>
          </p>
        </div>

        {/* Calculator */}
        <div className="md:col-span-3">
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zer kalkulatu?</label>
            <div className="flex flex-wrap gap-2">
              {fields.map(f => (
                <button key={f.key} onClick={() => setSolveFor(f.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${solveFor === f.key ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  <span className={`w-2 h-2 rounded-full ${f.dotColor}`}></span>
                  {f.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 mb-5">
            {fields.map(f => (
              <div key={f.key} className={`flex items-center gap-3 ${solveFor === f.key ? 'opacity-50' : ''}`}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${f.dotColor}`}></div>
                <label className="w-40 text-sm font-medium text-slate-700 shrink-0">{f.label}</label>
                <input type="number" value={f.value} onChange={e => f.setter(e.target.value)}
                  disabled={solveFor === f.key}
                  placeholder={solveFor === f.key ? 'Kalkulatuko da…' : 'Sartu balioa'}
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-slate-50 min-w-0"/>
                <span className="text-slate-400 text-sm font-mono w-4 shrink-0">{f.unit}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={calculate} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-5 py-2.5 rounded-lg transition-colors text-sm">
              <Zap className="w-4 h-4" /> Kalkulatu
            </button>
            <button onClick={() => { setVoltage(''); setCurrent(''); setResistance(''); }}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm">
              <RotateCcw className="w-4 h-4" /> Berrezarri
            </button>
          </div>

          {!isNaN(V) && !isNaN(I) && voltage && current && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm">
              <p className="font-semibold text-amber-800 mb-1">Potentzia ere:</p>
              <p className="font-mono text-amber-700">P = V × I = {V.toFixed(2)} × {I.toFixed(2)} = <strong>{(V * I).toFixed(2)} W</strong></p>
              {!isNaN(R) && resistance && <p className="font-mono text-amber-600 text-xs mt-1">P = I²×R = {I.toFixed(2)}² × {R.toFixed(2)} = {(I * I * R).toFixed(2)} W ✓</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   FORMULA ERREFERENTZIA
   ============================================================ */
const FORMULAK = [
  { formula: 'V = I × R',    desc: 'Tentsioa',         adibidea: '3A × 4Ω = 12V',  color: 'text-yellow-700 bg-yellow-50' },
  { formula: 'I = V / R',    desc: 'Intentsitatea',     adibidea: '12V / 4Ω = 3A',  color: 'text-blue-700 bg-blue-50' },
  { formula: 'R = V / I',    desc: 'Erresistentzia',    adibidea: '12V / 3A = 4Ω',  color: 'text-rose-700 bg-rose-50' },
  { formula: 'P = V × I',    desc: 'Potentzia',         adibidea: '12V × 3A = 36W', color: 'text-amber-700 bg-amber-50' },
  { formula: 'P = I² × R',   desc: 'Potentzia (alt.)',  adibidea: '3² × 4 = 36W',   color: 'text-amber-700 bg-amber-50' },
  { formula: 'P = V² / R',   desc: 'Potentzia (alt.)',  adibidea: '12² / 4 = 36W',  color: 'text-amber-700 bg-amber-50' },
];

const FormulaErreferentzia = () => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-800 text-white">
          <th className="text-left px-5 py-3 font-bold font-mono">Formula</th>
          <th className="text-left px-5 py-3 font-bold">Kalkulatzen du</th>
          <th className="text-left px-5 py-3 font-bold hidden sm:table-cell">Adibidea</th>
        </tr>
      </thead>
      <tbody>
        {FORMULAK.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
            <td className="px-5 py-3">
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${row.color}`}>{row.formula}</span>
            </td>
            <td className="px-5 py-3 text-slate-700">{row.desc}</td>
            <td className="px-5 py-3 font-mono text-slate-500 text-xs hidden sm:table-cell">{row.adibidea}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ============================================================
   ZIRKUITU MOTAK  (seriea + paraleloa)
   ============================================================ */
const ZIRKUITU_TYPES = {
  series: {
    label: 'Seriean',
    btnColor: '#2563eb',
    desc: 'Osagaiak bata bestearen atzetik konektatuta daude, kate moduan. Zirkuitu bat apurtzen bada, korrontea ez da igarotzen eta guztia itzaltzen da.',
    realWorld: '�io Apaindura-argi zaharrak (piskola): bat apurtu eta denak itzali!',
    formulak: [
      { label: 'Erresistentzia totala', val: 'Rₜ = R₁ + R₂ + R₃' },
      { label: 'Tentsioa', val: 'Vₜ = V₁ + V₂ + V₃' },
      { label: 'Intentsitatea', val: 'I₁ = I₂ = I₃ (berdina!)' },
    ],
    example: { V: 12, R1: 4, R2: 2 },
  },
  parallel: {
    label: 'Paraleloan',
    btnColor: '#059669',
    desc: 'Osagaiak adar ezberdinetan konektatuta daude. Adar bat apurtuz gero, besteak funtzionatzen jarraitzen dute.',
    realWorld: '🏠 Etxeko instalazioa: argi bat itzaliz gero, beste guztiak pizta mantentzen dira.',
    formulak: [
      { label: 'Erresistentzia totala', val: '1/Rₜ = 1/R₁ + 1/R₂ + 1/R₃' },
      { label: 'Tentsioa', val: 'V₁ = V₂ = V₃ (berdina!)' },
      { label: 'Intentsitatea', val: 'Iₜ = I₁ + I₂ + I₃' },
    ],
    example: { V: 12, R1: 6, R2: 3 },
  },
};

const SeriesVisual = ({ V, R1, R2 }) => {
  const Rt = R1 + R2;
  const I = V / Rt;
  const V1 = (I * R1).toFixed(1), V2 = (I * R2).toFixed(1);
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Zirkuitu Seriea — Adibidea</p>
      <div className="flex items-center justify-center gap-1 flex-wrap">
        <div className="flex flex-col items-center">
          <div className="px-2 py-1.5 bg-yellow-200 border-2 border-yellow-500 rounded-lg text-xs font-bold text-yellow-800 text-center">{V}V<br/>🔋</div>
        </div>
        <div className="flex items-center"><div className="w-6 h-px bg-slate-400"></div><div className="w-0 h-0 border-l-4 border-y-2 border-y-transparent border-l-slate-400"></div></div>
        <div className="flex flex-col items-center">
          <div className="px-2 py-1.5 bg-slate-200 border-2 border-slate-400 rounded-lg text-xs font-bold text-center text-slate-700">R₁={R1}Ω<br/><span className="text-blue-600">{V1}V</span></div>
        </div>
        <div className="flex items-center"><div className="w-6 h-px bg-slate-400"></div><div className="w-0 h-0 border-l-4 border-y-2 border-y-transparent border-l-slate-400"></div></div>
        <div className="flex flex-col items-center">
          <div className="px-2 py-1.5 bg-slate-200 border-2 border-slate-400 rounded-lg text-xs font-bold text-center text-slate-700">R₂={R2}Ω<br/><span className="text-blue-600">{V2}V</span></div>
        </div>
        <div className="flex items-center"><div className="w-6 h-px bg-slate-400"></div></div>
      </div>
      <p className="text-xs text-slate-500 text-center mt-3 font-mono">
        Rₜ = {R1}+{R2} = {Rt}Ω &nbsp;|&nbsp; I = {V}/{Rt} = <strong>{I.toFixed(2)}A</strong>
      </p>
    </div>
  );
};

const ParallelVisual = ({ V, R1, R2 }) => {
  const I1 = (V / R1).toFixed(2), I2 = (V / R2).toFixed(2);
  const Rt = (1 / (1/R1 + 1/R2)).toFixed(2);
  const It = (parseFloat(I1) + parseFloat(I2)).toFixed(2);
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Zirkuitu Paraleloa — Adibidea</p>
      <div className="flex items-center justify-center gap-3">
        <div className="px-2 py-1.5 bg-yellow-200 border-2 border-yellow-500 rounded-lg text-xs font-bold text-yellow-800 text-center">{V}V<br/>🔋</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="w-4 h-px bg-slate-400"></div>
            <div className="px-2 py-1.5 bg-slate-200 border-2 border-slate-400 rounded-lg text-xs font-bold text-slate-700 text-center">R₁={R1}Ω<br/><span className="text-blue-600">{I1}A</span></div>
            <div className="w-4 h-px bg-slate-400"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-px bg-slate-400"></div>
            <div className="px-2 py-1.5 bg-slate-200 border-2 border-slate-400 rounded-lg text-xs font-bold text-slate-700 text-center">R₂={R2}Ω<br/><span className="text-blue-600">{I2}A</span></div>
            <div className="w-4 h-px bg-slate-400"></div>
          </div>
        </div>
        <div className="text-xs text-slate-500 font-mono text-center">
          Iₜ={It}A<br/>Rₜ≈{Rt}Ω
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center mt-3 font-mono">
        Tentsioa berdina bi adabretan: {V}V = {V}V
      </p>
    </div>
  );
};

const ZirkuituInfo = () => {
  const [active, setActive] = useState('series');
  const t = ZIRKUITU_TYPES[active];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex border-b border-slate-200">
        {Object.entries(ZIRKUITU_TYPES).map(([key, val]) => (
          <button key={key} onClick={() => setActive(key)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-all border-b-2 ${active === key ? 'border-current text-white' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
            style={active === key ? { backgroundColor: val.btnColor, borderColor: val.btnColor } : {}}>
            Zirkuitu {val.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <p className="text-slate-600 leading-relaxed mb-4">{t.desc}</p>
        <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-5 text-sm text-emerald-800">
          <span className="text-base mt-0.5">{t.realWorld.split(' ')[0]}</span>
          <span>{t.realWorld.slice(t.realWorld.indexOf(' ')+1)}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Formulak</p>
            <div className="space-y-2">
              {t.formulak.map(f => (
                <div key={f.label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 pt-0.5 shrink-0">{f.label}</span>
                  <code className="text-sm font-mono text-slate-800">{f.val}</code>
                </div>
              ))}
            </div>
          </div>

          <div>
            {active === 'series'
              ? <SeriesVisual {...t.example} />
              : <ParallelVisual {...t.example} />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ = [
  {
    q: 'Ohm-en Legearen arabera, V = 12V eta R = 4Ω bada, intentsitatea zenbatekoa da?',
    opts: ['2 A', '3 A', '8 A', '48 A'],
    correct: 1,
    explanation: 'I = V / R = 12 / 4 = 3 A. Formula garrantzitsuena: I = V/R.',
  },
  {
    q: 'Seriean konektatutako zirkuitu batean, zer mantentzen da berdina osagai guztietan?',
    opts: ['Tentsioa (V)', 'Erresistentzia (R)', 'Intentsitatea (I)', 'Potentzia (P)'],
    correct: 2,
    explanation: 'Seriean, intentsitate bera igaro behar da osagai guztietatik. Tentsioa, ordea, banatu egiten da.',
  },
  {
    q: 'Potentziaren formula zein da?',
    opts: ['P = V / I', 'P = V × R', 'P = V × I', 'P = I / R'],
    correct: 2,
    explanation: 'P = V × I (Potentzia = Tentsioa × Intentsitatea). Watiotan (W) adierazten da.',
  },
  {
    q: 'Paraleloan konektatutako zirkuitu batean, zer mantentzen da berdina adar guztietan?',
    opts: ['Intentsitatea (I)', 'Tentsioa (V)', 'Erresistentzia (R)', 'Potentzia (P)'],
    correct: 1,
    explanation: 'Paraleloan, tentsio bera dute adar guztiek. Intentsitatea, aldiz, banatu egiten da adarren artean.',
  },
  {
    q: 'Erresistentzia batek R = 10Ω eta haren zeharko intentsitatea I = 2A bada, potentzia zenbatekoa da?',
    opts: ['5 W', '12 W', '20 W', '40 W'],
    correct: 3,
    explanation: 'P = I² × R = 2² × 10 = 4 × 10 = 40 W.',
  },
  {
    q: 'LED bat kaltetu gabe erabiltzeko beti jarri behar da:',
    opts: ['Kondentsagailu bat serie', 'Erresistentzia bat serie', 'Bigarren pila bat paraleoan', 'Etengailu bat paraleoan'],
    correct: 1,
    explanation: 'LED batek korronte mugatua behar du (~20mA). Erresistentzia seriean jarriz, gehiegizko korrontea saihesten da eta LEDa babesten da.',
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUIZ.filter((q, i) => answers[i] === q.correct).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="space-y-7">
        {QUIZ.map((q, i) => (
          <div key={i}>
            <p className="font-semibold text-slate-900 mb-3">{i + 1}. {q.q}</p>
            <div className="space-y-2">
              {q.opts.map((opt, j) => {
                let cls = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';
                if (submitted) {
                  if (j === q.correct) cls = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                  else if (answers[i] === j) cls = 'bg-rose-50 border-rose-300 text-rose-800 line-through opacity-70';
                  else cls = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                } else if (answers[i] === j) {
                  cls = 'bg-cyan-50 border-cyan-400 text-cyan-900 font-medium';
                }
                return (
                  <button key={j} disabled={submitted} onClick={() => setAnswers(a => ({ ...a, [i]: j }))}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="mt-2 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < QUIZ.length || submitted}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
          Egiaztatu
        </button>
        {submitted && (
          <span className={`font-bold text-lg ${score === QUIZ.length ? 'text-emerald-600' : score >= QUIZ.length / 2 ? 'text-cyan-600' : 'text-rose-600'}`}>
            {score}/{QUIZ.length} zuzen {score === QUIZ.length ? '⚡' : score >= QUIZ.length / 2 ? '👍' : '💪'}
          </span>
        )}
        {submitted && (
          <button onClick={() => { setAnswers({}); setSubmitted(false); }}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Berriz saiatu
          </button>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   KALKULAZIO ARIKETAK — SVG zirkuitu diagramak + urrats interaktiboak
   ============================================================ */

/* -- SVG circuit components (adapted from berezuma/electricityexercises) -- */
const SvgEx1 = () => (
  <svg viewBox="0 0 270 135" className="w-full max-w-xs mx-auto">
    <polyline points="40,73 40,24 230,24 230,111 40,111 40,91" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <line x1="22" y1="73" x2="58" y2="73" stroke="#eab308" strokeWidth="4.5"/>
    <line x1="28" y1="91" x2="52" y2="91" stroke="#94a3b8" strokeWidth="2.5"/>
    <text x="7" y="77" fontSize="9" fill="#ca8a04">+</text>
    <text x="7" y="95" fontSize="9" fill="#64748b">−</text>
    <text x="62" y="84" fontSize="11" fill="#ca8a04" fontWeight="bold">9V</text>
    <rect x="95" y="12" width="85" height="24" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
    <text x="137" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be185d">150Ω</text>
    <polygon points="67,21 73,24 67,27" fill="#94a3b8"/>
    <text x="76" y="21" fontSize="9" fill="#94a3b8">I →</text>
  </svg>
);

const SvgEx2 = () => (
  <svg viewBox="0 0 430 135" className="w-full max-w-sm mx-auto">
    <polyline points="40,73 40,24 390,24 390,111 40,111 40,91" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <line x1="22" y1="73" x2="58" y2="73" stroke="#eab308" strokeWidth="4.5"/>
    <line x1="28" y1="91" x2="52" y2="91" stroke="#94a3b8" strokeWidth="2.5"/>
    <text x="7" y="77" fontSize="9" fill="#ca8a04">+</text>
    <text x="7" y="95" fontSize="9" fill="#64748b">−</text>
    <text x="62" y="84" fontSize="11" fill="#ca8a04" fontWeight="bold">24V</text>
    <rect x="93"  y="12" width="72" height="24" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
    <text x="129" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be185d">R₁=5Ω</text>
    <rect x="179" y="12" width="72" height="24" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
    <text x="215" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">R₂=7Ω</text>
    <rect x="265" y="12" width="80" height="24" rx="4" fill="#d1fae5" stroke="#34d399" strokeWidth="2"/>
    <text x="305" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">R₃=12Ω</text>
    <polygon points="67,21 73,24 67,27" fill="#94a3b8"/>
  </svg>
);

const SvgEx3 = () => (
  <svg viewBox="0 0 295 170" className="w-full max-w-xs mx-auto">
    <polyline points="40,88 40,28 118,28" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <polyline points="40,108 40,142 118,142" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <line x1="22" y1="88" x2="58" y2="88" stroke="#eab308" strokeWidth="4.5"/>
    <line x1="28" y1="108" x2="52" y2="108" stroke="#94a3b8" strokeWidth="2.5"/>
    <text x="7" y="92" fontSize="9" fill="#ca8a04">+</text>
    <text x="7" y="111" fontSize="9" fill="#64748b">−</text>
    <text x="62" y="101" fontSize="11" fill="#ca8a04" fontWeight="bold">48V</text>
    <line x1="118" y1="28" x2="118" y2="52" stroke="#475569" strokeWidth="2.5"/>
    <rect x="105" y="52" width="26" height="54" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
    <text x="118" y="76" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be185d">R₁</text>
    <text x="118" y="91" textAnchor="middle" fontSize="10" fill="#be185d">16Ω</text>
    <line x1="118" y1="106" x2="118" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="118" y1="28" x2="228" y2="28" stroke="#475569" strokeWidth="2.5"/>
    <line x1="118" y1="142" x2="228" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="228" y1="28" x2="228" y2="52" stroke="#475569" strokeWidth="2.5"/>
    <rect x="215" y="52" width="26" height="54" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
    <text x="228" y="76" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">R₂</text>
    <text x="228" y="91" textAnchor="middle" fontSize="10" fill="#1d4ed8">16Ω</text>
    <line x1="228" y1="106" x2="228" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="228" y1="28" x2="263" y2="28" stroke="#475569" strokeWidth="2.5"/>
    <line x1="228" y1="142" x2="263" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="263" y1="28" x2="263" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <circle cx="118" cy="28" r="3.5" fill="#475569"/>
    <circle cx="118" cy="142" r="3.5" fill="#475569"/>
    <polygon points="68,25 74,28 68,31" fill="#94a3b8"/>
  </svg>
);

const SvgEx4 = () => (
  <svg viewBox="0 0 355 170" className="w-full max-w-sm mx-auto">
    <polyline points="40,88 40,28 93,28" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <polyline points="40,108 40,142 193,142" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <line x1="22" y1="88" x2="58" y2="88" stroke="#eab308" strokeWidth="4.5"/>
    <line x1="28" y1="108" x2="52" y2="108" stroke="#94a3b8" strokeWidth="2.5"/>
    <text x="7" y="92" fontSize="9" fill="#ca8a04">+</text>
    <text x="7" y="111" fontSize="9" fill="#64748b">−</text>
    <text x="62" y="101" fontSize="11" fill="#ca8a04" fontWeight="bold">20V</text>
    <rect x="93" y="16" width="62" height="24" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
    <text x="124" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be185d">R₁=6Ω</text>
    <line x1="155" y1="28" x2="193" y2="28" stroke="#475569" strokeWidth="2.5"/>
    <circle cx="193" cy="28" r="3.5" fill="#475569"/>
    <circle cx="193" cy="142" r="3.5" fill="#475569"/>
    <line x1="193" y1="28" x2="193" y2="52" stroke="#475569" strokeWidth="2.5"/>
    <rect x="180" y="52" width="26" height="54" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
    <text x="193" y="76" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">R₂</text>
    <text x="193" y="91" textAnchor="middle" fontSize="10" fill="#1d4ed8">8Ω</text>
    <line x1="193" y1="106" x2="193" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="193" y1="28" x2="288" y2="28" stroke="#475569" strokeWidth="2.5"/>
    <line x1="193" y1="142" x2="288" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="288" y1="28" x2="288" y2="52" stroke="#475569" strokeWidth="2.5"/>
    <rect x="275" y="52" width="26" height="54" rx="4" fill="#d1fae5" stroke="#34d399" strokeWidth="2"/>
    <text x="288" y="76" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">R₃</text>
    <text x="288" y="91" textAnchor="middle" fontSize="10" fill="#065f46">8Ω</text>
    <line x1="288" y1="106" x2="288" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="288" y1="28" x2="323" y2="28" stroke="#475569" strokeWidth="2.5"/>
    <line x1="288" y1="142" x2="323" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <line x1="323" y1="28" x2="323" y2="142" stroke="#475569" strokeWidth="2.5"/>
    <polygon points="67,25 73,28 67,31" fill="#94a3b8"/>
  </svg>
);

const SvgEx5 = () => (
  <svg viewBox="0 0 310 135" className="w-full max-w-xs mx-auto">
    <polyline points="40,73 40,24 270,24 270,111 40,111 40,91" fill="none" stroke="#475569" strokeWidth="2.5"/>
    <line x1="22" y1="73" x2="58" y2="73" stroke="#eab308" strokeWidth="4.5"/>
    <line x1="28" y1="91" x2="52" y2="91" stroke="#94a3b8" strokeWidth="2.5"/>
    <text x="7" y="77" fontSize="9" fill="#ca8a04">+</text>
    <text x="7" y="95" fontSize="9" fill="#64748b">−</text>
    <text x="62" y="84" fontSize="11" fill="#ca8a04" fontWeight="bold">20V</text>
    <rect x="95"  y="12" width="72" height="24" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
    <text x="131" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be185d">R₁=2Ω</text>
    <rect x="181" y="12" width="72" height="24" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
    <text x="217" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">R₂=3Ω</text>
    <polygon points="67,21 73,24 67,27" fill="#94a3b8"/>
  </svg>
);

const EXERCISES = [
  {
    id: 1, SvgComponent: SvgEx1,
    type: 'Ohm-en Legea', emoji: '⚡',
    title: 'Zirkuitu sinplea',
    desc: '9V-ko bateria bat eta 150Ω-ko erresistentzia bakar bat seriean konektatuta daude.',
    data: [{ k: 'V', v: '9 V' }, { k: 'R', v: '150 Ω' }],
    steps: [
      { id: 'I',  ask: 'Kalkulatu intentsitate totala (Iₜ)',  formula: 'Iₜ = V / R',   answer: 0.06, unit: 'A',  sol: 'Iₜ = V / R = 9 / 150 = 0.06 A' },
      { id: 'P',  ask: 'Kalkulatu potentzia (P)',             formula: 'P = V × Iₜ',  answer: 0.54, unit: 'W',  sol: 'P = V × Iₜ = 9 × 0.06 = 0.54 W' },
    ],
  },
  {
    id: 2, SvgComponent: SvgEx2,
    type: 'Serieko Zirkuitua', emoji: '🔗',
    title: 'Hiru erresistentzia seriean',
    desc: '24V-ko iturriak hiru erresistentzia seriean elikatzen ditu: R₁=5Ω, R₂=7Ω, R₃=12Ω.',
    data: [{ k: 'V', v: '24 V' }, { k: 'R₁', v: '5 Ω' }, { k: 'R₂', v: '7 Ω' }, { k: 'R₃', v: '12 Ω' }],
    steps: [
      { id: 'Rt', ask: 'Erresistentzia totala (Rₜ)',      formula: 'Rₜ = R₁ + R₂ + R₃',  answer: 24, unit: 'Ω', sol: 'Rₜ = 5 + 7 + 12 = 24 Ω' },
      { id: 'I',  ask: 'Intentsitate totala (Iₜ)',         formula: 'Iₜ = V / Rₜ',          answer: 1,  unit: 'A', sol: 'Iₜ = 24 / 24 = 1 A' },
      { id: 'V2', ask: 'Tentsioa R₂an (V_R₂)',             formula: 'V_R₂ = Iₜ × R₂',      answer: 7,  unit: 'V', sol: 'V_R₂ = 1 × 7 = 7 V' },
    ],
  },
  {
    id: 3, SvgComponent: SvgEx3,
    type: 'Paraleloko Zirkuitua', emoji: '⑂',
    title: 'Bi erresistentzia paraleloan',
    desc: '48V-ko iturriari bi 16Ω erresistentzia paraleloan konektatuta daude.',
    data: [{ k: 'V', v: '48 V' }, { k: 'R₁', v: '16 Ω' }, { k: 'R₂', v: '16 Ω' }],
    steps: [
      { id: 'Rt', ask: 'Erresistentzia totala (Rₜ)',           formula: '1/Rₜ = 1/R₁ + 1/R₂',  answer: 8, unit: 'Ω', sol: '1/Rₜ = 1/16 + 1/16 = 2/16 → Rₜ = 8 Ω' },
      { id: 'It', ask: 'Intentsitate totala (Iₜ)',              formula: 'Iₜ = V / Rₜ',          answer: 6, unit: 'A', sol: 'Iₜ = 48 / 8 = 6 A' },
      { id: 'I1', ask: 'Intentsitatea R₁etik (I_R₁)',          formula: 'I_R₁ = V / R₁',        answer: 3, unit: 'A', sol: 'I_R₁ = 48 / 16 = 3 A' },
    ],
  },
  {
    id: 4, SvgComponent: SvgEx4,
    type: 'Zirkuitu Mistoa', emoji: '🔀',
    title: 'Serie + Paralelo',
    desc: '20V-ko iturriari R₁=6Ω seriean eta R₂∥R₃ (8Ω bakoitza) paraleloan konektatuta daude.',
    data: [{ k: 'V', v: '20 V' }, { k: 'R₁', v: '6 Ω (serie)' }, { k: 'R₂', v: '8 Ω' }, { k: 'R₃', v: '8 Ω (paralelo)' }],
    steps: [
      { id: 'Rp', ask: 'R₂∥R₃ erresistentzia baliokidea (Rₚ)', formula: '1/Rₚ = 1/R₂ + 1/R₃',  answer: 4,  unit: 'Ω', sol: '1/Rₚ = 1/8 + 1/8 = 2/8 → Rₚ = 4 Ω' },
      { id: 'Rt', ask: 'Erresistentzia totala (Rₜ)',             formula: 'Rₜ = R₁ + Rₚ',        answer: 10, unit: 'Ω', sol: 'Rₜ = 6 + 4 = 10 Ω' },
      { id: 'It', ask: 'Intentsitate totala (Iₜ)',               formula: 'Iₜ = V / Rₜ',          answer: 2,  unit: 'A', sol: 'Iₜ = 20 / 10 = 2 A' },
    ],
  },
  {
    id: 5, SvgComponent: SvgEx5,
    type: 'Potentzia', emoji: '💥',
    title: 'Potentziaren banaketa',
    desc: '20V-ko bateria batek R₁=2Ω eta R₂=3Ω seriean elikatzen ditu. Kalkulatu intentsitatea eta R₂ak xahutzen duen potentzia.',
    data: [{ k: 'V', v: '20 V' }, { k: 'R₁', v: '2 Ω' }, { k: 'R₂', v: '3 Ω' }],
    steps: [
      { id: 'It', ask: 'Intentsitate totala (Iₜ)',   formula: 'Iₜ = V / (R₁ + R₂)', answer: 4,  unit: 'A', sol: 'Iₜ = 20 / (2+3) = 20/5 = 4 A' },
      { id: 'P2', ask: 'Potentzia R₂an (P₂)',        formula: 'P₂ = Iₜ² × R₂',      answer: 48, unit: 'W', sol: 'P₂ = 4² × 3 = 16 × 3 = 48 W' },
    ],
  },
];

const ExerciseCard = ({ ex }) => {
  const [inputs, setInputs] = useState({});
  const [fb, setFb] = useState({});
  const [showSol, setShowSol] = useState(false);

  const check = (id, expected) => {
    const v = parseFloat(inputs[id]);
    if (isNaN(v)) return;
    setFb(f => ({ ...f, [id]: Math.abs(v - expected) / expected < 0.015 ? 'ok' : 'err' }));
  };

  const Svg = ex.SvgComponent;

  return (
    <div>
      <p className="text-slate-700 leading-relaxed mb-4">{ex.desc}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {ex.data.map(({ k, v }) => (
          <span key={k} className="px-3 py-1 bg-slate-100 rounded-lg font-mono text-sm">
            <span className="text-slate-500">{k} = </span>
            <span className="font-bold text-slate-800">{v}</span>
          </span>
        ))}
      </div>
      <div className="bg-slate-50 rounded-xl p-3 mb-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Zirkuitu diagrama</p>
        <Svg />
      </div>
      <div className="space-y-3">
        {ex.steps.map((step, i) => (
          <div key={step.id} className={`rounded-xl p-4 border transition-colors ${
            fb[step.id] === 'ok'  ? 'bg-emerald-50 border-emerald-300' :
            fb[step.id] === 'err' ? 'bg-rose-50 border-rose-300' :
            'bg-white border-slate-200'
          }`}>
            <p className="text-sm font-semibold text-slate-800 mb-0.5">{i + 1}. {step.ask}</p>
            <p className="text-xs font-mono text-slate-400 mb-3">{step.formula}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <input type="number" step="any"
                value={inputs[step.id] || ''}
                onChange={e => setInputs(inp => ({ ...inp, [step.id]: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && check(step.id, step.answer)}
                placeholder="?"
                className={`w-24 border-2 rounded-lg px-3 py-1.5 text-sm font-mono focus:outline-none transition-colors ${
                  fb[step.id] === 'ok'  ? 'border-emerald-400 bg-emerald-50' :
                  fb[step.id] === 'err' ? 'border-rose-400 bg-rose-50' :
                  'border-slate-200 focus:border-amber-400'
                }`}
              />
              <span className="text-slate-500 text-sm font-mono">{step.unit}</span>
              <button onClick={() => check(step.id, step.answer)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-lg transition-colors">
                Egiaztatu
              </button>
              {fb[step.id] === 'ok'  && <span className="text-emerald-600 text-sm font-bold">✓ Zuzen!</span>}
              {fb[step.id] === 'err' && <span className="text-rose-500 text-sm font-bold">✗ Saiatu berriro</span>}
            </div>
            {showSol && (
              <p className="mt-3 font-mono text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">✓ {step.sol}</p>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setShowSol(!showSol)}
        className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline transition-colors">
        {showSol ? 'Soluzioa ezkutatu' : 'Soluzioa erakutsi'}
      </button>
    </div>
  );
};

const KalkulazioAriketak = () => {
  const [cur, setCur] = useState(0);
  const ex = EXERCISES[cur];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between bg-slate-50 px-5 py-3 border-b border-slate-200">
        <div className="flex gap-1.5">
          {EXERCISES.map((e, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                i === cur ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}>
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">{ex.type}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{ex.emoji}</span>
          <h3 className="font-bold text-slate-900 text-lg">{ex.title}</h3>
        </div>
        <ExerciseCard key={ex.id} ex={ex} />
      </div>
      <div className="flex justify-between px-6 py-4 border-t border-slate-100">
        <button onClick={() => setCur(c => Math.max(0, c - 1))} disabled={cur === 0}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-semibold rounded-lg text-sm transition-colors">
          ← Aurrekoa
        </button>
        <button onClick={() => setCur(c => Math.min(EXERCISES.length - 1, c + 1))} disabled={cur === EXERCISES.length - 1}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-white font-semibold rounded-lg text-sm transition-colors">
          Hurrengoa →
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function ElektrizitateOinarrizkoa() {
  useDocumentTitle('Elektrizitate eta Elektronika Oinarrizkoa');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-500 to-amber-600 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="text-yellow-100 text-sm hover:text-white mb-6 inline-block transition-colors">
            ← tekno.eus
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-yellow-100 text-sm font-medium uppercase tracking-wider">DBH 3 / Batxilergoa 1 · Elektrizitate eta Elektronika</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Elektrizitate eta Elektronika Oinarrizkoa</h1>
          <p className="text-yellow-100 text-lg max-w-2xl">
            Tentsioa, intentsitatea eta erresistentzia ulertu — Ohm-en Legea, zirkuitu motak eta osagai elektronikoak.
          </p>
          {/* Quick nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {['#oinarriak', '#osagaiak', '#kalkulagailua', '#formulak', '#zirkuitu-motak', '#kalkulazio-ariketak', '#ariketak'].map((href, i) => (
              <a key={i} href={href} className="text-xs font-semibold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-colors">
                {['Oinarriak', 'Osagaiak', 'Kalkulagailua', 'Formulak', 'Zirkuitu Motak', 'Ariketak', 'Galderak'][i]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* 1. OINARRIAK */}
        <Section id="oinarriak" icon={<Zap className="w-5 h-5" />} title="Kontzeptu Oinarrizkoak: V, I eta R" color="bg-yellow-500">
          <p className="text-slate-600 leading-relaxed mb-6">
            Elektrizitatearen mundua hiru magnitude nagusiren inguruan eraikitzen da. Hauek ulertzeko, <strong>ur-sistema baten analogia</strong> erabiliko dugu:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                symbol: 'V', name: 'Tentsioa', unit: 'Volt (V)',
                color: 'bg-yellow-50 border-yellow-300 text-yellow-800',
                analogy: '💧 Ur-jauziko presioa — zenbat "bultzada" duen korronteak',
                desc: 'Kargak mugiarazteko indar elektromotriza. Pilak, bateriak eta transformadoreek ematen dute.',
              },
              {
                symbol: 'I', name: 'Intentsitatea', unit: 'Ampere (A)',
                color: 'bg-blue-50 border-blue-300 text-blue-800',
                analogy: '🌊 Tututik igarotzen den ur-emaria — korronte kantitateak',
                desc: 'Segundo batean puntu batetatik igarotzen den karga elektrikoa. Handiago = argi gehiago, bero gehiago.',
              },
              {
                symbol: 'R', name: 'Erresistentzia', unit: 'Ohm (Ω)',
                color: 'bg-rose-50 border-rose-300 text-rose-800',
                analogy: '🔩 Tutuaren estutasuna — zenbat "zailtasun" duen korronteak',
                desc: 'Korrontearen pasabidearen aurkako oztopoa. Energia bero bihurtzen du (erresistoreak, bonbillak).',
              },
            ].map(item => (
              <div key={item.symbol} className={`p-4 rounded-xl border ${item.color}`}>
                <div className="text-4xl font-black mb-1">{item.symbol}</div>
                <p className="font-bold text-sm mb-1">{item.name} — {item.unit}</p>
                <p className="text-xs leading-relaxed opacity-80 mb-2">{item.desc}</p>
                <p className="text-xs italic opacity-70 border-t border-current/20 pt-2">{item.analogy}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-xl p-5 text-center">
            <p className="font-mono text-xl font-bold text-yellow-400 mb-2">V = I × R &nbsp;&nbsp; (Ohm-en Legea)</p>
            <p className="font-mono text-sm text-slate-400">I = V / R &nbsp;|&nbsp; R = V / I &nbsp;|&nbsp; P = V × I = I² × R = V² / R</p>
          </div>
        </Section>

        {/* 2. OSAGAIAK */}
        <Section id="osagaiak" icon={<Zap className="w-5 h-5" />} title="Osagai Elektronikoak" color="bg-orange-500">
          <p className="text-slate-600 leading-relaxed mb-6">
            Zirkuitu elektriko bat osagaiak konektatzean sortzen da. Hona oinarrizko bost osagaiak — klikatu bakoitzean xehetasun gehiago ikusteko:
          </p>
          <OsagaiElektronikoak />
        </Section>

        {/* 3. KALKULAGAILUA */}
        <Section id="kalkulagailua" icon={<Calculator className="w-5 h-5" />} title="Ohm-en Legea — Kalkulagailua" color="bg-amber-500">
          <p className="text-slate-600 mb-6">
            Ohm-en triangeluan estali nahi duzuna eta gainerako bietatik kalkulatuko da. Bi balio sartu eta "Kalkulatu" sakatu:
          </p>
          <OhmCalculator />
        </Section>

        {/* 4. FORMULA ERREFERENTZIA */}
        <Section id="formulak" icon={<Zap className="w-5 h-5" />} title="Formula Erreferentzia" color="bg-slate-600">
          <p className="text-slate-600 leading-relaxed mb-6">
            Ohm-en Legearen sei aldaera. Edozein magnitudine kalkulatzeko, gainerako biak ezagutu behar dira:
          </p>
          <FormulaErreferentzia />
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><strong>Ohm-en triangelua:</strong> V goian, I eta R behean. Kalkulatu nahi duzun magnitudea estali eta besteak ikusten diren bezala konbinatu (×, ÷).</span>
          </div>
        </Section>

        {/* 5. ZIRKUITU MOTAK */}
        <Section id="zirkuitu-motak" icon={<GitBranch className="w-5 h-5" />} title="Zirkuitu Motak: Seriea eta Paraleloa" color="bg-blue-600">
          <p className="text-slate-600 mb-6">
            Zirkuitu elektrikoak bi modu nagusitan konektatu daitezke — eta garrantzitsua da bien arteko aldea ulertzea:
          </p>
          <ZirkuituInfo />
        </Section>

        {/* 6. KALKULAZIO ARIKETAK */}
        <Section id="kalkulazio-ariketak" icon={<Calculator className="w-5 h-5" />} title="Kalkulazio Ariketak" color="bg-amber-600">
          <p className="text-slate-600 mb-6">
            5 ariketa maila ezberdineko. Sartu zure erantzuna eta "Egiaztatu" sakatu — ariketa batetik bestera nabigatu goiko zenbakiekin.
          </p>
          <KalkulazioAriketak />
        </Section>

        {/* 7. GALDERA TEORIKOAK */}
        <Section id="ariketak" icon={<CheckCircle className="w-5 h-5" />} title="Galdera Teorikoak" color="bg-emerald-600">
          <p className="text-slate-600 mb-6">
            {QUIZ.length} galdera kontzeptuak eta kalkuluak probatzeko. Denak erantzun eta egiaztatu.
          </p>
          <Quiz />
        </Section>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">
            ← Hasierara itzuli
          </Link>
          <Link to="/zirkuitu-elektrikoak" className="flex items-center gap-2 bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-cyan-500 transition-colors text-sm">
            Zirkuitu elektrikoak (CC) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
