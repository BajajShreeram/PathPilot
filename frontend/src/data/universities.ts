/**
 * Comprehensive University Database
 * 150+ universities across multiple streams and regions
 */

export type Stream = 'Engineering' | 'Medical' | 'Commerce' | 'Law' | 'Design' | 'Arts' | 'Other';
export type Category = 'Dream' | 'Very Good' | 'Good' | 'Reasonable';

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  stream: Stream;
  category: Category;
  requiredExams: string[];
  tuitionRange: string;
  scholarshipAvailability: boolean;
  oneLineDescription: string;
  publicOrPrivate: 'Public' | 'Private';
  studyAbroad: boolean;
  officialWebsite: string;
  detailedOverview: string;
  relevantPrograms: string[];
  requiredSubjects: string[];
  eligibility: string;
  livingCostEstimate: string;
  campusLocationInfo: string;
  careerOutcomes: string[];
  suggestedNextSteps: string[];
}

type UniversitySeed = Omit<University, 'id' | 'publicOrPrivate' | 'studyAbroad' | 'officialWebsite' | 'detailedOverview' | 'relevantPrograms' | 'requiredSubjects' | 'eligibility' | 'livingCostEstimate' | 'campusLocationInfo' | 'careerOutcomes' | 'suggestedNextSteps'> &
  Partial<Pick<University, 'publicOrPrivate' | 'officialWebsite'>>;

