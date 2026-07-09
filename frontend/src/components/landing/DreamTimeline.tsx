import React, { useState } from 'react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  details: string[];
}

const DreamTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const milestones: Milestone[] = [
    {
      year: 'Today',
      title: 'Start Your Journey',
      description:
        'Discover your interests, explore career paths, and set your goals with PathPilot.',
      color: 'from-blue-500 to-blue-600',
      icon: '🚀',
      details: [
        'Complete personality & skills assessment',
        'Explore 500+ career paths',
        'Set SMART goals',
      ],
    },
    {
      year: 'Year 1',
      title: 'Build Your Foundation',
      description:
        'Learn essential skills, earn certifications, and apply to top universities with scholarship guidance.',
      color: 'from-purple-500 to-purple-600',
      icon: '📚',
      details: [
        'Follow personalized learning roadmap',
        'Earn industry certifications',
        'Apply to universities & scholarships',
      ],
    },
    {
      year: 'Year 2-4',
      title: 'Grow & Excel',
      description:
        'Follow your personalized roadmap, gain real-world experience, and build a strong portfolio.',
      color: 'from-pink-500 to-pink-600',
      icon: '💪',
      details: [
        'Complete projects & build portfolio',
        'Get internships & work experience',
        'Network with professionals',
      ],
    },
    {
      year: 'Beyond',
      title: 'Achieve Your Dreams',
      description:
        'Land your dream job, make an impact in your field, and continue growing with AI-powered mentorship.',
      color: 'from-orange-500 to-orange-600',
      icon: '🎯',
      details: [
        'Land your dream career',
        'Continuous skill development',
        'Lifetime mentorship support',
      ],
    },
  ];

  return (
    <section
      id="roadmaps"
      className="py-20 sm:py-24 lg:py-32 bg-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-semibold text-sm mb-6">
            <span className="mr-2">🗺️</span>
            Your Personalized Roadmap
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Dream Timeline
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            From where you are today to where you want to be tomorrow — we'll
            guide you every step of the way
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-pink-200 to-orange-200"></div>

            {/* Active Progress Line */}
            <div
              className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-1000"
              style={{
                width: `${(activeIndex / (milestones.length - 1)) * 100}%`,
              }}
            ></div>

            {/* Timeline Dots */}
            <div className="relative flex justify-between mb-20">
              {milestones.map((milestone, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative group flex flex-col items-center transition-all duration-300 ${
                    index <= activeIndex ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ width: `${100 / milestones.length}%` }}
                >
                  {/* Dot */}
                  <div
                    className={`w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                      index <= activeIndex
                        ? `bg-gradient-to-r ${milestone.color}`
                        : 'bg-gray-300'
                    } ${index === activeIndex ? 'ring-4 ring-blue-200' : ''}`}
                  ></div>

                  {/* Year Label */}
                  <div
                    className={`mt-4 font-semibold text-sm transition-colors ${
                      index === activeIndex ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {milestone.year}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer transform transition-all duration-500 ${
                  index === activeIndex
                    ? 'lg:scale-105 lg:-translate-y-4'
                    : 'lg:scale-100 lg:translate-y-0 lg:opacity-70 hover:opacity-100'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div
                  className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 ${
                    index === activeIndex
                      ? 'border-blue-500 shadow-2xl'
                      : 'border-gray-100 hover:border-blue-300 hover:shadow-2xl'
                  }`}
                >
                  {/* Icon */}
                  <div className="text-5xl mb-4">{milestone.icon}</div>

                  {/* Badge */}
                  <div
                    className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${milestone.color} text-white font-semibold text-sm mb-4`}
                  >
                    {milestone.year}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {milestone.description}
                  </p>

                  {/* Details (shown when active) */}
                  {index === activeIndex && (
                    <div className="space-y-2 animate-fadeIn">
                      {milestone.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <svg
                            className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline Indicator */}
        <div className="lg:hidden mt-12 flex justify-center space-x-2">
          {milestones.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DreamTimeline;
