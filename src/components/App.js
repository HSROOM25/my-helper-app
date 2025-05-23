import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from '@/integrations/supabase/client';
import Auth from './components/Auth';
import Account from './components/Account';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilesPage from './pages/ProfilesPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import ServicesPage from './pages/ServicesPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/profiles"
            element={session ? <ProfilesPage /> : <Navigate to="/" replace />}
          />

          <Route
            path="/profile/:id"
            element={session ? <ProfileDetailPage /> : <Navigate to="/" replace />}
          />

          <Route
            path="/services"
            element={session ? <ServicesPage /> : <Navigate to="/register" replace />}
          />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/account"
            element={session ? <Account key={session.user.id} session={session} /> : <Navigate to="/register" replace />}
          />

          {!session && <Route path="/auth" element={<Auth />} />}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
