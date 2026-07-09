import type { ProfileData } from '../types';

/**
 * Recommendation engine based on user profile
 * Provides personalized suggestions for universities, scholarships, careers, etc.
 */

export interface Recommendation {
  title: string;
  description: string;
  category: 'university' | 'scholarship' | 'career' | 'resource' | 'deadline';
  relevanceScore: number;
  reasons: string[];
}

/**
 * Generate personalized university recommendations based on profile
 */
export const getUniversityRecommendations = (profile: ProfileData | null): Recommendation[] => {
  if (!profile) return [];

  const recommendations: Recommendation[] = [];

  // Engineering/CS focus
  if (
    profile.careerInterests.some((c) => ['Engineering', 'Computer Science/IT'].includes(c)) ||
    profile.favouriteSubjects.includes('Computer Science')
  ) {
    recommendations.push({
      title: 'MIT',
      description: 'Top engineering and computer science programs',
      category: 'university',
      relevanceScore: 95,
      reasons: ['Strong in ' + profile.careerInterests[0], 'World-class faculty', 'Great research opportunities'],
    });

    recommendations.push({
      title: 'Stanford University',
      description: 'Leading tech and innovation hub',
      category: 'university',
      relevanceScore: 93,
      reasons: ['Silicon Valley proximity', 'Innovation focus', 'Strong alumni network'],
    });
  }

  // Medicine/Biology focus
  if (
    profile.careerInterests.includes('Medicine') ||
    profile.favouriteSubjects.some((s) => ['Biology', 'Chemistry'].includes(s))
  ) {
    recommendations.push({
      title: 'Johns Hopkins University',
      description: 'Premier medical and health sciences programs',
      category: 'university',
      relevanceScore: 94,
      reasons: ['Top medical school', 'Research hospitals', 'Healthcare leadership'],
    });
  }

  // Business/Finance focus
  if (profile.careerInterests.some((c) => ['Business', 'Finance', 'Marketing'].includes(c))) {
    recommendations.push({
      title: 'Wharton School',
      description: 'World-renowned business program',
      category: 'university',
      relevanceScore: 92,
      reasons: ['Business excellence', 'Strong network', 'Finance focus'],
    });
  }

  // Arts focus
  if (profile.careerInterests.includes('Arts & Design') || profile.favouriteSubjects.includes('Art')) {
    recommendations.push({
      title: 'Parsons School of Design',
      description: 'Leading art and design institution',
      category: 'university',
      relevanceScore: 90,
      reasons: ['Creative excellence', 'Industry connections', 'NYC location'],
    });
  }

  // Budget-based recommendations
  if (profile.budget === 'LOW' || profile.budget === 'MEDIUM') {
    recommendations.push({
      title: 'University of Toronto',
      description: 'Excellent education at reasonable cost',
      category: 'university',
      relevanceScore: 88,
      reasons: ['Affordable tuition', 'Top-ranked programs', 'International reputation'],
    });
  }

  // International students
  if (profile.country !== 'US') {
    recommendations.push({
      title: 'University of Oxford',
      description: 'Historic excellence in all fields',
      category: 'university',
      relevanceScore: 91,
      reasons: ['International diversity', 'Historic prestige', 'Tutorial system'],
    });
  }

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);
};

/**
 * Generate scholarship recommendations based on profile
 */
export const getScholarshipRecommendations = (profile: ProfileData | null): Recommendation[] => {
  if (!profile) return [];

  const recommendations: Recommendation[] = [];

  // High need/low budget
  if (profile.needScholarships || profile.budget === 'LOW') {
    recommendations.push({
      title: 'Gates Cambridge Scholarship',
      description: 'Full funding for graduate studies at Cambridge',
      category: 'scholarship',
      relevanceScore: 95,
      reasons: ['Full funding', 'Prestige', 'International students'],
    });

    recommendations.push({
      title: 'Fulbright Program',
      description: 'Study, teach and conduct research in the USA',
      category: 'scholarship',
      relevanceScore: 92,
      reasons: ['Full funding', 'Cultural exchange', 'Wide eligibility'],
    });
  }

  // Merit-based (strong profile)
  if (profile.favouriteSubjects.length >= 3 || profile.careerInterests.length >= 2) {
    recommendations.push({
      title: 'Rhodes Scholarship',
      description: 'Prestigious scholarship to Oxford University',
      category: 'scholarship',
      relevanceScore: 94,
      reasons: ['Full funding', 'Leadership focus', 'Elite network'],
    });
  }

  // International students
  if (profile.country !== 'US' && profile.country !== 'UK') {
    recommendations.push({
      title: 'Chevening Scholarships',
      description: 'UK government scholarships for future leaders',
      category: 'scholarship',
      relevanceScore: 90,
      reasons: ['UK focus', 'Leadership development', 'Full funding'],
    });
  }

  // STEM focus
  if (
    profile.favouriteSubjects.some((s) => ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'].includes(s))
  ) {
    recommendations.push({
      title: 'National Science Foundation Scholarships',
      description: 'STEM-focused funding opportunities',
      category: 'scholarship',
      relevanceScore: 88,
      reasons: ['STEM focus', 'Research support', 'Various programs'],
    });
  }

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);
};

