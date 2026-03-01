import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Construction } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function RobotikaOinarrizkoa() {
  useDocumentTitle('Robotikaren Oinarriak');
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="text-white/70 text-sm hover:text-white mb-6 inline-block transition-colors">← tekno.eus</Link>
          <span className="text-white/70 text-sm font-medium uppercase tracking-wider block mb-3">DBH 3 · Programazioa</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Robotikaren Oinarriak</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Construction className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-3">Gai hau prestatzeko bidean</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            Eduki interaktiboa sortzen ari gara. Laster eskuragarri egongo da!
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors">
            Beste gaiak ikusi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm font-medium">← Hasierara itzuli</Link>
          <Link to="/programazioa-sarrera" className="flex items-center gap-2 text-cyan-600 font-semibold text-sm hover:text-cyan-500">
            Programazioa Sarrera <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
