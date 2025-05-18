
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, Shield, User, Mail } from 'lucide-react';
import Logo from '@/components/Logo';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This is where we would handle login logic
      console.log('Login attempt with:', email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For security, we now show the MFA step for all users
      setShowMFA(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Login error:', error);
      setIsSubmitting(false);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Verifying MFA code:', mfaCode);
      
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code
      if (mfaCode.length === 6 && /^\d+$/.test(mfaCode)) {
        toast({
          title: "Login successful!",
          description: "Welcome back to your account.",
        });
        
        // Redirect to home page
        navigate('/');
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      console.error('MFA verification error:', error);
      setIsSubmitting(false);
      toast({
        title: "Verification failed",
        description: "Please check your verification code and try again.",
        variant: "destructive"
      });
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This is where we would handle password reset logic
      console.log('Password reset requested for:', resetEmail);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetSubmitted(true);
      setIsSubmitting(false);
      
      toast({
        title: "Password reset link sent",
        description: "Please check your email for instructions to reset your password.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setIsSubmitting(false);
      toast({
        title: "Password reset failed",
        description: "Please check your email and try again.",
        variant: "destructive"
      });
    }
  };

  // Forgot password screen
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Logo size="large" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
            <CardDescription className="text-center">
              {resetSubmitted ? 
                "We've sent you an email with instructions to reset your password." : 
                "Enter your email address and we'll send you a link to reset your password."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resetSubmitted ? (
              <div className="flex flex-col items-center justify-center py-4">
                <Mail className="h-16 w-16 text-blue-500 mb-4" />
                <p className="text-center text-gray-600 mb-4">
                  Please check your inbox and follow the instructions to reset your password.
                </p>
                <Button 
                  onClick={() => setShowForgotPassword(false)} 
                  className="w-full mt-2"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input 
                    id="reset-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting || !resetEmail}
                >
                  {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {showMFA ? 'Two-Factor Authentication' : 'Sign in to your account'}
          </CardTitle>
          <CardDescription className="text-center">
            {showMFA 
              ? 'Enter the verification code sent to your device'
              : 'Enter your email and password to access your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showMFA ? (
            <form onSubmit={handleMFASubmit} className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mfa-code">Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={mfaCode} onChange={setMfaCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  We've sent a verification code to your email or phone
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting || mfaCode.length !== 6}
              >
                {isSubmitting ? 'Verifying...' : 'Verify'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button 
                    type="button" 
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          )}
        </CardContent>
        {!showMFA && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create an account
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
