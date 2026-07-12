import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { scholarships, type Scholarship, type ScholarshipStream } from '../data/scholarships';
import { getProfile } from '../utils/profileStorage';
import { getAchievements, type Achievement } from '../utils/achievementsStorage';

const streamForProfile = (profile: ProfileData): ScholarshipStream => {
  const supported: ScholarshipStream[] = ['Engineering', 'Medical', 'Commerce', 'Law', 'Design', 'Arts'];
  return supported.includes(profile.stream as ScholarshipStream)
    ? (profile.stream as ScholarshipStream)
    : 'General';
};

const getScholarshipMatch = (scholarship: Scholarship, profile: ProfileData, achievements: Achievement[]) => {
  const reasons: string[] = [];
  const strengths: string[] = [];
  const gaps: string[] = [];
  if (scholarship.eligibleStreams.includes(streamForProfile(profile))) reasons.push(`Your ${profile.stream} stream is eligible`);
  else if (scholarship.eligibleStreams.includes('General')) reasons.push('Open to students across streams');
  if (scholarship.eligibleCountries.some((country) => country === profile.country || country === 'International' || country.startsWith('Eligible'))) reasons.push(`Your country profile fits the listed eligibility`);
  if (profile.needScholarships && ['Need-based', 'Need & Merit'].includes(scholarship.scholarshipType)) reasons.push('Matches your stated scholarship need');
  if (profile.studyAbroad && scholarship.studyAbroad) reasons.push(`Supports your study-abroad plan${profile.preferredCountry ? ` for ${profile.preferredCountry}` : ''}`);
  const meritAchievements = achievements.filter((item) => ['Olympiads', 'Competitions', 'Hackathons', 'Research', 'Leadership', 'Sports'].includes(item.category));
  if (scholarship.scholarshipType === 'Sports' && achievements.some((item) => item.category === 'Sports')) reasons.push('Your sports achievement is directly relevant');
  else if (['Merit-based', 'Need & Merit', 'Research'].includes(scholarship.scholarshipType) && meritAchievements.length) reasons.push(`${meritAchievements[0].category} experience supports your merit profile`);
  if (profile.budget === 'LOW' || profile.budget === 'MEDIUM') strengths.push('Funding could meaningfully support your selected budget range');
  if (meritAchievements.length) strengths.push(`${meritAchievements.length} achievement${meritAchievements.length > 1 ? 's' : ''} can provide evidence in a competitive application`);
  if (scholarship.difficulty === 'Highly competitive') gaps.push('This is highly competitive, so evidence and application quality will matter');
  if (scholarship.deadlineInfo.toLowerCase().includes('verify')) gaps.push('The current deadline must be confirmed on the official website');
  if (!achievements.length && ['Merit-based', 'Research', 'Sports'].includes(scholarship.scholarshipType)) gaps.push('Adding relevant achievements could strengthen your evidence');
  return {
    reasons: reasons.length ? reasons : ['Relevant to your current study level and destination plan'],
    strengths: strengths.length ? strengths : [`Your ${profile.stream} profile meets the broad opportunity theme`],
    gaps: gaps.length ? gaps : ['Confirm the current provider-specific eligibility before applying'],
    nextStep: `Open the official ${scholarship.provider} page and make a checklist of eligibility evidence and required documents.`,
  };
};

