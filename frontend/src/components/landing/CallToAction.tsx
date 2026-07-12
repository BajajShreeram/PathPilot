import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-20 text-center text-white shadow-2xl shadow-blue-500/20 sm:px-12 sm:py-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Ready to Build Your Future?</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-blue-100">Create your profile and get a plan designed around the student you are today.</p>
        <button onClick={() => navigate('/login')} className="mt-9 rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-700 shadow-lg hover:-translate-y-0.5 hover:bg-blue-50">Get Started</button>
      </div>
    </section>
  );
};

export default CallToAction;
