import type { ProfileData } from '../types';

export interface StreamInfo {
  name: string;
  exams: string[];
  roadmap: string[];
  isAbroad: boolean;
}

/**
 * Safely get a value from profile with fallback to old key
 */
const getProfileValue = (profile: ProfileData | null, newKey: string, oldKey?: string, defaultValue: any = null): any => {
  if (!profile) return defaultValue;
  
  // Try new key first, then old key, then default
  if (profile[newKey] !== undefined && profile[newKey] !== null) {
    return profile[newKey];
  }
  
  if (oldKey && profile[oldKey] !== undefined && profile[oldKey] !== null) {
    return profile[oldKey];
  }
  
  return defaultValue;
};

/**
 * Determine the academic stream based on profile data
 */
export const getStreamFromProfile = (profile: ProfileData | null): StreamInfo => {
  if (!profile) {
    return {
      name: 'General',
      exams: [],
      roadmap: [],
      isAbroad: false,
    };
  }

  // Use new profile structure with fallback to old keys
  // Support: stream or field
  const stream = getProfileValue(profile, 'stream', 'field', 'Other');
  // Support: studyAbroad
  const isAbroad = getProfileValue(profile, 'studyAbroad', undefined, false) === true;
  const dreamUni = (getProfileValue(profile, 'dreamUniversity', undefined, '') || '').toLowerCase();

  // Map stream to exams
  let exams: string[] = [];
  let roadmap: string[] = [];
  let streamName = stream;

  switch (stream) {
    case 'Engineering':
      exams = isAbroad
        ? ['SAT', 'ACT', 'IELTS/TOEFL', 'AP Exams']
        : ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CET'];
      roadmap = ['JEE Preparation', 'Engineering Entrance Exams', 'IIT/NIT Applications'];
      break;

    case 'Medical':
      exams = isAbroad
        ? ['MCAT', 'IELTS/TOEFL', 'USMLE']
        : ['NEET', 'AIIMS', 'State Medical Entrance'];
      roadmap = ['NEET Preparation', 'Medical College Applications', 'MBBS Admission'];
      break;

    case 'Commerce':
      exams = isAbroad
        ? ['SAT', 'GMAT', 'IELTS/TOEFL']
        : ['CUET', 'CA Foundation', 'BBA Entrance', 'IPMAT'];
      roadmap = ['Commerce Preparation', 'CA Foundation', 'BBA/BCom Applications'];
      break;

    case 'Law':
      exams = isAbroad
        ? ['LSAT', 'IELTS/TOEFL']
        : ['CLAT', 'AILET', 'SLAT'];
      roadmap = ['CLAT Preparation', 'Law School Applications', 'NLU Admission'];
      break;

    case 'Design':
      exams = isAbroad
        ? ['Portfolio', 'IELTS/TOEFL']
        : ['NID', 'NIFT', 'UCEED', 'CEED'];
      roadmap = ['Design Portfolio', 'NID/NIFT Preparation', 'Design School Applications'];
      break;

    case 'Arts':
      exams = isAbroad
        ? ['SAT', 'IELTS/TOEFL', 'Writing Samples']
        : ['CUET', 'DU Entrance', 'Writing Portfolio'];
      roadmap = ['Arts Foundation', 'University Applications', 'Portfolio Development'];
      break;

    default:
      streamName = 'General';
      exams = isAbroad
        ? ['SAT', 'ACT', 'IELTS/TOEFL']
        : ['CUET', 'State Board Exams'];
      roadmap = ['Complete High School', 'University Applications', 'Career Exploration'];
  }

  return {
    name: streamName,
    exams,
    roadmap,
    isAbroad,
  };
};

/**
 * Generate dynamic dates for deadlines
 */
