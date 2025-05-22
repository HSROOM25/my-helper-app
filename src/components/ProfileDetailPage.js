import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient'; // adjust path if needed
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfileDetailPage = () => {
  const { id } = useParams();   // get worker id from URL
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('worker_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching worker:', error.message);
        setWorker(null);
      } else {
        setWorker(data);
      }
      setLoading(false);
    };

    fetchWorker();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!worker) return <p className="text-center mt-10">Worker not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <Button onClick={() => navigate(-1)} className="mb-6">
        ← Back to Helpers
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{worker.full_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>City:</strong> {worker.city}</p>
          <p><strong>Experience:</strong> {worker.experience}</p>
          <p><strong>Skills:</strong> {worker.skills}</p>
          {worker.bio && <p className="mt-4">{worker.bio}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetailPage;