const baseUniversities: UniversitySeed[] = [
  // ============================================
  // ENGINEERING (20 universities)
  // ============================================
  {
    name: 'Indian Institute of Technology Bombay',
    country: 'India',
    city: 'Mumbai',
    stream: 'Engineering',
    category: 'Dream',
    requiredExams: ['JEE Advanced', 'JEE Main'],
    tuitionRange: '₹2,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier engineering institute with world-class research and faculty',
  },
  {
    name: 'Indian Institute of Technology Delhi',
    country: 'India',
    city: 'New Delhi',
    stream: 'Engineering',
    category: 'Dream',
    requiredExams: ['JEE Advanced', 'JEE Main'],
    tuitionRange: '₹2,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top-ranked IIT with excellent placement records and innovation focus',
  },
  {
    name: 'Massachusetts Institute of Technology',
    country: 'USA',
    city: 'Cambridge',
    stream: 'Engineering',
    category: 'Dream',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS'],
    tuitionRange: '$53,790/year',
    scholarshipAvailability: true,
    oneLineDescription: 'World-leading institution in science, engineering and technology innovation',
  },
  {
    name: 'Stanford University',
    country: 'USA',
    city: 'Stanford',
    stream: 'Engineering',
    category: 'Dream',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS'],
    tuitionRange: '$56,169/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier university in Silicon Valley known for entrepreneurship and innovation',
  },
  {
    name: 'Indian Institute of Technology Madras',
    country: 'India',
    city: 'Chennai',
    stream: 'Engineering',
    category: 'Very Good',
    requiredExams: ['JEE Advanced', 'JEE Main'],
    tuitionRange: '₹2,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading technical institute with strong industry connections in South India',
  },
  {
    name: 'BITS Pilani',
    country: 'India',
    city: 'Pilani',
    stream: 'Engineering',
    category: 'Very Good',
    requiredExams: ['BITSAT'],
    tuitionRange: '₹4,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Prestigious private engineering college with flexible curriculum and dual degrees',
  },
  {
    name: 'NIT Trichy',
    country: 'India',
    city: 'Tiruchirappalli',
    stream: 'Engineering',
    category: 'Very Good',
    requiredExams: ['JEE Main'],
    tuitionRange: '₹1,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top NIT with excellent engineering programs and affordable education',
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    stream: 'Engineering',
    category: 'Very Good',
    requiredExams: ['Abitur/IB', 'TestAS', 'German Test'],
    tuitionRange: '€258/semester',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier German technical university with affordable tuition and strong programs',
  },
  {
    name: 'National University of Singapore',
    country: 'Singapore',
    city: 'Singapore',
    stream: 'Engineering',
    category: 'Very Good',
    requiredExams: ['SAT/A-Levels', 'TOEFL/IELTS'],
    tuitionRange: 'SGD $37,650/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Asia\'s leading university with global reputation and modern facilities',
  },
  {
    name: 'Delhi Technological University',
    country: 'India',
    city: 'New Delhi',
    stream: 'Engineering',
    category: 'Good',
    requiredExams: ['JEE Main'],
    tuitionRange: '₹1,75,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier state university in Delhi with strong placement opportunities',
  },
  {
    name: 'Vellore Institute of Technology',
    country: 'India',
    city: 'Vellore',
    stream: 'Engineering',
    category: 'Good',
    requiredExams: ['VITEEE'],
    tuitionRange: '₹1,98,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Large private university with diverse engineering programs and international exposure',
  },
  {
    name: 'Manipal Institute of Technology',
    country: 'India',
    city: 'Manipal',
    stream: 'Engineering',
    category: 'Good',
    requiredExams: ['MET'],
    tuitionRange: '₹3,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Well-established private institute with comprehensive engineering education',
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    stream: 'Engineering',
    category: 'Good',
    requiredExams: ['High School Diploma', 'TOEFL/IELTS'],
    tuitionRange: 'CAD $58,160/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Canada\'s top university with diverse programs and multicultural environment',
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    stream: 'Engineering',
    category: 'Good',
    requiredExams: ['High School Certificate', 'IELTS'],
    tuitionRange: 'AUD $45,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top Australian university with excellent research and student support',
  },
  {
    name: 'SRM Institute of Science and Technology',
    country: 'India',
    city: 'Chennai',
    stream: 'Engineering',
    category: 'Reasonable',
    requiredExams: ['SRMJEEE'],
    tuitionRange: '₹2,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Popular private university with good infrastructure and placement support',
  },
  {
    name: 'Amity University',
    country: 'India',
    city: 'Noida',
    stream: 'Engineering',
    category: 'Reasonable',
    requiredExams: ['Amity JEE', 'JEE Main'],
    tuitionRange: '₹2,80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Large private university with modern facilities and industry partnerships',
  },
  {
    name: 'PSG College of Technology',
    country: 'India',
    city: 'Coimbatore',
    stream: 'Engineering',
    category: 'Reasonable',
    requiredExams: ['JEE Main', 'TNEA'],
    tuitionRange: '₹80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Autonomous engineering college with strong academic reputation in Tamil Nadu',
  },
  {
    name: 'University of Manchester',
    country: 'UK',
    city: 'Manchester',
    stream: 'Engineering',
    category: 'Reasonable',
    requiredExams: ['A-Levels/IB', 'IELTS'],
    tuitionRange: '£26,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic Russell Group university with strong engineering programs',
  },
  {
    name: 'RMIT University',
    country: 'Australia',
    city: 'Melbourne',
    stream: 'Engineering',
    category: 'Reasonable',
    requiredExams: ['High School Certificate', 'IELTS'],
    tuitionRange: 'AUD $40,320/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Technology-focused university with industry-connected engineering programs',
  },
  {
    name: 'Khalifa University',
    country: 'UAE',
    city: 'Abu Dhabi',
    stream: 'Engineering',
    category: 'Reasonable',
    requiredExams: ['SAT/EmSAT', 'TOEFL/IELTS'],
    tuitionRange: 'Free (Full Scholarship)',
    scholarshipAvailability: true,
    oneLineDescription: 'Top Middle Eastern engineering university offering full scholarships',
  },

  // ============================================
  // MEDICAL (15 universities)
  // ============================================
  {
    name: 'All India Institute of Medical Sciences Delhi',
    country: 'India',
    city: 'New Delhi',
    stream: 'Medical',
    category: 'Dream',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹5,856/year',
    scholarshipAvailability: true,
    oneLineDescription: 'India\'s premier medical institute with exceptional faculty and research facilities',
  },
  {
    name: 'Christian Medical College Vellore',
    country: 'India',
    city: 'Vellore',
    stream: 'Medical',
    category: 'Dream',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Prestigious medical college with excellent clinical training and patient care',
  },
  {
    name: 'Johns Hopkins University',
    country: 'USA',
    city: 'Baltimore',
    stream: 'Medical',
    category: 'Dream',
    requiredExams: ['MCAT', 'Bachelor\'s Degree'],
    tuitionRange: '$58,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'World-renowned medical school with cutting-edge research and clinical excellence',
  },
  {
    name: 'Armed Forces Medical College',
    country: 'India',
    city: 'Pune',
    stream: 'Medical',
    category: 'Very Good',
    requiredExams: ['NEET UG', 'AFMC Entrance'],
    tuitionRange: 'Free (Bonded Service)',
    scholarshipAvailability: false,
    oneLineDescription: 'Top medical college for armed forces with rigorous training and discipline',
  },
  {
    name: 'Maulana Azad Medical College',
    country: 'India',
    city: 'New Delhi',
    stream: 'Medical',
    category: 'Very Good',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹6,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier government medical college in Delhi with excellent academic standards',
  },
  {
    name: 'King George\'s Medical University',
    country: 'India',
    city: 'Lucknow',
    stream: 'Medical',
    category: 'Very Good',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹10,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic medical university with comprehensive healthcare education programs',
  },
  {
    name: 'University of Oxford Medical School',
    country: 'UK',
    city: 'Oxford',
    stream: 'Medical',
    category: 'Very Good',
    requiredExams: ['A-Levels', 'BMAT', 'IELTS'],
    tuitionRange: '£37,510/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Prestigious medical school with world-class clinical training and research',
  },
  {
    name: 'Kasturba Medical College Manipal',
    country: 'India',
    city: 'Manipal',
    stream: 'Medical',
    category: 'Good',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹8,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Renowned private medical college with modern infrastructure and clinical exposure',
  },
  {
    name: 'St. John\'s Medical College',
    country: 'India',
    city: 'Bangalore',
    stream: 'Medical',
    category: 'Good',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹10,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Reputed private medical institution with focus on holistic medical education',
  },
  {
    name: 'JSS Medical College',
    country: 'India',
    city: 'Mysore',
    stream: 'Medical',
    category: 'Good',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹5,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established medical college with strong clinical training and research programs',
  },
  {
    name: 'University of Sydney Medical School',
    country: 'Australia',
    city: 'Sydney',
    stream: 'Medical',
    category: 'Good',
    requiredExams: ['ATAR', 'UCAT', 'IELTS'],
    tuitionRange: 'AUD $75,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading Australian medical school with excellent clinical facilities',
  },
  {
    name: 'Saveetha Medical College',
    country: 'India',
    city: 'Chennai',
    stream: 'Medical',
    category: 'Reasonable',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹17,00,000/year',
    scholarshipAvailability: false,
    oneLineDescription: 'Private medical college with good infrastructure and patient care facilities',
  },
  {
    name: 'Dr. DY Patil Medical College',
    country: 'India',
    city: 'Pune',
    stream: 'Medical',
    category: 'Reasonable',
    requiredExams: ['NEET UG'],
    tuitionRange: '₹18,50,000/year',
    scholarshipAvailability: false,
    oneLineDescription: 'Well-known private medical college with comprehensive medical education programs',
  },
  {
    name: 'Jagiellonian University Medical College',
    country: 'Poland',
    city: 'Krakow',
    stream: 'Medical',
    category: 'Reasonable',
    requiredExams: ['High School Diploma', 'Entrance Exam'],
    tuitionRange: '€11,500/year',
    scholarshipAvailability: true,
    oneLineDescription: 'European medical school with English programs and affordable fees',
  },
  {
    name: 'Charles University',
    country: 'Czech Republic',
    city: 'Prague',
    stream: 'Medical',
    category: 'Reasonable',
    requiredExams: ['High School Diploma', 'Entrance Test'],
    tuitionRange: '€15,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic European medical university with recognized MD programs',
  },

  // ============================================
  // COMMERCE (15 universities)
  // ============================================
  {
    name: 'Shri Ram College of Commerce',
    country: 'India',
    city: 'New Delhi',
    stream: 'Commerce',
    category: 'Dream',
    requiredExams: ['CUET'],
    tuitionRange: '₹25,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'India\'s most prestigious commerce college with exceptional placement records',
  },
  {
    name: 'St. Xavier\'s College Mumbai',
    country: 'India',
    city: 'Mumbai',
    stream: 'Commerce',
    category: 'Dream',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹15,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier autonomous college known for academic excellence in commerce education',
  },
  {
    name: 'London School of Economics',
    country: 'UK',
    city: 'London',
    stream: 'Commerce',
    category: 'Dream',
    requiredExams: ['A-Levels/IB', 'IELTS'],
    tuitionRange: '£22,430/year',
    scholarshipAvailability: true,
    oneLineDescription: 'World-leading social science university with top economics and business programs',
  },
  {
    name: 'Lady Shri Ram College',
    country: 'India',
    city: 'New Delhi',
    stream: 'Commerce',
    category: 'Very Good',
    requiredExams: ['CUET'],
    tuitionRange: '₹20,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top women\'s college with strong commerce department and industry connections',
  },
  {
    name: 'Hindu College Delhi University',
    country: 'India',
    city: 'New Delhi',
    stream: 'Commerce',
    category: 'Very Good',
    requiredExams: ['CUET'],
    tuitionRange: '₹18,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic DU college with excellent commerce faculty and placement support',
  },
  {
    name: 'Loyola College Chennai',
    country: 'India',
    city: 'Chennai',
    stream: 'Commerce',
    category: 'Very Good',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹40,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Prestigious autonomous college with strong commerce and business programs',
  },
  {
    name: 'University of Toronto Rotman',
    country: 'Canada',
    city: 'Toronto',
    stream: 'Commerce',
    category: 'Very Good',
    requiredExams: ['High School Diploma', 'TOEFL/IELTS'],
    tuitionRange: 'CAD $58,680/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top Canadian business school with global reputation and strong alumni network',
  },
  {
    name: 'Christ University',
    country: 'India',
    city: 'Bangalore',
    stream: 'Commerce',
    category: 'Good',
    requiredExams: ['CUET', 'Christ Entrance Test'],
    tuitionRange: '₹1,85,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading private university with comprehensive commerce education and placements',
  },
  {
    name: 'Narsee Monjee College of Commerce',
    country: 'India',
    city: 'Mumbai',
    stream: 'Commerce',
    category: 'Good',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹30,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Well-established commerce college with strong academic reputation in Mumbai',
  },
  {
    name: 'Symbiosis College of Arts and Commerce',
    country: 'India',
    city: 'Pune',
    stream: 'Commerce',
    category: 'Good',
    requiredExams: ['SET'],
    tuitionRange: '₹80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Reputed private college with industry-oriented commerce curriculum',
  },
  {
    name: 'University of Sydney Business School',
    country: 'Australia',
    city: 'Sydney',
    stream: 'Commerce',
    category: 'Good',
    requiredExams: ['ATAR', 'IELTS'],
    tuitionRange: 'AUD $50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading business school in Australia with strong industry connections',
  },
  {
    name: 'Presidency College Chennai',
    country: 'India',
    city: 'Chennai',
    stream: 'Commerce',
    category: 'Reasonable',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹8,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic government college offering quality commerce education at affordable fees',
  },
  {
    name: 'Madras Christian College',
    country: 'India',
    city: 'Chennai',
    stream: 'Commerce',
    category: 'Reasonable',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹25,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Autonomous college with good commerce department and placement opportunities',
  },
  {
    name: 'Jai Hind College',
    country: 'India',
    city: 'Mumbai',
    stream: 'Commerce',
    category: 'Reasonable',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹12,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established Mumbai college with quality commerce education and cultural activities',
  },
  {
    name: 'Hansraj College',
    country: 'India',
    city: 'New Delhi',
    stream: 'Commerce',
    category: 'Reasonable',
    requiredExams: ['CUET'],
    tuitionRange: '₹15,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Delhi University college with growing commerce department and good faculty',
  },

  // ============================================
  // LAW (10 universities)
  // ============================================
  {
    name: 'National Law School of India University',
    country: 'India',
    city: 'Bangalore',
    stream: 'Law',
    category: 'Dream',
    requiredExams: ['CLAT'],
    tuitionRange: '₹2,20,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'India\'s premier law school with exceptional academic standards and alumni network',
  },
  {
    name: 'National Law University Delhi',
    country: 'India',
    city: 'New Delhi',
    stream: 'Law',
    category: 'Dream',
    requiredExams: ['AILET'],
    tuitionRange: '₹1,97,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top law university in capital with focus on constitutional and corporate law',
  },
  {
    name: 'NALSAR University of Law',
    country: 'India',
    city: 'Hyderabad',
    stream: 'Law',
    category: 'Very Good',
    requiredExams: ['CLAT'],
    tuitionRange: '₹1,80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading NLU with strong emphasis on research and moot court competitions',
  },
  {
    name: 'National Law University Jodhpur',
    country: 'India',
    city: 'Jodhpur',
    stream: 'Law',
    category: 'Very Good',
    requiredExams: ['CLAT'],
    tuitionRange: '₹1,55,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established NLU with excellent faculty and rigorous legal education programs',
  },
  {
    name: 'Gujarat National Law University',
    country: 'India',
    city: 'Gandhinagar',
    stream: 'Law',
    category: 'Very Good',
    requiredExams: ['CLAT'],
    tuitionRange: '₹1,70,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Prominent NLU with strong corporate law and IPR programs',
  },
  {
    name: 'Symbiosis Law School',
    country: 'India',
    city: 'Pune',
    stream: 'Law',
    category: 'Good',
    requiredExams: ['SLAT'],
    tuitionRange: '₹2,75,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Reputed private law school with industry exposure and moot court excellence',
  },
  {
    name: 'Jindal Global Law School',
    country: 'India',
    city: 'Sonipat',
    stream: 'Law',
    category: 'Good',
    requiredExams: ['LSAT India'],
    tuitionRange: '₹3,80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Modern law school with global curriculum and international faculty',
  },
  {
    name: 'Army Law College',
    country: 'India',
    city: 'Pune',
    stream: 'Law',
    category: 'Good',
    requiredExams: ['MH CET Law'],
    tuitionRange: '₹45,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established law college with good infrastructure and placement support',
  },
  {
    name: 'Government Law College Mumbai',
    country: 'India',
    city: 'Mumbai',
    stream: 'Law',
    category: 'Reasonable',
    requiredExams: ['MH CET Law'],
    tuitionRange: '₹8,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Oldest law college in Mumbai with affordable quality legal education',
  },
  {
    name: 'Faculty of Law Delhi University',
    country: 'India',
    city: 'New Delhi',
    stream: 'Law',
    category: 'Reasonable',
    requiredExams: ['CUET', 'DU LLB Entrance'],
    tuitionRange: '₹12,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Affordable government law college with experienced faculty and good reputation',
  },

  // ============================================
  // DESIGN (10 universities)
  // ============================================
  {
    name: 'National Institute of Design',
    country: 'India',
    city: 'Ahmedabad',
    stream: 'Design',
    category: 'Dream',
    requiredExams: ['NID DAT'],
    tuitionRange: '₹3,30,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'India\'s premier design institute with world-class faculty and industry recognition',
  },
  {
    name: 'National Institute of Fashion Technology Delhi',
    country: 'India',
    city: 'New Delhi',
    stream: 'Design',
    category: 'Dream',
    requiredExams: ['NIFT Entrance Exam'],
    tuitionRange: '₹2,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top fashion and design institute with excellent placement in fashion industry',
  },
  {
    name: 'Industrial Design Centre IIT Bombay',
    country: 'India',
    city: 'Mumbai',
    stream: 'Design',
    category: 'Very Good',
    requiredExams: ['CEED', 'UCEED'],
    tuitionRange: '₹2,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier design program at IIT with focus on industrial and interaction design',
  },
  {
    name: 'Srishti Institute of Art Design and Technology',
    country: 'India',
    city: 'Bangalore',
    stream: 'Design',
    category: 'Very Good',
    requiredExams: ['Portfolio Review', 'Interview'],
    tuitionRange: '₹3,80,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Innovative design school with interdisciplinary approach and creative freedom',
  },
  {
    name: 'MIT Institute of Design',
    country: 'India',
    city: 'Pune',
    stream: 'Design',
    category: 'Very Good',
    requiredExams: ['MITID Entrance Exam'],
    tuitionRange: '₹4,20,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading private design institute with comprehensive design education programs',
  },
  {
    name: 'Symbiosis Institute of Design',
    country: 'India',
    city: 'Pune',
    stream: 'Design',
    category: 'Good',
    requiredExams: ['SET', 'Portfolio'],
    tuitionRange: '₹3,25,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established design institute with modern facilities and industry collaborations',
  },
  {
    name: 'Pearl Academy',
    country: 'India',
    city: 'New Delhi',
    stream: 'Design',
    category: 'Good',
    requiredExams: ['PAT'],
    tuitionRange: '₹4,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier design and fashion institute with strong industry connections',
  },
  {
    name: 'Arch Academy of Design',
    country: 'India',
    city: 'Jaipur',
    stream: 'Design',
    category: 'Good',
    requiredExams: ['Portfolio Review'],
    tuitionRange: '₹2,75,000/year',
    scholarshipAvailability: false,
    oneLineDescription: 'Design school with focus on practical skills and creative development',
  },
  {
    name: 'Vogue Institute of Art and Design',
    country: 'India',
    city: 'Bangalore',
    stream: 'Design',
    category: 'Reasonable',
    requiredExams: ['Merit-based', 'Interview'],
    tuitionRange: '₹2,50,000/year',
    scholarshipAvailability: false,
    oneLineDescription: 'Fashion and design institute with affordable programs and industry exposure',
  },
  {
    name: 'JD Institute of Fashion Technology',
    country: 'India',
    city: 'Mumbai',
    stream: 'Design',
    category: 'Reasonable',
    requiredExams: ['JD Entrance Test'],
    tuitionRange: '₹3,00,000/year',
    scholarshipAvailability: false,
    oneLineDescription: 'Design institute with multiple campuses offering diverse design programs',
  },

  // ============================================
  // ARTS (15 universities)
  // ============================================
  {
    name: 'St. Stephen\'s College',
    country: 'India',
    city: 'New Delhi',
    stream: 'Arts',
    category: 'Dream',
    requiredExams: ['CUET', 'Interview'],
    tuitionRange: '₹30,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'India\'s most prestigious liberal arts college with exceptional academic standards',
  },
  {
    name: 'Lady Shri Ram College for Women',
    country: 'India',
    city: 'New Delhi',
    stream: 'Arts',
    category: 'Dream',
    requiredExams: ['CUET'],
    tuitionRange: '₹20,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier women\'s college known for excellence in humanities and social sciences',
  },
  {
    name: 'University of Oxford',
    country: 'UK',
    city: 'Oxford',
    stream: 'Arts',
    category: 'Dream',
    requiredExams: ['A-Levels/IB', 'IELTS', 'Admissions Test'],
    tuitionRange: '£28,950/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic university with collegiate system and world-class arts programs',
  },
  {
    name: 'St. Xavier\'s College Mumbai',
    country: 'India',
    city: 'Mumbai',
    stream: 'Arts',
    category: 'Very Good',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹15,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic autonomous college with strong arts and humanities programs',
  },
  {
    name: 'Fergusson College',
    country: 'India',
    city: 'Pune',
    stream: 'Arts',
    category: 'Very Good',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹10,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established college with excellent arts faculty and cultural activities',
  },
  {
    name: 'Presidency University',
    country: 'India',
    city: 'Kolkata',
    stream: 'Arts',
    category: 'Very Good',
    requiredExams: ['Entrance Test'],
    tuitionRange: '₹12,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic university with strong liberal arts tradition and distinguished alumni',
  },
  {
    name: 'University of Cambridge',
    country: 'UK',
    city: 'Cambridge',
    stream: 'Arts',
    category: 'Very Good',
    requiredExams: ['A-Levels/IB', 'IELTS', 'Admissions Test'],
    tuitionRange: '£24,507/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Prestigious university with tutorial system and outstanding humanities programs',
  },
  {
    name: 'Christ University',
    country: 'India',
    city: 'Bangalore',
    stream: 'Arts',
    category: 'Good',
    requiredExams: ['CUET', 'Christ Entrance Test'],
    tuitionRange: '₹1,40,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading private university with comprehensive arts and humanities programs',
  },
  {
    name: 'Jadavpur University',
    country: 'India',
    city: 'Kolkata',
    stream: 'Arts',
    category: 'Good',
    requiredExams: ['Entrance Test'],
    tuitionRange: '₹5,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Renowned state university with strong arts and humanities departments',
  },
  {
    name: 'Loyola College Chennai',
    country: 'India',
    city: 'Chennai',
    stream: 'Arts',
    category: 'Good',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹40,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Autonomous college with excellent arts programs and cultural environment',
  },
  {
    name: 'University of Amsterdam',
    country: 'Netherlands',
    city: 'Amsterdam',
    stream: 'Arts',
    category: 'Good',
    requiredExams: ['High School Diploma', 'IELTS/TOEFL'],
    tuitionRange: '€10,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading Dutch university with English-taught humanities programs',
  },
  {
    name: 'Mount Carmel College',
    country: 'India',
    city: 'Bangalore',
    stream: 'Arts',
    category: 'Reasonable',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹35,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Women\'s college with good arts education and holistic development focus',
  },
  {
    name: 'Sophia College for Women',
    country: 'India',
    city: 'Mumbai',
    stream: 'Arts',
    category: 'Reasonable',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹15,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Established women\'s college offering quality arts education in Mumbai',
  },
  {
    name: 'Ramjas College',
    country: 'India',
    city: 'New Delhi',
    stream: 'Arts',
    category: 'Reasonable',
    requiredExams: ['CUET'],
    tuitionRange: '₹12,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Delhi University college with diverse arts programs and active student life',
  },
  {
    name: 'Stella Maris College',
    country: 'India',
    city: 'Chennai',
    stream: 'Arts',
    category: 'Reasonable',
    requiredExams: ['Merit-based'],
    tuitionRange: '₹25,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Women\'s college with strong humanities programs and holistic education',
  },

  // ============================================
  // OTHER (15 universities - Multidisciplinary/Liberal Arts/Science)
  // ============================================
  {
    name: 'Ashoka University',
    country: 'India',
    city: 'Sonipat',
    stream: 'Other',
    category: 'Dream',
    requiredExams: ['Application Review', 'SAT/ACT (Optional)'],
    tuitionRange: '₹9,75,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier liberal arts university with interdisciplinary curriculum and global faculty',
  },
  {
    name: 'Indian Institute of Science',
    country: 'India',
    city: 'Bangalore',
    stream: 'Other',
    category: 'Dream',
    requiredExams: ['KVPY', 'JEE Advanced', 'NEET'],
    tuitionRange: '₹2,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'India\'s premier research institute for pure and applied sciences',
  },
  {
    name: 'Yale-NUS College',
    country: 'Singapore',
    city: 'Singapore',
    stream: 'Other',
    category: 'Dream',
    requiredExams: ['SAT/ACT', 'TOEFL/IELTS'],
    tuitionRange: 'SGD $30,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Asia\'s premier liberal arts college with Yale partnership and global curriculum',
  },
  {
    name: 'FLAME University',
    country: 'India',
    city: 'Pune',
    stream: 'Other',
    category: 'Very Good',
    requiredExams: ['FLAME Entrance Test'],
    tuitionRange: '₹5,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Liberal education university with multidisciplinary approach and modern facilities',
  },
  {
    name: 'Azim Premji University',
    country: 'India',
    city: 'Bangalore',
    stream: 'Other',
    category: 'Very Good',
    requiredExams: ['Application Review', 'Interview'],
    tuitionRange: '₹2,50,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Not-for-profit university focusing on education and social development',
  },
  {
    name: 'Krea University',
    country: 'India',
    city: 'Chittoor',
    stream: 'Other',
    category: 'Very Good',
    requiredExams: ['Application Review', 'Interview'],
    tuitionRange: '₹8,00,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Liberal arts university with interdisciplinary education and industry partnerships',
  },
  {
    name: 'University of British Columbia',
    country: 'Canada',
    city: 'Vancouver',
    stream: 'Other',
    category: 'Very Good',
    requiredExams: ['High School Diploma', 'TOEFL/IELTS'],
    tuitionRange: 'CAD $42,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Top Canadian research university with beautiful campus and diverse programs',
  },
  {
    name: 'Banaras Hindu University',
    country: 'India',
    city: 'Varanasi',
    stream: 'Other',
    category: 'Good',
    requiredExams: ['BHU Entrance Test'],
    tuitionRange: '₹15,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Central university with wide range of programs and affordable education',
  },
  {
    name: 'Jamia Millia Islamia',
    country: 'India',
    city: 'New Delhi',
    stream: 'Other',
    category: 'Good',
    requiredExams: ['CUET', 'JMI Entrance Test'],
    tuitionRange: '₹20,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Central university with diverse courses and inclusive education approach',
  },
  {
    name: 'Aligarh Muslim University',
    country: 'India',
    city: 'Aligarh',
    stream: 'Other',
    category: 'Good',
    requiredExams: ['AMU Entrance Test'],
    tuitionRange: '₹12,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Historic central university offering wide variety of undergraduate programs',
  },
  {
    name: 'Tata Institute of Social Sciences',
    country: 'India',
    city: 'Mumbai',
    stream: 'Other',
    category: 'Good',
    requiredExams: ['TISSNET'],
    tuitionRange: '₹35,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Premier institute for social sciences and social work education',
  },
  {
    name: 'Jawaharlal Nehru University',
    country: 'India',
    city: 'New Delhi',
    stream: 'Other',
    category: 'Reasonable',
    requiredExams: ['CUET PG'],
    tuitionRange: '₹5,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Central university known for research excellence and liberal academic environment',
  },
  {
    name: 'University of Hyderabad',
    country: 'India',
    city: 'Hyderabad',
    stream: 'Other',
    category: 'Reasonable',
    requiredExams: ['CUET PG', 'Entrance Test'],
    tuitionRange: '₹8,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Central university with strong research programs and diverse student community',
  },
  {
    name: 'Pondicherry University',
    country: 'India',
    city: 'Puducherry',
    stream: 'Other',
    category: 'Reasonable',
    requiredExams: ['Entrance Test'],
    tuitionRange: '₹10,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Central university with coastal campus and multidisciplinary programs',
  },
  {
    name: 'University of Warsaw',
    country: 'Poland',
    city: 'Warsaw',
    stream: 'Other',
    category: 'Reasonable',
    requiredExams: ['High School Diploma', 'IELTS/TOEFL'],
    tuitionRange: '€3,000/year',
    scholarshipAvailability: true,
    oneLineDescription: 'Leading Polish university with English programs and affordable European education',
  },
];

