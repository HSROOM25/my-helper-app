
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerProfileForm from '@/components/WorkerProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const WorkerProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileSubmit = (profileData: any) => {
    toast({
      title: "Profile saved!",
      description: "Your profile information has been updated.",
    });
    
    // Next, redirect to payment page
    navigate('/worker-payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Complete Your Worker Profile</CardTitle>
            <CardDescription>
              Please fill in your details to complete your worker registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkerProfileForm onSubmit={handleProfileSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
