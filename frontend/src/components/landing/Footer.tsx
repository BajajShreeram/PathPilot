import React from 'react';

const Footer: React.FC = () => (
  <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-lg font-bold text-slate-950">PathPilot</p><p className="mt-1 text-sm text-slate-500">© {new Date().getFullYear()} PathPilot. All rights reserved.</p></div>
      <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600" aria-label="Footer navigation"><a href="#about" className="hover:text-blue-700">About</a><a href="#privacy" className="hover:text-blue-700">Privacy</a><a href="#terms" className="hover:text-blue-700">Terms</a><a href="mailto:hello@pathpilot.example" className="hover:text-blue-700">Contact</a></nav>
    </div>
  </footer>
);

export default Footer;
