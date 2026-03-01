import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('404 — Orria ez da aurkitu');
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-cyan-200 mb-4">404</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Orria ez da aurkitu</h1>
        <p className="text-slate-600 mb-8">Bilatzen ari zaren orria ez dago edo mugitu egin da.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors">
          Hasierara itzuli
        </Link>
      </div>
    </div>
  );
}
