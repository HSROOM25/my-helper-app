
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from 'lucide-react';

interface AvatarProps {
  url?: string;
  size: string | number;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size, onUpload }: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ width: size }} aria-live="polite" className="container mx-auto text-center">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center shrink-0 relative">
          <label htmlFor="files" className="opacity-25 w-full h-full bg-gray-400 rounded-full flex justify-center absolute cursor-pointer">
            {/* Camera icon would go here */}
          </label>
          <div className="w-18 h-18 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img 
                className="w-full h-full object-cover"
                src={avatarUrl} 
                alt="Avatar"
                style={{ height: size, width: size }}
              />
            ) : (
              <User className="h-8 w-8 text-primary-foreground" />
            )}
          </div>
          {uploading ? (
            <div className="mt-2 text-sm">Uploading...</div>
          ) : (
            <input 
              type="file" 
              id="files" 
              accept="image/*"
              className="hidden"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
