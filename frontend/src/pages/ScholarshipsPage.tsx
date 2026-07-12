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
    } catch (error) {
      console.error('Failed to get personalized scholarships:', error);
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
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedScholarship.name}</h2>
                <p className="text-gray-600 mb-6">{selectedScholarship.description}</p>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Amount</p>
                    <p className="text-lg text-gray-900">{selectedScholarship.amount}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Deadline</p>
                    <p className="text-lg text-gray-900">{formatDate(selectedScholarship.deadline)}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Eligibility Requirements</p>
                    <p className="text-lg text-gray-900">{selectedScholarship.eligibility}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Type</p>
                    <p className="text-lg text-gray-900">{selectedScholarship.type}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Stream</p>
                    <p className="text-lg text-gray-900">{selectedScholarship.stream}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Country</p>
                    <p className="text-lg text-gray-900">{selectedScholarship.country}</p>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Next Steps:</strong> Visit the official scholarship website to complete your application.
                    Make sure to prepare all required documents before the deadline!
                  </p>
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
