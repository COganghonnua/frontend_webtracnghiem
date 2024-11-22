import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './store/authContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App