export const generateDynamicDates = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11

  // If we're past October, use next year for most exams
  const examYear = currentMonth >= 10 ? currentYear + 1 : currentYear;
  const nextYear = examYear + 1;

  return {
    // Early deadlines (Oct-Nov)
    earlyAction: `${examYear}-11-01`,
    oxfordDeadline: `${examYear}-10-15`,
    gatesScholarship: `${examYear}-10-14`,

    // Winter deadlines (Dec-Jan)
    regularDecision: `${examYear + 1}-01-05`,
    commonAppEssay: `${examYear}-12-31`,

    // Spring deadlines (Jan-Apr)
    jeeMainSession1: `${examYear + 1}-01-31`,
    jeeMainSession2: `${examYear + 1}-04-30`,
    neetApplication: `${examYear + 1}-03-31`,
    cuetApplication: `${examYear + 1}-03-15`,
    clatApplication: `${examYear + 1}-04-30`,
    nidApplication: `${examYear + 1}-03-01`,

    // Test dates
    satDec: `${examYear}-12-07`,
    satMar: `${examYear + 1}-03-09`,
    actDec: `${examYear}-12-14`,
    jeeMainExam: `${examYear + 1}-04-15`,
    jeeAdvancedExam: `${examYear + 1}-05-25`,
    neetExam: `${examYear + 1}-05-05`,
    clatExam: `${examYear + 1}-05-18`,

    // Scholarships
    chevening: `${examYear}-11-07`,
    commonwealth: `${examYear}-12-15`,
    fulbright: `${examYear + 1}-02-28`,
  };
};

/**
 * Get personalized roadmap milestones
 */
export const getPersonalizedRoadmap = (profile: ProfileData | null) => {
  const stream = getStreamFromProfile(profile);
  const today = new Date();
  const currentYear = today.getFullYear();

  const defaultRoadmap = [
    {
      title: 'Complete High School',
      status: 'in-progress' as const,
      date: `${currentYear}-${currentYear + 1}`,
      tasks: ['Maintain good grades', 'Participate in extracurriculars', 'Build your portfolio'],
    },
    {
      title: 'Entrance Exams',
      status: 'upcoming' as const,
      date: `${currentYear + 1}`,
      tasks: ['Prepare for entrance exams', 'Take practice tests', 'Register for exams'],
    },
    {
      title: 'University Applications',
      status: 'upcoming' as const,
      date: `${currentYear + 1}`,
      tasks: ['Research universities', 'Prepare application materials', 'Submit applications'],
    },
  ];

  if (!profile || !getProfileValue(profile, 'stream', 'field')) {
    return defaultRoadmap;
  }

  if (stream.name === 'Engineering') {
    return [
      {
        title: 'JEE Preparation',
        status: 'in-progress' as const,
        date: `${currentYear}-${currentYear + 1}`,
        tasks: ['Complete Physics, Chemistry, Maths syllabus', 'Solve previous year papers', 'Take mock tests regularly'],
      },
      {
        title: 'JEE Main & Advanced',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Register for JEE Main', 'Appear for both sessions', 'Qualify for JEE Advanced'],
      },
      {
        title: 'College Applications & Counselling',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['JoSAA Counselling registration', 'Choose college preferences', 'Document verification'],
      },
    ];
  }

  if (stream.name === 'Medical') {
    return [
      {
        title: 'NEET Preparation',
        status: 'in-progress' as const,
        date: `${currentYear}-${currentYear + 1}`,
        tasks: ['Complete Biology, Chemistry, Physics syllabus', 'Practice NCERT thoroughly', 'Take mock tests'],
      },
      {
        title: 'NEET Exam',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Complete NEET application', 'Download admit card', 'Appear for NEET exam'],
      },
      {
        title: 'Medical College Admissions',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['NEET counselling registration', 'Choose medical colleges', 'Complete admission process'],
      },
    ];
  }

  if (stream.name === 'Commerce') {
    return [
      {
        title: 'Commerce Foundation',
        status: 'in-progress' as const,
        date: `${currentYear}-${currentYear + 1}`,
        tasks: ['Excel in Accountancy, Economics, Business Studies', 'Consider CA Foundation', 'Build analytical skills'],
      },
      {
        title: 'Entrance Exams',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Prepare for CUET', 'Consider CA Foundation exam', 'Apply to BBA/BCom programs'],
      },
      {
        title: 'University Applications',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Apply to top commerce colleges', 'Prepare for interviews', 'Complete admission formalities'],
      },
    ];
  }

  if (stream.name === 'Law') {
    return [
      {
        title: 'CLAT Preparation',
        status: 'in-progress' as const,
        date: `${currentYear}-${currentYear + 1}`,
        tasks: ['Study Legal Reasoning, English, GK', 'Practice mock tests', 'Read newspapers daily'],
      },
      {
        title: 'CLAT & Law Entrance Exams',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Register for CLAT', 'Appear for CLAT exam', 'Apply to other law schools'],
      },
      {
        title: 'Law School Admission',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['CLAT counselling', 'Choose NLU preferences', 'Complete admission process'],
      },
    ];
  }

  if (stream.name === 'Design') {
    return [
      {
        title: 'Portfolio Development',
        status: 'in-progress' as const,
        date: `${currentYear}-${currentYear + 1}`,
        tasks: ['Create diverse design projects', 'Build strong portfolio', 'Practice sketching daily'],
      },
      {
        title: 'Design Entrance Exams',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Register for NID/NIFT/UCEED', 'Prepare for design aptitude test', 'Submit portfolio'],
      },
      {
        title: 'Design School Admission',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Attend interviews/studio tests', 'Choose design specialization', 'Complete admission'],
      },
    ];
  }

  if (stream.name === 'Arts') {
    return [
      {
        title: 'Arts Foundation',
        status: 'in-progress' as const,
        date: `${currentYear}-${currentYear + 1}`,
        tasks: ['Excel in humanities subjects', 'Develop writing skills', 'Build reading habit'],
      },
      {
        title: 'Entrance Exams',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Prepare for CUET', 'Create writing portfolio', 'Apply to arts colleges'],
      },
      {
        title: 'University Applications',
        status: 'upcoming' as const,
        date: `${currentYear + 1}`,
        tasks: ['Apply to top arts colleges', 'Prepare for interviews', 'Complete admission'],
      },
    ];
  }

  // Default roadmap
  return defaultRoadmap;
};

