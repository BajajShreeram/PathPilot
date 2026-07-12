import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { scholarships, type Scholarship, getPersonalizedScholarships } from '../data/scholarships';

/**
 * Safely get a value from profile with fallback to old key
 */
const getProfileValue = (profile: ProfileData | null, newKey: keyof ProfileData, oldKey?: keyof ProfileData, defaultValue: any = null): any => {
  if (!profile) return defaultValue;
  
  // Try new key first, then old key, then default
  if (profile[newKey] !== undefined && profile[newKey] !== null) {
    return profile[newKey];
  }
  
  if (oldKey && profile[oldKey] !== undefined && profile[oldKey] !== null) {
    return profile[oldKey];
  }
  
  return defaultValue;
};

export const ScholarshipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile) as ProfileData;
        setProfile(parsedProfile);
        filterScholarshipsByProfile(parsedProfile);
      } catch (error) {
        console.error('Failed to parse profile:', error);
        // Fallback to general scholarships
        const safeScholarships = Array.isArray(scholarships) ? scholarships : [];
        const generalScholarships = safeScholarships.filter((s) => s && s.stream === 'General');
        setFilteredScholarships(generalScholarships.length > 0 ? generalScholarships : safeScholarships.slice(0, 5));
      }
    } else {
      // Show general scholarships if no profile
      const safeScholarships = Array.isArray(scholarships) ? scholarships : [];
      const generalScholarships = safeScholarships.filter((s) => s && s.stream === 'General');
      setFilteredScholarships(generalScholarships.length > 0 ? generalScholarships : safeScholarships.slice(0, 5));
    }
  }, []);

  const filterScholarshipsByProfile = (profileData: ProfileData | null) => {
    if (!profileData) {
      const safeScholarships = Array.isArray(scholarships) ? scholarships : [];
      const generalScholarships = safeScholarships.filter((s) => s && s.stream === 'General');
      setFilteredScholarships(generalScholarships.length > 0 ? generalScholarships : safeScholarships.slice(0, 5));
      return;
    }

    // Support both old and new profile keys with safe array handling
    const careerInterestsRaw = getProfileValue(profileData, 'careerInterests', 'career', []);
    const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
    const careerInterests = safeCareerInterests.map((c) => String(c || '').toLowerCase());
    
    const subjectsRaw = getProfileValue(profileData, 'favouriteSubjects', 'subjects', []);
    const safeSubjects = Array.isArray(subjectsRaw) ? subjectsRaw : [];
    const subjects = safeSubjects.map((s) => String(s || '').toLowerCase());
    
    const country = String(getProfileValue(profileData, 'preferredCountry', 'country', '') || '').toLowerCase();
    const budget = getProfileValue(profileData, 'budget', undefined, 'MEDIUM');
    const needScholarships = getProfileValue(profileData, 'needScholarships', undefined, false);

    // Get stream from new profile structure or determine from career/subjects
    let stream: 'Engineering' | 'Medical' | 'Commerce' | 'Law' | 'Design' | 'Arts' | 'General' | 'Study Abroad' =
      'General';

    const profileStream = getProfileValue(profileData, 'stream', 'field', '');

    if (profileStream && profileStream !== 'Other') {
      stream = profileStream as any;
    } else {
      // Determine stream from profile
      if (
        careerInterests.some((c) => c.includes('engineering') || c.includes('computer') || c.includes('it')) ||
        subjects.some((s) => s.includes('physics') || s.includes('computer'))
      ) {
        stream = 'Engineering';
      } else if (
        careerInterests.some((c) => c.includes('medicine') || c.includes('medical') || c.includes('doctor')) ||
        subjects.some((s) => s.includes('biology') || s.includes('chemistry'))
      ) {
        stream = 'Medical';
      } else if (
        careerInterests.some(
          (c) =>
            c.includes('business') || c.includes('commerce') || c.includes('finance') || c.includes('marketing')
        ) ||
        subjects.some((s) => s.includes('economics') || s.includes('business'))
      ) {
        stream = 'Commerce';
      } else if (careerInterests.some((c) => c.includes('law') || c.includes('legal'))) {
        stream = 'Law';
      } else if (
        careerInterests.some((c) => c.includes('design') || c.includes('art')) ||
        subjects.some((s) => s.includes('art') || s.includes('design'))
      ) {
        stream = 'Design';
      } else if (
        careerInterests.some((c) => c.includes('arts') || c.includes('humanities') || c.includes('teaching')) ||
        subjects.some((s) => s.includes('english') || s.includes('history'))
      ) {
        stream = 'Arts';
      }
    }

    // Check if studying abroad
    const studyAbroad = getProfileValue(profileData, 'studyAbroad', undefined, false);
    const dreamUni = String(getProfileValue(profileData, 'dreamUniversity', undefined, '') || '').toLowerCase();
    const isAbroad =
      studyAbroad === true ||
      (country !== 'in' &&
        country !== 'india' &&
        country !== '' &&
        (dreamUni.includes('mit') ||
          dreamUni.includes('stanford') ||
          dreamUni.includes('harvard') ||
          dreamUni.includes('oxford') ||
          dreamUni.includes('cambridge')));

    // Get personalized scholarships
    try {
      const personalized = getPersonalizedScholarships(stream, budget, needScholarships, isAbroad);
      const safePersonalized = Array.isArray(personalized) ? personalized : [];
      setFilteredScholarships(safePersonalized.length > 0 ? safePersonalized : []);
    } catch (err) {
      console.error('Failed to get personalized scholarships:', err);
      // Fallback to stream-based scholarships
      const safeScholarships = Array.isArray(scholarships) ? scholarships : [];
      const streamScholarships = safeScholarships.filter((s) => s && s.stream === stream);
      setFilteredScholarships(streamScholarships.length > 0 ? streamScholarships : safeScholarships.slice(0, 5));
    }
  };

  const handleViewRequirements = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScholarship(null);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
    yellow: 'from-yellow-500 to-orange-600',
    red: 'from-red-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-700',
  };

  const getColorForIndex = (index: number): keyof typeof colorClasses => {
    const colors: (keyof typeof colorClasses)[] = ['blue', 'purple', 'green', 'yellow', 'red', 'indigo'];
    return colors[index % colors.length];
  };
  const countryFlag = (country: string) => ({ India: '🇮🇳', USA: '🇺🇸', UK: '🇬🇧', Canada: '🇨🇦', Australia: '🇦🇺', Germany: '🇩🇪', Singapore: '🇸🇬' }[country] || '🌍');

  // Safe array handling for filtered scholarships
  const safeFilteredScholarships = Array.isArray(filteredScholarships) ? filteredScholarships : [];

  // Safe profile value reads
  const careerInterestsRaw = profile ? getProfileValue(profile, 'careerInterests', 'career', []) : [];
  const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
  const firstCareer = safeCareerInterests.length > 0 ? safeCareerInterests[0] : 'your education';
  const needsScholarship = profile ? getProfileValue(profile, 'needScholarships', undefined, false) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-orange-600 hover:text-orange-700 font-semibold transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">💰</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Scholarships</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              {profile
                ? `Financial aid for ${firstCareer}`
                : 'Discover scholarship opportunities'}
            </p>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <p className="text-gray-700 text-center">
              <strong>💡 Tip:</strong>{' '}
              {needsScholarship
                ? 'These scholarships are prioritized based on your financial needs. Apply early!'
                : 'Consider applying to scholarships to reduce education costs. Every bit helps!'}
            </p>
          </div>
        </div>

        {safeFilteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safeFilteredScholarships.map((scholarship, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-3 bg-gradient-to-r ${colorClasses[getColorForIndex(index)]}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{scholarship.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <span className="text-2xl mr-2">💵</span>
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-semibold text-gray-900">{scholarship.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-2">📅</span>
                      <div>
                        <p className="text-sm text-gray-600">Deadline</p>
                        <p className="font-semibold text-gray-900">{formatDate(scholarship.deadline)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="text-2xl mr-2">✅</span>
                      <div>
                        <p className="text-sm text-gray-600">Eligibility</p>
                        <p className="font-semibold text-gray-900">{scholarship.eligibility}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 rounded-full text-sm font-semibold">
                      {scholarship.type}
                    </span>
                    <button
                      onClick={() => handleViewRequirements(scholarship)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      View Requirements
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg mb-4">No scholarships found matching your profile.</p>
            <p className="text-gray-600">
              Complete your profile with more details to discover personalized scholarship opportunities!
            </p>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedScholarship && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
              <div className={`h-32 bg-gradient-to-r ${colorClasses[getColorForIndex(0)]} relative`}>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-5 sm:p-8">
                <div className="-mt-12 mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-gray-900 shadow">{countryFlag(selectedScholarship.country)} {selectedScholarship.country}</span><span className="rounded-full bg-gradient-to-r from-purple-500 to-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow">Award tier: {selectedScholarship.type}</span></div><h2 className="break-words text-3xl font-bold text-gray-900 sm:text-4xl">{selectedScholarship.name}</h2></div><span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">💰 {selectedScholarship.stream}</span></div>
                <p className="text-gray-600 mb-6">{selectedScholarship.description}</p>

                <div className="mb-6 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-5"><p className="font-bold text-gray-900">✨ Why this matches you</p><ul className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2"><li>✓ {profile?.stream === selectedScholarship.stream || selectedScholarship.stream === 'General' ? `Relevant to your ${profile?.stream || selectedScholarship.stream} pathway` : `Potential ${selectedScholarship.stream.toLowerCase()} opportunity`}</li><li>✓ {profile?.needScholarships ? 'Matches your scholarship need' : 'Review eligibility for your situation'}</li></ul></div>

                <div className="grid gap-4 md:grid-cols-2">
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">💳 Award summary</p><div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white p-3"><p className="text-xs font-semibold text-gray-500">COVERAGE</p><p className="mt-1 font-bold text-gray-900">{selectedScholarship.amount}</p></div><div className="rounded-xl bg-white p-3"><p className="text-xs font-semibold text-gray-500">DEADLINE</p><p className="mt-1 text-sm font-bold text-gray-900">{formatDate(selectedScholarship.deadline)}</p></div></div><p className="mt-3 text-sm text-gray-700">🏢 Provider details and exact coverage vary by annual award cycle.</p></section>
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">📋 Eligibility</p><ul className="mt-3 space-y-2 text-sm text-gray-700"><li>• {selectedScholarship.eligibility}</li><li>• Stream: {selectedScholarship.stream}</li><li>• Country: {selectedScholarship.country}</li></ul></section>
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">📎 Documents</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">Academic records</span><span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">ID proof</span><span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">Eligibility evidence</span></div></section>
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">🔁 Application & renewal</p><ul className="mt-3 space-y-2 text-sm text-gray-700"><li>• Submit through the provider’s official portal.</li><li>• Track updates directly with the provider.</li><li>• Renewal, when offered, usually requires satisfactory progress.</li></ul></section>
                </div>

                <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700"><strong>Important:</strong> PathPilot does not process applications. Verify details on the official website.</p>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(`${selectedScholarship.name} official website`)}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white sm:w-auto">Visit Official Website ↗</a>
                </div>

                <button
                  onClick={closeModal}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

