import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  gradient: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, path, gradient }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={`group cursor-pointer bg-gradient-to-br ${gradient} rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6`}
    >
      <div className="flex flex-col h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/90 text-sm flex-grow">{description}</p>
        <div className="mt-4 flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
          Explore
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
