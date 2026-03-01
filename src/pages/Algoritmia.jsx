import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitBranch, CheckCircle, Play, RotateCcw, Lightbulb, Code2, Repeat, List } from 'lucide-react';
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
   HIRU OINARRIZKO EGITURA
   ============================================================ */
const EGITURAK = [
  {
    id: 'sekuentzia',
    label: 'Sekuentzia',
    icon: <List className="w-5 h-5" />,
    tagColor: 'bg-blue-600',
    borderColor: 'border-blue-400',
    ringColor: 'ring-blue-400',
    textColor: 'text-blue-700',
    bgLight: 'bg-blue-50',
    desc: 'Urratsak bata bestearen atzetik exekutatzen dira, ordenean. Ez dago salto, ez errepikapen.',
    example: 'Gosaria prestatu: 1) Ogia hartu → 2) Labean sartu → 3) Atera → 4) Jan.',
    pseudocode: `HASI
  IRAKURRI izena
  IDATZI "Kaixo, " + izena
  IDATZI "Ongi etorri!"
BUKATU`,
    visual: ['Urrats 1', 'Urrats 2', 'Urrats 3'],
  },
  {
    id: 'hautapena',
    label: 'Hautapena',
    icon: <GitBranch className="w-5 h-5" />,
    tagColor: 'bg-amber-500',
    borderColor: 'border-amber-400',
    ringColor: 'ring-amber-400',
    textColor: 'text-amber-700',
    bgLight: 'bg-amber-50',
    desc: 'Baldintza bat betetzen den ala ez arabera, bide bat edo bestea hartzen da. BALDIN…ORDUAN…BESTELA.',
    example: 'Kanpora atera: BALDIN euria egiten badu ORDUAN aterki hartu BESTELA eguzkitakoa.',
    pseudocode: `HASI
  IRAKURRI tenperatura
  BALDIN tenperatura > 30 ORDUAN
    IDATZI "Beroa da!"
  BESTELA
    IDATZI "Ez da beroa"
  BUKATU_BALDIN
BUKATU`,
    visual: null, // special rendering
  },
  {
    id: 'begizta',
    label: 'Begizta',
    icon: <Repeat className="w-5 h-5" />,
    tagColor: 'bg-emerald-600',
    borderColor: 'border-emerald-400',
    ringColor: 'ring-emerald-400',
    textColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    desc: 'Baldintza bat bete arte ekintza bat behin eta berriz errepikatu egiten da. BITARTEAN…EGIN.',
    example: 'Klaseko ikasle guztiei agur esan, harik eta denak agurtu arte.',
    pseudocode: `HASI
  i ← 1
  BITARTEAN i <= 5 EGIN
    IDATZI i
    i ← i + 1
  BUKATU_BITARTEAN
BUKATU`,
    visual: null, // special rendering
  },
];

