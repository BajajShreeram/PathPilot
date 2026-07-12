export const ACHIEVEMENT_CATEGORIES = [
  'Projects', 'Certificates', 'Olympiads', 'Competitions', 'Hackathons', 'Research',
  'Leadership', 'Volunteering', 'Sports', 'Arts', 'Internships', 'Other',
] as const;

export const ACHIEVEMENT_LEVELS = ['School', 'City', 'State', 'National', 'International'] as const;

export type AchievementCategory = typeof ACHIEVEMENT_CATEGORIES[number];
export type AchievementLevel = typeof ACHIEVEMENT_LEVELS[number];

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  organization: string;
  date: string;
  description: string;
  level: AchievementLevel;
  result: string;
  skillsGained: string[];
  proofLink: string;
  proofFileName: string | null;
  proofFileType: string | null;
  proofFileSize: number | null;
  proofPreviewUrl: string | null;
  proofStorageUrl: string | null;
}

const STORAGE_KEY = 'pathpilot_achievements';

export const getAchievements = (): Achievement[] => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

export const saveAchievements = (achievements: Achievement[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
};
