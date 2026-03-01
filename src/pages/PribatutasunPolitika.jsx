import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
    <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function PribatutasunPolitika() {
  useDocumentTitle('Pribatutasun Politika');
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/" className="text-cyan-600 text-sm font-medium hover:text-cyan-500 mb-8 inline-block">← Hasierara itzuli</Link>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Pribatutasun Politika</h1>
        <p className="text-slate-500 text-sm mb-10">Azken eguneraketa: 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <Section title="1. Datu pertsonalak ez biltzea">
            <p>tekno.eus webguneak ez ditu erabiltzaileen datu pertsonalik biltzen. Ez dago erregistrorik, ez kontu pertsonalik.</p>
          </Section>
          <Section title="2. Gailuan gordetako datuak">
            <p>Gaiaren aukeraketa eta gai-zerrenda bezalako hobespenak zure gailuaren <strong>localStorage</strong>-an gordetzen dira soilik. Datu hauek ez dira inoiz gure zerbitzarietara bidaltzen.</p>
          </Section>
          <Section title="3. Cookie-ak">
            <p>Webgune honek ez ditu seguimendurako cookie-ak erabiltzen. Funtzionaltasun cookie-ak soilik erabil daitezke (argitasun/iluntasun modua).</p>
          </Section>
          <Section title="4. Hirugarrenak">
            <p>Plataformak ez du hirugarrenen jarraipena, publizitate-sarerik edo analitika kanpoko zerbitzu estekaturik dakar.</p>
          </Section>
          <Section title="5. Harreman-helbidea">
            <p>Galderak izanez gero: info@berezuma.com</p>
          </Section>
        </div>
      </div>
    </div>
  );
}
