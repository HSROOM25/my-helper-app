
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from "@/hooks/use-toast"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      
      // First, check if the user exists
      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers({
        filter: {
          email: email
        }
      }).catch(() => ({ data: { users: [] }, error: null }));

      // Try to sign in with OTP
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: window.location.origin,
        }
      })
      
      if (error) throw error
      
      // Show appropriate toast message
      if (users && users.length > 0) {
        toast({
          title: "Check your email",
          description: "We sent you a login link. Be sure to check your spam folder too. (Note: There might be issues with the email provider, please check Supabase settings)",
          duration: 6000,
        })
      } else {
        toast({
          title: "Check your email",
          description: "We sent you a registration link. Be sure to check your spam folder too. (Note: There might be issues with the email provider, please check Supabase settings)",
          duration: 6000,
        })
      }
      
    } catch (error) {
      console.error("Authentication error:", error);
      
      if (error.message?.includes("domain with your API key is not verified")) {
        toast({
          title: "Email Verification Issue",
          description: "There's a problem with the email provider configuration. Please contact the administrator.",
          variant: "destructive",
          duration: 6000,
        })
      } else {
        toast({
          title: "Error",
          description: error.error_description || error.message,
          variant: "destructive",
          duration: 6000,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto text-center w-72">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header text-3xl py-3 text-gray-600">Log in</h1>
        <p className="text-xs text-gray-500 pb-3">Sign in via magic link with your email below</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form onSubmit={handleLogin}>
            <input type="email" 
              name="email" 
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              placeholder="your@email.com"
              id="website"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <button className="my-3 w-36 text-xs h-8 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700" >
               Send magic link
              </button>
          </form>
        )}
        
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-xs text-amber-700">
            <strong>Note:</strong> There appears to be an issue with the email provider configuration in Supabase. 
            If you don't receive the email, please check Supabase settings or contact the administrator.
          </p>
        </div>
      </div>
    </div>
  )
}
