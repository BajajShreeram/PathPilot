import React from 'react';

const steps = [
  { number: '01', title: 'Create Profile', description: 'Tell us where you are today and where you want to go.' },
  { number: '02', title: 'Receive Personalized Guidance', description: 'Get relevant recommendations, answers, and a practical roadmap.' },
  { number: '03', title: 'Achieve Your Goals', description: 'Follow clear next steps, track progress, and adjust as your plans evolve.' },
];

const DreamTimeline: React.FC = () => (
  <section className="bg-slate-950 px-5 py-28 text-white sm:px-8 sm:py-36">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">How it works</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Clarity in three simple steps.</h2></div>
      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {steps.map((step) => <article key={step.number} className="border-t border-slate-700 pt-7"><p className="text-sm font-bold text-blue-300">{step.number}</p><h3 className="mt-5 text-2xl font-bold">{step.title}</h3><p className="mt-3 max-w-sm leading-7 text-slate-400">{step.description}</p></article>)}
      </div>
    </div>
  </section>
);

export default DreamTimeline;
