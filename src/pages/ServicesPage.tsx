
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
  ChevronRight,
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";
import ProfileMenu from '@/components/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefits?: string[];
  subServices?: SubService[];
}

interface SubService {
  id: string;
  name: string;
  description: string;
  price?: string;
  duration?: string;
  requirements?: string[];
  features?: string[];
  certification?: boolean;
}

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  certification: boolean;
}

const ServicesPage = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("services");
  
  const services: Service[] = [
    {
      id: "household",
      name: "Household Services",
      description: "Professional cleaning, gardening, and home maintenance services",
      icon: <Home className="h-8 w-8" />,
      benefits: [
        "Vetted, experienced professionals",
        "Flexible scheduling options",
        "Eco-friendly cleaning products available",
        "Comprehensive home maintenance solutions"
      ],
      subServices: [
        {
          id: "cleaning",
          name: "House Cleaning",
          description: "Thorough house cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning.",
          price: "From R200 per session",
          duration: "3-4 hours",
          features: [
            "Deep cleaning of all rooms",
            "Kitchen and bathroom sanitizing",
            "Dusting and polishing furniture",
            "Vacuuming and mopping floors",
            "Window sill cleaning"
          ]
        },
        {
          id: "gardening",
          name: "Gardening",
          description: "Complete garden maintenance including lawn mowing, plant care, weeding, and landscaping.",
          price: "From R150 per hour",
          duration: "As needed",
          features: [
            "Lawn mowing and edging",
            "Plant and flower care",
            "Weed removal and control",
            "Garden bed maintenance",
            "Basic landscaping"
          ]
        }
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare & Elderly Care",
      description: "Compassionate care services for the elderly and those in need",
      icon: <Heart className="h-8 w-8" />,
      benefits: [
        "Qualified healthcare professionals",
        "Personalized care plans",
        "24/7 availability",
        "Companion care and emotional support"
      ],
      subServices: [
        {
          id: "elder-care",
          name: "Elder Care",
          description: "Comprehensive elder care including companionship, medication reminders, light housekeeping, and personal care.",
          price: "From R180 per hour",
          duration: "4-8 hours per day",
          features: [
            "Personal hygiene assistance",
            "Medication management",
            "Meal preparation",
            "Companionship and emotional support",
            "Light housekeeping",
            "Transportation to appointments"
          ]
        },
        {
          id: "patient-care",
          name: "Patient Care",
          description: "Professional care for patients recovering from surgery or illness, including health monitoring and assistance with daily activities.",
          price: "From R200 per hour",
          duration: "As needed",
          features: [
            "Post-hospital recovery care",
            "Vital signs monitoring",
            "Medication administration",
            "Wound care assistance",
            "Mobility assistance",
            "Daily activity support"
          ]
        }
      ]
    },
    {
      id: "tutoring",
      name: "Tutoring & Education",
      description: "Expert tutoring services for all ages and subjects",
      icon: <GraduationCap className="h-8 w-8" />,
      benefits: [
        "Qualified teachers and tutors",
        "Customized learning plans",
        "Improved academic performance",
        "Boost in confidence and motivation"
      ],
      subServices: [
        {
          id: "academic",
          name: "Academic Tutoring",
          description: "Personalized one-on-one tutoring for primary and high school subjects including mathematics, science, languages, and more.",
          price: "From R150 per hour",
          duration: "1-2 hours per session",
          features: [
            "Subject-specific expertise",
            "Homework help and explanation",
            "Test and exam preparation",
            "Concept clarification",
            "Study skills development"
          ]
        },
        {
          id: "homework",
          name: "Homework Help",
          description: "Focused assistance with completing and understanding school assignments across all subjects.",
          price: "From R120 per hour",
          duration: "1-2 hours per session",
          features: [
            "Assignment completion support",
            "Project assistance",
            "Research guidance",
            "Time management skills",
            "Organization techniques"
          ]
        }
      ]
    },
    {
      id: "childcare",
      name: "Childcare & Babysitting",
      description: "Reliable and experienced childcare services",
      icon: <School className="h-8 w-8" />,
      benefits: [
        "Background-checked childcare providers",
        "Age-appropriate activities",
        "Safe and nurturing environment",
        "Flexible scheduling"
      ],
      subServices: [
        {
          id: "babysitting",
          name: "Babysitting",
          description: "Reliable childcare in your home, including activities, meal preparation, and bedtime routines.",
          price: "From R120 per hour",
          duration: "As needed",
          features: [
            "Child supervision and safety",
            "Age-appropriate activities",
            "Meal preparation",
            "Bedtime routine assistance",
            "Light tidying of play areas"
          ]
        },
        {
          id: "afterschool",
          name: "After School Care",
          description: "Comprehensive after-school care including pickup from school, homework help, and supervised activities.",
          price: "From R1000 per week",
          duration: "3-5 hours per day",
          features: [
            "School pickup service",
            "Homework supervision",
            "Healthy snack preparation",
            "Educational activities",
            "Safe transportation"
          ]
        }
      ]
    }
  ];

  const courses: Course[] = [
    {
      id: "first-aid-cpr",
      name: "First Aid & CPR Certification",
      description: "Learn essential first aid skills, CPR techniques, and emergency response procedures from certified instructors. This comprehensive course prepares you for various emergency situations.",
      duration: "2 days (16 hours)",
      price: "R1,500 per person",
      features: [
        "Hands-on CPR practice with mannequins", 
        "Emergency response procedures",
        "Wound treatment and bandaging techniques",
        "Choking management",
        "AED (Automated External Defibrillator) training",
        "Internationally recognized certification valid for 2 years"
      ],
      certification: true
    },
    {
      id: "hygiene-cleaning",
      name: "Professional Cleaning & Hygiene",
      description: "Master the techniques and standards of professional cleaning with our comprehensive training program. Learn about proper sanitization, chemical handling, and efficient cleaning methods.",
      duration: "3 days (24 hours)",
      price: "R1,800 per person",
      features: [
        "Chemical safety and COSHH regulations",
        "Different cleaning techniques for various surfaces",
        "Infection control and prevention",
        "Equipment handling and maintenance",
        "Eco-friendly cleaning methods",
        "Professional certification upon completion"
      ],
      certification: true
    },
    {
      id: "elder-care",
      name: "Elderly Care Specialist",
      description: "Develop the specialized skills needed to provide quality care for elderly individuals. This course covers physical care, emotional support, and understanding common age-related conditions.",
      duration: "5 days (40 hours)",
      price: "R3,200 per person",
      features: [
        "Understanding age-related physical and cognitive changes",
        "Mobility assistance techniques",
        "Medication management",
        "Nutrition and hydration for elderly",
        "Communication strategies",
        "Dementia and Alzheimer's care approaches"
      ],
      certification: true
    },
    {
      id: "childcare",
      name: "Childcare & Development",
      description: "Learn comprehensive childcare skills including child development stages, safety protocols, nutritional needs, and age-appropriate activities to become a professional childcare provider.",
      duration: "4 days (32 hours)",
      price: "R2,500 per person",
      features: [
        "Child development stages and milestones",
        "Safety and first aid for children",
        "Nutritional requirements and meal planning",
        "Behavior management strategies",
        "Educational activities for different age groups",
        "Effective communication with children and parents"
      ],
      certification: true
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
      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="services" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="services" className="text-lg">Our Services</TabsTrigger>
            <TabsTrigger value="courses" className="text-lg">Training Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services">
            {!selectedService ? (
              <>
                <div className="text-center mb-12">
                  <h1 className="text-3xl font-bold mb-3">Professional Home & Care Services</h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We offer a wide range of professional services to meet your household and personal care needs,
                    delivered by trained and vetted staff.
                  </p>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {services.map((service) => (
                    <Card 
                      key={service.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-primary"
                      onClick={() => setSelectedService(service)}
                    >
                      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          {service.icon}
                        </div>
                        <CardTitle>{service.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">{service.description}</CardDescription>
                        {service.benefits && (
                          <ul className="space-y-1">
                            {service.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              
                <div className="mt-16 bg-white rounded-lg shadow-md p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Why Choose Our Services?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      We're committed to providing exceptional service with trusted professionals
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Vetted Professionals</h3>
                      <p className="text-sm text-gray-600">All our staff undergo thorough background checks and interviews</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-3 rounded-full mb-4">
                        <Award className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
                      <p className="text-sm text-gray-600">We maintain high standards with regular quality checks</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-purple-100 p-3 rounded-full mb-4">
                        <Clock className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
                      <p className="text-sm text-gray-600">Book services at times that work for your schedule</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-orange-100 p-3 rounded-full mb-4">
                        <Star className="h-8 w-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Highly Rated</h3>
                      <p className="text-sm text-gray-600">Our services consistently receive top ratings from clients</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedService(null)}
                    className="flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                    Back to All Services
                  </Button>
                  <h2 className="text-2xl font-bold">{selectedService.name}</h2>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                  <div className="flex flex-col md:flex-row mb-6 items-start md:items-center">
                    <div className="bg-primary/10 p-4 rounded-full mr-4 mb-4 md:mb-0">
                      {selectedService.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{selectedService.name}</h3>
                      <p className="text-gray-600">{selectedService.description}</p>
                    </div>
                  </div>
                  
                  {selectedService.benefits && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Key Benefits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-4">Available Services</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedService.subServices?.map((subService) => (
                    <Card key={subService.id} className="border-t-4 border-t-primary">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{subService.name}</CardTitle>
                          {subService.certification && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                              Certification Available
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700">{subService.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                          {subService.price && (
                            <div className="flex items-center bg-green-50 px-3 py-1.5 rounded-full">
                              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                              <span className="text-sm font-medium text-green-800">{subService.price}</span>
                            </div>
                          )}
                          
                          {subService.duration && (
                            <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
                              <Clock className="h-4 w-4 text-blue-600 mr-1" />
                              <span className="text-sm font-medium text-blue-800">{subService.duration}</span>
                            </div>
                          )}
                        </div>
                        
                        {subService.features && (
                          <>
                            <Separator className="my-4" />
                            <div>
                              <h4 className="font-medium mb-2 text-sm text-gray-700">Service Includes:</h4>
                              <ul className="space-y-1">
                                {subService.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                        
                        {subService.requirements && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2 text-sm text-gray-700">Requirements:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {subService.requirements.map((req, index) => (
                                <li key={index} className="text-sm text-gray-600">{req}</li>
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
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold mb-3">Professional Training Courses</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enhance your skills and career prospects with our accredited training programs.
                All courses include hands-on practice and certification upon completion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="border-t-4 border-t-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{course.name}</CardTitle>
                      {course.certification && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                          Certification Included
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{course.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-sm font-medium text-blue-800">{course.duration}</span>
                      </div>
                      
                      <div className="flex items-center bg-green-50 px-3 py-1.5 rounded-full">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-800">{course.price}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm text-gray-700">Course Covers:</h4>
                      <ul className="space-y-1">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mt-12">
              <h3 className="text-xl font-bold mb-4 text-center">Why Train With Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <Award className="h-12 w-12 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Accredited Certifications</h4>
                  <p className="text-sm text-gray-600">
                    Our certifications are recognized by industry leaders and meet international standards
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <GraduationCap className="h-12 w-12 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Expert Instructors</h4>
                  <p className="text-sm text-gray-600">
                    Learn from professionals with years of practical experience in their respective fields
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <Book className="h-12 w-12 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">Practical Approach</h4>
                  <p className="text-sm text-gray-600">
                    Our courses emphasize hands-on training and real-world applications of skills
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ServicesPage;
