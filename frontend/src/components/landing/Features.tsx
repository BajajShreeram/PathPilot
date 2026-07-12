import React from 'react';

const features = [
  { icon: '✦', title: 'AI Mentor', description: 'Ask questions and get practical guidance shaped around your profile and goals.' },
  { icon: '⌂', title: 'University Finder', description: 'Compare relevant universities without sorting through options that do not fit you.' },
  { icon: '◇', title: 'Scholarship Finder', description: 'Discover funding opportunities matched to your background, budget, and plans.' },
  { icon: '→', title: 'Personalized Roadmap', description: 'Turn long-term ambitions into clear milestones, deadlines, and next actions.' },
];

const Features: React.FC = () => (
  <section className="px-5 py-28 sm:px-8 sm:py-36">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Core features</p><h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Everything important. Nothing distracting.</h2></div>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-100 text-xl font-bold text-blue-700">{feature.icon}</span><h3 className="mt-6 text-xl font-bold text-slate-950">{feature.title}</h3><p className="mt-3 leading-7 text-slate-600">{feature.description}</p></article>)}
      </div>
    </div>
  </section>
);

export default Features;
