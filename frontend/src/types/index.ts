// TypeScript type definitions and interfaces

export type ExamStatus = 'Not Attempted' | 'Preparing' | 'Completed';
export type ExamName = 'JEE' | 'NEET' | 'SAT' | 'IELTS' | 'TOEFL' | 'GRE' | 'GMAT';
export interface LocalFileMetadata { fileName: string | null; fileType: string | null; fileSize: number | null; previewUrl: string | null; storageUrl: string | null; }

export interface ProfileData {
  name: string;
  grade?: string;
  gradeClass: string;
  stream: string;
  studyAbroad: boolean;
  preferredCountry?: string;
  dreamUniversity?: string;
  budget: string;
  needScholarships: boolean;
  examPreference?: string;
  phone?: string;
  city?: string;
  board?: string;
  academicScore?: string;
  dreamJob?: string;
  examStatuses?: Record<ExamName, ExamStatus>;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  profilePhoto?: LocalFileMetadata;
  resumeFile?: LocalFileMetadata;
  
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
