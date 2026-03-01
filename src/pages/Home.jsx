import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PrefetchLink from '../components/PrefetchLink';
import { ROUTE_IMPORTS } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { RESOURCES, CATEGORIES, ACTIVE_COUNT } from '../data/resources';
import useDocumentTitle from '../hooks/useDocumentTitle';
import {
  Cpu,
  ArrowRight,
  Menu,
  X,
  Search,
  Globe,
  Zap,
  Shield,
  Code,
  Bot,
  Leaf,
  BookOpen,
  Sparkles,
  CheckCircle,
  GraduationCap,
  Heart,
  GitBranch,
  Monitor,
  User,
  Network,
  CircuitBoard,
} from 'lucide-react';

/* --- DATA --- */
const NAV_LINKS = [
  { name: 'Hasiera', href: '#hero' },
  { name: 'Gaiak', href: '#topics' },
  { name: 'Zer Egin', href: '#how-it-works' },
  { name: 'Nor Naiz', href: '#about' },
];

const FEATURED_TOPICS = [
  {
    ...RESOURCES.find(r => r.id === 'algoritmia'),
    previewCode: 'HASI\n  irakurri(x)\n  BALDIN x > 0 ORDUAN\n    idatzi("Positibo")\n  BESTELA\n    idatzi("Zero/Negatibo")\nBUKATU',
    previewLabel: 'Fluxu-diagrama interaktiboa',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    ...RESOURCES.find(r => r.id === 'elektrizitate-oinarrizkoa'),
    previewCode: 'V = I × R\nP = V × I\nP = I² × R',
    previewLabel: 'Zirkuitu elektrikoa kalkulatu',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    ...RESOURCES.find(r => r.id === 'sare-segurtasuna'),
    previewCode: 'Phishing ⚠\nMalware ⚠\nCiberbullying ⚠\nContraseña segura ✓',
    previewLabel: 'Mehatxuak identifikatu',
    gradient: 'from-rose-600 to-pink-600',
  },
];

