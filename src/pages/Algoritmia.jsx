import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GitBranch, CheckCircle, Play, RotateCcw } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

/* ---- SECTION WRAPPER ---- */
const Section = ({ id, icon, title, color, children }) => (
  <section id={id} className="mb-12">
    <div className={`flex items-center gap-3 mb-6 pb-3 border-b border-slate-200`}>
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white`}>{icon}</div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    {children}
  </section>
);

/* ---- FLOWCHART SIMULATOR ---- */
const BLOCKS = {
  start:    { label: 'HASI',       shape: 'rounded-full', bg: 'bg-emerald-500', text: 'text-white' },
  input:    { label: 'SARRERA',    shape: 'rounded-md skew-x-3', bg: 'bg-blue-500', text: 'text-white' },
  process:  { label: 'PROZESUA',  shape: 'rounded-md', bg: 'bg-cyan-600', text: 'text-white' },
  decision: { label: 'ERABAKIA',  shape: 'rotate-45 inline-block', bg: 'bg-amber-500', text: 'text-white' },
  output:   { label: 'IRTEERA',   shape: 'rounded-md -skew-x-3', bg: 'bg-violet-500', text: 'text-white' },
  end:      { label: 'BUKATU',    shape: 'rounded-full', bg: 'bg-rose-500', text: 'text-white' },
};

const FlowBlock = ({ type, label, active }) => {
  const block = BLOCKS[type];
  const isDecision = type === 'decision';

  if (isDecision) {
    return (
      <div className={`relative flex items-center justify-center my-1 ${active ? 'scale-105' : ''} transition-transform`}>
        <div className={`w-28 h-28 ${block.bg} transform rotate-45 ${active ? 'ring-4 ring-amber-300 ring-offset-2' : ''} transition-all`} />
        <span className={`absolute text-white text-xs font-bold text-center leading-tight px-1`} style={{ width: '70px' }}>
          {label || block.label}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center my-1 transition-all ${active ? 'scale-105' : ''}`}>
      <div className={`px-6 py-3 min-w-[140px] text-center font-bold text-sm ${block.bg} ${block.text} ${block.shape} ${active ? 'ring-4 ring-cyan-300 ring-offset-2' : ''} shadow transition-all`}>
        {label || block.label}
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
    title: 'Zenbaki positiboa/negatiboa',
    steps: [
      { type: 'start', label: 'HASI' },
      { type: 'input', label: 'Irakurri x' },
      { type: 'decision', label: 'x > 0?' },
      { type: 'output', label: '"Positibo"' },
      { type: 'end', label: 'BUKATU' },
    ],
    sideSteps: [
      { label: 'Ez', out: '"Negat./Zero"' }
    ],
    pseudocode: `HASI
  IRAKURRI x
  BALDIN x > 0 ORDUAN
    IDATZI "Zenbakia positiboa da"
  BESTELA
    IDATZI "Zenbakia negatiboa edo zeroa da"
  BUKATU_BALDIN
BUKATU`,
  },
  maximoa: {
    title: 'Bi zenbakiren maximoa',
    steps: [
      { type: 'start', label: 'HASI' },
      { type: 'input', label: 'Irakurri a, b' },
      { type: 'decision', label: 'a > b?' },
      { type: 'output', label: '"Max = a"' },
      { type: 'end', label: 'BUKATU' },
    ],
    sideSteps: [
      { label: 'Ez', out: '"Max = b"' }
    ],
    pseudocode: `HASI
  IRAKURRI a
  IRAKURRI b
  BALDIN a > b ORDUAN
    IDATZI "Maximoa: ", a
  BESTELA
    IDATZI "Maximoa: ", b
  BUKATU_BALDIN
BUKATU`,
  },
};

