
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import {
  CheckCircle,
  FileText,
  UserCheck,
  ClipboardCheck,
  BadgeCheck,
  CreditCard,
  Calendar,
  Clock,
} from "lucide-react";
import ProfileMenu from '@/components/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProcessAndFeesPage = () => {
  const { user } = useAuth();
  
  const employerSteps = [
    {
      title: "Submit Application",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      description: "Fill out our employer registration form with your details and job requirements.",
      details: "Our simple online form lets you specify the type of worker you need, preferred working hours, and any special requirements."
    },
    {
      title: "Verification Process",
      icon: <UserCheck className="h-10 w-10 text-blue-500" />,
      description: "We verify your identity and address to ensure safety for our workers.",
      details: "You'll need to provide proof of identity and address, such as ID document and utility bill."
    },
    {
      title: "Worker Matching",
      icon: <ClipboardCheck className="h-10 w-10 text-blue-500" />,
      description: "We match you with suitable workers based on your requirements and their skills.",
      details: "Our matching algorithm considers location, skills, experience, and availability to find the perfect match."
    },
    {
      title: "Interview & Selection",
      icon: <Calendar className="h-10 w-10 text-blue-500" />,
      description: "Conduct interviews with potential workers to find the right fit for your needs.",
      details: "We can arrange face-to-face or virtual interviews with pre-screened candidates."
    },
    {
      title: "Agreement & Payment",
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      description: "Sign the agreement and pay the applicable fees to secure your worker.",
      details: "We handle all the paperwork and ensure both parties are protected with clear terms."
    }
  ];
  
  const workerSteps = [
    {
      title: "Submit Application",
      icon: <FileText className="h-10 w-10 text-green-500" />,
      description: "Complete our online worker registration form with your personal details and skills.",
      details: "The initial application helps us understand your experience, skills, and availability."
    },
    {
      title: "Document Verification",
      icon: <BadgeCheck className="h-10 w-10 text-green-500" />,
      description: "Submit required documents for verification, including ID, permits, and references.",
      details: "Our verification process includes identity verification, background checks, and reference calls."
    },
    {
      title: "Skills Assessment",
      icon: <ClipboardCheck className="h-10 w-10 text-green-500" />,
      description: "Undergo a skills assessment relevant to your field of work.",
      details: "Depending on your role, this may include practical tests, online assessments, or in-person demonstrations."
    },
    {
      title: "Training & Orientation",
      icon: <UserCheck className="h-10 w-10 text-green-500" />,
      description: "Complete our mandatory training and orientation program.",
      details: "This ensures you understand our standards, safety protocols, and can represent our agency professionally."
    },
    {
      title: "Job Matching",
      icon: <Calendar className="h-10 w-10 text-green-500" />,
      description: "We match you with suitable employers based on your skills and their requirements.",
      details: "Our algorithm considers your location, working hours preferences, and specializations to find great opportunities."
    }
  ];
  
  const employerFees = [
    {
      service: "Registration Fee",
      amount: "R250",
      description: "One-time fee for account setup and verification",
      notes: "Non-refundable, covers verification and profile creation"
    },
    {
      service: "Placement Fee",
      amount: "R1,500 - R3,000",
      description: "Fee for successfully matching you with a worker",
      notes: "Varies based on type of service and contract duration"
    },
    {
      service: "Replacement Guarantee",
      amount: "Free for 3 months",
      description: "If a worker doesn't work out, we'll find a replacement",
      notes: "Terms and conditions apply"
    },
    {
      service: "Express Matching",
      amount: "R800 additional",
      description: "Priority matching within 48 hours",
      notes: "Subject to availability of suitable candidates"
    }
  ];
  
  const workerFees = [
    {
      service: "Registration Fee",
      amount: "R150",
      description: "One-time fee for document verification and profile setup",
      notes: "Can be deducted from first month's salary if preferred"
    },
    {
      service: "Skills Assessment",
      amount: "R100 - R300",
      description: "Fee for skills testing appropriate to your field",
      notes: "Varies depending on specialized skills requiring testing"
    },
    {
      service: "Training Program",
      amount: "R500 - R1,500",
      description: "Required training programs depending on role",
      notes: "Some specialized training may have additional costs"
    },
    {
      service: "Monthly Agency Fee",
      amount: "5-10% of monthly salary",
      description: "Ongoing service fee for job placement and support",
      notes: "Reduces after 6 months of continuous employment"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <Logo size="medium" withText={true} />
          </Link>
          <div className="flex items-center space-x-3">
            <ProfileMenu />
            {!user && (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Our Process & Fees</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about our transparent application process and fee structure for both employers and workers.
          </p>
        </div>
        
        <Tabs defaultValue="process" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="process">Application Process</TabsTrigger>
            <TabsTrigger value="fees">Fee Structure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <UserCheck className="mr-2 h-6 w-6 text-blue-500" />
                  For Employers
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6 relative">
                  <div className="absolute top-0 bottom-0 left-12 border-l-2 border-dashed border-blue-200"></div>
                  <div className="space-y-8">
                    {employerSteps.map((step, index) => (
                      <div key={index} className="relative pl-12">
                        <div className="absolute left-0 -translate-x-1/2 bg-white p-1 z-10">
                          <div className="bg-blue-100 rounded-full p-2">
                            {step.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              {index + 1}
                            </span>
                            {step.title}
                          </h3>
                          <p className="text-gray-700 mb-2">{step.description}</p>
                          <p className="text-sm text-gray-600">{step.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <UserCheck className="mr-2 h-6 w-6 text-green-500" />
                  For Workers
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6 relative">
                  <div className="absolute top-0 bottom-0 left-12 border-l-2 border-dashed border-green-200"></div>
                  <div className="space-y-8">
                    {workerSteps.map((step, index) => (
                      <div key={index} className="relative pl-12">
                        <div className="absolute left-0 -translate-x-1/2 bg-white p-1 z-10">
                          <div className="bg-green-100 rounded-full p-2">
                            {step.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <span className="bg-green-100 text-green-800 text-sm rounded-full w-6 h-6 flex items-center justify-center mr-2">
                              {index + 1}
                            </span>
                            {step.title}
                          </h3>
                          <p className="text-gray-700 mb-2">{step.description}</p>
                          <p className="text-sm text-gray-600">{step.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mt-12">
              <h3 className="text-xl font-bold mb-6 text-center">What Sets Our Process Apart</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <Clock className="h-12 w-12 text-purple-500 mb-3" />
                  <h4 className="font-semibold mb-2">Fast & Efficient</h4>
                  <p className="text-sm text-gray-600">
                    Our streamlined process typically completes within 7-10 days for standard placements
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <BadgeCheck className="h-12 w-12 text-purple-500 mb-3" />
                  <h4 className="font-semibold mb-2">Thorough Verification</h4>
                  <p className="text-sm text-gray-600">
                    Multiple verification points ensure safety and reliability for all parties
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <UserCheck className="h-12 w-12 text-purple-500 mb-3" />
                  <h4 className="font-semibold mb-2">Personalized Matching</h4>
                  <p className="text-sm text-gray-600">
                    Our unique algorithm considers personality fit alongside skills and experience
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fees">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-600">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Employer Fees
                  </h2>
                  
                  <div className="space-y-6">
                    {employerFees.map((fee, index) => (
                      <div key={index}>
                        {index > 0 && <Separator className="my-4" />}
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{fee.service}</h3>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                              {fee.amount}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-1 text-sm">{fee.description}</p>
                          <p className="text-xs text-gray-500 italic">{fee.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md mt-8">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      Payment Options
                    </h4>
                    <p className="text-sm">
                      We accept bank transfers, credit cards, and installment payments for certain fees.
                      All fees are clearly outlined in our service agreement before any commitment.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center text-green-600">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Worker Fees
                  </h2>
                  
                  <div className="space-y-6">
                    {workerFees.map((fee, index) => (
                      <div key={index}>
                        {index > 0 && <Separator className="my-4" />}
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{fee.service}</h3>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                              {fee.amount}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-1 text-sm">{fee.description}</p>
                          <p className="text-xs text-gray-500 italic">{fee.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-md mt-8">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Financial Assistance
                    </h4>
                    <p className="text-sm">
                      We offer payment plans and fee deferrals for qualified applicants.
                      Ask about our scholarship program for training courses.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-12">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Are there any hidden fees?</h4>
                  <p className="text-sm text-gray-600">No, all applicable fees are transparently communicated upfront before any commitments are made. There are no hidden charges.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">When do I need to pay?</h4>
                  <p className="text-sm text-gray-600">Registration fees are due upon application. Placement fees are only due once a successful match is made and both parties agree.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What if the placement doesn't work out?</h4>
                  <p className="text-sm text-gray-600">We offer a 3-month guarantee period during which we'll provide a replacement worker at no additional placement fee if the initial match doesn't work out.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Can fees be negotiated?</h4>
                  <p className="text-sm text-gray-600">While our standard fees are fixed, we do offer discounts for bulk placements and long-term contracts. Contact us to discuss your specific situation.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Whether you're looking for quality help or seeking employment opportunities,
            our streamlined process makes it easy to get started.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProcessAndFeesPage;
