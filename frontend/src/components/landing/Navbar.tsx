import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-3" aria-label="PathPilot home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white shadow-sm">P</span>
          <span className="text-xl font-bold tracking-tight text-slate-950">PathPilot</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={() => navigate('/login')} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:px-5">Login</button>
          <button onClick={() => navigate('/login')} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:px-5">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
