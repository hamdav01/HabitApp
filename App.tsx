import React from 'react';
import { AuthProvider } from './src/context/auth/AuthProvider';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
