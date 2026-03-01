import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Lizentzia() {
  useDocumentTitle('Lizentzia');
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" className="text-cyan-600 text-sm font-medium hover:text-cyan-500 mb-8 inline-block">← Hasierara itzuli</Link>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Lizentzia</h1>
        <p className="text-slate-500 text-sm mb-10">CC BY-NC-SA 4.0</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">©</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Creative Commons</h2>
            <p className="text-cyan-600 font-bold text-lg">BY-NC-SA 4.0</p>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl">BY</span>
              <div><strong className="text-slate-900 block">Aitorpena</strong> Egilearen izena aipatu behar da edozertan erabiltzen bada.</div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl">NC</span>
              <div><strong className="text-slate-900 block">Ez Komertziala</strong> Edukia ezin da merkataritza-xedeetarako erabili.</div>
            </div>
            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
              <span className="text-2xl">SA</span>
              <div><strong className="text-slate-900 block">Partekatu Berdin</strong> Edukia moldatu bada, lizentzia berdinarekin banatu behar da.</div>
            </div>
          </div>

          <p className="text-slate-500 text-sm mt-8">
            Lizentziaren testu osoa: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.eu" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-500">creativecommons.org</a>
          </p>
        </div>
      </div>
    </div>
  );
}
