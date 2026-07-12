import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { universities, type University } from '../data/universities';

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

export const UniversitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile) as ProfileData;
        setProfile(parsedProfile);
        filterUniversitiesByProfile(parsedProfile);
      } catch (error) {
        console.error('Failed to parse profile:', error);
        // Fallback to all universities if profile is invalid
        setFilteredUniversities(Array.isArray(universities) ? universities : []);
      }
    } else {
      // Show all if no profile
      setFilteredUniversities(Array.isArray(universities) ? universities : []);
    }
  }, []);

  const filterUniversitiesByProfile = (profileData: ProfileData | null) => {
    // Fallback to all universities if no profile or universities data is invalid
    if (!profileData || !Array.isArray(universities) || universities.length === 0) {
      setFilteredUniversities(Array.isArray(universities) ? universities : []);
      return;
    }

    // Support both old and new profile keys with safe array handling
    // Old keys: careerInterests, country, exams
    // New keys: stream, studyAbroad, preferredCountry, examPreference
    const careerInterestsRaw = getProfileValue(profileData, 'careerInterests', 'career', []);
    const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
    const careerInterests = safeCareerInterests.map((c) => String(c || '').toLowerCase());
    
    const subjectsRaw = getProfileValue(profileData, 'favouriteSubjects', 'subjects', []);
    const safeSubjects = Array.isArray(subjectsRaw) ? subjectsRaw : [];
    const subjects = safeSubjects.map((s) => String(s || '').toLowerCase());

    // Get stream from new profile structure or determine from career/subjects
    let stream = getProfileValue(profileData, 'stream', 'field', '');

    // If no stream in profile, determine from profile data
    if (!stream || stream === 'Other') {
      // Determine stream from career interests and subjects
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
            c.includes('business') ||
            c.includes('commerce') ||
            c.includes('finance') ||
            c.includes('marketing')
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
        careerInterests.some(
          (c) => c.includes('arts') || c.includes('humanities') || c.includes('teaching')
        ) ||
        subjects.some((s) => s.includes('english') || s.includes('history'))
      ) {
        stream = 'Arts';
      }
    }

    // Filter universities by stream - safe filter
    let filtered = universities.filter((uni) => {
      if (!uni || !uni.stream) return false;
      if (profileData.studyAbroad) {
        return uni.country !== 'India';
      }
      return uni.stream === stream;
    });

    // Fallback if no universities match
    if (!Array.isArray(filtered) || filtered.length === 0) {
      filtered = Array.isArray(universities) ? universities.slice(0, 10) : [];
    }

    setFilteredUniversities(filtered);
  };

  const handleCountryFilter = (country: string) => {
    setSelectedCountry(country);
    applyFilters(country, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(selectedCountry, category);
  };

  const applyFilters = (country: string, category: string) => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    let baseUniversities = Array.isArray(universities) ? universities : [];

    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile) as ProfileData;
        // Get stream-filtered universities first
        const careerInterestsRaw = getProfileValue(parsedProfile, 'careerInterests', 'career', []);
        const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
        const careerInterests = safeCareerInterests.map((c) => String(c || '').toLowerCase());
        
        const subjectsRaw = getProfileValue(parsedProfile, 'favouriteSubjects', 'subjects', []);
        const safeSubjects = Array.isArray(subjectsRaw) ? subjectsRaw : [];
        const subjects = safeSubjects.map((s) => String(s || '').toLowerCase());
        
        let stream = getProfileValue(parsedProfile, 'stream', 'field', '');
        
        // If no stream in profile, determine from profile data
        if (!stream || stream === 'Other') {
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
              (c) => c.includes('business') || c.includes('commerce') || c.includes('finance') || c.includes('marketing')
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

        baseUniversities = baseUniversities.filter((uni) => uni && uni.stream === stream);
      } catch (error) {
        console.error('Failed to filter by profile:', error);
      }
    }

    let filtered = baseUniversities;

    if (country !== 'all') {
      filtered = filtered.filter((uni) => uni && uni.country === country);
    }

    if (category !== 'all') {
      filtered = filtered.filter((uni) => uni && uni.category === category);
    }

    // Safe array check
    if (!Array.isArray(filtered)) {
      filtered = [];
    }

    setFilteredUniversities(filtered);
  };

  const handleMoreDetails = (university: University) => {
    setSelectedUniversity(university);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUniversity(null);
  };

  // Get unique countries from filtered universities - safe map
  const safeFilteredUniversities = Array.isArray(filteredUniversities) ? filteredUniversities : [];
  const availableCountries = ['all', ...new Set(safeFilteredUniversities.map((uni) => uni?.country || 'Unknown'))];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Dream':
        return 'from-purple-500 to-purple-700';
      case 'Very Good':
        return 'from-blue-500 to-blue-700';
      case 'Good':
        return 'from-green-500 to-green-700';
      case 'Reasonable':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const countryFlag = (country: string) => ({ India: '🇮🇳', USA: '🇺🇸', UK: '🇬🇧', Canada: '🇨🇦', Australia: '🇦🇺', Germany: '🇩🇪', Singapore: '🇸🇬', France: '🇫🇷', Netherlands: '🇳🇱' }[country] || '🌍');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-green-600 hover:text-green-700 font-semibold transition"
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
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Universities</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              {profile
                ? `${safeFilteredUniversities[0]?.stream || 'Recommended'} universities matching your profile`
                : 'Discover top universities'}
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Filter by Country</p>
              <div className="flex flex-wrap gap-3">
                {availableCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => handleCountryFilter(country)}
                    className={`px-4 py-2 rounded-full font-semibold transition text-sm ${
                      selectedCountry === country
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {country === 'all' ? 'All Countries' : country}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Filter by Category</p>
              <div className="flex flex-wrap gap-3">
                {['all', 'Dream', 'Very Good', 'Good', 'Reasonable'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition text-sm ${
                      selectedCategory === category
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        {safeFilteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeFilteredUniversities.map((university, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-24 bg-gradient-to-r ${getCategoryColor(university.category)}`}></div>
                <div className="p-6">
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(university.category)}`}
                    >
                      {university.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {university.country}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">{university.oneLineDescription}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tuition:</span>
                      <span className="font-semibold text-gray-900">{university.tuitionRange}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMoreDetails(university)}
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg mb-4">No universities found matching your criteria.</p>
            <p className="text-gray-600">Try adjusting the filters or complete your profile for better matches.</p>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedUniversity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
              <div className={`h-28 bg-gradient-to-r ${getCategoryColor(selectedUniversity.category)} relative`}>
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
                <div className="-mt-12 mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="min-w-0"><div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-gray-900 shadow">{countryFlag(selectedUniversity.country)} {selectedUniversity.city}, {selectedUniversity.country}</span><span className={`rounded-full bg-gradient-to-r ${getCategoryColor(selectedUniversity.category)} px-3 py-1.5 text-sm font-bold text-white shadow`}>Ranking tier: {selectedUniversity.category}</span></div><h2 className="break-words text-3xl font-bold text-gray-900 sm:text-4xl">{selectedUniversity.name}</h2></div><span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">🎓 {selectedUniversity.stream}</span></div>
                <p className="mb-6 text-gray-600">{selectedUniversity.oneLineDescription}</p>

                <div className="mb-6 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-5"><p className="font-bold text-gray-900">✨ Why this matches you</p><ul className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-2"><li>✓ {profile?.stream === selectedUniversity.stream ? `Matches your ${selectedUniversity.stream} stream` : `Offers ${selectedUniversity.stream.toLowerCase()} pathways`}</li><li>✓ {profile?.needScholarships && selectedUniversity.scholarshipAvailability ? 'Scholarship options are available' : 'Explore current eligibility'}</li></ul></div>

                <div className="grid gap-4 md:grid-cols-2">
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">📚 Requirements</p><p className="mt-3 text-sm font-semibold text-gray-600">Entrance exams</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedUniversity.requiredExams) && selectedUniversity.requiredExams.map((exam, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700"><li>• {selectedUniversity.stream === 'Engineering' ? 'Mathematics and Physics are commonly expected.' : selectedUniversity.stream === 'Medical' ? 'Biology, Chemistry, and Physics are commonly expected.' : `Verify ${selectedUniversity.stream} programme prerequisites.`}</li><li>• Meet current academic and programme eligibility requirements.</li></ul></section>
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">💳 Estimated costs</p><div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white p-3"><p className="text-xs font-semibold text-gray-500">TUITION</p><p className="mt-1 font-bold text-gray-900">{selectedUniversity.tuitionRange}</p></div><div className="rounded-xl bg-white p-3"><p className="text-xs font-semibold text-gray-500">LIVING</p><p className="mt-1 text-sm font-semibold text-gray-900">Verify by city</p></div></div><p className="mt-3 text-sm text-gray-700">Housing, food, transport, and personal costs vary by campus and lifestyle.</p></section>
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">🏫 Programmes & support</p><ul className="mt-3 space-y-2 text-sm text-gray-700"><li>• {selectedUniversity.stream === 'Engineering' ? 'Engineering, technology, and research pathways.' : selectedUniversity.stream === 'Medical' ? 'Medicine, healthcare, and research pathways.' : `${selectedUniversity.stream} programmes and related options.`}</li><li>• {selectedUniversity.scholarshipAvailability ? 'Scholarship and financial-aid options may be available.' : 'Verify current financial-aid options directly.'}</li></ul></section>
                  <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5"><p className="font-bold text-gray-900">🚀 Career outcomes</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">Internships</span><span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">Further study</span><span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">{selectedUniversity.stream} roles</span></div></section>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="font-bold text-gray-900">✅ Next Steps</p><ul className="mt-3 space-y-2 text-sm text-gray-700"><li>□ Compare programme prerequisites.</li><li>□ Prepare for the required entrance exams.</li><li>□ Verify application deadlines on the official website.</li></ul></div>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(`${selectedUniversity.name} official website`)}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white sm:w-auto">Visit Official Website ↗</a>

                <button
                  onClick={closeModal}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
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
