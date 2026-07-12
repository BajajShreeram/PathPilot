/**
 * Comprehensive Scholarship Database
 * Scholarships for different streams, countries, and needs
 */

export type ScholarshipStream = 'Engineering' | 'Medical' | 'Commerce' | 'Law' | 'Design' | 'Arts' | 'General' | 'Study Abroad';
export type ScholarshipType = 'Merit-based' | 'Need-based' | 'Need & Merit' | 'Sports' | 'Minority' | 'Women';

export interface Scholarship {
  name: string;
  amount: string;
  deadline: string;
  eligibility: string;
  type: ScholarshipType;
  stream: ScholarshipStream;
  country: string;
  budgetSuitable: string[]; // LOW, MEDIUM, HIGH, VERY_HIGH
  description: string;
}

export const scholarships: Scholarship[] = [
  // ============================================
  // ENGINEERING SCHOLARSHIPS
  // ============================================
  {
    name: 'INSPIRE Scholarship (DST)',
    amount: '₹80,000/year',
    deadline: '2025-01-31',
    eligibility: 'Top 1% students in Class 12 board exams pursuing science',
    type: 'Merit-based',
    stream: 'Engineering',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Government scholarship for talented students pursuing natural sciences',
  },
  {
    name: 'JEE Main Scholarship',
    amount: '₹50,000/year',
    deadline: '2025-02-28',
    eligibility: 'Students qualifying JEE Main with good rank',
    type: 'Merit-based',
    stream: 'Engineering',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Merit scholarship for JEE qualifiers',
  },
  {
    name: 'NIT Merit Scholarship',
    amount: 'Full tuition waiver',
    deadline: '2025-06-30',
    eligibility: 'Top 5% JEE Main rank holders admitted to NITs',
    type: 'Merit-based',
    stream: 'Engineering',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Tuition fee waiver for top performers at NITs',
  },

  // ============================================
  // MEDICAL SCHOLARSHIPS
  // ============================================
  {
    name: 'AIIMS Merit Scholarship',
    amount: 'Full tuition waiver',
    deadline: '2025-03-31',
    eligibility: 'Top 100 NEET rank holders admitted to AIIMS',
    type: 'Merit-based',
    stream: 'Medical',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH'],
    description: 'Complete fee waiver for top NEET performers',
  },
  {
    name: 'Medical Education Loan Subsidy',
    amount: 'Interest subsidy on education loans',
    deadline: '2025-04-15',
    eligibility: 'Students from families with annual income below ₹4.5 lakh',
    type: 'Need-based',
    stream: 'Medical',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Government interest subsidy for medical education loans',
  },
  {
    name: 'State Medical Scholarship',
    amount: '₹25,000 - ₹50,000/year',
    deadline: '2025-05-31',
    eligibility: 'State quota medical students from economically weaker sections',
    type: 'Need & Merit',
    stream: 'Medical',
    country: 'India',
    budgetSuitable: ['LOW'],
    description: 'State government support for medical students',
  },

  // ============================================
  // COMMERCE SCHOLARSHIPS
  // ============================================
  {
    name: 'CA Foundation Scholarship',
    amount: '₹15,000 - ₹30,000',
    deadline: '2025-03-15',
    eligibility: 'CA Foundation students with excellent academic record',
    type: 'Merit-based',
    stream: 'Commerce',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'ICAI scholarship for talented CA aspirants',
  },
  {
    name: 'Commerce Merit Award',
    amount: '₹20,000/year',
    deadline: '2025-04-30',
    eligibility: 'Top scorers in Class 12 Commerce stream',
    type: 'Merit-based',
    stream: 'Commerce',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Recognition award for commerce excellence',
  },

  // ============================================
  // LAW SCHOLARSHIPS
  // ============================================
  {
    name: 'CLAT Merit Scholarship',
    amount: '₹40,000 - ₹80,000/year',
    deadline: '2025-05-18',
    eligibility: 'Top 500 CLAT rank holders',
    type: 'Merit-based',
    stream: 'Law',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Scholarship for high CLAT achievers',
  },
  {
    name: 'Legal Aid Society Scholarship',
    amount: '₹25,000/year',
    deadline: '2025-06-15',
    eligibility: 'Law students committed to public service',
    type: 'Need & Merit',
    stream: 'Law',
    country: 'India',
    budgetSuitable: ['LOW'],
    description: 'Support for students interested in public interest law',
  },

  // ============================================
  // DESIGN SCHOLARSHIPS
  // ============================================
  {
    name: 'NID Merit Scholarship',
    amount: '₹60,000 - ₹1,00,000/year',
    deadline: '2025-03-01',
    eligibility: 'Top performers in NID entrance exam',
    type: 'Merit-based',
    stream: 'Design',
    country: 'India',
    budgetSuitable: ['MEDIUM', 'HIGH'],
    description: 'National Institute of Design scholarship for talented designers',
  },
  {
    name: 'Creative Arts Foundation Grant',
    amount: '₹30,000 - ₹50,000',
    deadline: '2025-04-30',
    eligibility: 'Design students with exceptional portfolio',
    type: 'Merit-based',
    stream: 'Design',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Grant for creative excellence in design education',
  },

  // ============================================
  // ARTS/HUMANITIES SCHOLARSHIPS
  // ============================================
  {
    name: 'UGC NET JRF Fellowship',
    amount: '₹31,000/month',
    deadline: '2025-02-28',
    eligibility: 'Research scholars in humanities and social sciences',
    type: 'Merit-based',
    stream: 'Arts',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH'],
    description: 'Junior Research Fellowship for postgraduate research',
  },
  {
    name: 'Delhi University Merit Scholarship',
    amount: '₹10,000 - ₹20,000/year',
    deadline: '2025-04-15',
    eligibility: 'Top performers in DU arts and humanities programs',
    type: 'Merit-based',
    stream: 'Arts',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Merit award for Delhi University arts students',
  },

  // ============================================
  // GENERAL SCHOLARSHIPS (All Streams)
  // ============================================
  {
    name: 'National Scholarship Portal (NSP)',
    amount: '₹10,000 - ₹50,000/year',
    deadline: '2025-03-15',
    eligibility: 'Indian students based on merit and family income',
    type: 'Need & Merit',
    stream: 'General',
    country: 'India',
    budgetSuitable: ['LOW'],
    description: 'Central and state government scholarships for all streams',
  },
  {
    name: 'Central Sector Scheme',
    amount: '₹10,000 - ₹20,000/year',
    deadline: '2025-04-30',
    eligibility: 'Students from families with income below ₹4.5 lakh',
    type: 'Need-based',
    stream: 'General',
    country: 'India',
    budgetSuitable: ['LOW'],
    description: 'Government support for economically disadvantaged students',
  },
  {
    name: 'Post-Matric Scholarship for SC/ST',
    amount: '₹5,000 - ₹25,000/year',
    deadline: '2025-05-31',
    eligibility: 'SC/ST students pursuing higher education',
    type: 'Minority',
    stream: 'General',
    country: 'India',
    budgetSuitable: ['LOW'],
    description: 'Government scholarship for scheduled caste/tribe students',
  },
  {
    name: 'Pre-Matric Scholarship for Minorities',
    amount: '₹3,000 - ₹10,000/year',
    deadline: '2025-04-15',
    eligibility: 'Minority community students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)',
    type: 'Minority',
    stream: 'General',
    country: 'India',
    budgetSuitable: ['LOW'],
    description: 'Central government support for minority students',
  },
  {
    name: 'Girl Child Education Scholarship',
    amount: '₹5,000 - ₹15,000/year',
    deadline: '2025-05-15',
    eligibility: 'Female students from economically weaker sections',
    type: 'Women',
    stream: 'General',
    country: 'India',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Promoting education for girl children',
  },

  // ============================================
  // STUDY ABROAD SCHOLARSHIPS
  // ============================================
  {
    name: 'Gates Cambridge Scholarship',
    amount: 'Full tuition + stipend',
    deadline: '2024-10-14',
    eligibility: 'International students pursuing graduate studies at Cambridge',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'United Kingdom',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'],
    description: 'Prestigious full scholarship for Cambridge University',
  },
  {
    name: 'Fulbright-Nehru Fellowship',
    amount: 'Full funding + travel',
    deadline: '2025-02-28',
    eligibility: 'Indian students for graduate study or research in USA',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'United States',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'],
    description: 'Premier India-US educational exchange program',
  },
  {
    name: 'Chevening Scholarships',
    amount: 'Full tuition + expenses',
    deadline: '2024-11-07',
    eligibility: 'Outstanding students from 160+ countries for UK masters',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'United Kingdom',
    budgetSuitable: ['MEDIUM', 'HIGH', 'VERY_HIGH'],
    description: 'UK government scholarship for future leaders',
  },
  {
    name: 'Commonwealth Scholarship',
    amount: 'Full funding',
    deadline: '2024-12-15',
    eligibility: 'Commonwealth country citizens for UK graduate study',
    type: 'Need & Merit',
    stream: 'Study Abroad',
    country: 'United Kingdom',
    budgetSuitable: ['LOW', 'MEDIUM'],
    description: 'Supporting students from developing Commonwealth countries',
  },
  {
    name: 'DAAD Scholarships',
    amount: '€850 - €1,200/month',
    deadline: '2025-03-31',
    eligibility: 'International students for study in Germany',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'Germany',
    budgetSuitable: ['MEDIUM', 'HIGH'],
    description: 'German academic exchange service scholarships',
  },
  {
    name: 'Erasmus Mundus Joint Masters',
    amount: 'Full tuition + €1,400/month',
    deadline: '2025-01-15',
    eligibility: 'Students pursuing Erasmus joint masters programs in Europe',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'European Union',
    budgetSuitable: ['MEDIUM', 'HIGH', 'VERY_HIGH'],
    description: 'European Union scholarship for international joint degrees',
  },
  {
    name: 'Australia Awards Scholarship',
    amount: 'Full tuition + living allowance',
    deadline: '2025-04-30',
    eligibility: 'Students from developing countries for study in Australia',
    type: 'Need & Merit',
    stream: 'Study Abroad',
    country: 'Australia',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH'],
    description: 'Australian government development scholarships',
  },
  {
    name: 'KAIST International Student Scholarship',
    amount: 'Full tuition + stipend',
    deadline: '2025-02-15',
    eligibility: 'International students admitted to KAIST',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'South Korea',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'],
    description: 'Full scholarship for international students at KAIST',
  },
  {
    name: 'Inlaks Shivdasani Foundation Scholarship',
    amount: 'Up to $100,000',
    deadline: '2025-01-31',
    eligibility: 'Indian students for graduate study at top US/UK universities',
    type: 'Merit-based',
    stream: 'Study Abroad',
    country: 'United States',
    budgetSuitable: ['MEDIUM', 'HIGH', 'VERY_HIGH'],
    description: 'Indian foundation supporting exceptional students abroad',
  },
  {
    name: 'JN Tata Endowment',
    amount: 'Loan scholarship up to ₹10 lakh',
    deadline: '2025-03-31',
    eligibility: 'Indian students for postgraduate studies abroad',
    type: 'Need & Merit',
    stream: 'Study Abroad',
    country: 'Global',
    budgetSuitable: ['LOW', 'MEDIUM', 'HIGH'],
    description: 'Interest-free loan scholarship for Indian students studying abroad',
  },
];

