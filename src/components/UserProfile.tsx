
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { User, Home } from "lucide-react";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  user_type: string | null;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center py-8">Loading profile...</div>;
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            {profile.avatar_url ? (
              <AvatarImage src={profile.avatar_url} />
            ) : (
              <AvatarFallback>
                <User size={40} />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">
              {profile.first_name} {profile.last_name}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm capitalize">{profile.user_type} Account</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" size="sm" className="gap-1">
            <Home size={16} />
            Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