const HiruEgitura = () => {
  const [active, setActive] = useState('sekuentzia');
  const eg = EGITURAK.find(e => e.id === active);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Tab buttons */}
      <div className="flex border-b border-slate-200">
        {EGITURAK.map(e => (
          <button
            key={e.id}
            onClick={() => setActive(e.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2 ${
              active === e.id
                ? `border-current ${e.textColor} ${e.bgLight}`
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {e.icon}
            <span className="hidden sm:inline">{e.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: description + visual */}
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${eg.tagColor} text-white text-sm font-bold mb-4`}>
              {eg.icon} {eg.label}
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">{eg.desc}</p>
            <div className={`flex items-start gap-3 p-3 rounded-xl ${eg.bgLight} border ${eg.borderColor}`}>
              <Lightbulb className={`w-4 h-4 mt-0.5 flex-shrink-0 ${eg.textColor}`} />
              <p className={`text-sm ${eg.textColor} leading-relaxed`}><strong>Adibide erreala:</strong> {eg.example}</p>
            </div>

            {/* Mini visual */}
            <div className="mt-5">
              {eg.id === 'sekuentzia' && (
                <div className="flex items-center gap-2">
                  {eg.visual.map((v, i) => (
                    <React.Fragment key={i}>
                      <div className="flex-1 text-center py-2 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold border border-blue-300">{v}</div>
                      {i < eg.visual.length - 1 && <span className="text-slate-400 font-bold text-lg">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
              {eg.id === 'hautapena' && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-28 h-12 bg-amber-100 border-2 border-amber-400 rounded-lg flex items-center justify-center text-xs font-bold text-amber-800">baldintza?</div>
                  <div className="flex items-start gap-8 mt-1">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-emerald-600 text-xs font-bold">BAI ↓</span>
                      <div className="px-3 py-2 bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-800">Ekintza A</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-rose-500 text-xs font-bold">EZ ↓</span>
                      <div className="px-3 py-2 bg-rose-100 border border-rose-300 rounded-lg text-xs font-bold text-rose-800">Ekintza B</div>
                    </div>
                  </div>
                </div>
              )}
              {eg.id === 'begizta' && (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-2 bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-800">Ekintza</div>
                    <span className="text-slate-400 text-xs">→</span>
                    <div className="px-3 py-2 bg-emerald-100 border-2 border-emerald-400 rounded-lg text-xs font-bold text-emerald-800">baldintza?</div>
                  </div>
                  <div className="flex gap-10 text-xs font-bold mt-1">
                    <span className="text-emerald-600">BAI ↰ (itzuli)</span>
                    <span className="text-rose-500">EZ → Amaitu</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: pseudocode */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pseudokodea</p>
            <pre className={`${eg.bgLight} border ${eg.borderColor} rounded-xl p-4 text-sm font-mono leading-relaxed ${eg.textColor} overflow-x-auto`}>
              {eg.pseudocode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   FLOWCHART SIMULATOR
   ============================================================ */
const BLOCKS = {
  start:    { shape: 'rounded-full',         bg: 'bg-emerald-500' },
  input:    { shape: 'rounded-md skew-x-3',  bg: 'bg-blue-500' },
  process:  { shape: 'rounded-md',           bg: 'bg-cyan-600' },
  decision: { shape: null,                   bg: 'bg-amber-500' },
  output:   { shape: 'rounded-md -skew-x-3', bg: 'bg-violet-500' },
  end:      { shape: 'rounded-full',         bg: 'bg-rose-500' },
};

const FlowBlock = ({ type, label, active }) => {
  const block = BLOCKS[type];

  if (type === 'decision') {
    return (
      <div className={`relative flex items-center justify-center my-1 transition-transform ${active ? 'scale-105' : ''}`}>
        <div className={`w-24 h-24 ${block.bg} transform rotate-45 ${active ? 'ring-4 ring-amber-300 ring-offset-2' : ''} transition-all`} />
        <span className="absolute text-white text-xs font-bold text-center leading-tight px-1" style={{ width: '64px' }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center my-1 transition-all ${active ? 'scale-105' : ''}`}>
      <div className={`px-6 py-3 min-w-[140px] text-center font-bold text-sm text-white ${block.bg} ${block.shape} ${active ? 'ring-4 ring-white/60 ring-offset-2' : ''} shadow transition-all`}>
        {label}
      </div>
    </div>
  );
};

const Arrow = ({ label }) => (
  <div className="flex flex-col items-center my-0.5">
    <div className="w-px h-5 bg-slate-400" />
    {label && <span className="text-xs text-slate-500 font-medium bg-white px-1">{label}</span>}
    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-400" />
  </div>
);

const DEMO_PROGRAMS = {
  zenbakia: {
    title: 'Pos. / Neg.',
    emoji: '±',
    steps: [
      { type: 'start',    label: 'HASI' },
      { type: 'input',    label: 'Irakurri x' },
      { type: 'decision', label: 'x > 0?' },
      { type: 'output',   label: '"Positiboa"' },
      { type: 'end',      label: 'BUKATU' },
    ],
    sideLabel: 'Ez → "Neg./Zero"',
    pseudocode: `HASI
  IRAKURRI x
  BALDIN x > 0 ORDUAN
    IDATZI "Zenbakia positiboa da"
  BESTELA
    IDATZI "Negatiboa edo zeroa da"
  BUKATU_BALDIN
BUKATU`,
    explanation: 'Erabiltzaileak zenbaki bat sartu eta programa positiboa edo negatiboa den esan. HAUTAPENA egitura erabiltzen du.',
  },
  maximoa: {
    title: 'Bi zenbakiren maximoa',
    emoji: '⬆',
    steps: [
      { type: 'start',    label: 'HASI' },
      { type: 'input',    label: 'Irakurri a, b' },
      { type: 'decision', label: 'a > b?' },
      { type: 'output',   label: '"Max = a"' },
      { type: 'end',      label: 'BUKATU' },
    ],
    sideLabel: 'Ez → "Max = b"',
    pseudocode: `HASI
  IRAKURRI a
  IRAKURRI b
  BALDIN a > b ORDUAN
    IDATZI "Maximoa:", a
  BESTELA
    IDATZI "Maximoa:", b
  BUKATU_BALDIN
BUKATU`,
    explanation: 'Bi zenbaki konparatuta, handiena zein den erabakitzen da. HAUTAPENA egitura erabiltzen du.',
  },
  kontatu: {
    title: '1etik 5era kontatu',
    emoji: '🔁',
    steps: [
      { type: 'start',    label: 'HASI' },
      { type: 'process',  label: 'i ← 1' },
      { type: 'decision', label: 'i ≤ 5?' },
      { type: 'output',   label: 'IDATZI i' },
      { type: 'process',  label: 'i ← i + 1' },
      { type: 'end',      label: 'BUKATU' },
    ],
    sideLabel: 'Ez → Bukatu',
    loopBack: true,
    pseudocode: `HASI
  i ← 1
  BITARTEAN i <= 5 EGIN
    IDATZI i
    i ← i + 1
  BUKATU_BITARTEAN
BUKATU`,
    explanation: 'Aldagaia 1etik hasita 5 arte zenbatzen da. BEGIZTA egitura erabiltzen du (BITARTEAN...EGIN).',
  },
};

const FlowchartSimulator = () => {
  const [selectedProgram, setSelectedProgram] = useState('zenbakia');
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const prog = DEMO_PROGRAMS[selectedProgram];

  const runAnimation = async () => {
    setRunning(true);
    setActiveStep(-1);
    const stepsToAnimate = prog.loopBack
      ? [...prog.steps.slice(0, 5), prog.steps[2], prog.steps[3], prog.steps[4], prog.steps[5]]
      : prog.steps;
    for (let i = 0; i < stepsToAnimate.length; i++) {
      const realIndex = prog.steps.indexOf(stepsToAnimate[i]);
      setActiveStep(realIndex === -1 ? i : realIndex);
      await new Promise(r => setTimeout(r, 650));
    }
    setActiveStep(-1);
    setRunning(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(DEMO_PROGRAMS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => { setSelectedProgram(key); setActiveStep(-1); setRunning(false); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedProgram === key ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <span>{p.emoji}</span> {p.title}
          </button>
        ))}
      </div>

      {/* Explanation banner */}
      <div className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mb-6 text-sm text-violet-800">
        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
        {prog.explanation}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Flowchart */}
        <div>
          <h4 className="font-bold text-slate-600 text-xs uppercase tracking-wider mb-4">Fluxu-diagrama</h4>
          <div className="flex flex-col items-center bg-slate-50 rounded-xl p-4 min-h-80 relative">
            {prog.steps.map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Arrow label={i === 2 ? 'Bai' : ''} />}
                <FlowBlock type={step.type} label={step.label} active={activeStep === i} />
              </React.Fragment>
            ))}
            {prog.loopBack && (
              <p className="text-xs text-slate-400 mt-3 text-center italic">* Animazioak begiztaren lehen bi iterazioak erakusten ditu</p>
            )}
            {prog.sideLabel && (
              <div className="mt-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5 italic">
                ↳ {prog.sideLabel}
              </div>
            )}
          </div>
        </div>

        {/* Pseudocode */}
        <div>
          <h4 className="font-bold text-slate-600 text-xs uppercase tracking-wider mb-4">Pseudokodea</h4>
          <pre className="bg-slate-900 text-emerald-400 rounded-xl p-4 text-sm leading-relaxed overflow-x-auto font-mono min-h-48">
            {prog.pseudocode}
          </pre>
          <div className="mt-4 flex gap-3">
            <button
              onClick={runAnimation}
              disabled={running}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              <Play className="w-4 h-4" />
              {running ? 'Exekutatzen…' : 'Exekutatu'}
            </button>
            <button
              onClick={() => { setActiveStep(-1); setRunning(false); }}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Berrezarri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   PSEUDOKODE ERREFERENTZIA
   ============================================================ */
const PSEUDO_KEYWORDS = [
  { keyword: 'HASI / BUKATU',                  use: 'Algoritmoaren hasiera eta amaiera markatu.' },
  { keyword: 'IRAKURRI aldagaia',               use: 'Erabiltzaileak datu bat sartu (sarrera).' },
  { keyword: 'IDATZI "mezua" / aldagaia',       use: 'Emaitza bat erakutsi (irteera).' },
  { keyword: 'aldagaia ← balioa',               use: 'Aldagai bati balio bat esleitu.' },
  { keyword: 'BALDIN…ORDUAN…BESTELA',           use: 'Baldintza-egitura: bi bide posible.' },
  { keyword: 'BITARTEAN baldintza EGIN…BUKATU', use: 'Begizta: baldintza bete bitartean errepikatu.' },
];

const PseudokodeErreferentzia = () => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-800 text-white">
          <th className="text-left px-5 py-3 font-bold font-mono w-1/2">Gako-hitza</th>
          <th className="text-left px-5 py-3 font-bold">Erabilera</th>
        </tr>
      </thead>
      <tbody>
        {PSEUDO_KEYWORDS.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
            <td className="px-5 py-3 font-mono text-violet-700 font-semibold">{row.keyword}</td>
            <td className="px-5 py-3 text-slate-600">{row.use}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ = [
  {
    q: 'Zer da algoritmo bat?',
    opts: [
      'Arazo bat ebazteko urrats-sekuentzia zehatza eta finitu bat',
      'Programa informatiko bat soilik',
      'Hardware pieza bat',
      'Datu-base bat',
    ],
    correct: 0,
    explanation: 'Algoritmo bat urrats zehatzen eta ordenatuen segida da, arazo bat ebazteko edo zeregin bat betetzeko.',
  },
  {
    q: 'Fluxu-diagrama batean, erabaki-blokea zer formaz irudikatzen da?',
    opts: ['Laukizuzen batez', 'Erronbo batez', 'Elipse batez', 'Paralelogramo batez'],
    correct: 1,
    explanation: 'Erronboa (◇) erabiltzen da Bai/Ez galderen erabaki-blokeentzat. Laukizuzena prozesuetarako da.',
  },
  {
    q: 'Zein da "BITARTEAN i <= 10 EGIN" egitura mota?',
    opts: ['Sekuentzia', 'Hautapena (Baldintza)', 'Begizta (Errepikapen)', 'Funtzioa'],
    correct: 2,
    explanation: 'BITARTEAN…EGIN begizta egitura da: baldintza bete bitartean ekintza errepikatu egiten du.',
  },
  {
    q: 'Eguneroko bizitzako algoritmo baten adibide ona zein da?',
    opts: [
      'Pilaren kolorea',
      'Labean ogia prestatzeko jarraibideak',
      'Ordenagailu baten tamaina',
      'Sare-kable baten luzera',
    ],
    correct: 1,
    explanation: 'Errezetak algoritmo perfektuak dira: urrats zehatzen sekuentzia dute, ordenatuta, eta hasiera eta amaiera dute.',
  },
  {
    q: 'Pseudokodean "x ← 5" adierazpenak zer egiten du?',
    opts: [
      'x balioa konparatzen du 5ekin',
      'x aldagaiari 5 balioa esleitzen dio',
      'x zenbakia inprimatzen du',
      'x aldagaia ezabatzen du',
    ],
    correct: 1,
    explanation: '"←" ikurra esleipen-operadore da: "x aldagaiak 5 balioa hartzen du" esan nahi du.',
  },
  {
    q: 'Fluxu-diagrama batean HASI eta BUKATU blokeak zer formaz agertzen dira?',
    opts: ['Erronbo batez', 'Laukizuzen batez', 'Paralelogramo batez', 'Elipse edo kapsulaz'],
    correct: 3,
    explanation: 'Hasiera eta amaiera elipse (kapsulaz) irudikatzen dira fluxu-diagrametan. Laukizuzena prozesuentzat da.',
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
                let style = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';
                if (submitted) {
                  if (j === q.correct) style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                  else if (answers[i] === j) style = 'bg-rose-50 border-rose-300 text-rose-800 line-through opacity-70';
                  else style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                } else if (answers[i] === j) {
                  style = 'bg-cyan-50 border-cyan-400 text-cyan-900 font-medium';
                }
                return (
                  <button
                    key={j}
                    disabled={submitted}
                    onClick={() => setAnswers(a => ({ ...a, [i]: j }))}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${style}`}
                  >
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
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < QUIZ.length || submitted}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-lg transition-colors"
        >
          Egiaztatu
        </button>
        {submitted && (
          <span className={`font-bold text-lg ${score === QUIZ.length ? 'text-emerald-600' : score >= QUIZ.length / 2 ? 'text-cyan-600' : 'text-rose-600'}`}>
            {score}/{QUIZ.length} zuzen {score === QUIZ.length ? '🎉' : score >= QUIZ.length / 2 ? '👍' : '💪'}
          </span>
        )}
        {submitted && (
          <button
            onClick={() => { setAnswers({}); setSubmitted(false); }}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Berriz saiatu
          </button>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Algoritmia() {
  useDocumentTitle('Algoritmia eta Fluxu-Diagramak');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="text-violet-200 text-sm hover:text-white mb-6 inline-block transition-colors">
            ← tekno.eus
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <GitBranch className="w-7 h-7 text-white" />
            </div>
            <span className="text-violet-200 text-sm font-medium uppercase tracking-wider">DBH 3 · Pentsamendu Konputazionala</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Algoritmia eta Fluxu-Diagramak</h1>
          <p className="text-violet-200 text-lg max-w-2xl">
            Arazo bat urrats ordenatu eta zehatzen bidez nola ebazten den ikasi — sekuentzia, baldintza eta begizta erabiliz.
          </p>
          {/* Quick nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {['#zer-da', '#hiru-egitura', '#sinboloak', '#simulagailua', '#pseudokodea', '#ariketak'].map((href, i) => (
              <a key={i} href={href} className="text-xs font-semibold bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-colors">
                {['Zer da?', 'Hiru Egitura', 'Sinboloak', 'Simulagailua', 'Pseudokodea', 'Ariketak'][i]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* 1. ZER DA */}
        <Section id="zer-da" icon={<GitBranch className="w-5 h-5" />} title="Zer da Algoritmo bat?" color="bg-violet-600">
          <p className="text-slate-600 leading-relaxed mb-6">
            <strong>Algoritmo bat</strong> arazo bat ebazteko edo zeregin bat betetzeko <em>jarraibide-multzo zehatza, ordenatua eta finitua</em> da.
            Hiru ezaugarri nagusi ditu:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Zehaztasuna', desc: 'Urrats bakoitza argi eta zehatz definitua egon behar da — ez dago anbiguotasunerako lekurik.', color: 'bg-violet-50 border-violet-200 text-violet-700' },
              { label: 'Amaiera', desc: 'Algoritmoa beti urrats kopuru finitu baten ondoren amaitu behar da. Betirako exekutatzen bada, ez da algoritmo bat.', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { label: 'Eraginkortasuna', desc: 'Emaitza lortu behar da baliabide erabilgarriak erabiliz: denbora, memoria, energia...', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
            ].map(item => (
              <div key={item.label} className={`p-4 rounded-xl border ${item.color}`}>
                <h4 className="font-bold mb-1">{item.label}</h4>
                <p className="text-sm leading-relaxed opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-semibold text-amber-800 mb-2">💡 Eguneroko bizitzako adibideak:</p>
            <ul className="space-y-1 text-sm text-amber-700">
              <li>🍕 <strong>Errezeta bat:</strong> osagaiak, urratsak, tenperatura, denbora — algoritmo bat da!</li>
              <li>🗺️ <strong>GPS ibilbidea:</strong> "1000 metro zuzen, gero eskuinera biratu" — urrats ordenatua.</li>
              <li>🚦 <strong>Semaforo baten kontrola:</strong> berdealdian 30s, gorri 20s, errepikatu — begizta bat.</li>
            </ul>
          </div>
        </Section>

        {/* 2. HIRU EGITURA */}
        <Section id="hiru-egitura" icon={<List className="w-5 h-5" />} title="Hiru Oinarrizko Egitura" color="bg-indigo-600">
          <p className="text-slate-600 leading-relaxed mb-6">
            Edozein algoritmo konplikatuk hiru egitura oinarrizkotan oinarritzen da. Hauek ulertu ondoren,
            ia edozein arazo informatiko ebazten has zaitezke.
          </p>
          <HiruEgitura />
        </Section>

        {/* 3. SINBOLOAK */}
        <Section id="sinboloak" icon={<GitBranch className="w-5 h-5" />} title="Fluxu-Diagramen Sinboloak" color="bg-blue-600">
          <p className="text-slate-600 leading-relaxed mb-6">
            <strong>Fluxu-diagrama</strong> algoritmo bat era grafiko eta estandarrean irudikatzeko tresna da.
            Forma geometriko bakoitzak esanahi zehatz bat du:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {[
              { shape: '⬭', name: 'Elipsea / Kapsula', use: 'HASI eta BUKATU', extra: 'Algoritmoaren hasiera eta amaiera.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
              { shape: '▭', name: 'Laukizuzena', use: 'Prozesua / Kalkulua', extra: 'Aldagaiei balio bat esleitu, kalkulu bat egin.', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
              { shape: '◇', name: 'Erronboa', use: 'Erabakia (Bai/Ez)', extra: 'Baldintza bat egiaztatu. Bi irteera: Bai edo Ez.', color: 'text-amber-700 bg-amber-50 border-amber-200' },
              { shape: '▱', name: 'Paralelogramoa', use: 'Sarrera / Irteera', extra: 'Erabiltzailearen sarrera (IRAKURRI) edo emaitza (IDATZI).', color: 'text-violet-700 bg-violet-50 border-violet-200' },
              { shape: '→', name: 'Gezia', use: 'Fluxuaren norabidea', extra: 'Bloke batetik bestera nola joan erakusten du.', color: 'text-slate-700 bg-slate-50 border-slate-200' },
            ].map(item => (
              <div key={item.name} className={`flex items-start gap-4 p-4 rounded-xl border ${item.color}`}>
                <span className="text-3xl mt-0.5">{item.shape}</span>
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs font-semibold opacity-80 mb-0.5">{item.use}</p>
                  <p className="text-xs opacity-70 leading-relaxed">{item.extra}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. SIMULAGAILUA */}
        <Section id="simulagailua" icon={<Play className="w-5 h-5" />} title="Fluxu-Diagrama Interaktiboa" color="bg-cyan-600">
          <p className="text-slate-600 mb-6">
            Aukeratu adibide bat, irakurri azalpena eta sakatu <strong>"Exekutatu"</strong> fluxu-diagrama animatua ikusteko.
            Hiru adibideek hiru egitura ezberdinak erabiltzen dituzte.
          </p>
          <FlowchartSimulator />
        </Section>

        {/* 5. PSEUDOKODEA */}
        <Section id="pseudokodea" icon={<Code2 className="w-5 h-5" />} title="Pseudokodearen Gako-Hitzak" color="bg-slate-700">
          <p className="text-slate-600 leading-relaxed mb-6">
            <strong>Pseudokodea</strong> algoritmo bat idazteko hizkuntza erdi-informala da — programazio-lengoaia baten antza du,
            baina euskaraz idazten da. Ez da ordenagailuan exekutatzen, baina kodea idazten laguntzeko tresna da.
          </p>
          <PseudokodeErreferentzia />
          <div className="mt-4 bg-slate-800 text-slate-200 rounded-xl p-4 text-sm font-mono leading-relaxed">
            <p className="text-slate-400 text-xs mb-3">{/* Adibidea: Baldintza + Begizta */}</p>
            <span className="text-emerald-400">HASI</span>{'\n'}
            {'  '}<span className="text-blue-300">IRAKURRI</span> n{'\n'}
            {'  '}i <span className="text-amber-300">←</span> 1{'\n'}
            {'  '}<span className="text-yellow-300">BITARTEAN</span> i {'<='} n <span className="text-yellow-300">EGIN</span>{'\n'}
            {'    '}<span className="text-blue-300">IDATZI</span> i * i{'\n'}
            {'    '}i <span className="text-amber-300">←</span> i + 1{'\n'}
            {'  '}<span className="text-yellow-300">BUKATU_BITARTEAN</span>{'\n'}
            <span className="text-rose-400">BUKATU</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">↑ Adibidea: n-ra arte zenbaki bakoitzaren karratua inprimatzen du.</p>
        </Section>

        {/* 6. ARIKETAK */}
        <Section id="ariketak" icon={<CheckCircle className="w-5 h-5" />} title="Ariketak — Proba ezazu!" color="bg-emerald-600">
          <p className="text-slate-600 mb-6">
            {QUIZ.length} galdera. Denak erantzun ondoren, egiaztatu zure emaitzak eta azalpenak irakurri.
          </p>
          <Quiz />
        </Section>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">
            ← Hasierara itzuli
          </Link>
          <Link to="/programazioa-sarrera" className="flex items-center gap-2 bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-cyan-500 transition-colors text-sm">
            Hurrengo gaia <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
