import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface DashboardFeature {
  title: string;
  description: string;
  icon: string;
  stat: string;
  label: string;
}

interface Activity {
  action: string;
  time: string;
  color: string;
}

const DashboardPreview: React.FC = () => {
  const navigate = useNavigate();

  const dashboardFeatures: DashboardFeature[] = [
    {
      title: 'Progress Tracking',
      description: 'Visualize your learning journey',
      icon: '📊',
      stat: '75%',
      label: 'Completed',
    },
    {
      title: 'Upcoming Deadlines',
      description: 'Never miss important dates',
      icon: '📅',
      stat: '3',
      label: 'This Week',
    },
    {
      title: 'Recommended Tasks',
      description: 'AI-powered suggestions',
      icon: '✨',
      stat: '8',
      label: 'New Tasks',
    },
  ];

  const activities: Activity[] = [
    {
      action: 'Completed HTML Course',
      time: '2 hours ago',
      color: 'from-green-500 to-emerald-500',
    },
    {
      action: 'Added new career path',
      time: '1 day ago',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      action: 'Chatted with AI Mentor',
      time: '2 days ago',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section
      id="dashboard"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-6">
            <span className="mr-2">📱</span>
            Powerful Dashboard
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Everything in One Place
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            A beautiful, intuitive dashboard that keeps you organized and
            motivated throughout your journey
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"></div>

          {/* Main Dashboard Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    Welcome back, Student! 👋
                  </h3>
                  <p className="text-blue-100">Here's your progress overview</p>
                </div>
                <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    All systems active
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50">
              {dashboardFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg px-3 py-1">
                      <div className="text-2xl font-bold text-gray-900">
                        {feature.stat}
                      </div>
                      <div className="text-xs text-gray-600">
                        {feature.label}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Dashboard Content Preview */}
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {/* Current Goals */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Current Goals
                </h4>
                <div className="space-y-3">
                  {[
                    'Complete JavaScript Basics',
                    'Apply to 5 Universities',
                    'Research Scholarships',
                  ].map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-900 font-medium">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">⚡</span>
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${activity.color} mt-1.5 flex-shrink-0`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pb-8">
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">
                    Overall Progress
                  </h4>
                  <span className="text-2xl font-bold text-gray-900">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '67%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  You're making great progress! Keep it up! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to take control of your future?
          </p>
          <Button size="lg" className="text-xl" onClick={() => navigate('/dashboard')}>
            Access Your Dashboard →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