/**
 * Get personalized deadlines
 */
export const getPersonalizedDeadlines = (profile: ProfileData | null) => {
  const stream = getStreamFromProfile(profile);
  const dates = generateDynamicDates();
  
  // Safe array for deadlines
  const deadlines: any[] = [];

  if (!profile) {
    return [
      {
        title: 'Complete Your Profile',
        date: dates.cuetApplication,
        category: 'Profile',
        priority: 'high',
        description: 'Complete your PathPilot profile for personalized deadlines',
      },
    ];
  }

  // Common deadlines based on stream
  if (stream.name === 'Engineering') {
    deadlines.push(
      {
        title: 'JEE Main Application (Session 1)',
        date: dates.jeeMainSession1,
        category: 'Entrance Exam',
        priority: 'high',
        description: 'Apply for JEE Main Session 1',
      },
      {
        title: 'JEE Main Exam',
        date: dates.jeeMainExam,
        category: 'Standardized Test',
        priority: 'high',
        description: 'JEE Main exam date',
      },
      {
        title: 'JEE Advanced Exam',
        date: dates.jeeAdvancedExam,
        category: 'Standardized Test',
        priority: 'high',
        description: 'JEE Advanced exam for IIT admission',
      }
    );
  }

  if (stream.name === 'Medical') {
    deadlines.push(
      {
        title: 'NEET Application',
        date: dates.neetApplication,
        category: 'Entrance Exam',
        priority: 'high',
        description: 'NEET UG application deadline',
      },
      {
        title: 'NEET Exam',
        date: dates.neetExam,
        category: 'Standardized Test',
        priority: 'high',
        description: 'NEET UG examination date',
      }
    );
  }

  if (stream.name === 'Commerce') {
    deadlines.push(
      {
        title: 'CUET Application',
        date: dates.cuetApplication,
        category: 'Entrance Exam',
        priority: 'high',
        description: 'CUET (UG) application deadline',
      },
      {
        title: 'CA Foundation Registration',
        date: dates.jeeMainSession1,
        category: 'Professional Course',
        priority: 'medium',
        description: 'CA Foundation course registration',
      }
    );
  }

  if (stream.name === 'Law') {
    deadlines.push(
      {
        title: 'CLAT Application',
        date: dates.clatApplication,
        category: 'Entrance Exam',
        priority: 'high',
        description: 'CLAT (Common Law Admission Test) application',
      },
      {
        title: 'CLAT Exam',
        date: dates.clatExam,
        category: 'Standardized Test',
        priority: 'high',
        description: 'CLAT examination date',
      }
    );
  }

  if (stream.name === 'Design') {
    deadlines.push(
      {
        title: 'NID Application',
        date: dates.nidApplication,
        category: 'Entrance Exam',
        priority: 'high',
        description: 'National Institute of Design application',
      },
      {
        title: 'NIFT Application',
        date: dates.nidApplication,
        category: 'Entrance Exam',
        priority: 'high',
        description: 'National Institute of Fashion Technology application',
      }
    );
  }

  // Abroad study deadlines
  if (stream.isAbroad) {
    deadlines.push(
      {
        title: 'SAT Test Date',
        date: dates.satDec,
        category: 'Standardized Test',
        priority: 'medium',
        description: 'SAT examination for US universities',
      },
      {
        title: 'Common App Essay Due',
        date: dates.commonAppEssay,
        category: 'Application Material',
        priority: 'medium',
        description: 'Common Application essay submission',
      },
      {
        title: 'Regular Decision Deadline',
        date: dates.regularDecision,
        category: 'University Application',
        priority: 'high',
        description: 'Regular decision deadline for US universities',
      }
    );
  }

  // Return safe array
  const safeDeadlines = Array.isArray(deadlines) ? deadlines : [];
  
  return safeDeadlines.length > 0 ? safeDeadlines : [
    {
      title: 'Update Your Profile',
      date: dates.cuetApplication,
      category: 'Profile',
      priority: 'medium',
      description: 'Update your profile to see personalized deadlines',
    },
  ];
};

