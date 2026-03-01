import { useEffect } from 'react';

const BASE = 'tekno.eus';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Teknologia eta Digitalizazioa euskaraz`;
  }, [title]);
}
