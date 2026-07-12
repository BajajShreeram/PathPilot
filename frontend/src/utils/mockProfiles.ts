import type { ProfileData } from '../types';

/**
 * Mock profile test scenarios for testing and development
 */

export const MOCK_PROFILES: Record<string, ProfileData> = {
  complete: {
    name: 'Alex Johnson',
    gradeClass: 'Grade 12',
    stream: 'Science',
    studyAbroad: true,
    preferredCountry: 'US',
    country: 'US',
    favouriteSubjects: ['Mathematics', 'Physics', 'Computer Science'],
    subjectInterests: ['Mathematics', 'Physics', 'Computer Science'],
    strongSubjects: ['Mathematics', 'Computer Science'],
    weakSubjects: [],
    careerInterests: ['Engineering', 'Computer Science/IT'],
    dreamUniversity: 'MIT',
    budget: 'HIGH',
    needScholarships: true,
  },

  minimal: {
    name: 'Sam Smith',
    gradeClass: '10th Grade',
    stream: 'General',
    studyAbroad: false,
    country: 'UK',
    favouriteSubjects: ['English'],
    subjectInterests: ['English'],
    strongSubjects: ['English'],
    weakSubjects: [],
    careerInterests: ['Teaching'],
    dreamUniversity: '',
    budget: 'LOW',
    needScholarships: true,
  },

  international: {
    name: 'Priya Sharma',
    gradeClass: 'Grade 11',
    stream: 'Science',
    studyAbroad: true,
    preferredCountry: 'US',
    country: 'IN',
    favouriteSubjects: ['Biology', 'Chemistry', 'Physics'],
    subjectInterests: ['Biology', 'Chemistry', 'Physics'],
    strongSubjects: ['Biology', 'Chemistry'],
    weakSubjects: [],
    careerInterests: ['Medicine', 'Research'],
    dreamUniversity: 'Harvard Medical School',
    budget: 'MEDIUM',
    needScholarships: true,
  },

  arts: {
    name: 'Emma Davis',
    gradeClass: 'Sophomore',
    stream: 'Arts',
    studyAbroad: true,
    preferredCountry: 'US',
    country: 'CA',
    favouriteSubjects: ['Art', 'English', 'History'],
    subjectInterests: ['Art', 'English', 'History'],
    strongSubjects: ['Art', 'English'],
    weakSubjects: [],
    careerInterests: ['Arts & Design', 'Media & Journalism'],
    dreamUniversity: 'Parsons School of Design',
    budget: 'VERY_HIGH',
    needScholarships: false,
  },

  business: {
    name: 'Michael Chen',
    gradeClass: 'Grade 12',
    stream: 'Commerce',
    studyAbroad: true,
    preferredCountry: 'US',
    country: 'SG',
    favouriteSubjects: ['Economics', 'Mathematics', 'Geography'],
    subjectInterests: ['Economics', 'Mathematics', 'Business Studies'],
    strongSubjects: ['Economics', 'Mathematics'],
    weakSubjects: [],
    careerInterests: ['Business', 'Finance', 'Marketing'],
    dreamUniversity: 'Wharton School',
    budget: 'HIGH',
    needScholarships: false,
  },

  undecided: {
    name: 'Jordan Taylor',
    gradeClass: 'Grade 9',
    stream: 'General',
    studyAbroad: false,
    country: 'AU',
    favouriteSubjects: ['Mathematics', 'English', 'Music'],
    subjectInterests: ['Mathematics', 'English', 'Music'],
    strongSubjects: ['Mathematics'],
    weakSubjects: [],
    careerInterests: ['Business', 'Arts & Design', 'Psychology'],
    dreamUniversity: '',
    budget: 'MEDIUM',
    needScholarships: true,
  },
};

/**
 * Load a mock profile into localStorage for testing
 */
export const loadMockProfile = (profileKey: keyof typeof MOCK_PROFILES): void => {
  const profile = MOCK_PROFILES[profileKey];
  if (profile) {
    localStorage.setItem('pathpilot_profile', JSON.stringify(profile));
    console.log(`✅ Loaded mock profile: ${profileKey}`, profile);
  }
};

/**
 * Clear profile from localStorage
 */
export const clearProfile = (): void => {
  localStorage.removeItem('pathpilot_profile');
  console.log('🗑️ Profile cleared from localStorage');
};

/**
 * Get current profile from localStorage
 */
export const getCurrentProfile = (): ProfileData | null => {
  const stored = localStorage.getItem('pathpilot_profile');
  return stored ? JSON.parse(stored) : null;
};
