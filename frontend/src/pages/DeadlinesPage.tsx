import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData } from '../types';
import { getPersonalizedDeadlines } from '../lib/personalization';

export const DeadlinesPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [deadlines, setDeadlines] = useState<any[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfile(parsedProfile);
      setDeadlines(getPersonalizedDeadlines(parsedProfile));
    } else {
      setDeadlines(getPersonalizedDeadlines(null));
    }
  }, []);

  const filteredDeadlines = filter === 'all' ? deadlines : deadlines.filter((d) => d.category === filter);

  const sortedDeadlines = [...filteredDeadlines].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dateString);
    deadline.setHours(0, 0, 0, 0);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300',
  };

  // Filter only upcoming deadlines
  const upcomingDeadlines = sortedDeadlines.filter((deadline) => getDaysUntil(deadline.date) >= 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-red-600 hover:text-red-700 font-semibold transition"
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
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📅</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Deadlines</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Track important dates for {profile?.careerInterests?.[0] || 'your journey'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {['all', 'Entrance Exam', 'Standardized Test', 'University Application', 'Professional Course'].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition text-sm ${
                    filter === category ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Deadlines' : category}
                </button>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          {upcomingDeadlines.map((deadline, index) => {
            const daysUntil = getDaysUntil(deadline.date);
            const isUrgent = daysUntil <= 30 && daysUntil >= 0;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${
                  isUrgent ? 'border-2 border-red-400' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-grow mb-4 sm:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900 mr-3">{deadline.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${priorityColors[deadline.priority as keyof typeof priorityColors]}`}
                      >
                        {deadline.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{deadline.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">📂 {deadline.category}</span>
                      <span>📅 {formatDate(deadline.date)}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-center">
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        isUrgent
                          ? 'bg-red-500 text-white'
                          : daysUntil <= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <p className="text-2xl font-bold">{daysUntil}</p>
                      <p className="text-xs">{daysUntil === 1 ? 'day left' : 'days left'}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {upcomingDeadlines.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">
              No upcoming deadlines found. Complete your profile to see personalized deadlines!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