type SupplementSeed = [string, string, string, Stream, Category, University['publicOrPrivate'], string];

const supplementalSeeds: SupplementSeed[] = [
  ['IIT Kanpur', 'India', 'Kanpur', 'Engineering', 'Dream', 'Public', 'https://www.iitk.ac.in'],
  ['IIT Kharagpur', 'India', 'Kharagpur', 'Engineering', 'Dream', 'Public', 'https://www.iitkgp.ac.in'],
  ['IIIT Hyderabad', 'India', 'Hyderabad', 'Engineering', 'Very Good', 'Private', 'https://www.iiit.ac.in'],
  ['University of Waterloo', 'Canada', 'Waterloo', 'Engineering', 'Very Good', 'Public', 'https://uwaterloo.ca'],
  ['University of Toronto', 'Canada', 'Toronto', 'Engineering', 'Dream', 'Public', 'https://www.utoronto.ca'],
  ['RWTH Aachen University', 'Germany', 'Aachen', 'Engineering', 'Very Good', 'Public', 'https://www.rwth-aachen.de'],
  ['KAIST', 'South Korea', 'Daejeon', 'Engineering', 'Dream', 'Public', 'https://www.kaist.ac.kr'],
  ['University of Technology Sydney', 'Australia', 'Sydney', 'Engineering', 'Good', 'Public', 'https://www.uts.edu.au'],
  ['AIIMS Jodhpur', 'India', 'Jodhpur', 'Medical', 'Very Good', 'Public', 'https://www.aiimsjodhpur.edu.in'],
  ['Kasturba Medical College Manipal', 'India', 'Manipal', 'Medical', 'Very Good', 'Private', 'https://www.manipal.edu/kmc-manipal.html'],
  ['University of Toronto Faculty of Medicine', 'Canada', 'Toronto', 'Medical', 'Dream', 'Public', 'https://temertymedicine.utoronto.ca'],
  ['University of Edinburgh Medical School', 'UK', 'Edinburgh', 'Medical', 'Dream', 'Public', 'https://www.ed.ac.uk/medicine-vet-medicine'],
  ['Charité Universitätsmedizin Berlin', 'Germany', 'Berlin', 'Medical', 'Dream', 'Public', 'https://www.charite.de'],
  ['Monash University Faculty of Medicine', 'Australia', 'Melbourne', 'Medical', 'Very Good', 'Public', 'https://www.monash.edu/medicine'],
  ['Duke-NUS Medical School', 'Singapore', 'Singapore', 'Medical', 'Very Good', 'Private', 'https://www.duke-nus.edu.sg'],
  ['Weill Cornell Medicine-Qatar', 'Qatar', 'Doha', 'Medical', 'Very Good', 'Private', 'https://qatar-weill.cornell.edu'],
  ['Shri Ram College of Commerce', 'India', 'New Delhi', 'Commerce', 'Dream', 'Public', 'https://www.srcc.edu'],
  ['Narsee Monjee College of Commerce', 'India', 'Mumbai', 'Commerce', 'Very Good', 'Private', 'https://nmcollege.in'],
  ['London School of Economics', 'UK', 'London', 'Commerce', 'Dream', 'Public', 'https://www.lse.ac.uk'],
  ['University of British Columbia Sauder School', 'Canada', 'Vancouver', 'Commerce', 'Very Good', 'Public', 'https://www.sauder.ubc.ca'],
  ['Bocconi University', 'Italy', 'Milan', 'Commerce', 'Dream', 'Private', 'https://www.unibocconi.eu'],
  ['Erasmus University Rotterdam', 'Netherlands', 'Rotterdam', 'Commerce', 'Very Good', 'Public', 'https://www.eur.nl'],
  ['Hong Kong University of Science and Technology', 'Hong Kong', 'Hong Kong', 'Commerce', 'Very Good', 'Public', 'https://hkust.edu.hk'],
  ['American University of Dubai', 'UAE', 'Dubai', 'Commerce', 'Good', 'Private', 'https://www.aud.edu'],
  ['NALSAR University of Law', 'India', 'Hyderabad', 'Law', 'Dream', 'Public', 'https://www.nalsar.ac.in'],
  ['WB National University of Juridical Sciences', 'India', 'Kolkata', 'Law', 'Dream', 'Public', 'https://www.nujs.edu'],
  ['University College London Faculty of Laws', 'UK', 'London', 'Law', 'Dream', 'Public', 'https://www.ucl.ac.uk/laws'],
  ['University of Toronto Faculty of Law', 'Canada', 'Toronto', 'Law', 'Dream', 'Public', 'https://www.law.utoronto.ca'],
  ['University of Amsterdam Law School', 'Netherlands', 'Amsterdam', 'Law', 'Very Good', 'Public', 'https://www.uva.nl/en/about-the-uva/organisation/faculties/amsterdam-law-school'],
  ['University of New South Wales Law', 'Australia', 'Sydney', 'Law', 'Very Good', 'Public', 'https://www.unsw.edu.au/law-justice'],
  ['National University of Singapore Faculty of Law', 'Singapore', 'Singapore', 'Law', 'Dream', 'Public', 'https://law.nus.edu.sg'],
  ['University of Hong Kong Faculty of Law', 'Hong Kong', 'Hong Kong', 'Law', 'Very Good', 'Public', 'https://www.law.hku.hk'],
  ['National Institute of Design Ahmedabad', 'India', 'Ahmedabad', 'Design', 'Dream', 'Public', 'https://www.nid.edu'],
  ['Srishti Manipal Institute', 'India', 'Bengaluru', 'Design', 'Very Good', 'Private', 'https://srishtimanipalinstitute.in'],
  ['Rhode Island School of Design', 'USA', 'Providence', 'Design', 'Dream', 'Private', 'https://www.risd.edu'],
  ['University of the Arts London', 'UK', 'London', 'Design', 'Dream', 'Public', 'https://www.arts.ac.uk'],
  ['OCAD University', 'Canada', 'Toronto', 'Design', 'Very Good', 'Public', 'https://www.ocadu.ca'],
  ['Design Academy Eindhoven', 'Netherlands', 'Eindhoven', 'Design', 'Very Good', 'Public', 'https://www.designacademy.nl'],
  ['RMIT University', 'Australia', 'Melbourne', 'Design', 'Very Good', 'Public', 'https://www.rmit.edu.au'],
  ['LASALLE College of the Arts', 'Singapore', 'Singapore', 'Design', 'Good', 'Public', 'https://www.lasalle.edu.sg'],
  ['Hindu College', 'India', 'New Delhi', 'Arts', 'Very Good', 'Public', 'https://www.hinducollege.ac.in'],
  ['St. Stephen’s College', 'India', 'New Delhi', 'Arts', 'Dream', 'Public', 'https://www.ststephens.edu'],
  ['University of Chicago', 'USA', 'Chicago', 'Arts', 'Dream', 'Private', 'https://www.uchicago.edu'],
  ['University of St Andrews', 'UK', 'St Andrews', 'Arts', 'Dream', 'Public', 'https://www.st-andrews.ac.uk'],
  ['McGill University', 'Canada', 'Montreal', 'Arts', 'Very Good', 'Public', 'https://www.mcgill.ca'],
  ['Freie Universität Berlin', 'Germany', 'Berlin', 'Arts', 'Very Good', 'Public', 'https://www.fu-berlin.de'],
  ['University of Melbourne', 'Australia', 'Melbourne', 'Arts', 'Dream', 'Public', 'https://www.unimelb.edu.au'],
  ['Waseda University', 'Japan', 'Tokyo', 'Arts', 'Very Good', 'Private', 'https://www.waseda.jp'],
  ['Ashoka University', 'India', 'Sonipat', 'Other', 'Very Good', 'Private', 'https://www.ashoka.edu.in'],
  ['University of Hyderabad', 'India', 'Hyderabad', 'Other', 'Very Good', 'Public', 'https://uohyd.ac.in'],
  ['New York University', 'USA', 'New York', 'Other', 'Dream', 'Private', 'https://www.nyu.edu'],
  ['University of Manchester', 'UK', 'Manchester', 'Other', 'Very Good', 'Public', 'https://www.manchester.ac.uk'],
  ['University of Alberta', 'Canada', 'Edmonton', 'Other', 'Good', 'Public', 'https://www.ualberta.ca'],
  ['Heidelberg University', 'Germany', 'Heidelberg', 'Other', 'Dream', 'Public', 'https://www.uni-heidelberg.de'],
  ['University of Auckland', 'New Zealand', 'Auckland', 'Other', 'Very Good', 'Public', 'https://www.auckland.ac.nz'],
  ['King Saud University', 'Saudi Arabia', 'Riyadh', 'Other', 'Good', 'Public', 'https://ksu.edu.sa'],
];

