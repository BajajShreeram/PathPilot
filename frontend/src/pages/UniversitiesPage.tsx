import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { universities, type University } from '../data/universities';
import { getProfile } from '../utils/profileStorage';
import { getAchievements, type Achievement } from '../utils/achievementsStorage';

const categoryColors: Record<University['category'], string> = {
  Dream: 'from-purple-500 to-purple-700',
  'Very Good': 'from-blue-500 to-blue-700',
  Good: 'from-green-500 to-green-700',
  Reasonable: 'from-yellow-500 to-orange-600',
};

const profileTerms = (profile: ProfileData): string[] =>
  [
    ...(profile.favouriteSubjects || []),
    ...(profile.subjectInterests || []),
    ...(profile.careerInterests || []),
  ].map((value) => value.toLowerCase());

const isBudgetFriendly = (university: University, budget: string): boolean => {
  if (budget === 'VERY_HIGH') return true;
  if (budget === 'HIGH') return university.country !== 'USA' || university.scholarshipAvailability;
  if (budget === 'MEDIUM') return university.country === 'India' || university.country === 'Germany' || university.scholarshipAvailability;
  return university.country === 'India' || university.country === 'Germany';
};

const scoreUniversity = (university: University, profile: ProfileData, achievements: Achievement[]): number => {
  let score = 0;
  if (university.stream === profile.stream) score += 8;
  if (profile.preferredCountry && university.country === profile.preferredCountry) score += 6;
  if (profile.examPreference && university.requiredExams.some((exam) => exam.toLowerCase().includes(profile.examPreference!.toLowerCase()))) score += 4;
  if (profile.needScholarships && university.scholarshipAvailability) score += 3;
  if (isBudgetFriendly(university, profile.budget)) score += 3;
  const searchable = `${university.stream} ${university.oneLineDescription}`.toLowerCase();
  score += profileTerms(profile).filter((term) => searchable.includes(term.split(' ')[0])).length;
  if (profile.dreamUniversity && university.name.toLowerCase().includes(profile.dreamUniversity.toLowerCase())) score += 10;
  if (achievements.some((item) => item.category === 'Research')) score += university.category === 'Dream' ? 3 : 1;
  if (university.stream === 'Engineering' && achievements.some((item) => ['Projects', 'Hackathons', 'Olympiads'].includes(item.category))) score += 3;
  if (university.stream === 'Design' && achievements.some((item) => ['Projects', 'Arts', 'Competitions'].includes(item.category))) score += 3;
  return score;
};

const getUniversityMatch = (university: University, profile: ProfileData, achievements: Achievement[]) => {
  const reasons: string[] = [];
  const strengths: string[] = [];
  const gaps: string[] = [];
  if (university.stream === profile.stream) reasons.push(`Matches your ${profile.stream} stream`);
  const preferredLocation = profile.studyAbroad ? profile.preferredCountry : profile.country || 'India';
  if (preferredLocation && university.country === preferredLocation) reasons.push(`Fits your preference for ${preferredLocation}`);
  const matchingExam = profile.examPreference && university.requiredExams.find((exam) => exam.toLowerCase().includes(profile.examPreference!.toLowerCase()));
  if (matchingExam) reasons.push(`Accepts ${matchingExam}`);
  const terms = profileTerms(profile);
  const matchingProgram = university.relevantPrograms.find((program) => terms.some((term) => program.toLowerCase().includes(term.split(' ')[0])));
  if (matchingProgram) reasons.push(`Offers relevant ${matchingProgram} options`);
  if (profile.needScholarships && university.scholarshipAvailability) reasons.push('Scholarship options are available');
  if (profile.dreamUniversity && university.name.toLowerCase().includes(profile.dreamUniversity.toLowerCase())) reasons.push('Matches your dream-university goal');
  if (isBudgetFriendly(university, profile.budget)) strengths.push('Estimated costs or available funding align with your budget signal');
  const relevantAchievements = achievements.filter((item) => ['Projects', 'Hackathons', 'Olympiads', 'Research', 'Leadership'].includes(item.category));
  if (relevantAchievements.length) { reasons.push(`${relevantAchievements[0].category} experience strengthens your profile`); strengths.push(`${relevantAchievements.length} relevant achievement${relevantAchievements.length > 1 ? 's' : ''} demonstrate initiative and merit`); }
  if (!matchingExam && profile.examPreference && profile.examPreference !== 'None') gaps.push(`Confirm whether ${profile.examPreference} is accepted or if another entrance exam is needed`);
  if (!isBudgetFriendly(university, profile.budget)) gaps.push('Total tuition and living costs may exceed your selected budget');
  if (profile.needScholarships && !university.scholarshipAvailability) gaps.push('No confirmed scholarship listing is currently catalogued');
  return {
    reasons: reasons.length ? reasons : [`Relevant ${university.stream} pathway for your current profile`],
    strengths: strengths.length ? strengths : [`Your ${profile.stream} focus provides a relevant academic foundation`],
    gaps: gaps.length ? gaps : ['Verify current programme-specific eligibility and deadlines'],
    nextStep: `Review ${university.name}’s official ${university.stream} programme requirements and compare them with your profile.`,
  };
};

