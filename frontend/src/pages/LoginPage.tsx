import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount, resetPassword, signIn } from '../utils/authSession';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'sign-in' | 'create' | 'reset'>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const submit = (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setMessage('');
    try {
      if (mode === 'create') createAccount(name, email, password);
      else if (mode === 'reset') { resetPassword(email, password); setMessage('Password updated. You can sign in now.'); setMode('sign-in'); return; }
      else signIn(email, password);
      navigate(localStorage.getItem('pathpilot_profile') ? '/dashboard' : '/onboarding', { replace: true });
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to continue.'); }
  };
  const title = mode === 'create' ? 'Create your account' : mode === 'reset' ? 'Reset your password' : 'Welcome back';
  return <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10 sm:px-6"><div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center"><section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-9"><Link to="/" className="inline-flex items-center gap-2 font-bold text-gray-900"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">P</span>PathPilot</Link><div className="mt-8"><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Your local account</p><h1 className="mt-2 text-3xl font-bold text-gray-900">{title}</h1><p className="mt-2 text-gray-600">Your progress stays on this device and is restored when you sign in again.</p></div><form onSubmit={submit} className="mt-8 space-y-4">{mode === 'create' && <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Name</span><input required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="Your name" /></label>}<label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Email</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="you@example.com" /></label><label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">{mode === 'reset' ? 'New password' : 'Password'}</span><input type="password" minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="At least 6 characters" /></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}{message && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}<button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white">{mode === 'create' ? 'Create account' : mode === 'reset' ? 'Update password' : 'Sign in'}</button></form>{mode === 'sign-in' && <button type="button" onClick={() => { setMode('reset'); setError(''); }} className="mt-4 text-sm font-semibold text-purple-700">Forgot password?</button>}<p className="mt-6 text-center text-sm text-gray-600">{mode === 'create' ? 'Already have an account?' : 'New to PathPilot?'} <button type="button" onClick={() => { setMode(mode === 'create' ? 'sign-in' : 'create'); setError(''); setMessage(''); }} className="font-semibold text-blue-700">{mode === 'create' ? 'Sign in' : 'Create account'}</button></p></section></div></main>;
};
