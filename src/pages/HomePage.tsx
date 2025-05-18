
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellIcon, HelpCircleIcon, UserIcon, HomeIcon, MenuIcon, InfoIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Logo size="medium" withText={true} />
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2 bg-gray-100">
                <HomeIcon size={18} />
                Home
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="ghost" className="flex items-center gap-2">
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

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="large" withText={true} className="mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Find Reliable Helpers For Your Needs</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified workers for all your household and business services in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Find a Helper
            </Button>
            <Link to="/register">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                Register as a Worker
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

export default HomePage;
