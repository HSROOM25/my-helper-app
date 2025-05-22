import React, { useState } from 'react'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from '@/integrations/supabase/client';

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('employer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phoneNumber,
            account_type: accountType,
          }
        }
      });
      if (error) throw error;
      setShowOTP(true);
      toast({ title: "Account created!", description: "Please verify with the OTP sent." });
    } catch (error: any) {
      setIsSubmitting(false);
      toast({ title: "Registration failed", description: error.message || "Something went wrong.", variant: "destructive" });
    }
  };

  const handleVerifyOTP = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast({ title: "Account Verified!", description: "Redirecting to profile..." });
      navigate(accountType === 'worker' ? '/worker-profile' : '/employer-profile');
    } catch (error) {
      setIsSubmitting(false);
      toast({ title: "Verification Failed", description: "Invalid OTP.", variant: "destructive" });
    }
  };

  const resendOTP = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: "OTP Resent", description: `Check your ${verificationMethod}` });
    } catch (error) {
      toast({ title: "Resend Failed", description: "Try again later.", variant: "destructive" });
    }
  };

  if (showOTP) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4"><Logo size="large" /></div>
            <CardTitle className="text-2xl text-center">Verify Your Account</CardTitle>
            <CardDescription className="text-center">Enter the code sent to your {verificationMethod}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>OTP Code</Label>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
              </InputOTPGroup>
            </InputOTP>
            <Button onClick={handleVerifyOTP} disabled={otp.length !== 6 || isSubmitting} className="w-full">
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </Button>
            <p className="text-sm text-center">
              Didn't get it? <button onClick={resendOTP} className="text-blue-600 hover:underline">Resend</button>
            </p>
            <p className="text-sm text-center">
              <button onClick={() => { setShowOTP(false); setOtp(""); }} className="text-gray-500 hover:underline">Back to form</button>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4"><Logo size="large" /></div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Choose your account type and enter your details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={accountType} onValueChange={setAccountType} className="mb-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="employer">Employer</TabsTrigger>
              <TabsTrigger value="worker">Worker</TabsTrigger>
            </TabsList>
            <TabsContent value="employer" className="mt-2 text-sm text-gray-500">Find and hire workers.</TabsContent>
            <TabsContent value="worker" className="mt-2 text-sm text-gray-500">Offer services. Annual fee: R250.</TabsContent>
          </Tabs>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required className={errors.firstName && 'border-red-500'} />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required className={errors.lastName && 'border-red-500'} />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required className={errors.email && 'border-red-500'} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+27 123 456 7890" required className={errors.phoneNumber && 'border-red-500'} />
              {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
            </div>
            <div>
              <Label>Verification Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant={verificationMethod === 'email' ? 'default' : 'outline'} onClick={() => setVerificationMethod('email')}>Email</Button>
                <Button type="button" variant={verificationMethod === 'phone' ? 'default' : 'outline'} onClick={() => setVerificationMethod('phone')}>Phone</Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Verification code will be sent via {verificationMethod}.</p>
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" required className={errors.password && 'border-red-500'} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon className="h-4 w-4 text-gray-500" /> : <EyeIcon className="h-4 w-4 text-gray-500" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required className={errors.confirmPassword && 'border-red-500'} />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
