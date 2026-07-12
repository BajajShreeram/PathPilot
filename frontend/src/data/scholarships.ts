import { universities } from './universities';

export type ScholarshipStream = 'Engineering' | 'Medical' | 'Commerce' | 'Law' | 'Design' | 'Arts' | 'General' | 'Research' | 'Sports';
export type ScholarshipType = 'Merit-based' | 'Need-based' | 'Need & Merit' | 'Women in education' | 'Sports' | 'Research' | 'Study abroad';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  country: string;
  eligibleStreams: ScholarshipStream[];
  eligibleCountries: string[];
  studyLevel: string;
  scholarshipType: ScholarshipType;
  coverageAmount: string;
  whatItCovers: string[];
  eligibility: string;
  requiredDocuments: string[];
  applicationProcess: string[];
  deadlineInfo: string;
  renewable: string;
  difficulty: 'Highly competitive' | 'Competitive' | 'Moderate';
  officialWebsite: string;
  shortDescription: string;
  detailedDescription: string;
  budgetSuitable: string[];
  studyAbroad: boolean;
}

type NamedSeed = Pick<Scholarship, 'id' | 'name' | 'provider' | 'country' | 'eligibleStreams' | 'eligibleCountries' | 'studyLevel' | 'scholarshipType' | 'coverageAmount' | 'officialWebsite' | 'difficulty'> &
  Partial<Pick<Scholarship, 'eligibility' | 'deadlineInfo' | 'renewable' | 'studyAbroad'>>;

