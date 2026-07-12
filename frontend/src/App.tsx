import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts';
import {
  HomePage,
  LandingPage,
  NotFoundPage,
  OnboardingPage,
  DashboardPage,
  AIMentorPage,
  RoadmapPage,
  UniversitiesPage,
  ScholarshipsPage,
  DeadlinesPage,
  ProfileTestPage,
  ProfilePage,
  AchievementsPage,
  LoginPage,
} from './pages';

/**
 * Router configuration with MainLayout wrapper for all app pages
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile-test',
    element: <ProfileTestPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'ai-mentor',
        element: <AIMentorPage />,
      },
      {
        path: 'roadmap',
        element: <RoadmapPage />,
      },
      {
        path: 'universities',
        element: <UniversitiesPage />,
      },
      {
        path: 'scholarships',
        element: <ScholarshipsPage />,
      },
      {
        path: 'deadlines',
        element: <DeadlinesPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'achievements',
        element: <AchievementsPage />,
      },
      {
        path: 'app',
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
