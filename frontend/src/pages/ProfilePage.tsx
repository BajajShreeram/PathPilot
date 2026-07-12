import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { getStoredProfile, saveProfile } from '../utils/profileValidation';

const listFields: Array<{ key: 'favouriteSubjects' | 'subjectInterests' | 'strongSubjects' | 'weakSubjects' | 'careerInterests'; label: string }> = [
  { key: 'favouriteSubjects', label: 'Favourite Subjects' },
  { key: 'subjectInterests', label: 'Subject Interests' },
  { key: 'strongSubjects', label: 'Strong Subjects' },
  { key: 'weakSubjects', label: 'Weak Subjects' },
  { key: 'careerInterests', label: 'Career Interests' },
];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const storedProfile = getStoredProfile();
  const [profile, setProfile] = useState<ProfileData | null>(storedProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!profile) return <Navigate to="/onboarding" replace />;

  const update = (key: keyof ProfileData, value: ProfileData[keyof ProfileData]) => {
    setProfile((current) => current ? { ...current, [key]: value } : current);
    setSaved(false);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (profile && saveProfile(profile)) {
      setEditing(false);
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Your PathPilot profile</p><h1 className="mt-2 text-4xl font-bold text-gray-900">Profile</h1><p className="mt-2 text-gray-600">Keep your preferences current for more relevant guidance.</p></div>
          <button onClick={() => setEditing((value) => !value)} className="rounded-xl border border-blue-200 bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">{editing ? 'Cancel Editing' : 'Edit Profile'}</button>
        </div>
        {saved && <p className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-800">Profile saved. Your recommendations will use these details.</p>}
        <form onSubmit={handleSave} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <h2 className="text-xl font-bold text-gray-900 md:col-span-2">Academic & Study Preferences</h2>
            {(['name', 'gradeClass', 'stream', 'dreamUniversity', 'budget', 'preferredCountry'] as const).map((key) => <label key={key}><span className="mb-2 block text-sm font-semibold capitalize text-gray-700">{key === 'gradeClass' ? 'Grade / Class' : key.replace(/([A-Z])/g, ' $1')}</span><input disabled={!editing} value={String(profile[key] || '')} onChange={(event) => update(key, event.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 disabled:bg-gray-50" /></label>)}
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"><input type="checkbox" disabled={!editing} checked={profile.studyAbroad} onChange={(event) => update('studyAbroad', event.target.checked)} /><span className="font-medium text-gray-700">Planning to study abroad</span></label>
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"><input type="checkbox" disabled={!editing} checked={profile.needScholarships} onChange={(event) => update('needScholarships', event.target.checked)} /><span className="font-medium text-gray-700">Need scholarship support</span></label>
            <h2 className="mt-2 text-xl font-bold text-gray-900 md:col-span-2">Subjects & Interests</h2>
            {listFields.map(({ key, label }) => <label key={key}><span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span><textarea rows={2} disabled={!editing} value={(profile[key] || []).join(', ')} onChange={(event) => update(key, event.target.value.split(',').map((item) => item.trim()).filter(Boolean))} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 disabled:bg-gray-50" /></label>)}
          </div>
          {editing && <div className="mt-8 flex justify-end"><button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg">Save Changes</button></div>}
        </form>
        <div className="mt-8 flex flex-wrap gap-4"><button onClick={() => navigate('/achievements')} className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white">Manage Achievements</button><button onClick={() => navigate('/onboarding')} className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50">Redo Onboarding</button></div>
      </div>
    </div>
  );
};
