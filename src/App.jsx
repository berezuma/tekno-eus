import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import PageTransition from './components/PageTransition';
import ThemeToggle from './components/ThemeToggle';

export const ROUTE_IMPORTS = {
  '/': () => import('./pages/Home'),
  '/arazo-ebazpena': () => import('./pages/ArazoEbazpena'),
  '/informazio-bilaketa': () => import('./pages/InformazioBilaketa'),
  '/material-teknologikoak': () => import('./pages/MaterialTeknologikoak'),
  '/grafikoen-ordezkapena': () => import('./pages/GrafikoenOrdezkapena'),
  '/cad-aplikazioak': () => import('./pages/CadAplicazioak'),
  '/algoritmia': () => import('./pages/Algoritmia'),
  '/programazioa-sarrera': () => import('./pages/ProgramazioaSarrera'),
  '/robotika-oinarrizkoa': () => import('./pages/RobotikaOinarrizkoa'),
  '/gailu-digitalak': () => import('./pages/GailuDigitalak'),
  '/komunikazio-digitalak': () => import('./pages/KomunikazioDigitalak'),
  '/sare-segurtasuna': () => import('./pages/SareSegurtasuna'),
  '/teknologia-iraunkorra': () => import('./pages/TeknologiaIraunkorra'),
  '/proiektuen-kudeaketa': () => import('./pages/ProiektuenKudeaketa'),
  '/materialak-fabrikazioa': () => import('./pages/MaterialakFabrikazioa'),
  '/transmisio-mekanismoak': () => import('./pages/TransmisioMekanismoak'),
  '/zirkuitu-elektrikoak': () => import('./pages/ZirkuituElektrikoak'),
  '/elektrizitate-oinarrizkoa': () => import('./pages/ElektrizitateOinarrizkoa'),
  '/programazio-testua': () => import('./pages/ProgramazioTestua'),
  '/kontrol-automatikoa': () => import('./pages/KontrolAutomatikoa'),
  '/energia-iraunkorra': () => import('./pages/EnergiaIraunkorra'),
  '/adimen-artifiziala': () => import('./pages/AdimenArtifiziala'),
  '/lege-oharra': () => import('./pages/LegeOharra'),
  '/pribatutasun-politika': () => import('./pages/PribatutasunPolitika'),
  '/lizentzia': () => import('./pages/Lizentzia'),
};

const Home = lazy(ROUTE_IMPORTS['/']);
const ArazoEbazpena = lazy(ROUTE_IMPORTS['/arazo-ebazpena']);
const InformazioBilaketa = lazy(ROUTE_IMPORTS['/informazio-bilaketa']);
const MaterialTeknologikoak = lazy(ROUTE_IMPORTS['/material-teknologikoak']);
const GrafikoenOrdezkapena = lazy(ROUTE_IMPORTS['/grafikoen-ordezkapena']);
const CadAplicazioak = lazy(ROUTE_IMPORTS['/cad-aplikazioak']);
const Algoritmia = lazy(ROUTE_IMPORTS['/algoritmia']);
const ProgramazioaSarrera = lazy(ROUTE_IMPORTS['/programazioa-sarrera']);
const RobotikaOinarrizkoa = lazy(ROUTE_IMPORTS['/robotika-oinarrizkoa']);
const GailuDigitalak = lazy(ROUTE_IMPORTS['/gailu-digitalak']);
const KomunikazioDigitalak = lazy(ROUTE_IMPORTS['/komunikazio-digitalak']);
const SareSegurtasuna = lazy(ROUTE_IMPORTS['/sare-segurtasuna']);
const TeknologiaIraunkorra = lazy(ROUTE_IMPORTS['/teknologia-iraunkorra']);
const ProiektuenKudeaketa = lazy(ROUTE_IMPORTS['/proiektuen-kudeaketa']);
const MaterialakFabrikazioa = lazy(ROUTE_IMPORTS['/materialak-fabrikazioa']);
const TransmisioMekanismoak = lazy(ROUTE_IMPORTS['/transmisio-mekanismoak']);
const ZirkuituElektrikoak = lazy(ROUTE_IMPORTS['/zirkuitu-elektrikoak']);
const ElektrizitateOinarrizkoa = lazy(ROUTE_IMPORTS['/elektrizitate-oinarrizkoa']);
const ProgramazioTestua = lazy(ROUTE_IMPORTS['/programazio-testua']);
const KontrolAutomatikoa = lazy(ROUTE_IMPORTS['/kontrol-automatikoa']);
const EnergiaIraunkorra = lazy(ROUTE_IMPORTS['/energia-iraunkorra']);
const AdimenArtifiziala = lazy(ROUTE_IMPORTS['/adimen-artifiziala']);
const LegeOharra = lazy(ROUTE_IMPORTS['/lege-oharra']);
const PribatutasunPolitika = lazy(ROUTE_IMPORTS['/pribatutasun-politika']);
const Lizentzia = lazy(ROUTE_IMPORTS['/lizentzia']);
const NotFound = lazy(() => import('./pages/NotFound'));

const P = (C) => (
  <Suspense fallback={<LoadingSpinner />}>
    <PageTransition><C /></PageTransition>
  </Suspense>
);

function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <ThemeToggle />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={P(Home)} />
          <Route path="/arazo-ebazpena" element={P(ArazoEbazpena)} />
          <Route path="/informazio-bilaketa" element={P(InformazioBilaketa)} />
          <Route path="/material-teknologikoak" element={P(MaterialTeknologikoak)} />
          <Route path="/grafikoen-ordezkapena" element={P(GrafikoenOrdezkapena)} />
          <Route path="/cad-aplikazioak" element={P(CadAplicazioak)} />
          <Route path="/algoritmia" element={P(Algoritmia)} />
          <Route path="/programazioa-sarrera" element={P(ProgramazioaSarrera)} />
          <Route path="/robotika-oinarrizkoa" element={P(RobotikaOinarrizkoa)} />
          <Route path="/gailu-digitalak" element={P(GailuDigitalak)} />
          <Route path="/komunikazio-digitalak" element={P(KomunikazioDigitalak)} />
          <Route path="/sare-segurtasuna" element={P(SareSegurtasuna)} />
          <Route path="/teknologia-iraunkorra" element={P(TeknologiaIraunkorra)} />
          <Route path="/proiektuen-kudeaketa" element={P(ProiektuenKudeaketa)} />
          <Route path="/materialak-fabrikazioa" element={P(MaterialakFabrikazioa)} />
          <Route path="/transmisio-mekanismoak" element={P(TransmisioMekanismoak)} />
          <Route path="/zirkuitu-elektrikoak" element={P(ZirkuituElektrikoak)} />
          <Route path="/elektrizitate-oinarrizkoa" element={P(ElektrizitateOinarrizkoa)} />
          <Route path="/programazio-testua" element={P(ProgramazioTestua)} />
          <Route path="/kontrol-automatikoa" element={P(KontrolAutomatikoa)} />
          <Route path="/energia-iraunkorra" element={P(EnergiaIraunkorra)} />
          <Route path="/adimen-artifiziala" element={P(AdimenArtifiziala)} />
          <Route path="/lege-oharra" element={P(LegeOharra)} />
          <Route path="/pribatutasun-politika" element={P(PribatutasunPolitika)} />
          <Route path="/lizentzia" element={P(Lizentzia)} />
          <Route path="*" element={P(NotFound)} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
