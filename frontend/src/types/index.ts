// TypeScript type definitions and interfaces

export interface ProfileData {
  name: string;
  gradeClass: string;
  stream: string;
  studyAbroad: boolean;
  preferredCountry?: string;
  dreamUniversity?: string;
  budget: string;
  needScholarships: boolean;
  
  // Subject and career fields
  favouriteSubjects?: string[];
  subjectInterests?: string[];
  strongSubjects?: string[];
  weakSubjects?: string[];
  careerInterests?: string[];
  
  // Old keys for backward compatibility
  subjects?: string[];
  career?: string[];
  field?: string;
  country?: string;
}
