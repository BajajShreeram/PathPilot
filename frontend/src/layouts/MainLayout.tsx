import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

/**
 * MainLayout - ChatGPT-style layout with collapsible sidebar
 * Sidebar is part of the page layout (not fixed overlay)
 * Uses flexbox for responsive layout
 */
const MainLayout = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/ai-mentor', label: 'AI Mentor', icon: '🤖' },
    { path: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { path: '/universities', label: 'Universities', icon: '🎓' },
    { path: '/scholarships', label: 'Scholarships', icon: '💰' },
    { path: '/deadlines', label: 'Deadlines', icon: '📅' },
    { path: '/onboarding', label: 'Profile', icon: '👤' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Desktop Sidebar - Part of layout, not fixed overlay */}
      <aside
        className={`hidden lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        {/* Logo/Brand */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {!isSidebarCollapsed ? (
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                P
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  PathPilot
                </h1>
                <p className="text-xs text-gray-500">AI Career Guide</p>
              </div>
            </Link>
          ) : (
            <Link to="/dashboard" className="mx-auto">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform">
                P
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
        </div>

        {/* Footer - Help */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-t border-gray-100">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 text-center border border-blue-100">
              <p className="text-xs text-gray-600 mb-2 font-medium">Need help?</p>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Contact Support →
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
              P
            </div>
            <h1 className="text-lg font-bold text-gray-900">PathPilot</h1>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Logo */}
        <div className="p-4 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              P
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">PathPilot</h1>
              <p className="text-xs text-gray-500">AI Career Guide</p>
            </div>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-5rem)]">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area - Flexbox automatically calculates width */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile spacing for fixed header */}
        <div className="lg:hidden h-16" />
        
        {/* Page content */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
