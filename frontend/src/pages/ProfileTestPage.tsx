import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MOCK_PROFILES, loadMockProfile, clearProfile, getCurrentProfile } from '../utils/mockProfiles';
import {
  isProfileComplete,
  getProfileCompletionPercentage,
  getMissingFields,
  getProfileSummary,
  needsScholarships,
  getPrimaryCareer,
} from '../utils/profileValidation';
import type { ProfileData } from '../types';

export const ProfileTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState<ProfileData | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  useEffect(() => {
    refreshProfile();
  }, []);

  const refreshProfile = () => {
    const profile = getCurrentProfile();
    setCurrentProfile(profile);

    if (profile) {
      setTestResults({
        isComplete: isProfileComplete(profile),
        completionPercentage: getProfileCompletionPercentage(profile),
        missingFields: getMissingFields(profile),
        profileSummary: getProfileSummary(profile),
        needsScholarships: needsScholarships(profile),
        primaryCareer: getPrimaryCareer(profile),
      });
    } else {
      setTestResults({});
    }
  };

  const handleLoadMockProfile = (key: string) => {
    loadMockProfile(key as keyof typeof MOCK_PROFILES);
    refreshProfile();
  };

  const handleClearProfile = () => {
    clearProfile();
    refreshProfile();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-semibold transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧪</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Profile Test & Demo</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Test profile validation logic and load mock profiles for development
            </p>
          </div>

          {/* Mock Profile Loader */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Load Mock Profiles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.keys(MOCK_PROFILES).map((key) => (
                <button
                  key={key}
                  onClick={() => handleLoadMockProfile(key)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition text-sm"
                >
                  {key}
                </button>
              ))}
            </div>
            <button
              onClick={handleClearProfile}
              className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            >
              Clear Profile
            </button>
          </div>

          {/* Current Profile Status */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Current Profile Status
            </h2>

            {currentProfile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Profile Complete</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {testResults.isComplete ? (
                        <span className="text-green-600">✅ Yes</span>
                      ) : (
                        <span className="text-red-600">❌ No</span>
                      )}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Completion</p>
                    <p className="text-2xl font-bold text-blue-600">{testResults.completionPercentage}%</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Profile Summary</p>
                  <p className="text-gray-900 font-medium">{testResults.profileSummary}</p>
                </div>

                {testResults.missingFields && testResults.missingFields.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                    <p className="text-sm font-semibold text-red-700 mb-2">Missing Required Fields:</p>
                    <ul className="list-disc list-inside text-red-600 text-sm">
                      {testResults.missingFields.map((field: string, index: number) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Needs Scholarships</p>
                    <p className="text-lg font-bold text-gray-900">
                      {testResults.needsScholarships ? '✅ Yes' : '❌ No'}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Primary Career</p>
                    <p className="text-lg font-bold text-gray-900">{testResults.primaryCareer || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No profile found. Load a mock profile to test.</p>
              </div>
            )}
          </div>

          {/* Profile Data Display */}
          {currentProfile && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Profile Data
              </h2>
              <div className="bg-white rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700">{JSON.stringify(currentProfile, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/onboarding')} variant="primary" size="lg">
              Go to Onboarding
            </Button>
            <Button onClick={() => navigate('/dashboard')} variant="secondary" size="lg">
              View Dashboard
            </Button>
            <Button onClick={refreshProfile} variant="secondary" size="lg">
              Refresh Profile
            </Button>
          </div>
        </div>

        {/* Test Results for All Mock Profiles */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mock Profile Test Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(MOCK_PROFILES).map(([key, profile]) => {
              const isComplete = isProfileComplete(profile);
              const completion = getProfileCompletionPercentage(profile);
              const missing = getMissingFields(profile);

              return (
                <div key={key} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 capitalize">{key}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complete:</span>
                      <span className={`font-semibold ${isComplete ? 'text-green-600' : 'text-red-600'}`}>
                        {isComplete ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion:</span>
                      <span className="font-semibold text-blue-600">{completion}%</span>
                    </div>
                    {missing.length > 0 && (
                      <div className="pt-2 border-t border-gray-300">
                        <p className="text-red-600 font-semibold mb-1">Missing:</p>
                        <p className="text-red-600 text-xs">{missing.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