export const UniversitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile] = useState<ProfileData>(() => getProfile()!);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [achievements] = useState<Achievement[]>(getAchievements);

  const personalized = useMemo(() => {
    const explicitlySelectedForeignCountry = !profile.studyAbroad && Boolean(profile.preferredCountry && profile.preferredCountry !== 'India');
    return universities
      .filter((university) => university.stream === profile.stream || profile.stream === 'Other')
      .filter((university) => {
        if (profile.studyAbroad) return university.studyAbroad;
        if (explicitlySelectedForeignCountry) return university.country === profile.preferredCountry;
        return !university.studyAbroad;
      })
      .sort((a, b) => scoreUniversity(b, profile, achievements) - scoreUniversity(a, profile, achievements));
  }, [profile, achievements]);

  const countries = useMemo(() => ['all', ...new Set(personalized.map((university) => university.country))], [personalized]);
  const visibleUniversities = personalized.filter(
    (university) =>
      (selectedCountry === 'all' || university.country === selectedCountry) &&
      (selectedCategory === 'all' || university.category === selectedCategory),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button onClick={() => navigate('/dashboard')} className="mb-6 font-semibold text-green-700 hover:text-green-800">← Back to Dashboard</button>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-7 text-center">
            <div className="mb-4 text-6xl">🎓</div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Universities</h1>
            <p className="mt-3 text-gray-600">{personalized.length} personalized {profile.stream} options from a database of {universities.length} universities</p>
          </div>
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">Filter by Country</p>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <button key={country} onClick={() => setSelectedCountry(country)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedCountry === country ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {country === 'all' ? 'All Countries' : country}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">Filter by Category</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'Dream', 'Very Good', 'Good', 'Reasonable'].map((category) => (
                  <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedCategory === category ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {visibleUniversities.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleUniversities.map((university) => (
              <article key={university.id} className="flex overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-xl">
                <div className="flex w-full flex-col">
                  <div className={`h-3 bg-gradient-to-r ${categoryColors[university.category]}`} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white ${categoryColors[university.category]}`}>{university.category}</span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{university.publicOrPrivate}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{university.name}</h2>
                    <p className="mt-2 text-sm text-gray-600">📍 {university.city}, {university.country}</p>
                    <p className="mt-4 text-sm text-gray-700">{university.oneLineDescription}</p>
                    <div className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-900"><strong>Why this matches you:</strong><ul className="mt-2 list-disc space-y-1 pl-5">{getUniversityMatch(university, profile, achievements).reasons.slice(0, 3).map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
                    <div className="mt-4 text-sm"><span className="text-gray-500">Tuition:</span> <span className="font-semibold text-gray-900">{university.tuitionRange}</span></div>
                    <button onClick={() => setSelectedUniversity(university)} className="mt-6 w-full rounded-lg bg-green-600 px-4 py-2.5 font-semibold text-white hover:bg-green-700">More Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white py-12 text-center shadow-md">
            <p className="text-lg text-gray-600">No universities match these filters.</p>
            <button onClick={() => { setSelectedCountry('all'); setSelectedCategory('all'); }} className="mt-4 font-semibold text-green-700">Reset filters</button>
          </div>
        )}

        {selectedUniversity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedUniversity(null)}>
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <div className={`h-5 bg-gradient-to-r ${categoryColors[selectedUniversity.category]}`} />
              <div className="p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm font-semibold text-green-700">{selectedUniversity.category} · {selectedUniversity.publicOrPrivate}</p><h2 className="mt-2 text-3xl font-bold text-gray-900">{selectedUniversity.name}</h2></div>
                  <button onClick={() => setSelectedUniversity(null)} aria-label="Close details" className="rounded-lg p-2 text-2xl text-gray-500 hover:bg-gray-100">×</button>
                </div>
                <p className="mt-4 text-gray-700">{selectedUniversity.detailedOverview}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Location</p><p className="mt-1 font-semibold">{selectedUniversity.city}, {selectedUniversity.country}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Tuition</p><p className="mt-1 font-semibold">{selectedUniversity.tuitionRange}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2"><p className="text-xs font-semibold uppercase text-gray-500">Relevant entrance requirements</p><div className="mt-2 flex flex-wrap gap-2">{selectedUniversity.requiredExams.map((exam) => <span key={exam} className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">{exam}</span>)}</div></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Relevant programs</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{selectedUniversity.relevantPrograms.map((program) => <li key={program}>{program}</li>)}</ul></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Required subjects</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{selectedUniversity.requiredSubjects.map((subject) => <li key={subject}>{subject}</li>)}</ul></div>
                  <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2"><p className="text-xs font-semibold uppercase text-gray-500">Eligibility</p><p className="mt-2 text-sm text-gray-700">{selectedUniversity.eligibility}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Estimated costs</p><p className="mt-2 text-sm text-gray-700"><strong>Tuition:</strong> {selectedUniversity.tuitionRange}</p><p className="mt-2 text-sm text-gray-700"><strong>Living:</strong> {selectedUniversity.livingCostEstimate}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Institution and funding</p><p className="mt-2 text-sm text-gray-700">{selectedUniversity.publicOrPrivate} institution</p><p className="mt-2 text-sm text-gray-700">Scholarships: {selectedUniversity.scholarshipAvailability ? 'Available; verify current awards' : 'No confirmed listing; check official funding pages'}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2"><p className="text-xs font-semibold uppercase text-gray-500">Campus and location</p><p className="mt-2 text-sm text-gray-700">{selectedUniversity.campusLocationInfo}</p></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Career outcomes</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{selectedUniversity.careerOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
                  <div className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-semibold uppercase text-gray-500">Suggested next steps</p><ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">{selectedUniversity.suggestedNextSteps.map((step) => <li key={step}>{step}</li>)}</ol></div>
                  <div className="rounded-xl bg-green-50 p-4 sm:col-span-2"><p className="font-semibold text-green-900">Why this matches you</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-green-800">{getUniversityMatch(selectedUniversity, profile, achievements).reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
                  <div className="rounded-xl bg-blue-50 p-4"><p className="font-semibold text-blue-950">Your strengths</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-900">{getUniversityMatch(selectedUniversity, profile, achievements).strengths.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div className="rounded-xl bg-yellow-50 p-4"><p className="font-semibold text-yellow-950">Possible gaps</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-900">{getUniversityMatch(selectedUniversity, profile, achievements).gaps.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div className="rounded-xl bg-purple-50 p-4 sm:col-span-2"><p className="font-semibold text-purple-950">Recommended next step</p><p className="mt-2 text-sm text-purple-900">{getUniversityMatch(selectedUniversity, profile, achievements).nextStep}</p></div>
                </div>
                {selectedUniversity.officialWebsite ? <a href={selectedUniversity.officialWebsite} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Visit Official Website ↗</a> : <p className="mt-6 text-sm font-medium text-gray-600">Official website: verify the institution’s current official domain before applying.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
