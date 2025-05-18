
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { HomeIcon, MenuIcon, HelpCircleIcon, InfoIcon, BellIcon, UserIcon } from 'lucide-react';
import Logo from '@/components/Logo';

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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Logo size="medium" withText={true} />
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <HomeIcon size={18} />
                Home
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="ghost" className="flex items-center gap-2 bg-gray-100">
                <MenuIcon size={18} />
                Services
              </Button>
            </Link>
            <Link to="/help-support">
              <Button variant="ghost" className="flex items-center gap-2">
                <HelpCircleIcon size={18} />
                Help & Support
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="flex items-center gap-2">
                <InfoIcon size={18} />
                About
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="relative">
              <BellIcon size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost">
              <UserIcon size={20} />
            </Button>
            <Link to="/login">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
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
                      
                      <Button variant="outline" onClick={() => setSelectedService(null)}>
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
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MyHelper</h3>
              <p>Connecting skilled workers with employers since 2023.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/services" className="hover:underline">Services</Link></li>
                <li><Link to="/help-support" className="hover:underline">Help & Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>Email: support@myhelper.com</li>
                <li>Phone: +27 12 345 6789</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" aria-label="Facebook"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                <a href="#" aria-label="Twitter"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
                <a href="#" aria-label="Instagram"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2023 MyHelper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