const examsFor = (country: string, stream: Stream): string[] => {
  if (country === 'India') {
    if (stream === 'Engineering') return ['JEE Main', 'JEE Advanced'];
    if (stream === 'Medical') return ['NEET'];
    if (stream === 'Law') return ['CLAT'];
    if (stream === 'Design') return ['NID DAT', 'UCEED'];
    return ['CUET'];
  }
  if (country === 'UK') return ['A-Levels/IB', 'IELTS/TOEFL'];
  if (country === 'Germany') return ['Abitur/IB', 'TestAS', 'German/IELTS'];
  if (country === 'Australia' || country === 'Canada') return ['High School Diploma', 'IELTS/TOEFL'];
  return ['SAT/ACT or equivalent', 'IELTS/TOEFL'];
};

const tuitionFor = (country: string): string => {
  const ranges: Record<string, string> = {
    India: '₹1–8 lakh/year', USA: '$35,000–70,000/year', UK: '£20,000–45,000/year',
    Canada: 'CAD 25,000–60,000/year', Germany: '€0–6,000/year', Australia: 'AUD 30,000–55,000/year',
    Singapore: 'SGD 20,000–50,000/year', Netherlands: '€10,000–25,000/year', Italy: '€4,000–22,000/year',
    UAE: 'AED 50,000–110,000/year', Qatar: 'QAR 70,000–180,000/year', 'Saudi Arabia': 'SAR 15,000–60,000/year',
  };
  return ranges[country] || '$10,000–45,000/year';
};

