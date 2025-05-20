
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar-shadcn";
import { useAuth } from "@/contexts/AuthContext";
import { User, Settings, LogOut, UserPlus, LogIn, KeyRound } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

const ProfileMenu = () => {
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    console.log("Current user in ProfileMenu:", user);
  }, [user]);
  
  return (
    <div className="relative">
      <DropdownMenu>
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer relative">
                {user && (
                  <Badge variant="outline" className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 border-white z-10 rounded-full p-0" />
                )}
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user ? user.email?.charAt(0).toUpperCase() || <User size={16} /> : <User size={16} />}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Profile Account</h4>
                {user ? (
                  <>
                    <p className="text-sm">
                      You are currently logged in as <span className="font-medium">{user.email}</span>
                    </p>
                    <div className="flex items-center pt-2">
                      <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                      {user.email_confirmed_at && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          Email Verified
                        </Badge>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-sm">
                    You are not currently signed in. Sign in to access all features.
                  </p>
                )}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <DropdownMenuContent align="end" className="w-56">
          {user ? (
            <>
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground truncate">ID: {user.id}</p>
                <Badge variant="outline" className="mt-1 bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={user.user_metadata?.user_type === 'worker' ? '/worker-profile' : '/employer-profile'} className="cursor-pointer flex w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/change-password" className="cursor-pointer flex w-full">
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>Change Password</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer flex w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="cursor-pointer flex w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Create Account</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
