import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const showDemo = () => document.querySelector('#dashboard-preview')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-40 sm:px-8 sm:pb-36 sm:pt-48 lg:pb-44 lg:pt-56">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.16),transparent_42%),linear-gradient(to_bottom,#f8fafc,#ffffff)]" />
      <div className="mx-auto max-w-5xl text-center">
        <p className="mx-auto mb-7 w-fit rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">Personal guidance for every student journey</p>
        <h1 className="text-5xl font-bold tracking-[-0.045em] text-slate-950 sm:text-6xl md:text-7xl lg:text-8xl">
          Make your next step<br className="hidden sm:block" /> the right one.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">PathPilot turns your goals, interests, and budget into a clear plan for universities, scholarships, exams, and what to do next.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={() => navigate('/login')} className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 sm:w-auto">Get Started</button>
          <button onClick={showDemo} className="w-full rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 sm:w-auto">Watch Demo</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
