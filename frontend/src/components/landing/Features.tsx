import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import Button from './Button';

const Features: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '💼',
      title: 'Career Exploration',
      description:
        'Explore 500+ career paths with detailed insights, salary information, growth opportunities, and day-in-the-life perspectives tailored to your interests.',
      premium: true,
    },
    {
      icon: '🎓',
      title: 'University Finder',
      description:
        'Discover top universities worldwide with comprehensive details on programs, admission requirements, campus life, and student reviews to find your perfect match.',
      premium: false,
    },
    {
      icon: '🏆',
      title: 'Scholarship Database',
      description:
        'Access thousands of scholarship opportunities with personalized recommendations, eligibility checkers, and application tracking to help fund your education.',
      premium: true,
    },
    {
      icon: '🗺️',
      title: 'Smart Roadmaps',
      description:
        'Get AI-generated, step-by-step personalized roadmaps that adapt to your pace and guide you from where you are to where you want to be.',
      premium: true,
    },
    {
      icon: '🤖',
      title: 'AI Mentor 24/7',
      description:
        'Your personal AI-powered mentor providing intelligent guidance, answering questions, and offering personalized advice for your unique journey.',
      premium: true,
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description:
        'Track your learning journey with detailed analytics, milestone celebrations, and data-driven insights to keep you motivated and on track.',
      premium: false,
    },
  ];

  const handleExploreFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="features"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-semibold text-sm mb-6">
            <span className="mr-2">✨</span>
            Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools and resources designed to guide you through
            every step of your educational and career journey
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              premium={feature.premium}
            />
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900">Always Free</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Core features available to everyone, forever
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900">Privacy First</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Your data is encrypted and never shared
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900">Lightning Fast</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Optimized for speed and performance
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to unlock all features?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students already using PathPilot to navigate their
            future
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={handleExploreFeatures}>
              Explore Features
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/onboarding')}
            >
              Get Started Free →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
