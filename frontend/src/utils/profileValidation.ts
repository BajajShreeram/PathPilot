import type { ProfileData } from '../types';

/**
 * Profile validation and utility functions
 */

/**
 * Check if a profile is complete with all required fields
 */
export const isProfileComplete = (profile: ProfileData | null): boolean => {
  if (!profile) return false;

  const favouriteSubjects = profile.favouriteSubjects ?? [];
  const careerInterests = profile.careerInterests ?? [];

  return !!(
    profile.name?.trim() &&
    profile.gradeClass?.trim() &&
    profile.country &&
    favouriteSubjects.length > 0 &&
    careerInterests.length > 0 &&
    profile.budget
  );
};

/**
 * Calculate profile completion percentage
 */
export const getProfileCompletionPercentage = (profile: ProfileData | null): number => {
  if (!profile) return 0;

  const favouriteSubjects = profile.favouriteSubjects ?? [];
  const careerInterests = profile.careerInterests ?? [];

  let completed = 0;
  const total = 8; // Total fields including optional

  if (profile.name?.trim()) completed++;
  if (profile.gradeClass?.trim()) completed++;
  if (profile.country) completed++;
  if (favouriteSubjects.length > 0) completed++;
  if (careerInterests.length > 0) completed++;
  if (profile.budget) completed++;
  if (profile.dreamUniversity?.trim()) completed++;
  // needScholarships is always set (boolean), so count it
  completed++;

  return Math.round((completed / total) * 100);
};

/**
 * Get missing required fields from profile
 */
export const getMissingFields = (profile: ProfileData | null): string[] => {
  const missing: string[] = [];

  if (!profile) {
    return ['name', 'gradeClass', 'country', 'favouriteSubjects', 'careerInterests', 'budget'];
  }

  const favouriteSubjects = profile.favouriteSubjects ?? [];
  const careerInterests = profile.careerInterests ?? [];

  if (!profile.name?.trim()) missing.push('Name');
  if (!profile.gradeClass?.trim()) missing.push('Grade/Class');
  if (!profile.country) missing.push('Country');
  if (favouriteSubjects.length === 0) missing.push('Favourite Subjects');
  if (careerInterests.length === 0) missing.push('Career Interests');
  if (!profile.budget) missing.push('Budget');

  return missing;
};

/**
 * Validate individual profile fields
 */
export const validateProfileField = (field: keyof ProfileData, value: any): string | null => {
  switch (field) {
    case 'name':
      if (!value || typeof value !== 'string' || !value.trim()) {
        return 'Name is required';
      }
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return null;

    case 'gradeClass':
      if (!value || typeof value !== 'string' || !value.trim()) {
        return 'Grade/Class is required';
      }
      return null;

    case 'country':
      if (!value || typeof value !== 'string') {
        return 'Country is required';
      }
      return null;

    case 'favouriteSubjects':
      if (!Array.isArray(value) || value.length === 0) {
        return 'Please select at least one favourite subject';
      }
      if (value.length > 5) {
        return 'Please select no more than 5 subjects';
      }
      return null;

    case 'careerInterests':
      if (!Array.isArray(value) || value.length === 0) {
        return 'Please select at least one career interest';
      }
      if (value.length > 5) {
        return 'Please select no more than 5 career interests';
      }
      return null;

    case 'budget':
      if (!value || typeof value !== 'string') {
        return 'Budget is required';
      }
      return null;

    case 'dreamUniversity':
      // Optional field
      return null;

    case 'needScholarships':
      // Boolean field, always valid
      return null;

    default:
      return null;
  }
};

/**
 * Get profile from localStorage
 */
export const getStoredProfile = (): ProfileData | null => {
  try {
    const stored = localStorage.getItem('pathpilot_profile');
    if (!stored) return null;
    return JSON.parse(stored) as ProfileData;
  } catch (error) {
    console.error('Error reading profile from localStorage:', error);
    return null;
  }
};

/**
 * Save profile to localStorage
 */
export const saveProfile = (profile: ProfileData): boolean => {
  try {
    localStorage.setItem('pathpilot_profile', JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving profile to localStorage:', error);
    return false;
  }
};

/**
 * Clear profile from localStorage
 */
export const clearStoredProfile = (): void => {
  localStorage.removeItem('pathpilot_profile');
};

/**
 * Check if profile needs scholarship recommendations
 */
export const needsScholarships = (profile: ProfileData | null): boolean => {
  if (!profile) return false;
  return profile.needScholarships === true || profile.budget === 'LOW' || profile.budget === 'MEDIUM';
};

/**
 * Get primary career interest
 */
export const getPrimaryCareer = (profile: ProfileData | null): string | null => {
  const careerInterests = profile?.careerInterests ?? [];
  if (careerInterests.length === 0) {
    return null;
  }
  return careerInterests[0];
};

/**
 * Get profile summary for display
 */
export const getProfileSummary = (profile: ProfileData | null): string => {
  if (!profile) return 'No profile found';

  const careerInterests = profile.careerInterests ?? [];
  const parts: string[] = [];

  if (profile.gradeClass) parts.push(profile.gradeClass);
  if (profile.country) parts.push(`from ${profile.country}`);
  if (careerInterests.length > 0) {
    parts.push(`interested in ${careerInterests[0]}`);
  }

  return parts.join(', ');
};
