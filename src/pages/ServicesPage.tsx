
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Define service categories
const serviceCategories = [
  { id: "cleaning", name: "Cleaning Services" },
  { id: "gardening", name: "Gardening & Landscaping" },
  { id: "home-repair", name: "Home Repairs" },
  { id: "childcare", name: "Childcare" },
  { id: "eldercare", name: "Elder Care" },
  { id: "tutoring", name: "Tutoring & Education" },
];

// Define sample services
const services = [
  {
    id: "1",
    categoryId: "cleaning",
    title: "House Cleaning",
    description: "Regular house cleaning services including sweeping, mopping, dusting, and bathroom cleaning.",
    priceRange: "R150-R300 per hour",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    categoryId: "cleaning",
    title: "Window Cleaning",
    description: "Professional window cleaning for homes and small businesses. Interior and exterior services available.",
    priceRange: "R80-R150 per window",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    categoryId: "gardening",
    title: "Lawn Mowing",
    description: "Regular lawn mowing and edging services to keep your yard looking neat and tidy.",
    priceRange: "R200-R400 per service",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    categoryId: "gardening",
    title: "Garden Maintenance",
    description: "Comprehensive garden maintenance including pruning, weeding, and fertilizing.",
    priceRange: "R250-R500 per visit",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    categoryId: "home-repair",
    title: "Painting Services",
    description: "Interior and exterior painting services with proper preparation and clean finishing.",
    priceRange: "R1500-R3000 per room",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    categoryId: "home-repair",
    title: "Plumbing Repairs",
    description: "Basic plumbing repairs for leaky faucets, clogged drains, and toilet issues.",
    priceRange: "R300-R800 per service",
    image: "/placeholder.svg"
  },
  {
    id: "7",
    categoryId: "childcare",
    title: "Babysitting",
    description: "Reliable babysitting services for children of all ages. Available evenings and weekends.",
    priceRange: "R80-R150 per hour",
    image: "/placeholder.svg"
  },
  {
    id: "8",
    categoryId: "childcare",
    title: "After School Care",
    description: "After-school supervision including help with homework and safe activities.",
    priceRange: "R1500-R3000 per month",
    image: "/placeholder.svg"
  },
  {
    id: "9",
    categoryId: "eldercare",
    title: "Companion Care",
    description: "Companionship and basic assistance for seniors in their homes.",
    priceRange: "R100-R200 per hour",
    image: "/placeholder.svg"
  },
  {
    id: "10",
    categoryId: "eldercare",
    title: "Medication Management",
    description: "Help with organizing and remembering to take medications on schedule.",
    priceRange: "R800-R1500 per week",
    image: "/placeholder.svg"
  },
  {
    id: "11",
    categoryId: "tutoring",
    title: "Math Tutoring",
    description: "One-on-one tutoring for all math levels from primary school to high school.",
    priceRange: "R150-R300 per hour",
    image: "/placeholder.svg"
  },
  {
    id: "12",
    categoryId: "tutoring",
    title: "Language Lessons",
    description: "Private language lessons in English, Afrikaans, Zulu, and Xhosa.",
    priceRange: "R200-R350 per session",
    image: "/placeholder.svg"
  }
];

const ServicesPage = () => {
  const { serviceId } = useParams();
  const [activeCategory, setActiveCategory] = useState<string>("cleaning");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    serviceInterest: ""
  });
  const [selectedService, setSelectedService] = useState<any>(null);
  const { toast } = useToast();

  // Handle service selection or load from URL parameter
  useEffect(() => {
    if (serviceId) {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        setActiveCategory(service.categoryId);
        setContactForm(prev => ({
          ...prev,
          serviceInterest: service.title
        }));
      }
    }
  }, [serviceId]);

  // Filter services based on active category and search query
  const filteredServices = services
    .filter(service => 
      (activeCategory === "all" || service.categoryId === activeCategory) &&
      (searchQuery === "" || 
       service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       service.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // Handle contact form changes
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", contactForm);
      
      toast({
        title: "Inquiry Sent!",
        description: "We've received your message and will be in touch shortly.",
      });
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        message: "",
        serviceInterest: selectedService ? selectedService.title : ""
      });
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle service selection
  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setContactForm(prev => ({
      ...prev,
      serviceInterest: service.title
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide range of services provided by verified workers. Find the help you need for your home or business.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="flex-1">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {serviceCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Grid */}
          <div className={selectedService ? "lg:col-span-2" : "lg:col-span-3"}>
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription className="text-xs text-gray-500">
                        {serviceCategories.find(c => c.id === service.categoryId)?.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <p className="font-medium">Price Range: {service.priceRange}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleServiceSelect(service)}
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No services found matching your search. Try different keywords or category.
                </p>
              </div>
            )}
          </div>

          {/* Service Detail Sidebar */}
          {selectedService && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedService.title}</CardTitle>
                  <CardDescription>
                    {serviceCategories.find(c => c.id === selectedService.categoryId)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="inquiry">Send Inquiry</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Description</h4>
                        <p className="text-sm text-gray-600">{selectedService.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Price Range</h4>
                        <p className="text-sm text-gray-600">{selectedService.priceRange}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Available Workers</h4>
                        <p className="text-sm text-gray-600">
                          Multiple qualified workers available for this service. 
                          Send an inquiry to get matched with the best worker for your needs.
                        </p>
                      </div>
                      
                      <Button variant="outline" onClick={() => window.location.href = `/services`}>
                        Back to All Services
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="inquiry">
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="serviceInterest">Service Interest</Label>
                          <Input
                            id="serviceInterest"
                            name="serviceInterest"
                            value={contactForm.serviceInterest}
                            onChange={handleContactChange}
                            readOnly
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Your Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactChange}
                            rows={4}
                            placeholder="Please provide details about your service needs, preferred schedule, etc."
                            required
                          />
                        </div>
                        
                        <Button type="submit" className="w-full">
                          Send Inquiry
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