const namedSeeds: NamedSeed[] = [
  { id: 'inspire-she', name: 'INSPIRE Scholarship for Higher Education', provider: 'Department of Science and Technology, Government of India', country: 'India', eligibleStreams: ['Engineering', 'Medical', 'Research'], eligibleCountries: ['India'], studyLevel: 'Undergraduate and integrated postgraduate science study', scholarshipType: 'Merit-based', coverageAmount: 'Published annual scholarship and mentorship support; verify current amount', officialWebsite: 'https://online-inspire.gov.in', difficulty: 'Competitive', eligibility: 'Students pursuing eligible basic and natural science programmes under the current INSPIRE-SHE rules.', renewable: 'Continuation depends on academic performance and current programme rules.' },
  { id: 'central-sector-india', name: 'Central Sector Scheme of Scholarships for College and University Students', provider: 'Department of Higher Education, Government of India', country: 'India', eligibleStreams: ['General'], eligibleCountries: ['India'], studyLevel: 'Undergraduate and postgraduate', scholarshipType: 'Need & Merit', coverageAmount: 'Government support at the rate published for the current cycle', officialWebsite: 'https://scholarships.gov.in', difficulty: 'Competitive' },
  { id: 'aicte-pragati', name: 'AICTE Pragati Scholarship for Girl Students', provider: 'All India Council for Technical Education', country: 'India', eligibleStreams: ['Engineering', 'Design'], eligibleCountries: ['India'], studyLevel: 'Diploma and undergraduate technical education', scholarshipType: 'Women in education', coverageAmount: 'Education support under current AICTE rules', officialWebsite: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati/General-Instructions', difficulty: 'Competitive' },
  { id: 'aicte-saksham', name: 'AICTE Saksham Scholarship', provider: 'All India Council for Technical Education', country: 'India', eligibleStreams: ['Engineering', 'Design'], eligibleCountries: ['India'], studyLevel: 'Diploma and undergraduate technical education', scholarshipType: 'Need-based', coverageAmount: 'Education support under current AICTE rules', officialWebsite: 'https://www.aicte-india.org', difficulty: 'Competitive' },
  { id: 'national-sports-india', name: 'National Sports Scholarship Information', provider: 'Sports Authority of India', country: 'India', eligibleStreams: ['Sports', 'General'], eligibleCountries: ['India'], studyLevel: 'School and higher education pathways', scholarshipType: 'Sports', coverageAmount: 'Varies by scheme and sporting achievement', officialWebsite: 'https://sportsauthorityofindia.nic.in', difficulty: 'Competitive' },
  { id: 'rhodes', name: 'Rhodes Scholarship', provider: 'Rhodes Trust', country: 'UK', eligibleStreams: ['General', 'Research'], eligibleCountries: ['International'], studyLevel: 'Postgraduate', scholarshipType: 'Study abroad', coverageAmount: 'Comprehensive funding under the current constituency rules', officialWebsite: 'https://www.rhodeshouse.ox.ac.uk/scholarships/applications/', difficulty: 'Highly competitive' },
  { id: 'chevening', name: 'Chevening Scholarships', provider: 'UK Government', country: 'UK', eligibleStreams: ['General'], eligibleCountries: ['International'], studyLevel: 'One-year taught master’s', scholarshipType: 'Study abroad', coverageAmount: 'Tuition and other support according to the current award terms', officialWebsite: 'https://www.chevening.org/scholarships/', difficulty: 'Highly competitive' },
  { id: 'commonwealth-masters', name: 'Commonwealth Master’s Scholarships', provider: 'Commonwealth Scholarship Commission', country: 'UK', eligibleStreams: ['General', 'Research'], eligibleCountries: ['Eligible Commonwealth countries'], studyLevel: 'Master’s', scholarshipType: 'Study abroad', coverageAmount: 'Funding components vary by award route', officialWebsite: 'https://cscuk.fcdo.gov.uk/scholarships/', difficulty: 'Highly competitive' },
  { id: 'gates-cambridge', name: 'Gates Cambridge Scholarship', provider: 'Gates Cambridge Trust', country: 'UK', eligibleStreams: ['General', 'Research'], eligibleCountries: ['International'], studyLevel: 'Postgraduate', scholarshipType: 'Merit-based', coverageAmount: 'Full-cost award under current terms', officialWebsite: 'https://www.gatescambridge.org', difficulty: 'Highly competitive' },
  { id: 'great-scholarships', name: 'GREAT Scholarships', provider: 'British Council and participating UK universities', country: 'UK', eligibleStreams: ['General'], eligibleCountries: ['Eligible countries'], studyLevel: 'Postgraduate', scholarshipType: 'Study abroad', coverageAmount: 'Contribution varies by university and country', officialWebsite: 'https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships', difficulty: 'Competitive' },
  { id: 'erasmus-mundus', name: 'Erasmus Mundus Joint Masters Scholarships', provider: 'European Union', country: 'Europe', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts', 'General', 'Research'], eligibleCountries: ['International'], studyLevel: 'Master’s', scholarshipType: 'Study abroad', coverageAmount: 'Participation costs plus possible travel, visa, and living support', officialWebsite: 'https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters', difficulty: 'Highly competitive' },
  { id: 'daad-epos', name: 'DAAD EPOS Scholarships', provider: 'German Academic Exchange Service (DAAD)', country: 'Germany', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'General', 'Research'], eligibleCountries: ['Eligible developing countries'], studyLevel: 'Postgraduate', scholarshipType: 'Study abroad', coverageAmount: 'Programme-specific funding; verify the current call', officialWebsite: 'https://www.daad.de/en/studying-in-germany/scholarships/daad-funding-programmes/', difficulty: 'Highly competitive' },
  { id: 'fulbright-nehru', name: 'Fulbright-Nehru Fellowships', provider: 'United States-India Educational Foundation', country: 'USA', eligibleStreams: ['General', 'Research'], eligibleCountries: ['India'], studyLevel: 'Master’s, doctoral research, and postdoctoral routes', scholarshipType: 'Study abroad', coverageAmount: 'Varies by fellowship category', officialWebsite: 'https://www.usief.org.in/Fellowships.aspx', difficulty: 'Highly competitive' },
  { id: 'tata-cornell', name: 'Tata Scholarship at Cornell University', provider: 'Cornell University', country: 'USA', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts', 'General'], eligibleCountries: ['India'], studyLevel: 'Undergraduate', scholarshipType: 'Need-based', coverageAmount: 'Need-based financial aid under Cornell’s current policy', officialWebsite: 'https://admissions.cornell.edu/afford/tata-scholarship', difficulty: 'Highly competitive' },
  { id: 'inlaks', name: 'Inlaks Scholarships', provider: 'Inlaks Shivdasani Foundation', country: 'International', eligibleStreams: ['General', 'Design', 'Arts', 'Research'], eligibleCountries: ['India'], studyLevel: 'Postgraduate', scholarshipType: 'Study abroad', coverageAmount: 'Up to the limit published for the current cycle', officialWebsite: 'https://www.inlaksfoundation.org/scholarships/', difficulty: 'Highly competitive' },
  { id: 'australia-awards', name: 'Australia Awards Scholarships', provider: 'Australian Government', country: 'Australia', eligibleStreams: ['General', 'Research'], eligibleCountries: ['Eligible partner countries'], studyLevel: 'Undergraduate or postgraduate depending on country programme', scholarshipType: 'Study abroad', coverageAmount: 'Benefits vary by country programme and award', officialWebsite: 'https://www.dfat.gov.au/people-to-people/australia-awards', difficulty: 'Highly competitive' },
  { id: 'mext', name: 'Japanese Government (MEXT) Scholarship', provider: 'Government of Japan', country: 'Japan', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts', 'General', 'Research'], eligibleCountries: ['International'], studyLevel: 'Undergraduate, postgraduate, research, and specialist routes', scholarshipType: 'Study abroad', coverageAmount: 'Tuition and stipend support according to scholarship category', officialWebsite: 'https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/', difficulty: 'Highly competitive' },
  { id: 'gks', name: 'Global Korea Scholarship', provider: 'Government of the Republic of Korea', country: 'South Korea', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts', 'General', 'Research'], eligibleCountries: ['International'], studyLevel: 'Undergraduate and postgraduate', scholarshipType: 'Study abroad', coverageAmount: 'Funding package varies by programme year', officialWebsite: 'https://www.studyinkorea.go.kr', difficulty: 'Highly competitive' },
  { id: 'singa', name: 'Singapore International Graduate Award (SINGA)', provider: 'A*STAR and partner universities', country: 'Singapore', eligibleStreams: ['Engineering', 'Medical', 'Research'], eligibleCountries: ['International'], studyLevel: 'PhD', scholarshipType: 'Research', coverageAmount: 'Research training award under current terms', officialWebsite: 'https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa', difficulty: 'Highly competitive' },
  { id: 'pearson-toronto', name: 'Lester B. Pearson International Scholarship', provider: 'University of Toronto', country: 'Canada', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts', 'General'], eligibleCountries: ['International'], studyLevel: 'Undergraduate', scholarshipType: 'Merit-based', coverageAmount: 'Comprehensive award under current university terms', officialWebsite: 'https://future.utoronto.ca/pearson/about/', difficulty: 'Highly competitive' },
  { id: 'vanier', name: 'Vanier Canada Graduate Scholarships', provider: 'Government of Canada', country: 'Canada', eligibleStreams: ['Engineering', 'Medical', 'Commerce', 'Law', 'Arts', 'General', 'Research'], eligibleCountries: ['Canada', 'International'], studyLevel: 'Doctoral', scholarshipType: 'Research', coverageAmount: 'Graduate funding at the current published rate', officialWebsite: 'https://vanier.gc.ca', difficulty: 'Highly competitive' },
  { id: 'aga-khan', name: 'Aga Khan Foundation International Scholarship Programme', provider: 'Aga Khan Foundation', country: 'International', eligibleStreams: ['General'], eligibleCountries: ['Eligible countries'], studyLevel: 'Postgraduate', scholarshipType: 'Need & Merit', coverageAmount: 'Funding structure and amount vary; verify current terms', officialWebsite: 'https://the.akdn/en/what-we-do/developing-human-capacity/education/international-scholarships', difficulty: 'Highly competitive' },
  { id: 'uefa-research', name: 'FIFA Research Scholarship Information', provider: 'FIFA Research Programme', country: 'International', eligibleStreams: ['Sports', 'Research'], eligibleCountries: ['International'], studyLevel: 'Research', scholarshipType: 'Research', coverageAmount: 'Varies by current research call', officialWebsite: 'https://inside.fifa.com/innovation/research', difficulty: 'Competitive' },
  { id: 'google-women-tech', name: 'Google Women Techmakers Scholars Information', provider: 'Google', country: 'International', eligibleStreams: ['Engineering'], eligibleCountries: ['International'], studyLevel: 'Higher education and professional development opportunities', scholarshipType: 'Women in education', coverageAmount: 'Varies by regional programme and current call', officialWebsite: 'https://www.womentechmakers.com', difficulty: 'Competitive' },
];

const commonDocuments = ['Academic transcripts', 'Proof of identity', 'Statement of purpose', 'Recommendation letters', 'Financial documents when need-based'];
const commonProcess = ['Check the current official call and eligibility', 'Prepare programme-specific documents', 'Submit through the provider’s official portal', 'Track interview or selection updates directly with the provider'];

const namedScholarships: Scholarship[] = namedSeeds.map((seed) => ({
  ...seed,
  whatItCovers: ['Coverage varies by current award terms', 'Verify tuition, living, travel, and insurance components on the official website'],
  eligibility: seed.eligibility || 'Applicants must meet the provider’s current nationality, study-level, academic, and programme-specific requirements.',
  requiredDocuments: commonDocuments,
  applicationProcess: commonProcess,
  deadlineInfo: seed.deadlineInfo || 'Deadline varies by annual cycle; verify on the official website.',
  renewable: seed.renewable || 'Renewal or continuation depends on the current award rules and satisfactory progress.',
  shortDescription: `${seed.scholarshipType} opportunity for ${seed.studyLevel.toLowerCase()} study in ${seed.country}.`,
  detailedDescription: `${seed.name} is administered by ${seed.provider}. Award availability, coverage, deadlines, and selection rules can change by cycle, so applicants should verify every requirement on the official website before preparing an application.`,
  budgetSuitable: ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'],
  studyAbroad: seed.studyAbroad ?? seed.country !== 'India',
}));

const institutionalScholarships: Scholarship[] = universities.slice(0, 90).map((university) => ({
  id: `institutional-aid-${university.id}`,
  name: `${university.name} Scholarships and Financial Aid`,
  provider: university.name,
  country: university.country,
  eligibleStreams: [university.stream === 'Other' ? 'General' : university.stream] as ScholarshipStream[],
  eligibleCountries: university.studyAbroad ? ['International', university.country] : ['India'],
  studyLevel: 'Undergraduate and postgraduate options; varies by programme',
  scholarshipType: university.scholarshipAvailability ? 'Need & Merit' : 'Merit-based',
  coverageAmount: 'Varies by award and academic year; verify on the official website',
  whatItCovers: ['May include partial or full tuition support', 'Some awards may include living or research support', 'Exact benefits vary by award'],
  eligibility: `Applicants must meet ${university.name} admission requirements and the criteria of the specific institutional award.`,
  requiredDocuments: commonDocuments,
  applicationProcess: ['Review the university’s current funding pages', 'Confirm whether a separate scholarship form is required', 'Complete admission and funding applications by their respective deadlines', 'Monitor the official applicant portal for updates'],
  deadlineInfo: 'Varies by programme and award; verify on the official university website.',
  renewable: 'Varies by award; commonly subject to satisfactory academic progress.',
  difficulty: university.category === 'Dream' ? 'Highly competitive' : university.category === 'Very Good' ? 'Competitive' : 'Moderate',
  officialWebsite: university.officialWebsite,
  shortDescription: `Institutional scholarship and financial-aid options for eligible students at ${university.name}.`,
  detailedDescription: `${university.name} may publish multiple institutional, departmental, merit, need-based, sports, or research funding options. This catalog entry is a discovery starting point rather than a single guaranteed award; use the official website to identify the current scholarship that fits your programme and circumstances.`,
  budgetSuitable: ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'],
  studyAbroad: university.studyAbroad,
}));

export const scholarships: Scholarship[] = [...namedScholarships, ...institutionalScholarships];
