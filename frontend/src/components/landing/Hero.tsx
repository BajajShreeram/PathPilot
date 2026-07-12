import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-transparent to-purple-100/50 animate-gradient"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-orange-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-float animation-delay-3000"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto py-20">
        <div className="space-y-8 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200 mb-8">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-900">
              AI-Powered Career Navigation
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight leading-tight">
            Build Your Future,
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              One Step at a Time
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            Navigate your educational and career journey with personalized
            roadmaps, AI-powered mentorship, and curated opportunities tailored
            just for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="text-xl w-full sm:w-auto"
            >
              Start Your Journey →
            </Button>
          </div>

          {/* Stats/Social Proof */}
          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                10K+
              </div>
              <div className="text-sm sm:text-base text-gray-600 mt-1">
                Students Guided
              </div>
            </div>
            <div className="text-center border-x border-gray-300">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                500+
              </div>
              <div className="text-sm sm:text-base text-gray-600 mt-1">
                Career Paths
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                24/7
              </div>
              <div className="text-sm sm:text-base text-gray-600 mt-1">
                AI Support
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