const supplementalUniversities: UniversitySeed[] = supplementalSeeds.map(
  ([name, country, city, stream, category, publicOrPrivate, officialWebsite]) => ({
    name,
    country,
    city,
    stream,
    category,
    requiredExams: examsFor(country, stream),
    tuitionRange: tuitionFor(country),
    scholarshipAvailability: true,
    oneLineDescription: `${category} ${stream.toLowerCase()} option in ${city} with strong academic and career opportunities.`,
    publicOrPrivate,
    officialWebsite,
  }),
);

const privateNamePattern = /BITS|Manipal|Stanford|Harvard|MIT|Carnegie|Ashoka|University of Chicago|New York University/i;

const programsByStream: Record<Stream, string[]> = {
  Engineering: ['Computer Science and Engineering', 'Mechanical Engineering', 'Electrical and Electronics Engineering', 'Civil or related engineering programmes'],
  Medical: ['Medicine and clinical sciences', 'Biomedical or life sciences', 'Public health and allied health programmes'],
  Commerce: ['Commerce and accounting', 'Economics and finance', 'Business and management'],
  Law: ['Undergraduate law', 'Corporate and commercial law', 'Public policy and legal studies'],
  Design: ['Communication and visual design', 'Product or industrial design', 'Interaction and experience design'],
  Arts: ['Humanities and social sciences', 'Languages and literature', 'History, politics, psychology, or related disciplines'],
  Other: ['Interdisciplinary undergraduate programmes', 'Sciences and social sciences', 'Programme options vary by faculty'],
};