const matchScore = (scholarship: Scholarship, profile: ProfileData, achievements: Achievement[]): number => {
  let score = 0;
  if (scholarship.eligibleStreams.includes(streamForProfile(profile))) score += 8;
  if (scholarship.eligibleStreams.includes('General')) score += 3;
  if (profile.needScholarships && ['Need-based', 'Need & Merit'].includes(scholarship.scholarshipType)) score += 5;
  if (profile.preferredCountry && scholarship.country === profile.preferredCountry) score += 6;
  if (profile.country && scholarship.eligibleCountries.some((country) => country === profile.country || country === 'International' || country === 'Eligible countries')) score += 3;
  const interests = [...(profile.favouriteSubjects || []), ...(profile.careerInterests || [])].map((value) => value.toLowerCase());
  const searchable = `${scholarship.name} ${scholarship.shortDescription} ${scholarship.detailedDescription}`.toLowerCase();
  score += interests.filter((interest) => searchable.includes(interest.split(' ')[0])).length;
  if (scholarship.scholarshipType === 'Sports' && achievements.some((item) => item.category === 'Sports')) score += 7;
  if (['Merit-based', 'Need & Merit', 'Research'].includes(scholarship.scholarshipType) && achievements.some((item) => ['Olympiads', 'Competitions', 'Hackathons', 'Research', 'Leadership'].includes(item.category))) score += 4;
  return score;
};

