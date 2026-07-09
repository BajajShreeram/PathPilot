import type { ProfileData } from '../types';

/**
 * Mock profile test scenarios for testing and development
 */

export const MOCK_PROFILES: Record<string, ProfileData> = {
  complete: {
    name: 'Alex Johnson',
    gradeClass: 'Grade 12',
    country: 'US',
    favouriteSubjects: ['Mathematics', 'Physics', 'Computer Science'],
    careerInterests: ['Engineering', 'Computer Science/IT'],
    dreamUniversity: 'MIT',
    budget: 'HIGH',
    needScholarships: true,
  },

  minimal: {
    name: 'Sam Smith',
    gradeClass: '10th Grade',
    country: 'UK',
    favouriteSubjects: ['English'],
    careerInterests: ['Teaching'],
    dreamUniversity: '',
    budget: 'LOW',
    needScholarships: true,
  },

  international: {
    name: 'Priya Sharma',
    gradeClass: 'Grade 11',
    country: 'IN',
    favouriteSubjects: ['Biology', 'Chemistry', 'Physics'],
    careerInterests: ['Medicine', 'Research'],
    dreamUniversity: 'Harvard Medical School',
    budget: 'MEDIUM',
    needScholarships: true,
  },

  arts: {
    name: 'Emma Davis',
    gradeClass: 'Sophomore',
    country: 'CA',
    favouriteSubjects: ['Art', 'English', 'History'],
    careerInterests: ['Arts & Design', 'Media & Journalism'],
    dreamUniversity: 'Parsons School of Design',
    budget: 'VERY_HIGH',
    needScholarships: false,
  },

  business: {
    name: 'Michael Chen',
    gradeClass: 'Grade 12',
    country: 'SG',
    favouriteSubjects: ['Economics', 'Mathematics', 'Geography'],
    careerInterests: ['Business', 'Finance', 'Marketing'],
    dreamUniversity: 'Wharton School',
    budget: 'HIGH',
    needScholarships: false,
  },

  undecided: {
    name: 'Jordan Taylor',
    gradeClass: 'Grade 9',
    country: 'AU',
    favouriteSubjects: ['Mathematics', 'English', 'Music'],
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
