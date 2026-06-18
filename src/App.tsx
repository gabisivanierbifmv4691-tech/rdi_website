/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Header from './components/Header';
import LandingIntro from './components/LandingIntro';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ProjectsPage from './components/ProjectsPage';
import NewsPage from './components/NewsPage';
import ResearchPage from './components/ResearchPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import ImprintPage from './components/ImprintPage';
import JoinUsPage from './components/JoinUsPage';
import Footer from './components/Footer';

import ProjectDetail from './components/ProjectDetail';
import NewsDetail from './components/NewsDetail';
import ResearchDetail from './components/ResearchDetail';

export type Language = 'en' | 'cn';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [lang, setLang] = useState<Language>('cn');
  const [showIntro, setShowIntro] = useState(() => {
    const href = window.location.href;
    const forceIntro = href.includes('intro=true');
    if (forceIntro) {
      sessionStorage.removeItem('rdi_intro_played');
      return true;
    }
    const isHome = window.location.hash === '' || window.location.hash === '#/' || window.location.pathname === '/';
    const hasPlayed = sessionStorage.getItem('rdi_intro_played');
    return isHome && !hasPlayed;
  });

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'cn' : 'en'));

  return (
    <ProjectProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header lang={lang} onToggleLang={toggleLang} showIntro={showIntro} />
          {showIntro && (
            <LandingIntro
              onComplete={() => {
                setShowIntro(false);
                sessionStorage.setItem('rdi_intro_played', 'true');
              }}
            />
          )}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero lang={lang} />
                  <ProjectGrid lang={lang} />
                </>
              } />
              <Route path="/projects" element={<ProjectsPage lang={lang} />} />
              <Route path="/project/:id" element={<ProjectDetail lang={lang} />} />
              <Route path="/news" element={<NewsPage lang={lang} />} />
              <Route path="/news/:id" element={<NewsDetail lang={lang} />} />
              <Route path="/research" element={<ResearchPage lang={lang} />} />
              <Route path="/research/:id" element={<ResearchDetail lang={lang} />} />
              <Route path="/about" element={<AboutPage lang={lang} />} />
              <Route path="/contact" element={<ContactPage lang={lang} />} />
              <Route path="/join" element={<JoinUsPage lang={lang} />} />
              <Route path="/privacy" element={<PrivacyPage lang={lang} />} />
              <Route path="/imprint" element={<ImprintPage lang={lang} />} />
            </Routes>
          </main>
          <Footer lang={lang} />
        </div>
      </Router>
    </ProjectProvider>
  );
}
