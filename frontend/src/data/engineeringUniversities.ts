/**
 * Engineering Universities Database
 * Categorized by tier with detailed information
 */

export interface EngineeringUniversity {
  name: string;
  country: string;
  requiredExams: string[];
  approximateTuition: string;
  description: string;
  tier: 'Dream' | 'Very Good' | 'Good' | 'Reasonable';
}

export const engineeringUniversities: EngineeringUniversity[] = [
  // Dream Tier
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    country: 'United States',
    requiredExams: ['SAT/ACT', 'SAT Subject Tests', 'TOEFL/IELTS'],
    approximateTuition: '$53,790/year',
    description: 'World-leading institution in engineering and technology with cutting-edge research facilities and innovation labs.',
    tier: 'Dream',
  },
  {
    name: 'Stanford University',
    country: 'United States',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS'],
    approximateTuition: '$56,169/year',
    description: 'Premier engineering school in Silicon Valley, known for entrepreneurship and technological innovation.',
    tier: 'Dream',
  },
  {
    name: 'University of Cambridge',
    country: 'United Kingdom',
    requiredExams: ['A-Levels', 'IB', 'IELTS/TOEFL'],
    approximateTuition: '£33,825/year',
    description: 'Historic excellence in engineering with world-class research output and distinguished faculty.',
    tier: 'Dream',
  },
  {
    name: 'ETH Zurich',
    country: 'Switzerland',
    requiredExams: ['Reduced Entrance Examination', 'Language proficiency'],
    approximateTuition: 'CHF 1,460/year (approx. $1,600)',
    description: 'Leading European technical university known for engineering excellence and Nobel laureates.',
    tier: 'Dream',
  },

  // Very Good Tier
  {
    name: 'University of California, Berkeley',
    country: 'United States',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS'],
    approximateTuition: '$43,176/year',
    description: 'Top-ranked public university with exceptional engineering programs and strong industry connections.',
    tier: 'Very Good',
  },
  {
    name: 'Imperial College London',
    country: 'United Kingdom',
    requiredExams: ['A-Levels', 'IB', 'IELTS'],
    approximateTuition: '£33,750/year',
    description: 'Specialist STEM institution in London with outstanding engineering research and teaching.',
    tier: 'Very Good',
  },
  {
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
    requiredExams: ['A-Levels', 'SAT', 'IELTS/TOEFL'],
    approximateTuition: 'SGD $37,650/year (approx. $28,000)',
    description: 'Asia\'s leading university with world-class engineering programs and state-of-the-art facilities.',
    tier: 'Very Good',
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    requiredExams: ['High School Diploma', 'TOEFL/IELTS'],
    approximateTuition: 'CAD $58,160/year (approx. $43,000)',
    description: 'Canada\'s top engineering school with comprehensive programs and strong research focus.',
    tier: 'Very Good',
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    requiredExams: ['Abitur/IB', 'TestAS', 'German Language (DSH/TestDaF)'],
    approximateTuition: '€258/semester (approx. $300)',
    description: 'Premier German technical university with excellent engineering education and industry partnerships.',
    tier: 'Very Good',
  },

  // Good Tier
  {
    name: 'University of Illinois Urbana-Champaign',
    country: 'United States',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS'],
    approximateTuition: '$34,316/year',
    description: 'Strong engineering programs with emphasis on research and innovation, affordable public university option.',
    tier: 'Good',
  },
  {
    name: 'University of Manchester',
    country: 'United Kingdom',
    requiredExams: ['A-Levels', 'IB', 'IELTS'],
    approximateTuition: '£28,000/year',
    description: 'Historic engineering school with excellent facilities and strong links to industry in Northern England.',
    tier: 'Good',
  },
  {
    name: 'Delft University of Technology',
    country: 'Netherlands',
    requiredExams: ['High School Diploma', 'IELTS/TOEFL'],
    approximateTuition: '€18,750/year (approx. $20,500)',
    description: 'Netherlands\' premier technical university known for civil, mechanical, and aerospace engineering.',
    tier: 'Good',
  },

  // Reasonable Tier
  {
    name: 'University of Melbourne',
    country: 'Australia',
    requiredExams: ['High School Certificate', 'IELTS/TOEFL'],
    approximateTuition: 'AUD $45,824/year (approx. $30,000)',
    description: 'Highly ranked Australian university with comprehensive engineering programs and research opportunities.',
    tier: 'Reasonable',
  },
  {
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    country: 'India',
    requiredExams: ['JEE Advanced'],
    approximateTuition: '₹2,00,000/year (approx. $2,400)',
    description: 'India\'s most prestigious engineering institute with rigorous programs and exceptional value.',
    tier: 'Reasonable',
  },
  {
    name: 'Korea Advanced Institute of Science and Technology (KAIST)',
    country: 'South Korea',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS', 'Interview'],
    approximateTuition: '₩9,000,000/year (approx. $6,800)',
    description: 'Leading Korean technical university with cutting-edge research and full scholarships for international students.',
    tier: 'Reasonable',
  },
];

/**
 * Get universities by tier
 */
export const getUniversitiesByTier = (tier: 'Dream' | 'Very Good' | 'Good' | 'Reasonable'): EngineeringUniversity[] => {
  return engineeringUniversities.filter(uni => uni.tier === tier);
};

/**
 * Get universities by country
 */
export const getUniversitiesByCountry = (country: string): EngineeringUniversity[] => {
  return engineeringUniversities.filter(uni => uni.country === country);
};

/**
 * Get all unique countries
 */
export const getAllCountries = (): string[] => {
  return [...new Set(engineeringUniversities.map(uni => uni.country))];
};
