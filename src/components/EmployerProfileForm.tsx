
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmployerProfileFormProps {
  onSubmit: (data: any) => void;
}

interface AddressType {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

interface FormDataType {
  companyName: string;
  industry: string;
  description: string;
  website: string;
  address: AddressType;
  contactNumber: string;
  contactEmail: string;
}

const EmployerProfileForm: React.FC<EmployerProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormDataType>({
    companyName: '',
    industry: '',
    description: '',
    website: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'South Africa',
    },
    contactNumber: '',
    contactEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof FormDataType] as Record<string, any>),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof FormDataType] as Record<string, any>),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Company Information</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select 
              onValueChange={(value) => handleSelectChange(value, 'industry')} 
              defaultValue={formData.industry}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="hospitality">Hospitality</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="mining">Mining</SelectItem>
                <SelectItem value="domestic">Domestic Services</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your company and the types of workers you typically need"
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.example.com"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="123 Main St, Suite 101"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="Johannesburg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select 
              onValueChange={(value) => handleSelectChange(value, 'address.province')} 
              defaultValue={formData.address.province}
            >
              <SelectTrigger id="province">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eastern_cape">Eastern Cape</SelectItem>
                <SelectItem value="free_state">Free State</SelectItem>
                <SelectItem value="gauteng">Gauteng</SelectItem>
                <SelectItem value="kwazulu_natal">KwaZulu-Natal</SelectItem>
                <SelectItem value="limpopo">Limpopo</SelectItem>
                <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                <SelectItem value="north_west">North West</SelectItem>
                <SelectItem value="northern_cape">Northern Cape</SelectItem>
                <SelectItem value="western_cape">Western Cape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              placeholder="2000"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Phone</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+27 123 456 7890"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@example.com"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full">
          Complete Profile
        </Button>
      </div>
    </form>
  );
};

export default EmployerProfileForm;
