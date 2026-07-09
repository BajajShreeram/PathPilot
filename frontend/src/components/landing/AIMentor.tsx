import React, { useState } from 'react';
import Button from './Button';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const AIMentor: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      type: 'user',
      text: "I want to become a software engineer but I'm not sure where to start.",
    },
    {
      type: 'ai',
      text: "Great goal! Let me create a personalized roadmap for you. First, let's assess your current skills and interests.",
    },
    {
      type: 'user',
      text: 'I have basic knowledge of HTML and CSS.',
    },
    {
      type: 'ai',
      text: "Perfect starting point! I recommend focusing on JavaScript next, then React. I've created a 6-month learning path with resources, projects, and milestones tailored to your pace.",
    },
  ]);

  const features: Feature[] = [
    {
      icon: '🎯',
      title: 'Personalized Guidance',
      description:
        'Get advice tailored to your unique skills, interests, and career goals',
    },
    {
      icon: '⚡',
      title: 'Instant Responses',
      description:
        '24/7 availability for any questions about careers, education, or roadmaps',
    },
    {
      icon: '📚',
      title: 'Resource Recommendations',
      description:
        'Curated learning materials, courses, and opportunities just for you',
    },
    {
      icon: '🚀',
      title: 'Progress Tracking',
      description:
        'Monitor your journey and receive timely suggestions to stay on track',
    },
  ];

  return (
    <section
      id="ai-mentor"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
            <span className="mr-2">🤖</span>
            AI-Powered Mentorship
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal AI Mentor
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Get intelligent, personalized guidance anytime, anywhere. Your AI
            mentor understands your goals and helps you achieve them.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Chat Preview */}
          <div className="order-2 lg:order-1">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-500">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Mentor</h3>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Always available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 bg-gray-50 max-h-96 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    } animate-fadeInUp`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 shadow-md border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                <div
                  className="flex justify-start animate-fadeInUp"
                  style={{ animationDelay: '0.8s' }}
                >
                  <div className="bg-white text-gray-900 shadow-md border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                  <button className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-shadow">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2 space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="text-xl">
            Try AI Mentor Now →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIMentor;
