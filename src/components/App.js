
import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from '@/integrations/supabase/client'
import Auth from './components/Auth';
import Account from './components/Account';

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session)
      setSession(session)
    })

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session)
      setSession(session)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  );
}

export default App;
