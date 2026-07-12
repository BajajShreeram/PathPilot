import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SessionBootstrap } from './components/auth/SessionBootstrap';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionBootstrap><App /></SessionBootstrap>
  </StrictMode>
);
