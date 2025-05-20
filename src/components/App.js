
import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from '@/integrations/supabase/client'
import Auth from './components/Auth';
import Account from './components/Account';

function App() {

  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log("Auth state changed:", _event, session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="container mx-auto">
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  );
}

export default App;