const subjectsByStream: Record<Stream, string[]> = {
  Engineering: ['Mathematics', 'Physics', 'Chemistry or Computer Science where required'],
  Medical: ['Biology', 'Chemistry', 'Physics where required'],
  Commerce: ['Mathematics or Accountancy where required', 'Economics or Business Studies', 'English'],
  Law: ['English', 'Humanities or social-science subjects', 'No single subject combination applies to every programme'],
  Design: ['Art or Design where required', 'English', 'Portfolio preparation'],
  Arts: ['English', 'Relevant humanities or social-science subjects'],
  Other: ['Programme-specific secondary-school subjects'],
};

const outcomesByStream: Record<Stream, string[]> = {
  Engineering: ['Engineering and technology roles', 'Research or postgraduate study', 'Product, consulting, and technical entrepreneurship'],
  Medical: ['Clinical or allied-health pathways subject to licensing', 'Biomedical research', 'Public-health and postgraduate study'],
  Commerce: ['Finance, accounting, consulting, and analytics', 'Business and entrepreneurship', 'Postgraduate management or research'],
  Law: ['Legal practice subject to local qualification rules', 'Policy, compliance, and corporate roles', 'Research and postgraduate law'],
  Design: ['Product, visual, interaction, and service design', 'Creative industries', 'Independent practice or postgraduate study'],
  Arts: ['Education, media, policy, research, and public service', 'Creative and cultural sectors', 'Postgraduate study'],
  Other: ['Graduate roles related to the selected programme', 'Research or postgraduate study', 'Interdisciplinary careers'],
};