/**
 * Filter scholarships by stream
 */
export const getScholarshipsByStream = (stream: ScholarshipStream): Scholarship[] => {
  return scholarships.filter((s) => s.stream === stream || s.stream === 'General');
};

/**
 * Filter scholarships by budget suitability
 */
export const getScholarshipsByBudget = (budget: string): Scholarship[] => {
  return scholarships.filter((s) => s.budgetSuitable.includes(budget));
};

/**
 * Filter scholarships by country
 */
export const getScholarshipsByCountry = (country: string): Scholarship[] => {
  return scholarships.filter((s) => s.country === country || s.country === 'Global');
};

/**
 * Filter scholarships by need
 */
export const getScholarshipsByNeed = (needBased: boolean): Scholarship[] => {
  if (needBased) {
    return scholarships.filter((s) => s.type === 'Need-based' || s.type === 'Need & Merit');
  }
  return scholarships;
};

/**
 * Get personalized scholarships based on multiple criteria
 */
export const getPersonalizedScholarships = (
  stream: ScholarshipStream,
  budget: string,
  needScholarships: boolean,
  studyAbroad: boolean
): Scholarship[] => {
  let filtered = scholarships;

  // Filter by stream
  if (studyAbroad) {
    filtered = filtered.filter((s) => s.stream === 'Study Abroad' || s.stream === 'General');
  } else {
    filtered = filtered.filter((s) => s.stream === stream || s.stream === 'General');
  }

  // Filter by budget suitability
  filtered = filtered.filter((s) => s.budgetSuitable.includes(budget));

  // Prioritize need-based if needed
  if (needScholarships) {
    const needBased = filtered.filter((s) => s.type === 'Need-based' || s.type === 'Need & Merit');
    const meritBased = filtered.filter((s) => s.type === 'Merit-based');
    filtered = [...needBased, ...meritBased];
  }

  return filtered;
};
