
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-shadcn";
import { User, MapPin, Flag, Briefcase } from 'lucide-react';

// List of countries for the dropdown
const countries = [
  "South Africa", "Nigeria", "Kenya", "Ghana", "Zimbabwe", 
  "Botswana", "Namibia", "Zambia", "Mozambique", "Ethiopia",
  "Egypt", "Morocco", "Tanzania", "Uganda", "Angola",
  "Algeria", "Tunisia", "Sudan", "Rwanda", "Malawi"
];

interface WorkerProfileFormProps {
  onSubmit?: (data: any) => void;
}

const WorkerProfileForm: React.FC<WorkerProfileFormProps> = ({ onSubmit }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    bio: '',
    workExperience: '',
    nationality: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      nationality: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', formData, 'Profile image:', profileImage);
    // Here you would typically send the data to your backend
    if (onSubmit) {
      onSubmit({
        ...formData,
        profileImage
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile picture" />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="flex flex-col items-center">
              <Label htmlFor="profile-picture" className="cursor-pointer text-sm font-medium text-primary hover:underline">
                Upload Profile Picture
              </Label>
              <Input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Click to select an image (JPG, PNG)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="bio">Bio</Label>
            </div>
            <Textarea 
              id="bio" 
              name="bio" 
              placeholder="Tell employers about yourself..."
              rows={4}
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="workExperience">Work Experience</Label>
            </div>
            <Textarea 
              id="workExperience" 
              name="workExperience" 
              placeholder="Describe your previous work experience..."
              rows={4}
              value={formData.workExperience}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="nationality">Nationality</Label>
            </div>
            <Select onValueChange={handleSelectChange} value={formData.nationality}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="address">Address</Label>
            </div>
            <Input
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">Save Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkerProfileForm;
