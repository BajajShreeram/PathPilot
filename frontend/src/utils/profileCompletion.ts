import type { ProfileData } from '../types';

export interface CompletionItem { label: string; complete: boolean; }

export const getProfileCompletion = (profile: ProfileData, achievementCount: number) => {
  const exams = profile.examStatuses || {};
  const items: CompletionItem[] = [
    { label: 'Basic Information', complete: Boolean(profile.name && profile.country && profile.city && profile.phone) },
    { label: 'Academic Information', complete: Boolean(profile.gradeClass && profile.stream && profile.board && profile.academicScore && profile.favouriteSubjects?.length) },
    { label: 'Career Interests', complete: Boolean(profile.careerInterests?.length && profile.dreamJob) },
    { label: 'Dream University', complete: Boolean(profile.dreamUniversity) },
    { label: 'Study Preferences', complete: Boolean(profile.budget && (!profile.studyAbroad || profile.preferredCountry)) },
    { label: 'Achievements', complete: achievementCount > 0 },
    { label: 'Resume', complete: Boolean(profile.resumeFile?.fileName) },
    { label: 'Profile Photo', complete: Boolean(profile.profilePhoto?.fileName) },
    { label: 'Portfolio Links', complete: Boolean(profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl) },
    { label: 'Entrance Exam Scores', complete: ['JEE', 'NEET', 'SAT', 'GRE', 'GMAT'].some((name) => exams[name as keyof typeof exams] === 'Completed') },
    { label: 'Language Test Scores', complete: ['IELTS', 'TOEFL'].some((name) => exams[name as keyof typeof exams] === 'Completed') },
  ];
  const percentage = Math.round((items.filter((item) => item.complete).length / items.length) * 100);
  const strength = percentage >= 85 ? 'Excellent' : percentage >= 65 ? 'Good' : percentage >= 40 ? 'Average' : 'Needs Improvement';
  const suggestionMap: Record<string, string> = {
    Achievements: 'Add achievements.', Resume: 'Upload a resume.', 'Profile Photo': 'Upload a profile picture.',
    'Entrance Exam Scores': 'Add entrance exam progress.', 'Language Test Scores': 'Add language test progress.',
    'Career Interests': 'Complete career interests and dream job.', 'Portfolio Links': 'Add portfolio or professional links.',
    'Basic Information': 'Complete your basic information.', 'Academic Information': 'Complete your academic information.',
    'Dream University': 'Add a dream university.', 'Study Preferences': 'Complete your study preferences.',
  };
  return { percentage, strength, items, missing: items.filter((item) => !item.complete), suggestions: items.filter((item) => !item.complete).slice(0, 5).map((item) => suggestionMap[item.label]) };
};