const livingCostFor = (country: string): string => {
  if (country === 'India') return 'Approximately ₹1.5–6 lakh/year depending on city and accommodation.';
  if (country === 'Germany') return 'Approximately €11,000–16,000/year depending on city and lifestyle.';
  if (country === 'UK') return 'Approximately £12,000–20,000/year; London is often higher.';
  if (country === 'USA') return 'Approximately $15,000–30,000/year depending on location and housing.';
  if (country === 'Canada') return 'Approximately CAD 15,000–25,000/year depending on city.';
  if (country === 'Australia') return 'Approximately AUD 24,000–35,000/year depending on city.';
  return 'Living costs vary significantly by city and accommodation; verify the university’s current estimate.';
};

export const universities: University[] = [...baseUniversities, ...supplementalUniversities]
  .filter((university, index, all) =>
    all.findIndex((candidate) => candidate.name.toLowerCase() === university.name.toLowerCase()) === index,
  )
  .map((university, index) => ({
  ...university,
  id: `university-${index + 1}`,
  publicOrPrivate: university.publicOrPrivate || (privateNamePattern.test(university.name) ? 'Private' : 'Public'),
  studyAbroad: university.country !== 'India',
  officialWebsite: university.officialWebsite || '',
  detailedOverview: `${university.name} is a ${university.publicOrPrivate || (privateNamePattern.test(university.name) ? 'private' : 'public')} institution in ${university.city}, ${university.country}. It offers ${university.stream.toLowerCase()} and related study pathways. Programme availability, admissions rules, and costs can change, so confirm current details directly with the institution.`,
  relevantPrograms: programsByStream[university.stream],
  requiredSubjects: subjectsByStream[university.stream],
  eligibility: `Completion of the relevant secondary or prior degree qualification, required subjects, language requirements, and applicable entrance examinations. Exact thresholds vary by programme; verify on the official website.`,
  livingCostEstimate: livingCostFor(university.country),
  campusLocationInfo: `Located in ${university.city}, ${university.country}. Review the official campus, accommodation, transport, and international-student pages when comparing locations.`,
  careerOutcomes: outcomesByStream[university.stream],
  suggestedNextSteps: ['Review the official programme curriculum', 'Confirm subject and entrance-exam requirements', 'Compare tuition, living costs, and scholarship options', 'Note the official application timeline and required documents'],
  }));

