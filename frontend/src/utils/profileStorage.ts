import type { ProfileData } from '../types';
import { getCurrentUser, getUserStorageKey } from './authSession';
import { supabase } from '../lib/supabase';

export const LEGACY_PROFILE_STORAGE_KEY = 'pathpilot_profile';

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

export const normalizeProfile = (value: Partial<ProfileData>): ProfileData => {
  const grade = value.grade || value.gradeClass || '';
  return {
    name: value.name || '', grade, gradeClass: value.gradeClass || grade,
    country: value.country || 'India', stream: value.stream || value.field || '',
    favouriteSubjects: asStringArray(value.favouriteSubjects || value.subjects),
    subjectInterests: asStringArray(value.subjectInterests), strongSubjects: asStringArray(value.strongSubjects),
    weakSubjects: asStringArray(value.weakSubjects), careerInterests: asStringArray(value.careerInterests || value.career),
    dreamUniversity: value.dreamUniversity || '', budget: value.budget || '',
    needScholarships: Boolean(value.needScholarships), studyAbroad: Boolean(value.studyAbroad),
    preferredCountry: value.preferredCountry || '', examPreference: value.examPreference || '',
    phone: value.phone || '', city: value.city || '', board: value.board || '', academicScore: value.academicScore || '', dreamJob: value.dreamJob || '',
    examStatuses: value.examStatuses || { JEE: 'Not Attempted', NEET: 'Not Attempted', SAT: 'Not Attempted', IELTS: 'Not Attempted', TOEFL: 'Not Attempted', GRE: 'Not Attempted', GMAT: 'Not Attempted' },
    githubUrl: value.githubUrl || '', linkedinUrl: value.linkedinUrl || '', portfolioUrl: value.portfolioUrl || '',
    profilePhoto: value.profilePhoto || { fileName: null, fileType: null, fileSize: null, previewUrl: null, storageUrl: null },
    resumeFile: value.resumeFile || { fileName: null, fileType: null, fileSize: null, previewUrl: null, storageUrl: null },
  };
};

const migrateLegacyProfile = (targetKey: string): void => {
  if (localStorage.getItem(targetKey)) return;
  const legacy = localStorage.getItem(LEGACY_PROFILE_STORAGE_KEY);
  if (!legacy || !getCurrentUser()) return;
  localStorage.setItem(targetKey, legacy);
  localStorage.removeItem(LEGACY_PROFILE_STORAGE_KEY);
};

export const getProfile = (): ProfileData | null => {
  const key = getUserStorageKey('profile');
  if (!key) return null;
  try {
    migrateLegacyProfile(key);
    const stored = localStorage.getItem(key);
    return stored ? normalizeProfile(JSON.parse(stored) as Partial<ProfileData>) : null;
  } catch (error) {
    console.error('Error reading profile from localStorage:', error);
    return null;
  }
};

export const saveProfile = (profile: ProfileData): boolean => {
  const key = getUserStorageKey('profile');
  if (!key) return false;
  try {
    localStorage.setItem(key, JSON.stringify(normalizeProfile(profile)));
    return true;
  } catch (error) {
    console.error('Error saving profile to localStorage:', error);
    return false;
  }
};

export const loadProfileFromSupabase = async (): Promise<ProfileData | null> => {
  const user = getCurrentUser(); const key = getUserStorageKey('profile');
  if (!user || !key) return null;
  const { data, error } = await supabase.from('profiles').select('profile_data').eq('user_id', user.id).maybeSingle();
  if (error) throw new Error(`Unable to load profile: ${error.message}`);
  if (data?.profile_data) { const profile = normalizeProfile(data.profile_data as Partial<ProfileData>); localStorage.setItem(key, JSON.stringify(profile)); return profile; }
  const legacy = getProfile();
  if (legacy) { await saveProfileToSupabase(legacy, false); return legacy; }
  return null;
};

export const saveProfileToSupabase = async (profile: ProfileData, overwrite = true): Promise<void> => {
  const user = getCurrentUser(); if (!user) throw new Error('Your session expired. Please sign in again.');
  const normalized = normalizeProfile(profile);
  if (!overwrite) { const { data } = await supabase.from('profiles').select('user_id').eq('user_id', user.id).maybeSingle(); if (data) return; }
  const { error } = await supabase.from('profiles').upsert({ user_id: user.id, profile_data: normalized, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw new Error(`Unable to save profile: ${error.message}`);
  saveProfile(normalized);
};

export const uploadProfileImage = async (file: File): Promise<{ path: string; signedUrl: string }> => {
  const user = getCurrentUser(); if (!user) throw new Error('Your session expired.');
  const extension = file.name.split('.').pop() || 'jpg'; const path = `${user.id}/profile-${Date.now()}.${extension}`;
  const { error } = await supabase.storage.from('profile-images').upload(path, file, { upsert: true, contentType: file.type }); if (error) throw new Error(`Profile image upload failed: ${error.message}`);
  const { data, error: signedError } = await supabase.storage.from('profile-images').createSignedUrl(path, 3600); if (signedError) throw signedError;
  return { path, signedUrl: data.signedUrl };
};

export const clearCurrentUserProfile = (): void => {
  const key = getUserStorageKey('profile');
  if (key) localStorage.removeItem(key);
};
