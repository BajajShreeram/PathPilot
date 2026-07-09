import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import type { ProfileData } from '../types';

const STREAMS = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Medical', label: 'Medical' },
  { value: 'Commerce', label: 'Commerce' },
  { value: 'Law', label: 'Law' },
  { value: 'Design', label: 'Design' },
  { value: 'Arts', label: 'Arts & Humanities' },
  { value: 'Other', label: 'Other' },
];

const FOREIGN_COUNTRIES = [
  { value: 'USA', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Other', label: 'Other' },
];

const BUDGETS = [
  { value: 'LOW', label: 'Under ₹5 lakh/year' },
  { value: 'MEDIUM', label: '₹5-15 lakh/year' },
  { value: 'HIGH', label: '₹15-30 lakh/year' },
  { value: 'VERY_HIGH', label: 'Above ₹30 lakh/year' },
];

const ALL_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Business Studies',
  'Accountancy',
  'Psychology',
  'Sociology',
  'Political Science',
  'Art',
  'Music',
  'Physical Education',
];

const CAREER_OPTIONS = [
  'Software Engineer',
  'Doctor',
  'Business Analyst',
  'Lawyer',
  'Designer',
  'Teacher',
  'Architect',
  'Data Scientist',
  'Marketing Manager',
  'Financial Analyst',
  'Research Scientist',
  'Engineer',
  'Entrepreneur',
  'Writer/Journalist',
  'Artist',
  'Civil Services',
  'Other',
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    gradeClass: '',
    stream: '',
    studyAbroad: false,
    preferredCountry: '',
    dreamUniversity: '',
    budget: '',
    needScholarships: false,
    favouriteSubjects: [],
    subjectInterests: [],
    strongSubjects: [],
    weakSubjects: [],
    careerInterests: [],
  });

  const handleInputChange = (field: keyof ProfileData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Reset preferredCountry if studyAbroad is toggled off
    if (field === 'studyAbroad' && value === false) {
      setFormData((prev) => ({ ...prev, preferredCountry: '' }));
    }
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubjectToggle = (field: 'favouriteSubjects' | 'subjectInterests' | 'strongSubjects' | 'weakSubjects', subject: string) => {
    const currentList = formData[field] || [];
    const newList = currentList.includes(subject)
      ? currentList.filter((s) => s !== subject)
      : [...currentList, subject];
    handleInputChange(field, newList);
  };

  const handleCareerToggle = (career: string) => {
    const currentList = formData.careerInterests || [];
    const newList = currentList.includes(career)
      ? currentList.filter((c) => c !== career)
      : [...currentList, career];
    handleInputChange('careerInterests', newList);
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.gradeClass.trim()) newErrors.gradeClass = 'Grade/Class is required';
    if (!formData.stream) newErrors.stream = 'Stream/Field is required';
    if (formData.studyAbroad && !formData.preferredCountry) {
      newErrors.preferredCountry = 'Please select a preferred country for study abroad';
    }
    if (!formData.budget) newErrors.budget = 'Budget is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.favouriteSubjects || formData.favouriteSubjects.length === 0) {
      newErrors.favouriteSubjects = 'Please select at least one favourite subject';
    }
    if (!formData.careerInterests || formData.careerInterests.length === 0) {
      newErrors.careerInterests = 'Please select at least one career interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep2()) {
      // Save to localStorage
      localStorage.setItem('pathpilot_profile', JSON.stringify(formData));
      // Navigate to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Welcome to PathPilot!</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Let's personalize your educational journey. Tell us about yourself.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <div className={`h-2 w-16 rounded-full ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <div className={`h-2 w-16 rounded-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Step {currentStep} of 2</p>
          </div>

          {currentStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
              {/* Name */}
              <Input
                label="Name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                error={errors.name}
              />

              {/* Grade/Class */}
              <Input
                label="Grade/Class"
                type="text"
                value={formData.gradeClass}
                onChange={(e) => handleInputChange('gradeClass', e.target.value)}
                placeholder="e.g., Grade 10, 12th Grade, Freshman"
                required
                error={errors.gradeClass}
              />

              {/* Stream/Field */}
              <Select
                label="Stream/Field"
                value={formData.stream}
                onChange={(e) => handleInputChange('stream', e.target.value)}
                options={STREAMS}
                required
                error={errors.stream}
              />

              {/* Study Abroad Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you want to study abroad? <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('studyAbroad', true)}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition border-2 ${
                      formData.studyAbroad === true
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('studyAbroad', false)}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition border-2 ${
                      formData.studyAbroad === false
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Preferred Country (only if Study Abroad = Yes) */}
              {formData.studyAbroad && (
                <Select
                  label="Preferred Country for Study Abroad"
                  value={formData.preferredCountry || ''}
                  onChange={(e) => handleInputChange('preferredCountry', e.target.value)}
                  options={FOREIGN_COUNTRIES}
                  required
                  error={errors.preferredCountry}
                />
              )}

              {/* Dream University */}
              <Input
                label="Dream University (Optional)"
                type="text"
                value={formData.dreamUniversity}
                onChange={(e) => handleInputChange('dreamUniversity', e.target.value)}
                placeholder={
                  formData.studyAbroad
                    ? 'e.g., MIT, Stanford, Oxford, Cambridge'
                    : 'e.g., IIT Bombay, AIIMS Delhi, SRCC, NLSIU'
                }
              />

              {/* Budget */}
              <Select
                label="Budget"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                options={BUDGETS}
                required
                error={errors.budget}
              />

              {/* Need Scholarships */}
              <Checkbox
                label="I need scholarships"
                checked={formData.needScholarships}
                onChange={(checked) => handleInputChange('needScholarships', checked)}
              />

              {/* Info Box */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {formData.studyAbroad ? (
                    <>
                      <strong>Study Abroad:</strong> We'll show you international universities, standardized tests (SAT,
                      ACT, IELTS, TOEFL), and visa guidance for your selected stream.
                    </>
                  ) : (
                    <>
                      <strong>Study in India:</strong> We'll show you Indian universities, entrance exams (JEE, NEET,
                      CUET, CLAT, etc.), and local opportunities for your selected stream.
                    </>
                  )}
                </p>
              </div>

              {/* Next Button */}
              <Button type="submit" variant="primary" size="lg" fullWidth className="mt-8">
                Next: Subjects & Interests →
              </Button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Favourite Subjects */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Favourite Subjects <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_SUBJECTS.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle('favouriteSubjects', subject)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition border-2 ${
                        formData.favouriteSubjects?.includes(subject)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
                {errors.favouriteSubjects && (
                  <p className="text-sm text-red-600 mt-1">{errors.favouriteSubjects}</p>
                )}
              </div>

              {/* Subject Interests (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subject Interests (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">Select subjects you're interested in learning more about</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_SUBJECTS.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle('subjectInterests', subject)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition border-2 ${
                        formData.subjectInterests?.includes(subject)
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Strong Subjects (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Strong Subjects (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">Select subjects where you excel</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_SUBJECTS.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle('strongSubjects', subject)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition border-2 ${
                        formData.strongSubjects?.includes(subject)
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weak Subjects (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Weak Subjects (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">Select subjects where you need improvement</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_SUBJECTS.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle('weakSubjects', subject)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition border-2 ${
                        formData.weakSubjects?.includes(subject)
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Career Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Career Interests <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CAREER_OPTIONS.map((career) => (
                    <button
                      key={career}
                      type="button"
                      onClick={() => handleCareerToggle(career)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition border-2 ${
                        formData.careerInterests?.includes(career)
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      {career}
                    </button>
                  ))}
                </div>
                {errors.careerInterests && (
                  <p className="text-sm text-red-600 mt-1">{errors.careerInterests}</p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <Button type="button" variant="secondary" size="lg" onClick={handleBack} className="flex-1">
                  ← Back
                </Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1">
                  Complete Onboarding
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
