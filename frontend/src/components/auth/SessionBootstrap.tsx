import React, { useEffect, useState } from 'react';
import { restoreSession } from '../../utils/authSession';

export const SessionBootstrap: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => { restoreSession().catch(() => undefined).finally(() => setReady(true)); }, []);
  if (!ready) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"><p className="font-semibold text-blue-700">Loading PathPilot…</p></div>;
  return children;
};

