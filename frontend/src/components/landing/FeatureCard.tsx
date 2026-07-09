import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  premium?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
  premium = false,
}) => {
  return (
    <div
      className={`group relative bg-white rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-3 border-2 ${
        premium
          ? 'border-transparent bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 hover:shadow-2xl hover:shadow-purple-500/20'
          : 'border-gray-100 hover:border-blue-200 hover:shadow-2xl'
      }`}
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      }}
    >
      {/* Premium badge */}
      {premium && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ Premium
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animated background */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

        {/* Learn More Link */}
        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-purple-600 transition-colors">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-100/50 via-purple-100/30 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default FeatureCard;
