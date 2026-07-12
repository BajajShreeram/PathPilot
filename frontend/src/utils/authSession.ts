import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface AuthUser { id: string; email: string; name: string; provider: 'email' | 'google'; }
const CACHE_KEY = 'pathpilot_auth_user_cache';
const toAuthUser = (user: User): AuthUser => ({ id: user.id, email: user.email || '', name: user.user_metadata?.full_name || user.user_metadata?.name || '', provider: user.app_metadata?.provider === 'google' ? 'google' : 'email' });
const cache = (user: User | null) => { if (user) localStorage.setItem(CACHE_KEY, JSON.stringify(toAuthUser(user))); else localStorage.removeItem(CACHE_KEY); };

export const restoreSession = async (): Promise<AuthUser | null> => { const { data, error } = await supabase.auth.getSession(); if (error) throw error; cache(data.session?.user || null); return data.session?.user ? toAuthUser(data.session.user) : null; };
supabase.auth.onAuthStateChange((_event, session) => cache(session?.user || null));
export const getCurrentUser = (): AuthUser | null => { try { const value = localStorage.getItem(CACHE_KEY); return value ? JSON.parse(value) as AuthUser : null; } catch { return null; } };
export const createEmailAccount = async (name: string, email: string, password: string) => { const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } }); if (error) throw error; if (data.user) cache(data.user); return data.user ? toAuthUser(data.user) : null; };
export const signInWithEmail = async (email: string, password: string) => { const { data, error } = await supabase.auth.signInWithPassword({ email, password }); if (error) throw error; cache(data.user); return toAuthUser(data.user); };
export const sendEmailOtp = async (email: string) => { const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } }); if (error) throw error; };
export const signInWithGoogle = async () => { const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } }); if (error) throw error; };
export const sendPasswordReset = async (email: string) => { const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); if (error) throw error; };
export const updatePassword = async (password: string) => { const { error } = await supabase.auth.updateUser({ password }); if (error) throw error; };
export const isAuthenticated = () => getCurrentUser() !== null;
export const signOut = async () => { const { error } = await supabase.auth.signOut(); if (error) throw error; cache(null); sessionStorage.clear(); };
export const confirmAndSignOut = async () => { if (!window.confirm('Sign out of PathPilot? Your saved data will remain in your account.')) return false; await signOut(); return true; };
export const getUserStorageKey = (namespace: 'profile' | 'roadmap_progress' | 'chat_history' | 'achievements') => { const user = getCurrentUser(); return user ? `pathpilot_${namespace}_${user.id}` : null; };

