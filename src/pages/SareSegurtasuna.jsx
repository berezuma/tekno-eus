import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight, AlertTriangle, Lock } from 'lucide-react';
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

/* ---- THREAT IDENTIFIER ---- */
const THREATS = [
  {
    id: 'phishing',
    name: 'Phishing',
    icon: '🎣',
    color: 'rose',
    description: 'Nortasun lapurreta mezu elektronikoen bidez. Webgune faltsu batean pasahitza sartzeko eskatzen dute.',
    example: 'Email bat jasotzen duzu: "Zure bankuko kontua blokeatu da. Sakatu hemen zure pasahitza berresteko."',
    prevention: 'Inoiz ez klikatu mezu susmagarrietako esteketan. Beti egiaztatu webgunearen URL-a.',
  },
  {
    id: 'malware',
    name: 'Malware',
    icon: '🦠',
    color: 'amber',
    description: 'Software maltzurra ordenagailua kaltetzeko edo datuak lapurtzeko diseinatuta dago.',
    example: 'Deskarga "doako" software bat eta zure datuak lapurtzen ditu edo erabiltzeko ordaindu behar duzu (ransomware).',
    prevention: 'Eguneratu sistema eragileak eta erabili antivirus eguneratua. Ez deskargatu software ezezagunetatik.',
  },
  {
    id: 'weak-password',
    name: 'Pasahitz ahulak',
    icon: '🔓',
    color: 'orange',
    description: 'Pasahitz sinpleak edo berrerabiltzen direnak kontuak hackeatzea errazten dute.',
    example: 'Pasahitzak "123456", "password" edo zure izen-abizena erabiltzea arrisku handia da.',
    prevention: 'Erabili gutxienez 12 karaktereko pasahitzak, letra larriak, txikiak, zenbakiak eta ikurrak. Pasahitz kudeatzaileak erabili.',
  },
  {
    id: 'cyberbullying',
    name: 'Ziberindarkeria',
    icon: '⚠️',
    color: 'fuchsia',
    description: 'Sarean beste pertsona bat jazartzea, mehatxatzea edo umiliatzea.',
    example: 'Norbaiti mezu iraingarriak bidaltzea, argazki pribatuak baimen gabe partekatzea (sextorsion).',
    prevention: 'Salatu plataformara eta pertsona heldu bati. Eutsi froga digitalak (pantaila-argazkiak).',
  },
  {
    id: 'privacy',
    name: 'Pribatutasun arriskuak',
    icon: '👁️',
    color: 'blue',
    description: 'Informazio pertsonala online partekatzeak arriskuak dakar.',
    example: 'Helbidea, telefonoa edo eskolaren izena sare sozialetan argitaratzeak arriskuak sortzen ditu.',
    prevention: 'Egiaztatu zure sare sozialen pribatutasun ezarpenak. Ez partekatu informazio pertsonala ezezagunekin.',
  },
];

