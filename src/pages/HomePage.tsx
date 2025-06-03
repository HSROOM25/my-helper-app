
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import ProfileMenu from '@/components/ProfileMenu';
import TestimonialsSection from '@/components/TestimonialsSection';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="large" withText={true} className="mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Find Reliable Helpers For Your Needs
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified workers for all your household and business services in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Updated Find a Helper Button linked to /profiles instead of /services */}
            <Link to="/profiles">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg px-[32px]">
                {user ? 'Browse Helpers' : 'Find a Helper'}
              </Button>
            </Link>

            <Link to={user ? "/services" : "/register"}>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                {user ? 'Browse Services' : 'Register as a Worker'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How MyHelper Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sign up as an employer looking for help or as a worker offering services. Workers need to complete verification and pay the R250 annual registration fee.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connect & Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse worker profiles, view their experience, and contact them directly through our secure messaging system.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hire with Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p>All workers are verified and screened. View their answers to interview questions and make informed hiring decisions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Worker/Employer Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="employers" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employers">For Employers</TabsTrigger>
              <TabsTrigger value="workers">For Workers</TabsTrigger>
            </TabsList>
            <TabsContent value="employers" className="p-6 bg-white rounded-b-lg shadow">
              <h3 className="text-2xl font-bold mb-4">Find Reliable Help</h3>
              <p className="mb-4">
                Browse through verified worker profiles, check their experience, and make informed hiring decisions.
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>View detailed worker profiles with experience and skills</li>
                <li>Read answers to screening questions</li>
                <li>Contact workers directly through our messaging system</li>
                <li>Rate and review workers after service completion</li>
              </ul>
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Register as Employer</Button>
              </Link>
            </TabsContent>
            <TabsContent value="workers" className="p-6 bg-white rounded-b-lg shadow">
              <h3 className="text-2xl font-bold mb-4">Get Hired for Your Skills</h3>
              <p className="mb-4">
                Create your profile, showcase your experience, and connect with employers looking for your skills.
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Create a comprehensive profile highlighting your skills</li>
                <li>Complete screening questions to stand out</li>
                <li>Pay the R250 annual registration fee to activate your profile</li>
                <li>Receive job inquiries directly from employers</li>
              </ul>
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Register as Worker</Button>
              </Link>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact/Newsletter Section */}
      <section className="py-16 bg-blue-600 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest updates and new features.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Your email address" className="bg-white text-black" />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>

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
                <a href="#" aria-label="Facebook"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.925-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.063 24 12.073z"/></svg></a>
                <a href="#" aria-label="Twitter"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.724-.949.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.723 0-4.928 2.206-4.928 4.928 0 .39.045.765.127 1.124-4.094-.205-7.725-2.165-10.157-5.144-.425.729-.666 1.577-.666 2.476 0 1.71.87 3.215 2.188 4.099-.807-.026-1.566-.247-2.229-.616v.061c0 2.388 1.698 4.384 3.95 4.835-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.627 1.956 2.444 3.377 4.6 3.418-1.68 1.316-3.809 2.101-6.115 2.101-.397 0-.788-.023-1.174-.068 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634.961-.694 1.8-1.562 2.46-2.549z"/></svg></a>
                <a href="#" aria-label="Instagram"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.346 3.608 1.32.975.975 1.258 2.243 1.32 3.608.058 1.267.07 1.647.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.346 2.633-1.32 3.608-.975.975-2.243 1.258-3.608 1.32-1.267.058-1.647.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.346-3.608-1.32-.975-.975-1.258-2.243-1.32-3.608-.058-1.267-.07-1.647-.07-4.85s.012-3.584.07-4.85c.062-1.366.346-2.633 1.32-3.608.975-.975 2.243-1.258 3.608-1.32 1.267-.058 1.647-.07 4.85-.07M12 0C8.741 0 8.332.013 7.052.072 5.77.131 4.58.42 3.514 1.486 2.448 2.552 2.159 3.743 2.1 5.025 2.041 6.305 2.028 6.715 2.028 10c0 3.285.013 3.695.072 4.975.059 1.282.348 2.472 1.414 3.538 1.066 1.066 2.256 1.355 3.538 1.414 1.28.059 1.69.072 4.975.072 3.285 0 3.695-.013 4.975-.072 1.282-.059 2.472-.348 3.538-1.414 1.066-1.066 1.355-2.256 1.414-3.538.059-1.28.072-1.69.072-4.975 0-3.285-.013-3.695-.072-4.975-.059-1.282-.348-2.472-1.414-3.538C19.42.42 18.23.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z"/></svg></a>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">&copy; 2025 MyHelper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
