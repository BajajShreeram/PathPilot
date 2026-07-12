import React from 'react';

const DashboardPreview: React.FC = () => (
  <section id="dashboard-preview" className="overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Your command center</p><h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">See your path at a glance.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Recommendations, milestones, and priorities come together in one calm workspace.</p></div>
      <div className="relative mx-auto mt-16 max-w-6xl rounded-[2rem] border border-slate-200 bg-slate-900 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.2)] sm:p-3">
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-50">
          <div className="flex h-12 items-center gap-2 border-b border-slate-200 bg-white px-5"><span className="h-2.5 w-2.5 rounded-full bg-red-400"/><span className="h-2.5 w-2.5 rounded-full bg-yellow-400"/><span className="h-2.5 w-2.5 rounded-full bg-green-400"/><span className="ml-4 text-xs font-semibold text-slate-400">PathPilot Dashboard</span></div>
          <div className="grid min-h-[480px] md:grid-cols-[210px_1fr]">
            <aside className="hidden border-r border-slate-200 bg-white p-5 md:block"><div className="mb-8 flex items-center gap-2 font-bold text-slate-900"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">P</span>PathPilot</div>{['Overview', 'AI Mentor', 'Roadmap', 'Universities', 'Scholarships'].map((item, index) => <div key={item} className={`mb-2 rounded-lg px-3 py-2.5 text-sm font-medium ${index === 0 ? 'bg-blue-50 text-blue-700' : 'text-slate-500'}`}>{item}</div>)}</aside>
            <div className="p-5 sm:p-8"><p className="text-sm font-semibold text-blue-600">GOOD MORNING</p><h3 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Your next step is ready.</h3><div className="mt-8 grid gap-4 sm:grid-cols-3">{[['Roadmap progress','64%'],['University matches','12'],['Open scholarships','8']].map(([label,value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-950">{value}</p></div>)}</div><div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]"><div className="rounded-xl border border-slate-200 bg-white p-6"><p className="font-bold text-slate-900">Recommended next actions</p>{['Review your university shortlist','Prepare entrance exam documents','Check this month’s deadlines'].map((item,index) => <div key={item} className="mt-4 flex items-center gap-3 text-sm text-slate-600"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">{index+1}</span>{item}</div>)}</div><div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white"><p className="text-sm font-semibold text-blue-100">AI MENTOR</p><p className="mt-4 text-lg font-semibold">“I can help you turn this week’s goals into a study plan.”</p><div className="mt-8 rounded-lg bg-white/15 px-4 py-3 text-sm">Ask a question →</div></div></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreview;
