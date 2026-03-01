import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Section = ({ id, icon, title, color, children }) => (
  <section id={id} className="mb-12">
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white`}>{icon}</div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {children}
  </section>
);

/* ---- OHM CALCULATOR ---- */
const OhmCalculator = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [solveFor, setSolveFor] = useState('voltage');

  const calculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);

    if (solveFor === 'voltage' && !isNaN(I) && !isNaN(R)) {
      setVoltage((I * R).toFixed(3));
    } else if (solveFor === 'current' && !isNaN(V) && !isNaN(R)) {
      setCurrent((V / R).toFixed(3));
    } else if (solveFor === 'resistance' && !isNaN(V) && !isNaN(I)) {
      setResistance((V / I).toFixed(3));
    }
  };

  const reset = () => {
    setVoltage(''); setCurrent(''); setResistance('');
  };

  const fields = [
    { key: 'voltage', label: 'Tentsioa (V)', unit: 'V', value: voltage, setter: setVoltage, color: 'yellow' },
    { key: 'current', label: 'Intentsitatea (I)', unit: 'A', value: current, setter: setCurrent, color: 'blue' },
    { key: 'resistance', label: 'Erresistentzia (R)', unit: 'Ω', value: resistance, setter: setResistance, color: 'rose' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="text-center mb-6">
        <div className="inline-block bg-slate-900 text-yellow-400 font-mono text-xl font-bold px-6 py-3 rounded-xl mb-2">
          V = I × R
        </div>
        <p className="text-slate-500 text-sm">Ohm-en Legea</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Zer kalkulatu?</label>
        <div className="flex flex-wrap gap-2">
          {fields.map(f => (
            <button
              key={f.key}
              onClick={() => setSolveFor(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${solveFor === f.key ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {f.label.split(' ')[0]} kalkulatu
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {fields.map(f => (
          <div key={f.key} className={`flex items-center gap-3 ${solveFor === f.key ? 'opacity-60' : ''}`}>
            <label className="w-44 text-sm font-medium text-slate-700">{f.label}</label>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="number"
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                disabled={solveFor === f.key}
                placeholder={solveFor === f.key ? 'Kalkulatuko da...' : 'Sartu balioa'}
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-slate-50"
              />
              <span className="text-slate-500 text-sm font-mono w-5">{f.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg transition-colors">
          <Zap className="w-4 h-4" /> Kalkulatu
        </button>
        <button onClick={reset} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-lg transition-colors">
          <RotateCcw className="w-4 h-4" /> Berrezarri
        </button>
      </div>

      {/* Power calculation */}
      {voltage && current && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm font-semibold text-amber-800 mb-1">Potentzia ere kalkulatu dezakegu:</p>
          <p className="font-mono text-amber-700">P = V × I = {parseFloat(voltage).toFixed(2)} × {parseFloat(current).toFixed(2)} = <strong>{(parseFloat(voltage) * parseFloat(current)).toFixed(3)} W</strong></p>
        </div>
      )}
    </div>
  );
};

/* ---- CIRCUIT TYPES INFO ---- */
const CircuitInfo = () => {
  const [active, setActive] = useState('series');

  const types = {
    series: {
      label: 'Seriean',
      formula: 'Rtotal = R1 + R2 + R3',
      Vtotal: 'V = V1 + V2 + V3',
      Itotal: 'I = I1 = I2 = I3 (Intentsitate berdina)',
      desc: 'Osagaiak bata bestearen atzetik konektatuta daude. Zirkuitu bat apurtu ezkero, guztia itzaltzen da.',
      color: 'blue',
    },
    parallel: {
      label: 'Paraleloan',
      formula: '1/Rtotal = 1/R1 + 1/R2 + 1/R3',
      Vtotal: 'V = V1 = V2 = V3 (Tentsio berdina)',
      Itotal: 'I = I1 + I2 + I3',
      desc: 'Osagaiak adar ezberdinetan konektatuta daude. Bat apurtzen bada, besteak funtzionatzen jarraitzen dute.',
      color: 'emerald',
    },
  };

  const t = types[active];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex gap-3 mb-6">
        {Object.entries(types).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${active === key ? `bg-${val.color}-600 text-white` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            style={active === key ? { backgroundColor: key === 'series' ? '#2563eb' : '#059669' } : {}}
          >
            Zirkuitu {val.label}
          </button>
        ))}
      </div>

      <p className="text-slate-600 leading-relaxed mb-4">{t.desc}</p>

      <div className="space-y-3">
        {[
          { label: 'Erresistentzia totala', val: t.formula },
          { label: 'Tentsioa', val: t.Vtotal },
          { label: 'Intentsitatea', val: t.Itotal },
        ].map(item => (
          <div key={item.label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider w-36 pt-0.5 shrink-0">{item.label}</span>
            <code className="text-sm font-mono text-slate-800">{item.val}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---- QUIZ ---- */
const QUIZ = [
  {
    q: 'Ohm-en Legearen arabera, V = 12V eta R = 4Ω bada, intentsitatea zenbatekoa da?',
    opts: ['2 A', '3 A', '8 A', '48 A'],
    correct: 1,
    explanation: 'I = V/R = 12/4 = 3 A',
  },
  {
    q: 'Seriean konektatutako zirkuitu batean, zer mantentzen da berdina osagai guztietan?',
    opts: ['Tentsioa', 'Erresistentzia', 'Intentsitatea', 'Potentzia'],
    correct: 2,
    explanation: 'Seriean, intentsitatea berdina da osagai guztietan.',
  },
  {
    q: 'Potentziaren formula zein da?',
    opts: ['P = V/I', 'P = V × R', 'P = V × I', 'P = I/R'],
    correct: 2,
    explanation: 'P = V × I (Potentzia = Tentsioa × Intentsitatea)',
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = QUIZ.filter((q, i) => answers[i] === q.correct).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="space-y-6">
        {QUIZ.map((q, i) => (
          <div key={i}>
            <p className="font-semibold text-slate-900 mb-3">{i + 1}. {q.q}</p>
            <div className="space-y-2">
              {q.opts.map((opt, j) => {
                let cls = 'bg-slate-50 border-slate-200 hover:bg-slate-100';
                if (submitted) {
                  if (j === q.correct) cls = 'bg-emerald-50 border-emerald-300';
                  else if (answers[i] === j) cls = 'bg-rose-50 border-rose-300';
                } else if (answers[i] === j) cls = 'bg-cyan-50 border-cyan-300';
                return (
                  <button key={j} disabled={submitted} onClick={() => setAnswers(a => ({ ...a, [i]: j }))}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && answers[i] !== q.correct && (
              <p className="mt-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">{q.explanation}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < QUIZ.length || submitted}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
          Egiaztatu
        </button>
        {submitted && (
          <span className="font-bold text-slate-700">{score}/{QUIZ.length} zuzen {score === QUIZ.length ? '⚡' : ''}</span>
        )}
        {submitted && (
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-sm text-slate-500 hover:text-slate-700">Berriz saiatu</button>
        )}
      </div>
    </div>
  );
};

/* ---- MAIN PAGE ---- */
export default function ElektrizitateOinarrizkoa() {
  useDocumentTitle('Elektrizitate eta Elektronika');
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-gradient-to-br from-yellow-500 to-amber-600 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="text-yellow-100 text-sm hover:text-white mb-6 inline-block transition-colors">← tekno.eus</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-yellow-100 text-sm font-medium uppercase tracking-wider">DBH 3 / Batxilergoa 1 · Elektrizitate eta Elektronika</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Elektrizitate eta Elektronika Oinarrizkoa</h1>
          <p className="text-yellow-100 text-lg max-w-2xl">
            Zirkuitu elektrikoen interpretazioa, Ohm-en Legea, eta serieko eta paraleloko konexioak.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Section id="oinarriak" icon={<Zap className="w-5 h-5" />} title="Kontzeptu Oinarrizkoak" color="bg-yellow-500">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { symbol: 'V', name: 'Tentsioa', unit: 'Volt (V)', color: 'bg-yellow-50 border-yellow-200 text-yellow-700', desc: 'Karga elektriko bat mugiarazteko indar elektromotrizari dagokio.' },
              { symbol: 'I', name: 'Intentsitatea', unit: 'Ampere (A)', color: 'bg-blue-50 border-blue-200 text-blue-700', desc: 'Segundo batean zirkuitu baten puntu batetatik igarotzen den karga kantitatea.' },
              { symbol: 'R', name: 'Erresistentzia', unit: 'Ohm (Ω)', color: 'bg-rose-50 border-rose-200 text-rose-700', desc: 'Korronte elektrikoaren aurkako oztopoa. Bero bihurtzen du energia.' },
            ].map(item => (
              <div key={item.symbol} className={`p-4 rounded-xl border ${item.color}`}>
                <div className="text-3xl font-black mb-1">{item.symbol}</div>
                <p className="font-bold text-sm mb-1">{item.name} — {item.unit}</p>
                <p className="text-xs leading-relaxed opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 text-yellow-400 rounded-xl p-5 text-center">
            <p className="font-mono text-lg font-bold mb-2">V = I × R (Ohm-en Legea)</p>
            <p className="font-mono text-sm text-slate-400">I = V/R &nbsp;|&nbsp; R = V/I &nbsp;|&nbsp; P = V×I = I²×R</p>
          </div>
        </Section>

        <Section id="kalkulagailua" icon={<Zap className="w-5 h-5" />} title="Ohm Kalkulagailua" color="bg-amber-500">
          <p className="text-slate-600 mb-6">Bi balio sartu eta hirugarrena automatikoki kalkulatuko da:</p>
          <OhmCalculator />
        </Section>

        <Section id="zirkuitu-motak" icon={<Zap className="w-5 h-5" />} title="Zirkuitu Motak" color="bg-orange-500">
          <p className="text-slate-600 mb-6">Zirkuitu elektrikoak bi modu nagusitan konektatu daitezke:</p>
          <CircuitInfo />
        </Section>

        <Section id="ariketak" icon={<CheckCircle className="w-5 h-5" />} title="Ariketak" color="bg-emerald-600">
          <p className="text-slate-600 mb-6">Erantzun galderak eta egiaztatu zure ezagutzak:</p>
          <Quiz />
        </Section>

        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">← Hasierara itzuli</Link>
          <Link to="/zirkuitu-elektrikoak" className="flex items-center gap-2 bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-cyan-500 transition-colors">
            Zirkuitu elektrikoak (CC) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
