import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData: object) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendOTP: (email: string, phone?: string) => Promise<boolean>;
  verifyOTP: (email: string, token: string) => Promise<boolean>;
  signInWithOTP: (email: string) => Promise<boolean>;
  signInWithPhone: (phone: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        // Use setTimeout to prevent auth deadlocks
        setTimeout(() => {
          navigate('/');
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been logged out.",
        });
        
        // Use setTimeout to prevent auth deadlocks
        setTimeout(() => {
          navigate('/login');
        }, 0);
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast, navigate]);

  const signUp = async (email: string, password: string, userData: object) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      
      toast({
        title: "Registration successful!",
        description: "Please check your email for verification instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Navigation is handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signInWithOTP = async (email: string) => {
    try {
      setLoading(true);
      // Use the correct type for the signInWithOtp call
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email
      });

      if (error) throw error;
      
      toast({
        title: "OTP sent successfully",
        description: "Please check your email for the login link",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error during OTP sign in:', error);
      toast({
        title: "Error sending OTP",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phone: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone
      });

      if (error) throw error;
      
      toast({
        title: "OTP sent successfully",
        description: "Please check your phone for the verification code",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error during phone OTP sign in:', error);
      toast({
        title: "Error sending OTP",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Navigation is handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendOTP = async (email: string, phone?: string) => {
    try {
      let channel = 'email';
      let target = email;
      
      if (phone) {
        channel = 'sms';
        target = phone;
      }
      
      const { error } = await supabase.auth.signInWithOtp({
        [channel]: target,
      });

      if (error) throw error;
      
      toast({
        title: "Code sent successfully",
        description: `Please check your ${channel} for the verification code.`,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Failed to send code",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'magiclink',
      });

      if (error) throw error;
      
      toast({
        title: "Verification successful",
        description: "You have successfully logged in.",
      });
      
      navigate('/');
      return true;
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    sendOTP,
    verifyOTP,
    signInWithOTP,
    signInWithPhone
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
