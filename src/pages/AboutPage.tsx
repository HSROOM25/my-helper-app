
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BellIcon, HelpCircleIcon, UserIcon, HomeIcon, MenuIcon, InfoIcon } from "lucide-react";
import Logo from '@/components/Logo';

const AboutPage = () => {
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
              <Button variant="ghost" className="flex items-center gap-2">
                <HomeIcon size={18} />
                Home
              </Button>
            </Link>
            <Button variant="ghost" className="flex items-center gap-2">
              <MenuIcon size={18} />
              Services
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <HelpCircleIcon size={18} />
              Help & Support
            </Button>
            <Link to="/about">
              <Button variant="ghost" className="flex items-center gap-2 bg-gray-100">
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">About MyHelper</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connecting communities through reliable service and trusted helpers since 2023.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-blue-700">Our Story</h2>
              <p className="text-gray-700 mb-4">
                MyHelper was born from a simple observation: finding reliable help for everyday tasks shouldn't be complicated. Founded in 2023, we set out to create a platform that connects skilled workers with people who need their services.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small initiative has grown into a thriving community of verified workers and satisfied clients. Our platform has facilitated thousands of successful connections, helping workers find employment while providing quality service to homes and businesses across South Africa.
              </p>
              <p className="text-gray-700">
                Today, MyHelper stands as a testament to our commitment to creating opportunities and solving everyday challenges through technology and community.
              </p>
            </div>
            <div className="md:w-1/2">
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <img 
                    src="/lovable-uploads/013eac99-6fd8-4dc3-a892-a0e24df377a9.png" 
                    alt="MyHelper Team" 
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-700">Our Mission & Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Community Empowerment</h3>
                <p className="text-gray-600">
                  We believe in creating opportunities for skilled workers and making quality services accessible to everyone, strengthening communities in the process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Trust & Safety</h3>
                <p className="text-gray-600">
                  Every worker on our platform undergoes verification. We prioritize creating a safe environment where employers can find reliable help with confidence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Simplicity & Efficiency</h3>
                <p className="text-gray-600">
                  We strive to make the process of finding help or work as simple and efficient as possible, removing barriers and connecting people directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-700">What Makes Us Different</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Verified Workers</h3>
                  <p className="text-gray-600">
                    Unlike general job platforms, all our workers undergo verification to ensure quality and reliability.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Direct Communication</h3>
                  <p className="text-gray-600">
                    Our platform allows employers to connect directly with workers, eliminating middlemen and extra fees.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Screening Questions</h3>
                  <p className="text-gray-600">
                    View workers' answers to standardized screening questions to make better hiring decisions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Local Focus</h3>
                  <p className="text-gray-600">
                    We're specifically designed for the South African market, addressing local needs and challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the MyHelper Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for skilled assistance or want to offer your services, MyHelper is the platform for you.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Find a Helper
            </Button>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-blue-700 px-8 py-6 text-lg">
                Register as a Worker
              </Button>
            </Link>
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
                <li><a href="#" className="hover:underline">Services</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Terms of Use</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
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

export default AboutPage;