const ThreatCard = ({ threat }) => {
  const [expanded, setExpanded] = useState(false);
  const colorMap = {
    rose: 'bg-rose-50 border-rose-200',
    amber: 'bg-amber-50 border-amber-200',
    orange: 'bg-orange-50 border-orange-200',
    fuchsia: 'bg-fuchsia-50 border-fuchsia-200',
    blue: 'bg-blue-50 border-blue-200',
  };
  return (
    <div className={`rounded-xl border p-4 cursor-pointer transition-all ${colorMap[threat.color]} ${expanded ? 'shadow-md' : ''}`}
      onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{threat.icon}</span>
          <h4 className="font-bold text-slate-900">{threat.name}</h4>
        </div>
        <span className="text-slate-400 text-sm">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="mt-4 space-y-3">
          <p className="text-slate-700 text-sm leading-relaxed"><strong>Zer da?</strong> {threat.description}</p>
          <div className="bg-white/70 rounded-lg p-3">
            <p className="text-slate-600 text-sm italic">📌 Adibidea: {threat.example}</p>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-emerald-700 text-sm leading-relaxed"><strong>Babesa:</strong> {threat.prevention}</p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---- PASSWORD STRENGTH CHECKER ---- */
const PasswordChecker = () => {
  const [password, setPassword] = useState('');

  const checks = [
    { label: 'Gutxienez 8 karaktere', ok: password.length >= 8 },
    { label: 'Letra larriak (A-Z)', ok: /[A-Z]/.test(password) },
    { label: 'Letra txikiak (a-z)', ok: /[a-z]/.test(password) },
    { label: 'Zenbakiak (0-9)', ok: /[0-9]/.test(password) },
    { label: 'Ikurrak (!@#$...)', ok: /[^A-Za-z0-9]/.test(password) },
    { label: 'Gutxienez 12 karaktere', ok: password.length >= 12 },
  ];

  const score = checks.filter(c => c.ok).length;
  const strengthLabel = score <= 2 ? 'Oso ahula' : score <= 3 ? 'Ahula' : score <= 4 ? 'Nahikoa' : score <= 5 ? 'Ona' : 'Bikaina!';
  const strengthColor = score <= 2 ? 'bg-rose-500' : score <= 3 ? 'bg-orange-500' : score <= 4 ? 'bg-amber-500' : score <= 5 ? 'bg-blue-500' : 'bg-emerald-500';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Sartu pasahitza (ez erabili zure benetako pasahitza!)</label>
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Idatzi pasahitz bat hemen..."
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
        />
      </div>

      {password && (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">Indarra:</span>
              <span className="font-bold text-slate-900">{strengthLabel}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${strengthColor}`} style={{ width: `${(score / 6) * 100}%` }} />
            </div>
          </div>
          <div className="space-y-2">
            {checks.map(c => (
              <div key={c.label} className={`flex items-center gap-2 text-sm ${c.ok ? 'text-emerald-700' : 'text-slate-400'}`}>
                <span>{c.ok ? '✓' : '○'}</span>
                {c.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ---- QUIZ ---- */
const QUIZ = [
  {
    q: 'Phishing zer da?',
    opts: [
      'Sarean arrantzan aritzea',
      'Mezu elektronikoen bidez pasahitzak lapurtzeko teknika bat',
      'Virus mota bat',
      'Enkriptazio metodoa',
    ],
    correct: 1,
  },
  {
    q: 'Pasahitz onen artean zeinek da seguruena?',
    opts: [
      '123456',
      'manex2010',
      'Tr7$kN!v2@mP',
      'password',
    ],
    correct: 2,
  },
  {
    q: 'Zer egin behar da ziberindarkeria jasotzen bada?',
    opts: [
      'Erantzun erasotzaileari',
      'Ezer ez egin',
      'Salatu plataformara eta pertsona heldu bati',
      'Kontua ezabatu',
    ],
    correct: 2,
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
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < QUIZ.length || submitted}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
          Egiaztatu
        </button>
        {submitted && <span className="font-bold text-slate-700">{score}/{QUIZ.length} zuzen {score === QUIZ.length ? '🛡️' : ''}</span>}
        {submitted && <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-sm text-slate-500 hover:text-slate-700">Berriz saiatu</button>}
      </div>
    </div>
  );
};

export default function SareSegurtasuna() {
  useDocumentTitle('Sare Segurtasuna');
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-gradient-to-br from-rose-600 to-pink-700 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="text-rose-200 text-sm hover:text-white mb-6 inline-block transition-colors">← tekno.eus</Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-rose-100 text-sm font-medium uppercase tracking-wider">DBH 3 · Digitalizazioa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sare Segurtasuna</h1>
          <p className="text-rose-100 text-lg max-w-2xl">
            Mehatxuak eta erasoak online. Datu babeseko neurriak eta ongizate digitala.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Section id="mehatxuak" icon={<AlertTriangle className="w-5 h-5" />} title="Mehatxu Digitalak" color="bg-rose-600">
          <p className="text-slate-600 leading-relaxed mb-6">
            Interneten erabiltzen dugun bitartean, arrisku desberdinak daude. Ezagutzea eta identifikatzea garrantzitsua da babesteko. Sakatu mehatxu bakoitzean informazio gehiago ikusteko:
          </p>
          <div className="space-y-3">
            {THREATS.map(threat => <ThreatCard key={threat.id} threat={threat} />)}
          </div>
        </Section>

        <Section id="pasahitzak" icon={<Lock className="w-5 h-5" />} title="Pasahitz Sendoak" color="bg-slate-700">
          <p className="text-slate-600 leading-relaxed mb-6">
            Pasahitz onak zure kontuak babestu ditzake. Probatu hemen pasahitz baten indarra:
          </p>
          <PasswordChecker />
        </Section>

        <Section id="ariketak" icon={<CheckCircle className="w-5 h-5" />} title="Ariketak" color="bg-emerald-600">
          <p className="text-slate-600 mb-6">Erantzun galderak eta egiaztatu zure ezagutzak:</p>
          <Quiz />
        </Section>

        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">← Hasierara itzuli</Link>
          <Link to="/gailu-digitalak" className="flex items-center gap-2 bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-cyan-500 transition-colors">
            Gailu Digitalak <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