/**
 * Get personalized scholarships
 */
export const getPersonalizedScholarships = (profile: ProfileData | null) => {
  const stream = getStreamFromProfile(profile);
  
  // Support both old and new keys for needScholarships
  const needScholarships = getProfileValue(profile, 'needScholarships', undefined, false);
  const budget = (getProfileValue(profile, 'budget', undefined, '') || '').toLowerCase();
  const dates = generateDynamicDates();

  // Safe array for scholarships
  const scholarships: any[] = [];

  // Default scholarships if no profile
  if (!profile) {
    return [
      {
        name: 'National Scholarship Portal',
        amount: '₹10,000 - ₹50,000/year',
        deadline: dates.cuetApplication,
        eligibility: 'Indian students based on merit and need',
        type: 'Need & Merit',
        color: 'blue',
      },
    ];
  }

  // High priority if scholarships needed or low budget
  if (needScholarships || budget.includes('low') || budget.includes('under')) {
    // India-specific scholarships
    scholarships.push(
      {
        name: 'National Scholarship Portal',
        amount: '₹10,000 - ₹50,000/year',
        deadline: dates.cuetApplication,
        eligibility: 'Indian students based on merit and need',
        type: 'Need & Merit',
        color: 'blue',
      },
      {
        name: 'Central Sector Scheme',
        amount: '₹10,000 - ₹20,000/year',
        deadline: dates.neetApplication,
        eligibility: 'Students from low-income families',
        type: 'Need-based',
        color: 'green',
      }
    );
  }

  // Stream-specific scholarships
  if (stream.name === 'Engineering') {
    scholarships.push({
      name: 'INSPIRE Scholarship',
      amount: '₹80,000/year',
      deadline: dates.jeeMainSession1,
      eligibility: 'Top 1% students in board exams',
      type: 'Merit-based',
      color: 'purple',
    });
  }

  if (stream.name === 'Medical') {
    scholarships.push({
      name: 'AIIMS Merit Scholarship',
      amount: 'Full tuition waiver',
      deadline: dates.neetApplication,
      eligibility: 'Top NEET rank holders',
      type: 'Merit-based',
      color: 'red',
    });
  }

  // Abroad scholarships
  if (stream.isAbroad) {
    scholarships.push(
      {
        name: 'Gates Cambridge Scholarship',
        amount: 'Full tuition + stipend',
        deadline: dates.oxfordDeadline,
        eligibility: 'International students to Cambridge',
        type: 'Merit-based',
        color: 'blue',
      },
      {
        name: 'Fulbright Foreign Student Program',
        amount: 'Up to $50,000',
        deadline: dates.fulbright,
        eligibility: 'International students to USA',
        type: 'Merit-based',
        color: 'purple',
      },
      {
        name: 'Chevening Scholarships',
        amount: 'Full tuition + expenses',
        deadline: dates.chevening,
        eligibility: 'International students to UK',
        type: 'Merit-based',
        color: 'yellow',
      }
    );
  }

  // Return safe array
  const safeScholarships = Array.isArray(scholarships) ? scholarships : [];
  
  return safeScholarships.length > 0 ? safeScholarships : [
    {
      name: 'Complete Your Profile',
      amount: 'Various amounts',
      deadline: dates.cuetApplication,
      eligibility: 'Complete your profile to see personalized scholarships',
      type: 'Profile Required',
      color: 'blue',
    },
  ];
};
