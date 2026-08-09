import React, { useEffect, useRef, useState, useCallback } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import ProjectArchive from './components/ProjectArchive';
import ProjectModal from './components/ProjectModal';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Project } from './data';

const SECTIONS = ['intro', 'featured', 'archive', 'about', 'contact'];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer for active section tracking
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.2, 0.5],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="app-layout">
      {/* Fixed Left Sidebar */}
      <Sidebar activeSection={activeSection} />

      {/* Main scrollable content */}
      <main className="main-content">
        <Hero />
        <FeaturedWork />
        <ProjectArchive onProjectClick={handleProjectClick} />
        <About />
        <Contact />
        <Footer />
      </main>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default App;