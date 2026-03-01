import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function LegeOharra() {
  useDocumentTitle('Lege Oharra');
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" className="text-cyan-600 text-sm font-medium hover:text-cyan-500 mb-8 inline-block">← Hasierara itzuli</Link>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Lege Oharra</h1>
        <p className="text-slate-500 text-sm mb-10">Azken eguneraketa: 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <Section title="1. Webgunearen titularra">
            <p>Webgune honen titularra <strong>Beñat Erezuma</strong> da. Helbide elektronikoa: info@berezuma.com</p>
          </Section>
          <Section title="2. Xedea">
            <p>tekno.eus webgunea Teknologia eta Digitalizazioa irakasgaia euskaraz ikasteko plataforma hezigarri eta doako bat da, DBH eta Batxilergoko ikasleentzat zuzendua.</p>
          </Section>
          <Section title="3. Jabetza intelektuala">
            <p>Webguneko eduki guztiak (testuak, irudiak, simulagailuak) <strong>CC BY-NC-SA 4.0</strong> lizentziapean daude. Erabilera ez-komertziala baimenduta dago, iturria aipatuta.</p>
          </Section>
          <Section title="4. Erantzukizunaren mugak">
            <p>Plataformak hezkuntza-xedea du soilik. Egilea ez da arduratzen eduki horien erabilera okerretik eratorritako kalteen erantzule.</p>
          </Section>
          <Section title="5. Legeak">
            <p>Web hau Espainiako legediari jarraituz kudeatzen da, hala nola LSSI-CE legeak ezarritako baldintzekin bat etorriz.</p>
          </Section>
        </div>
      </div>
    </div>
  );
}
