import React from 'react';
import {
  Navbar,
  Hero,
  Features,
  AIMentor,
  DreamTimeline,
  DashboardPreview,
  CallToAction,
  Footer,
} from '../components/landing';

/**
 * LandingPage - Main landing page for PathPilot
 * Showcases features, AI mentor, roadmaps, and more
 */
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <AIMentor />
      <DreamTimeline />
      <DashboardPreview />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
