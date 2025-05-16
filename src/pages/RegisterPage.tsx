import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Logo from '@/components/Logo';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('employer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where we would handle registration logic
    console.log('Registration attempt with:', accountType, formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Choose your account type and enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="employer" 
            value={accountType} 
            onValueChange={setAccountType}
            className="w-full mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employer">Employer</TabsTrigger>
              <TabsTrigger value="worker">Worker</TabsTrigger>
            </TabsList>
            <TabsContent value="employer" className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Create an employer account to find and hire workers for your tasks.
              </p>
            </TabsContent>
            <TabsContent value="worker" className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Create a worker account to offer your services. A registration fee of R250 is required annually.
              </p>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  placeholder="John" 
                  required 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Doe" 
                  required 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required
                  value={formData.password}
                  onChange={handleChange}
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {accountType === 'worker' && (
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> A registration fee of R250 is required to activate your worker account. 
                  You will be prompted to make payment after registration. After registration, you'll need to complete your 
                  profile with bio, work experience, nationality, and address information.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
