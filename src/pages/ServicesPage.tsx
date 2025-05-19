
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from 'react-router-dom';
import Logo from '@/components/Logo';
import {
  Home,
  Heart,
  GraduationCap,
  School,
  Book,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import ProfileMenu from '@/components/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  subServices?: SubService[];
}

interface SubService {
  id: string;
  name: string;
  description: string;
  price?: string;
  requirements?: string[];
}

const ServicesPage = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  
  const services: Service[] = [
    {
      id: "household",
      name: "Household Services",
      description: "Professional cleaning, gardening, and home maintenance services",
      icon: <Home className="h-8 w-8" />,
      subServices: [
        {
          id: "cleaning",
          name: "House Cleaning",
          description: "General house cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning.",
          price: "From R200 per session"
        },
        {
          id: "gardening",
          name: "Gardening",
          description: "Lawn mowing, plant care, weeding, and garden maintenance.",
          price: "From R150 per hour"
        }
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare & Elderly Care",
      description: "Compassionate care services for the elderly and those in need",
      icon: <Heart className="h-8 w-8" />,
      subServices: [
        {
          id: "elder-care",
          name: "Elder Care",
          description: "Companion care, medication reminders, light housekeeping, and personal care.",
          price: "From R180 per hour"
        },
        {
          id: "patient-care",
          name: "Patient Care",
          description: "Post-hospital care, assistance with daily activities, and health monitoring.",
          price: "From R200 per hour"
        }
      ]
    },
    {
      id: "tutoring",
      name: "Tutoring & Education",
      description: "Expert tutoring services for all ages and subjects",
      icon: <GraduationCap className="h-8 w-8" />,
      subServices: [
        {
          id: "academic",
          name: "Academic Tutoring",
          description: "One-on-one tutoring for primary and high school subjects including mathematics, science, languages, and more.",
          price: "From R150 per hour"
        },
        {
          id: "homework",
          name: "Homework Help",
          description: "Assistance with completing and understanding school assignments.",
          price: "From R120 per hour"
        },
        {
          id: "first-aid-cpr",
          name: "First Aid & CPR Lessons",
          description: "Learn essential first aid skills, CPR techniques, and emergency response procedures from certified instructors.",
          price: "From R350 per session",
          requirements: [
            "Minimum age: 16 years",
            "No prior experience required",
            "Certification available upon completion"
          ]
        },
        {
          id: "hygiene-cleaning",
          name: "Hygiene & Household Cleaning Lessons",
          description: "Professional training on proper hygiene practices, effective cleaning techniques, and maintaining a healthy home environment.",
          price: "From R250 per session",
          requirements: [
            "Open to all ages",
            "Materials provided",
            "Practical demonstrations included"
          ]
        }
      ]
    },
    {
      id: "childcare",
      name: "Childcare & Babysitting",
      description: "Reliable and experienced childcare services",
      icon: <School className="h-8 w-8" />,
      subServices: [
        {
          id: "babysitting",
          name: "Babysitting",
          description: "Occasional or regular childcare in your home, including activities, meal preparation, and bedtime routines.",
          price: "From R120 per hour"
        },
        {
          id: "afterschool",
          name: "After School Care",
          description: "Pickup from school, homework help, and supervision until parents return home.",
          price: "From R1000 per week"
        }
      ]
    }
  ];

  const [selectedService, setSelectedService] = useState<Service | null>(
    serviceId ? services.find(s => s.id === serviceId) || null : null
  );

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
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>

        {/* Service Selection */}
        {!selectedService ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {service.icon}
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedService(null)}
              >
                ← Back to All Services
              </Button>
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedService.subServices?.map((subService) => (
                <Card key={subService.id}>
                  <CardHeader>
                    <CardTitle>{subService.name}</CardTitle>
                    {subService.id === 'first-aid-cpr' && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <Stethoscope className="h-5 w-5" />
                        <span className="text-sm font-medium">Certification Available</span>
                      </div>
                    )}
                    {subService.id === 'hygiene-cleaning' && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Sparkles className="h-5 w-5" />
                        <span className="text-sm font-medium">Professional Training</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{subService.description}</p>
                    <div className="font-medium text-lg">{subService.price}</div>
                    
                    {subService.requirements && (
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {subService.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Book Service</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServicesPage;
