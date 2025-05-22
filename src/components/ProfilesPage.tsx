import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client'; // Adjust path if needed
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfilesPage = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      const { data, error } = await supabase
        .from('worker_profiles')
        .select('*');

      if (error) {
        console.error('Error fetching workers:', error.message);
        return;
      }

      if (data) {
        setWorkers(data);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Helpers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <Card key={worker.id}>
            <CardHeader>
              <CardTitle>{worker.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>City:</strong> {worker.city}</p>
              <p><strong>Experience:</strong> {worker.experience}</p>
              <p><strong>Skills:</strong> {worker.skills}</p>
              <p className="mt-2">{worker.bio}</p>
              <Button className="mt-4" onClick={() => navigate(`/profile/${worker.id}`)}>
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;