const FlowchartSimulator = () => {
  const [selectedProgram, setSelectedProgram] = useState('zenbakia');
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const prog = DEMO_PROGRAMS[selectedProgram];

  const runAnimation = async () => {
    setRunning(true);
    for (let i = 0; i < prog.steps.length; i++) {
      setActiveStep(i);
      await new Promise(r => setTimeout(r, 700));
    }
    setActiveStep(-1);
    setRunning(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(DEMO_PROGRAMS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => { setSelectedProgram(key); setActiveStep(-1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedProgram === key ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Flowchart */}
        <div>
          <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">Fluxu-diagrama</h4>
          <div className="flex flex-col items-center bg-slate-50 rounded-xl p-4 min-h-80">
            {prog.steps.map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Arrow label={i === 2 ? 'Bai' : ''} />}
                <FlowBlock type={step.type} label={step.label} active={activeStep === i} />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pseudocode */}
        <div>
          <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">Pseudokodea</h4>
          <pre className="bg-slate-900 text-emerald-400 rounded-xl p-4 text-sm leading-relaxed overflow-x-auto font-mono min-h-48">
            {prog.pseudocode}
          </pre>

          <div className="mt-4 flex gap-3">
            <button
              onClick={runAnimation}
              disabled={running}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              {running ? 'Exekutatzen...' : 'Exekutatu'}
            </button>
            <button
              onClick={() => setActiveStep(-1)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-lg transition-colors"
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

/* ---- QUIZ ---- */
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
  },
  {
    q: 'Fluxu-diagrama batean, erabaki-blokea zer formaz irudikatzen da?',
    opts: ['Laukizuzen batez', 'Erronbo batez', 'Elipse batez', 'Geziz'],
    correct: 1,
  },
  {
    q: 'Pseudokodean, "BALDIN x > 0 ORDUAN" zer egitura da?',
    opts: ['Begizta bat', 'Baldintza-egitura', 'Aldagai bat', 'Funtzioa'],
    correct: 1,
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
                let bg = 'bg-slate-50 border-slate-200 hover:bg-slate-100';
                if (submitted) {
                  if (j === q.correct) bg = 'bg-emerald-50 border-emerald-300';
                  else if (answers[i] === j && j !== q.correct) bg = 'bg-rose-50 border-rose-300';
                } else if (answers[i] === j) {
                  bg = 'bg-cyan-50 border-cyan-300';
                }
                return (
                  <button
                    key={j}
                    disabled={submitted}
                    onClick={() => setAnswers(a => ({ ...a, [i]: j }))}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${bg}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < QUIZ.length || submitted}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg transition-colors"
        >
          Egiaztatu
        </button>
        {submitted && (
          <span className="font-bold text-slate-700">
            {score}/{QUIZ.length} zuzen {score === QUIZ.length ? '🎉' : ''}
          </span>
        )}
        {submitted && (
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-sm text-slate-500 hover:text-slate-700">
            Berriz saiatu
          </button>
        )}
      </div>
    </div>
  );
};

/* ---- MAIN PAGE ---- */
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
            Algoritmo kontzeptua, fluxu-diagramen eraikuntza eta arazo teknikoen ebazpena pseudokodea erabiliz.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        <Section id="zer-da" icon={<GitBranch className="w-5 h-5" />} title="Zer da Algoritmo bat?" color="bg-violet-600">
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Algoritmo bat</strong> arazo bat ebazteko edo zeregin bat betetzeko jarraibide-multzo zehatza eta ordenatua da. Hiru ezaugarri nagusi ditu:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Zehaztasuna', desc: 'Urrats bakoitza argi eta zehatz definitua egon behar da.', color: 'bg-violet-50 border-violet-200 text-violet-700' },
                { label: 'Amaiera', desc: 'Algoritmoa beti amaitu behar da urrats kopuru finitu baten ondoren.', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                { label: 'Eraginkortasuna', desc: 'Baliabide gutxien erabiliz emaitza lortu behar da.', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
              ].map(item => (
                <div key={item.label} className={`p-4 rounded-xl border ${item.color}`}>
                  <h4 className="font-bold mb-1">{item.label}</h4>
                  <p className="text-sm leading-relaxed opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed">
              Eguneroko bizitzan algoritmo asko erabiltzen ditugu jakiteke: errezeta bat jarraitzea, GPS-aren ibilbidea, edo garbia nola egin — denak algoritmoak dira!
            </p>
          </div>
        </Section>

        <Section id="fluxu" icon={<GitBranch className="w-5 h-5" />} title="Fluxu-Diagramak" color="bg-blue-600">
          <p className="text-slate-600 leading-relaxed mb-6">
            <strong>Fluxu-diagrama</strong> algoritmo bat grafiko bidez irudikatzeko tresna da. Forma geometriko estandarrak erabiltzen dira:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { shape: '⬭', name: 'Elipsea', use: 'HASI eta BUKATU', color: 'text-emerald-600 bg-emerald-50' },
              { shape: '▭', name: 'Laukizuzena', use: 'Prozesua / Kalkulua', color: 'text-cyan-600 bg-cyan-50' },
              { shape: '◇', name: 'Erronboa', use: 'Erabakia (Bai/Ez)', color: 'text-amber-600 bg-amber-50' },
              { shape: '▱', name: 'Paralelogramoa', use: 'Sarrera / Irteera', color: 'text-violet-600 bg-violet-50' },
            ].map(item => (
              <div key={item.name} className={`flex items-center gap-4 p-4 rounded-xl ${item.color}`}>
                <span className="text-3xl">{item.shape}</span>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm opacity-75">{item.use}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="simulagailua" icon={<Play className="w-5 h-5" />} title="Fluxu-Diagrama Interaktiboa" color="bg-cyan-600">
          <p className="text-slate-600 mb-6">
            Aukeratu adibide bat eta sakatu "Exekutatu" fluxu-diagrama animatua ikusteko:
          </p>
          <FlowchartSimulator />
        </Section>

        <Section id="ariketak" icon={<CheckCircle className="w-5 h-5" />} title="Ariketak" color="bg-emerald-600">
          <p className="text-slate-600 mb-6">Erantzun galderak zuzen eta egiaztatu.</p>
          <Quiz />
        </Section>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">
            ← Hasierara itzuli
          </Link>
          <Link to="/programazioa-sarrera" className="flex items-center gap-2 bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-cyan-500 transition-colors">
            Hurrengo gaia <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
