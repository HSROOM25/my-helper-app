
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerProfileForm from '@/components/WorkerProfileForm';
import WorkerScreeningForm from '@/components/WorkerScreeningForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

const WorkerProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileSubmit = (profileData: any) => {
    console.log('Profile submitted:', profileData);
    
    toast({
      title: "Profile saved!",
      description: "Your profile information has been updated.",
    });
    
    // Move to screening tab
    setActiveTab('screening');
  };

  const handleScreeningSubmit = (screeningData: any) => {
    console.log('Screening submitted:', screeningData);
    
    toast({
      title: "Screening completed!",
      description: "Your screening information has been saved.",
    });
    
    console.log('Redirecting to payment page...');
    // Next, redirect to payment page
    navigate('/worker-payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {user && <UserProfile />}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="screening">Worker Screening</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
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
          </TabsContent>
          
          <TabsContent value="screening">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Worker Screening</CardTitle>
                <CardDescription>
                  Complete this screening questionnaire to help employers know more about your qualifications and background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorkerScreeningForm onSubmit={handleScreeningSubmit} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
