import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-sm mb-8">
                <span className="mr-2">🎉</span>
                Join 10,000+ Students
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Start Building Your Future Today
              </h2>

              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Get personalized guidance, discover opportunities, and unlock
                your potential with PathPilot's AI-powered platform
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  size="lg"
                  onClick={() => navigate('/onboarding')}
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 text-xl shadow-2xl"
                >
                  Get Started Free →
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90 text-sm">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* For Students */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              For Students
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover your path, explore careers, find universities, and get
              AI-powered guidance every step of the way
            </p>
            <Button variant="primary" size="md" className="w-full" onClick={() => navigate('/onboarding')}>
              Start Learning →
            </Button>
          </div>

          {/* For Educators */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              For Educators
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Help your students succeed with powerful tools to guide them
              through their educational and career journey
            </p>
            <Button variant="primary" size="md" className="w-full">
              Learn More →
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-12">
            Trusted by Students Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className="text-gray-600 font-medium">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-600 font-medium">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
