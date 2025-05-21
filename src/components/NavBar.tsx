
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BellIcon, HomeIcon, MenuIcon, InfoIcon, HelpCircleIcon, UserIcon } from "lucide-react";
import Logo from '@/components/Logo';
import ProfileMenu from '@/components/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
  const { user, signOut } = useAuth();
  
  return (
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
          {user && (
            <Button variant="ghost" className="relative">
              <BellIcon size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          )}
          
          {!user ? (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">Sign up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="hidden md:block text-sm font-medium text-green-600">
                Logged in
              </div>
              <ProfileMenu />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