/**
 * Generate career path recommendations
 */
export const getCareerRecommendations = (profile: ProfileData | null): Recommendation[] => {
  if (!profile) return [];

  const recommendations: Recommendation[] = [];

  // Based on subjects and interests
  if (profile.favouriteSubjects.includes('Computer Science') && !profile.careerInterests.includes('Computer Science/IT')) {
    recommendations.push({
      title: 'Software Engineering',
      description: 'Design and develop software systems',
      category: 'career',
      relevanceScore: 90,
      reasons: ['Matches your CS interest', 'High demand', 'Great salary potential'],
    });
  }

  if (profile.favouriteSubjects.includes('Mathematics') && profile.careerInterests.includes('Finance')) {
    recommendations.push({
      title: 'Quantitative Analyst',
      description: 'Apply math and statistics to financial markets',
      category: 'career',
      relevanceScore: 92,
      reasons: ['Math + Finance', 'High earning potential', 'Analytical work'],
    });
  }

  if (profile.favouriteSubjects.some((s) => ['Biology', 'Chemistry'].includes(s)) && !profile.careerInterests.includes('Medicine')) {
    recommendations.push({
      title: 'Biomedical Research',
      description: 'Conduct research in life sciences',
      category: 'career',
      relevanceScore: 88,
      reasons: ['Science focus', 'Research opportunities', 'Impact on health'],
    });
  }

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
};

/**
 * Generate resource recommendations
 */
export const getResourceRecommendations = (profile: ProfileData | null): Recommendation[] => {
  if (!profile) return [];

  const recommendations: Recommendation[] = [];

  // Based on career interests
  profile.careerInterests.forEach((interest) => {
    if (interest === 'Computer Science/IT') {
      recommendations.push({
        title: 'freeCodeCamp',
        description: 'Learn to code for free',
        category: 'resource',
        relevanceScore: 85,
        reasons: ['Free courses', 'Hands-on projects', 'Certifications'],
      });
    }

    if (interest === 'Business') {
      recommendations.push({
        title: 'Coursera Business Courses',
        description: 'Business courses from top universities',
        category: 'resource',
        relevanceScore: 83,
        reasons: ['University partnerships', 'Flexible learning', 'Career advancement'],
      });
    }
  });

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 3);
};

/**
 * Generate all recommendations for a profile
 */
export const getAllRecommendations = (
  profile: ProfileData | null
): {
  universities: Recommendation[];
  scholarships: Recommendation[];
  careers: Recommendation[];
  resources: Recommendation[];
} => {
  return {
    universities: getUniversityRecommendations(profile),
    scholarships: getScholarshipRecommendations(profile),
    careers: getCareerRecommendations(profile),
    resources: getResourceRecommendations(profile),
  };
};

/**
 * Get top priority recommendations (most relevant across all categories)
 */
export const getTopRecommendations = (profile: ProfileData | null, limit: number = 5): Recommendation[] => {
  const all = getAllRecommendations(profile);
  const combined = [...all.universities, ...all.scholarships, ...all.careers, ...all.resources];

  return combined.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
};

/**
 * Get personalized insights based on profile
 */
export const getPersonalizedInsights = (profile: ProfileData | null): string[] => {
  if (!profile) return [];

  const insights: string[] = [];

  // Scholarship insights
  if (profile.needScholarships) {
    insights.push('💰 You should prioritize scholarship applications to fund your education.');
  }

  // Career alignment
  if (profile.careerInterests.length > 0 && profile.favouriteSubjects.length > 0) {
    const hasAlignment = profile.careerInterests.some((career) =>
      career.toLowerCase().includes(profile.favouriteSubjects[0].toLowerCase())
    );
    if (hasAlignment) {
      insights.push('✅ Your career interests align well with your favourite subjects!');
    } else {
      insights.push('💡 Consider how your subjects can support your career goals.');
    }
  }

  // Budget planning
  if (profile.budget === 'LOW' || profile.budget === 'MEDIUM') {
    insights.push('📊 Look for universities with good financial aid packages and scholarship opportunities.');
  }

  // Application timing
  insights.push('⏰ Start your applications at least 6-12 months before deadlines.');

  return insights;
};