export const ScholarshipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile] = useState<ProfileData>(() => getProfile()!);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  const [achievements] = useState<Achievement[]>(getAchievements);

  const personalized = useMemo(() => {
    const profileStream = streamForProfile(profile);
    return scholarships
      .filter((scholarship) => scholarship.eligibleStreams.includes(profileStream) || scholarship.eligibleStreams.includes('General') || (scholarship.eligibleStreams.includes('Research') && (profile.careerInterests || []).some((interest) => interest.toLowerCase().includes('research'))))
      .filter((scholarship) => {
        if (!profile.studyAbroad) return !scholarship.studyAbroad && scholarship.country === 'India';
        if (!profile.preferredCountry) return scholarship.studyAbroad;
        return scholarship.country === profile.preferredCountry || scholarship.country === 'International' || scholarship.country === 'Europe';
      })
      .filter((scholarship) => scholarship.eligibleCountries.some((country) => country === profile.country || ['International', 'Eligible countries', 'Eligible Commonwealth countries', 'Eligible developing countries'].includes(country)))
      .sort((a, b) => matchScore(b, profile, achievements) - matchScore(a, profile, achievements));
  }, [profile, achievements]);

  const types = ['all', ...new Set(personalized.map((scholarship) => scholarship.scholarshipType))];
  const visibleScholarships = personalized.filter((scholarship) => selectedType === 'all' || scholarship.scholarshipType === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button onClick={() => navigate('/dashboard')} className="mb-6 font-semibold text-orange-700 hover:text-orange-800">← Back to Dashboard</button>
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div className="text-center">
            <div className="mb-4 text-6xl">💰</div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Scholarships</h1>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">{personalized.length} relevant opportunities selected from {scholarships.length} verified programmes and official funding directories.</p>
          </div>
          <div className="mt-7">
            <p className="mb-2 text-sm font-semibold text-gray-700">Filter by scholarship type</p>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => <button key={type} onClick={() => setSelectedType(type)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedType === type ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{type === 'all' ? 'All Types' : type}</button>)}
            </div>
          </div>
        </section>

        {visibleScholarships.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleScholarships.map((scholarship) => (
              <article key={scholarship.id} className="flex flex-col rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                <div className="flex flex-wrap gap-2"><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">{scholarship.scholarshipType}</span><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{scholarship.difficulty}</span></div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{scholarship.name}</h2>
                <p className="mt-1 text-sm font-medium text-gray-500">{scholarship.provider}</p>
                <p className="mt-4 text-sm text-gray-700">{scholarship.shortDescription}</p>
                <div className="mt-4 rounded-xl bg-orange-50 p-4 text-sm text-orange-900"><strong>Why this matches you:</strong><ul className="mt-2 list-disc space-y-1 pl-5">{getScholarshipMatch(scholarship, profile, achievements).reasons.slice(0, 3).map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
                <div className="mt-4 text-sm"><span className="text-gray-500">Coverage:</span> <span className="font-semibold text-gray-900">{scholarship.coverageAmount}</span></div>
                <button onClick={() => setSelectedScholarship(scholarship)} className="mt-6 w-full rounded-lg bg-orange-600 px-4 py-2.5 font-semibold text-white hover:bg-orange-700">View Requirements</button>
              </article>
            ))}
          </div>
        ) : <div className="rounded-xl bg-white py-12 text-center shadow-md"><p className="text-lg text-gray-600">No relevant scholarships match this profile and filter.</p></div>}

        {selectedScholarship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedScholarship(null)}>
            <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <div className="border-b border-slate-200 p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-orange-700">{selectedScholarship.scholarshipType} · {selectedScholarship.difficulty}</p><h2 className="mt-2 text-3xl font-bold text-gray-900">{selectedScholarship.name}</h2><p className="mt-2 text-gray-500">{selectedScholarship.provider}</p></div><button onClick={() => setSelectedScholarship(null)} aria-label="Close requirements" className="rounded-lg p-2 text-2xl text-gray-500 hover:bg-gray-100">×</button></div>
              </div>
              <div className="space-y-6 p-7 sm:p-9">
                <section><h3 className="font-bold text-gray-900">Full description</h3><p className="mt-2 text-gray-700">{selectedScholarship.detailedDescription}</p></section>
                <div className="grid gap-4 sm:grid-cols-2">
                  <section className="rounded-xl bg-gray-50 p-4"><h3 className="font-bold text-gray-900">Eligibility</h3><p className="mt-2 text-sm text-gray-700">{selectedScholarship.eligibility}</p></section>
                  <section className="rounded-xl bg-gray-50 p-4"><h3 className="font-bold text-gray-900">Coverage</h3><p className="mt-2 text-sm font-semibold text-gray-800">{selectedScholarship.coverageAmount}</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{selectedScholarship.whatItCovers.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section className="rounded-xl bg-gray-50 p-4"><h3 className="font-bold text-gray-900">Required documents</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{selectedScholarship.requiredDocuments.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  <section className="rounded-xl bg-gray-50 p-4"><h3 className="font-bold text-gray-900">Deadline</h3><p className="mt-2 text-sm text-gray-700">{selectedScholarship.deadlineInfo}</p><h3 className="mt-4 font-bold text-gray-900">Renewal rules</h3><p className="mt-2 text-sm text-gray-700">{selectedScholarship.renewable}</p></section>
                </div>
                <section className="rounded-xl bg-blue-50 p-4"><h3 className="font-bold text-blue-950">Application process</h3><ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-blue-900">{selectedScholarship.applicationProcess.map((step) => <li key={step}>{step}</li>)}</ol></section>
                <section className="rounded-xl bg-orange-50 p-4"><h3 className="font-bold text-orange-950">Why this matches you</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-orange-900">{getScholarshipMatch(selectedScholarship, profile, achievements).reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></section>
                <div className="grid gap-4 sm:grid-cols-2"><section className="rounded-xl bg-blue-50 p-4"><h3 className="font-bold text-blue-950">Your strengths</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-900">{getScholarshipMatch(selectedScholarship, profile, achievements).strengths.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="rounded-xl bg-yellow-50 p-4"><h3 className="font-bold text-yellow-950">Possible gaps</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-900">{getScholarshipMatch(selectedScholarship, profile, achievements).gaps.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
                <section className="rounded-xl bg-purple-50 p-4"><h3 className="font-bold text-purple-950">Recommended next step</h3><p className="mt-2 text-sm text-purple-900">{getScholarshipMatch(selectedScholarship, profile, achievements).nextStep}</p></section>
                <p className="rounded-xl border border-slate-200 p-4 text-sm text-gray-600"><strong>Important:</strong> PathPilot helps you discover opportunities but does not process scholarship applications. Always apply through the provider’s official website.</p>
                {selectedScholarship.officialWebsite ? <a href={selectedScholarship.officialWebsite} target="_blank" rel="noreferrer" className="inline-flex rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700">Visit Official Website</a> : <p className="text-sm font-medium text-gray-600">Official website link is not yet catalogued. Verify the provider’s official domain before applying.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