/**
 * Get universities by stream
 */
export const getUniversitiesByStream = (stream: Stream): University[] => {
  return universities.filter(uni => uni.stream === stream);
};

/**
 * Get universities by category
 */
export const getUniversitiesByCategory = (category: Category): University[] => {
  return universities.filter(uni => uni.category === category);
};

/**
 * Get universities by country
 */
export const getUniversitiesByCountry = (country: string): University[] => {
  return universities.filter(uni => uni.country === country);
};

/**
 * Get universities by stream and category
 */
export const getUniversitiesByStreamAndCategory = (stream: Stream, category: Category): University[] => {
  return universities.filter(uni => uni.stream === stream && uni.category === category);
};

/**
 * Get all unique streams
 */
export const getAllStreams = (): Stream[] => {
  return ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts', 'Other'];
};

/**
 * Get all unique countries
 */
export const getAllCountries = (): string[] => {
  return [...new Set(universities.map(uni => uni.country))];
};

/**
 * Search universities by name
 */
export const searchUniversitiesByName = (query: string): University[] => {
  const lowercaseQuery = query.toLowerCase();
  return universities.filter(uni => uni.name.toLowerCase().includes(lowercaseQuery));
};

/**
 * Get universities with scholarships
 */
export const getUniversitiesWithScholarships = (): University[] => {
  return universities.filter(uni => uni.scholarshipAvailability);
};
