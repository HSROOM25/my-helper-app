
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar-shadcn';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';
import { Profile } from '@/types';

interface UserProfileProps {
  profileId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ profileId }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user && !profileId) {
        setLoading(false);
        return;
      }

      try {
        const id = profileId || user?.id;
        if (!id) {
          setLoading(false);
          return;
        }

        // Since we don't have a profiles table yet, create a mock profile
        // In a real scenario, you would fetch from the database
        const mockProfile: Profile = {
          id: id,
          first_name: user?.user_metadata?.first_name || "John",
          last_name: user?.user_metadata?.last_name || "Doe",
          phone_number: user?.phone || null,
          avatar_url: null,
          user_type: user?.user_metadata?.user_type || "employer",
        };
        
        setProfile(mockProfile);
      } catch (err) {
        console.error('Error in fetchProfile:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, profileId]);

  if (loading) {
    return <div className="flex justify-center p-4">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!profile) {
    return <div className="p-4">Profile not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <Avatar className="h-24 w-24">
          {profile.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={`${profile.first_name}'s profile`} />
          ) : (
            <AvatarFallback>
              <User size={48} />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">
            {profile.first_name} {profile.last_name}
          </h2>
          {profile.user_type && (
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
            </div>
          )}
          <p className="text-gray-600">{user?.email}</p>
          {profile.phone_number && <p className="text-gray-600">Phone: {profile.phone_number}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
