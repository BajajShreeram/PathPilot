import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createEmailAccount, sendEmailOtp, signInWithEmail, signInWithGoogle } from '../utils/authSession';
import { loadProfileFromSupabase } from '../utils/profileStorage';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'create'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const finishLogin = async () => { const profile = await loadProfileFromSupabase(); navigate(profile ? '/dashboard' : '/onboarding', { replace: true }); };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (mode === 'create') await createEmailAccount(name, email, password);
      else await signInWithEmail(email, password);
      await finishLogin();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to continue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch {
      setError('Google sign-in is unavailable right now. Please use email.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-9">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-gray-900"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">P</span>PathPilot</Link>
          <div className="mt-8"><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Welcome</p><h1 className="mt-2 text-3xl font-bold text-gray-900">{mode === 'signin' ? 'Sign in to your account' : 'Create your account'}</h1><p className="mt-2 text-gray-600">Your profile and progress stay private to this account on this device.</p></div>

          <button type="button" onClick={handleGoogle} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-gray-800 hover:bg-slate-50"><span className="text-lg font-bold text-blue-600">G</span>Sign in with Google</button>
          <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-slate-200"/><span className="text-xs font-semibold uppercase tracking-wider text-gray-400">or use email</span><div className="h-px flex-1 bg-slate-200"/></div>

          <form onSubmit={handleEmail} className="space-y-4">
            {mode === 'create' && <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Name</span><input value={name} onChange={(event) => setName(event.target.value)} required className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="Your name" /></label>}
            <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="you@example.com" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold text-gray-700">Password</span><input type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-xl border border-slate-300 px-4 py-3" placeholder="At least 6 characters" /></label>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button disabled={isLoading} className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-60">{isLoading ? 'Please wait…' : mode === 'signin' ? 'Sign in with email' : 'Create account'}</button>
            {mode === 'signin' && <button type="button" onClick={async()=>{try{setError('');await sendEmailOtp(email);setError('Check your email for the secure login link.');}catch(reason){setError(reason instanceof Error?reason.message:'Unable to send OTP.');}}} className="w-full rounded-xl border border-blue-200 px-4 py-3 font-semibold text-blue-700">Email me a login code</button>}
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">{mode === 'signin' ? 'New to PathPilot?' : 'Already have an account?'} <button type="button" onClick={() => { setMode(mode === 'signin' ? 'create' : 'signin'); setError(''); }} className="font-semibold text-blue-700 hover:text-blue-800">{mode === 'signin' ? 'Create account' : 'Sign in'}</button></p>
          {mode === 'signin' && <p className="mt-3 text-center"><Link to="/forgot-password" className="text-sm font-semibold text-purple-700">Forgot password?</Link></p>}
        </section>
      </div>
    </main>
  );
};
