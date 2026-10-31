import React from 'react';
import { LedgerProvider, useLedger } from './context/LedgerContext';
import { LoginPage } from './components/auth/LoginPage';
import { AppShell } from './components/layout/AppShell';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useLedger();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <AppShell />;
};

export const App: React.FC = () => {
  return (
    <LedgerProvider>
      <MainApp />
    </LedgerProvider>
  );
};

export default App;

