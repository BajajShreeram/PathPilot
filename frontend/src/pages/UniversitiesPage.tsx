import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { universities, type University } from '../data/universities';

/**
 * Safely get a value from profile with fallback to old key
 */
const getProfileValue = (profile: ProfileData | null, newKey: string, oldKey?: string, defaultValue: any = null): any => {
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
    
    const country = String(getProfileValue(profileData, 'preferredCountry', 'country', '') || '').toLowerCase();

    // Get stream from new profile structure or determine from career/subjects
    let stream = getProfileValue(profileData, 'stream', 'field', 'Study Abroad');

    // If no stream in profile, determine from profile data
    if (!stream || stream === 'Other' || stream === 'Study Abroad') {
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
      } else {
        stream = 'Study Abroad';
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

    // Filter universities by stream - safe filter
    let filtered = universities.filter((uni) => {
      if (!uni || !uni.stream) return false;
      if (isAbroad) {
        return uni.stream === 'Study Abroad' || uni.country !== 'India';
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
        
        let stream = getProfileValue(parsedProfile, 'stream', 'field', 'Study Abroad');
        
        // If no stream in profile, determine from profile data
        if (!stream || stream === 'Other' || stream === 'Study Abroad') {
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
          } else {
            stream = 'Study Abroad';
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
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className={`h-32 bg-gradient-to-r ${getCategoryColor(selectedUniversity.category)} relative`}>
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
                <div className="mb-4">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getCategoryColor(selectedUniversity.category)}`}
                  >
                    {selectedUniversity.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedUniversity.name}</h2>
                <p className="text-gray-600 mb-6">{selectedUniversity.oneLineDescription}</p>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Country</p>
                    <p className="text-lg text-gray-900">{selectedUniversity.country}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Stream</p>
                    <p className="text-lg text-gray-900">{selectedUniversity.stream}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Tuition Range</p>
                    <p className="text-lg text-gray-900">{selectedUniversity.tuitionRange}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Required Exams</p>
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
                  </div>
                </div>

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