/* --- COMPONENTS --- */
const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute opacity-15 blur-3xl rounded-full ${className}`}
    animate={{ y: [0, -25, 0], x: [0, 15, 0], scale: [1, 1.15, 1] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* Animated circuit board demo for hero */
const CircuitDemo = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 320;
    const h = canvas.height = 280;
    let frame = 0;
    let animId;

    // Circuit nodes
    const nodes = [
      { x: 50,  y: 140, label: 'PWR',  color: '#f59e0b' },
      { x: 120, y: 60,  label: 'CPU',  color: '#06b6d4' },
      { x: 260, y: 60,  label: 'RAM',  color: '#8b5cf6' },
      { x: 120, y: 220, label: 'I/O',  color: '#10b981' },
      { x: 260, y: 220, label: 'OUT',  color: '#f43f5e' },
      { x: 190, y: 140, label: 'BUS',  color: '#06b6d4' },
    ];

    // Edges (from, to)
    const edges = [
      [0, 1], [0, 3],
      [1, 2], [1, 5],
      [3, 5], [3, 4],
      [5, 2], [5, 4],
    ];

    // Animated packets on each edge
    const packets = edges.map(([from, to]) => ({
      from, to,
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.003,
      color: nodes[from].color,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = 'rgba(6,182,212,0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for (let i = 0; i < h; i += 30) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      // Draw edges
      edges.forEach(([fi, ti]) => {
        const f = nodes[fi], t = nodes[ti];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6,182,212,0.25)';
        ctx.lineWidth = 1.5;
        // Right-angle routing
        const mx = (f.x + t.x) / 2;
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(mx, f.y);
        ctx.lineTo(mx, t.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
      });

      // Animated packets
      packets.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const f = nodes[p.from], t = nodes[p.to];
        const mx = (f.x + t.x) / 2;

        // Compute position along right-angle path
        let px, py;
        const seg1 = Math.abs(mx - f.x);
        const seg2 = Math.abs(t.y - f.y);
        const seg3 = Math.abs(t.x - mx);
        const total = seg1 + seg2 + seg3;
        const d = p.t * total;

        if (d < seg1) {
          const r = d / seg1;
          px = f.x + (mx - f.x) * r;
          py = f.y;
        } else if (d < seg1 + seg2) {
          const r = (d - seg1) / seg2;
          px = mx;
          py = f.y + (t.y - f.y) * r;
        } else {
          const r = (d - seg1 - seg2) / seg3;
          px = mx + (t.x - mx) * r;
          py = t.y;
        }

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = 1 + Math.sin(frame * 0.05 + n.x) * 0.08;

        ctx.beginPath();
        ctx.fillStyle = n.color + '22';
        ctx.arc(n.x, n.y, 18 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = n.color;
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ maxWidth: 320, maxHeight: 280 }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl tracking-tighter text-white">
          Tekno<span className="text-cyan-400">.eus</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <a href="#topics" className="hidden md:block bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30">
          Hasi Ikasten
        </a>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800"
          >
            <div className="flex flex-col p-6 space-y-4">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white font-medium">
                  {link.name}
                </a>
              ))}
              <a href="#topics" onClick={() => setIsOpen(false)} className="bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg text-center">
                Hasi Ikasten
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
    <FloatingShape className="bg-cyan-600 w-96 h-96 -top-20 -left-20" delay={0} />
    <FloatingShape className="bg-blue-600 w-72 h-72 top-40 right-10" delay={2} />
    <FloatingShape className="bg-teal-500 w-64 h-64 bottom-20 left-1/3" delay={1} />
    <FloatingShape className="bg-violet-500 w-48 h-48 top-1/4 right-1/3" delay={3} />
    <FloatingShape className="bg-rose-500 w-40 h-40 bottom-40 right-20" delay={4} />

    <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />

    <div className="container mx-auto px-6 relative z-10 pb-28 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          DBH eta Batxilergoa · Euskaraz · Interaktiboa · Doakoa
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Teknologia Ikasi,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
            Esperimentatuz
          </span>
        </h1>
        <p className="text-slate-400 text-lg mb-4 max-w-lg leading-relaxed">
          Kaixo! Proiektu hau Teknologia eta Digitalizazioa irakasgaia euskaraz ikasteko sortu da: simulagailu interaktiboak, urratsez-urratseko azalpenak eta ariketa ebatziak.
        </p>
        <p className="text-slate-500 text-sm mb-8 max-w-lg leading-relaxed">
          Teknologiak ikus eta uki ditzazun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <a href="#topics" className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1">
            Hasi Ikasten <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#about" className="flex items-center justify-center gap-2 text-slate-300 font-semibold py-4 px-8 rounded-lg border border-slate-700 hover:border-slate-500 hover:text-white transition-all">
            <User className="w-4 h-4" /> Nor naiz?
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8">
          {[
            { value: `${ACTIVE_COUNT}`, label: 'Gai aktibo' },
            { value: '3', label: 'Maila' },
            { value: '%100', label: 'Doakoa' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative hidden md:block"
      >
        <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-slate-500 text-xs ml-2 font-mono">zirkuitu.tekno.eus</span>
          </div>
          <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center p-4">
            <CircuitDemo />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono">CPU → RAM → I/O → OUT</span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Network className="w-3 h-3" /> Datu-fluxua
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeaturedTopics = () => (
  <section className="py-20 bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Nabarmendutakoak</span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Zuzenean probatu</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {FEATURED_TOPICS.map((topic, idx) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              to={topic.link}
              className="group block h-full rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-transparent hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${topic.gradient}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${topic.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {topic.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {topic.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{topic.description}</p>
                <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100 group-hover:border-cyan-100 transition-colors">
                  <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">{topic.previewCode}</pre>
                  <p className="text-xs text-slate-400 mt-1">{topic.previewLabel}</p>
                </div>
                <div className="flex items-center text-cyan-600 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                  Hasi orain <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: <BookOpen className="w-7 h-7" />,
      color: 'bg-cyan-100 text-cyan-600',
      title: 'Aukeratu Gaia',
      description: 'DBH eta Batxilergoko gaiak prest. Hautatu zure mailara eta interesera egokitzen dena.',
      number: '01',
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      color: 'bg-blue-100 text-blue-600',
      title: 'Ikasi eta Esperimentatu',
      description: 'Azalpen bisualak, simulagailuak eta adibide ebatziak urratsez urrats. Probatu eta esperimentatu.',
      number: '02',
    },
    {
      icon: <CheckCircle className="w-7 h-7" />,
      color: 'bg-emerald-100 text-emerald-600',
      title: 'Praktikatu',
      description: 'Ariketa interaktiboak berehalako feedbackarekin. Akatsak eginez ikasten da.',
      number: '03',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Metodologia</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Zer egin?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="text-center relative"
            >
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-slate-200" />
              )}
              <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-4 relative z-10`}>
                {step.icon}
              </div>
              <span className="text-xs font-bold text-slate-300 tracking-widest">{step.number}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResourceHub = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    let filtered = RESOURCES;
    if (activeCategory !== 'all') filtered = filtered.filter(r => r.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  const getCategoryCount = (catId) => {
    if (catId === 'all') return ACTIVE_COUNT;
    return RESOURCES.filter(r => r.category === catId && r.link && r.link !== '#').length;
  };

  return (
    <section id="topics" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Eduki guztiak</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {ACTIVE_COUNT} Gai
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            DBH eta Batxilergoko Teknologia eta Digitalizazioa irakasgaiko gaiak. Gai berriak gehitzen ari gara etengabe.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Bilatu gaia..."
            className="w-full pl-12 pr-10 py-3 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => {
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-lg transform scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.icon}
                {cat.label}
                {count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredResources.map(resource => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={resource.id}
              >
                {resource.link && resource.link !== '#' ? (
                  <PrefetchLink to={resource.link} importFn={ROUTE_IMPORTS[resource.link]} className="block h-full group bg-white border border-slate-200 hover:border-transparent rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/5 cursor-pointer">
                    <div className={`h-1 ${resource.color}`} />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${resource.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {resource.icon}
                        </div>
                        <div className="flex items-center gap-1.5 flex-col items-end">
                          {resource.isNew && (
                            <span className="text-xs font-bold bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full">BERRIA</span>
                          )}
                          {resource.level && (
                            <span className="text-xs text-slate-400 font-medium">{resource.level}</span>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {CATEGORIES.find(c => c.id === resource.category)?.label}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-cyan-600 transition-colors">{resource.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{resource.description}</p>
                      </div>
                      <div className="flex items-center text-cyan-600 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                        Sar zaitez <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </PrefetchLink>
                ) : (
                  <div className="block h-full bg-white border border-slate-200 rounded-2xl overflow-hidden opacity-50 cursor-not-allowed">
                    <div className="h-1 bg-slate-200" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                          {resource.icon}
                        </div>
                        {resource.level && <span className="text-xs text-slate-400">{resource.level}</span>}
                      </div>
                      <div className="mb-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {CATEGORIES.find(c => c.id === resource.category)?.label}
                        </span>
                        <h3 className="text-lg font-bold text-slate-700 mt-1 mb-2">{resource.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{resource.description}</p>
                      </div>
                      <div className="flex items-center text-slate-400 text-sm font-bold gap-1">Laster...</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Ez da emaitzarik aurkitu.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-4 text-cyan-600 font-bold hover:text-cyan-500 transition-colors">
              Garbitu bilaketa
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const FeaturesStrip = () => {
  const features = [
    { icon: <Globe className="w-6 h-6" />, label: 'Euskaraz', color: 'text-emerald-400' },
    { icon: <Heart className="w-6 h-6" />, label: 'Doakoa', color: 'text-rose-400' },
    { icon: <Zap className="w-6 h-6" />, label: 'Interaktiboa', color: 'text-amber-400' },
    { icon: <GraduationCap className="w-6 h-6" />, label: 'DBH eta Batxilergoa', color: 'text-cyan-400' },
  ];

  return (
    <section className="py-12 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {features.map(f => (
            <div key={f.label} className="flex items-center gap-3">
              <span className={f.color}>{f.icon}</span>
              <span className="text-white font-semibold text-sm md:text-base">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutMe = () => (
  <section id="about" className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Nor naiz?</span>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Beñat Erezuma</h2>
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10 text-white" />
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          Kaixo! Beñat Erezuma naiz, eta proiektu hau sortu dut Teknologia eta Digitalizazioa irakasgaia euskaraz ikasteko modu interaktibo eta bisual bat eskaintzeko.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          DBH eta Batxilergoko ikasleentzat pentsatua dago, baina edozeinek erabil dezake. Nire helburua da teknologiaren mundua ulertzea errazagoa eta dibertigarriagoa egitea.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          <strong>Mate.eus</strong> proiektuaren sortzailea ere banaiz — matematika euskaraz ikasteko plataforma.
        </p>
        <a href="https://berezuma.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-500 transition-colors">
          berezuma.com <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const activeTopics = RESOURCES.filter(r => r.link && r.link !== '#');

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">Tekno<span className="text-cyan-400">.eus</span></div>
            <p className="max-w-sm text-sm leading-relaxed mb-4">
              Teknologia eta Digitalizazioa irakasgaia ikasteko plataforma digitala, euskaraz eta interaktiboa.
              DBH eta Batxilergoko ikasleentzat pentsatua.
            </p>
            <p className="text-xs text-slate-600">
              Egilea: <a href="https://berezuma.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Beñat Erezuma</a>
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Gaiak</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                const topics = activeTopics.filter(t => t.category === cat.id);
                if (topics.length === 0) return null;
                return (
                  <div key={cat.id}>
                    <p className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-2">{cat.label}</p>
                    <ul className="space-y-1">
                      {topics.map(topic => (
                        <li key={topic.id}>
                          <Link to={topic.link} className="hover:text-cyan-400 transition-colors text-xs">{topic.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            <Link to="/lege-oharra" className="hover:text-cyan-400 transition-colors">Lege Oharra</Link>
            <Link to="/pribatutasun-politika" className="hover:text-cyan-400 transition-colors">Pribatutasuna</Link>
            <Link to="/lizentzia" className="hover:text-cyan-400 transition-colors">Lizentzia</Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <span>&copy; 2026 TEKNO.EUS | Beñat Erezumak egina</span>
            <span className="text-slate-600">CC BY-NC-SA 4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  useDocumentTitle(null);
  return (
    <div className="font-sans antialiased text-slate-900 bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <FeaturedTopics />
        <HowItWorks />
        <ResourceHub />
        <FeaturesStrip />
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
