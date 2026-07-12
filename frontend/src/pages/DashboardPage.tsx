import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import {
  isProfileComplete,
  getProfileCompletionPercentage,
  getMissingFields,
  needsScholarships,
} from '../utils/profileValidation';

const getProfileValue = (profile: ProfileData | null, newKey: keyof ProfileData, oldKey?: keyof ProfileData, defaultValue: any = null): any => {
  if (!profile) return defaultValue;
  
  if (profile[newKey] !== undefined && profile[newKey] !== null) {
    return profile[newKey];
  }
  
  if (oldKey && profile[oldKey] !== undefined && profile[oldKey] !== null) {
    return profile[oldKey];
  }
  
  return defaultValue;
};

const QUICK_ACTIONS = [
  {
    title: 'AI Mentor',
    description: 'Get personalized guidance instantly',
    icon: '🤖',
    path: '/ai-mentor',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    title: 'My Roadmap',
    description: 'Track your personalized journey',
    icon: '🗺️',
    path: '/roadmap',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Universities',
    description: 'Explore 100+ universities worldwide',
    icon: '🎓',
    path: '/universities',
    gradient: 'from-green-500 to-green-700',
  },
  {
    title: 'Scholarships',
    description: 'Find funding opportunities',
    icon: '💰',
    path: '/scholarships',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    title: 'Deadlines',
    description: 'Never miss important dates',
    icon: '📅',
    path: '/deadlines',
    gradient: 'from-red-500 to-pink-600',
  },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileStatus, setProfileStatus] = useState({
    isComplete: false,
    completionPercentage: 0,
    missingFields: [] as string[],
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);

        setProfileStatus({
          isComplete: isProfileComplete(parsedProfile),
          completionPercentage: getProfileCompletionPercentage(parsedProfile),
          missingFields: getMissingFields(parsedProfile),
        });
      } catch (error) {
        console.error('Failed to parse profile:', error);
      }
    }
  }, []);

  const userName = getProfileValue(profile, 'name', undefined, 'Student');
  const userStream = getProfileValue(profile, 'stream', 'field', 'Not selected');
  
  const careerInterestsRaw = getProfileValue(profile, 'careerInterests', 'career', []);
  const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
  const firstCareer = safeCareerInterests.length > 0 ? safeCareerInterests[0] : 'Not selected';
  
  const dreamUniversity = getProfileValue(profile, 'dreamUniversity', undefined, 'Not selected');
  const preferredCountry = getProfileValue(profile, 'preferredCountry', 'country', 'Not selected');
  const studyAbroad = getProfileValue(profile, 'studyAbroad', undefined, false);
  
  const subjectsRaw = getProfileValue(profile, 'favouriteSubjects', 'subjects', []);
  const safeSubjects = Array.isArray(subjectsRaw) ? subjectsRaw : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Profile Completion Alert */}
        {!profileStatus.isComplete && profile && (
          <div className="mb-10 animate-fadeInDown">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300/50 rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    className="h-8 w-8 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-yellow-900 mb-2">
                    Complete Your Profile ({profileStatus.completionPercentage}%)
                  </h3>
                  <p className="text-base text-yellow-800 mb-4">
                    Complete your profile to unlock personalized recommendations and all features!
                  </p>
                  {profileStatus.missingFields.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-yellow-800 mb-1">Missing fields:</p>
                      <p className="text-sm text-yellow-700">{profileStatus.missingFields.join(', ')}</p>
                    </div>
                  )}
                  <button
                    onClick={() => navigate('/onboarding')}
                    className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Complete Profile →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Profile Alert */}
        {!profile && (
          <div className="mb-10 animate-fadeInDown">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300/50 rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Welcome to PathPilot!</h3>
                  <p className="text-base text-blue-800 mb-4">
                    Let's get started by creating your profile to personalize your experience.
                  </p>
                  <button
                    onClick={() => navigate('/onboarding')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                  >
                    Create Profile →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Header */}
        <div className="mb-10 animate-fadeInUp">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl">
                👋
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Welcome back, {userName}!
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Your journey to success starts here</p>
              </div>
            </div>
            
            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">📚</span>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Stream</p>
                </div>
                <p className="text-xl font-bold text-gray-900 break-words">{userStream}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🎯</span>
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Career Goal</p>
                </div>
                <p className="text-xl font-bold text-gray-900 break-words">{firstCareer}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🎓</span>
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Dream University</p>
                </div>
                <p className="text-xl font-bold text-gray-900 break-words">{dreamUniversity}</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-6 border border-orange-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">🌍</span>
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Country</p>
                </div>
                <p className="text-xl font-bold text-gray-900 break-words">{preferredCountry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10 animate-fadeInUp animation-delay-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-left"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${action.gradient} rounded-t-3xl`}></div>
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="animate-fadeInUp animation-delay-400">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Your Profile Summary</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <span className="text-4xl font-bold text-blue-600">{safeSubjects.length || 0}</span>
                </div>
                <p className="text-base font-semibold text-gray-900">Favorite Subjects</p>
                <p className="text-sm text-gray-500 mt-1">Selected</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <span className="text-4xl font-bold text-purple-600">{safeCareerInterests.length || 0}</span>
                </div>
                <p className="text-base font-semibold text-gray-900">Career Interests</p>
                <p className="text-sm text-gray-500 mt-1">Identified</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <span className="text-4xl">{studyAbroad ? '🌏' : '🇮🇳'}</span>
                </div>
                <p className="text-base font-semibold text-gray-900">Study Location</p>
                <p className="text-sm text-gray-500 mt-1">{studyAbroad ? 'Abroad' : 'India'}</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <span className="text-4xl">{profile && needsScholarships(profile) ? '✅' : '➖'}</span>
                </div>
                <p className="text-base font-semibold text-gray-900">Scholarships</p>
                <p className="text-sm text-gray-500 mt-1">{profile ? (needsScholarships(profile) ? 'Needed' : 'Optional') : 'N/A'}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            {profile && !profileStatus.isComplete && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-semibold text-gray-700">Profile Completion</p>
                  <p className="text-lg font-bold text-blue-600">{profileStatus.completionPercentage}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${profileStatus.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dev Tools */}
        {(!profile || !profileStatus.isComplete) && (
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/profile-test')}
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              🧪 Profile Test & Demo (Dev Tools)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
