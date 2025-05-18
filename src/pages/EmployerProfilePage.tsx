
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import EmployerProfileForm from '@/components/EmployerProfileForm';

const EmployerProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileSubmit = (profileData: any) => {
    console.log('Employer profile submitted:', profileData);
    
    toast({
      title: "Profile saved!",
      description: "Your employer profile has been created successfully.",
    });
    
    console.log('Redirecting to home page...');
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Complete Your Employer Profile</CardTitle>
            <CardDescription>
              Please fill in your details to complete your employer registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployerProfileForm onSubmit={handleProfileSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerProfilePage;
