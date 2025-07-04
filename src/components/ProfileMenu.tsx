
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
import { User, Settings, LogOut, KeyRound } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ProfileMenu = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("ProfileMenu: Current user:", user);
    console.log("ProfileMenu: Account type:", user?.user_metadata?.account_type);
    console.log("ProfileMenu: Full user metadata:", user?.user_metadata);
  }, [user]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getProfileLink = () => {
    console.log("ProfileMenu: Getting profile link");
    console.log("ProfileMenu: User metadata for link:", user?.user_metadata);
    
    const accountType = user?.user_metadata?.account_type;
    console.log("ProfileMenu: Account type for profile link:", accountType);
    
    if (accountType === 'worker') {
      console.log("ProfileMenu: Returning worker profile link");
      return '/worker-profile';
    } else if (accountType === 'employer') {
      console.log("ProfileMenu: Returning employer profile link");
      return '/employer-profile';
    } else {
      console.log("ProfileMenu: No account type found, defaulting to worker profile");
      // Default fallback
      return '/worker-profile';
    }
  };
  
  return (
    <div className="relative">
      <DropdownMenu>
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-1 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-2 rounded-md border border-blue-200">
                <Avatar className="h-8 w-8 relative">
                  {user && (
                    <Badge variant="outline" className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 border-white z-10 rounded-full p-0" />
                  )}
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user ? user.email?.charAt(0).toUpperCase() || <User size={16} /> : <User size={16} />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {user ? 'My Account' : 'Account'}
                  </span>
                  {user && (
                    <span className="text-xs text-gray-500 truncate max-w-[100px]">
                      {user.email?.split('@')[0]}
                    </span>
                  )}
                </div>
              </div>
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
              <div className="px-2 py-1.5 bg-blue-50">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground truncate">ID: {user.id}</p>
                <Badge variant="outline" className="mt-1 bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={getProfileLink()} className="cursor-pointer flex w-full">
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
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <div className="text-center py-2 px-1 bg-gray-50">
                <p className="text-sm font-medium">Not signed in</p>
                <p className="text-xs text-muted-foreground">Please login to access all features</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer flex w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Log in</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="cursor-pointer flex w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Sign up</span>
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
