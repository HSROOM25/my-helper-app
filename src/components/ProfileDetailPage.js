import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const ProfileDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      const { data, error } = await supabase
        .from('worker_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching worker:', error.message);
        // Optionally navigate away or show error
        navigate('/profiles');
      } else {
        setWorker(data);
      }
    };

    fetchWorker();
  }, [id, navigate]);

  if (!worker) return <p>Loading profile...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{worker.full_name}</h1>
      <p><strong>City:</strong> {worker.city}</p>
      <p><strong>Experience:</strong> {worker.experience}</p>
      <p><strong>Skills:</strong> {worker.skills}</p>
      <p className="mt-4">{worker.bio}</p>
      <button onClick={() => navigate('/profiles')} className="mt-6 btn btn-secondary">
        Back to Helpers
      </button>
    </div>
  );
};

export default ProfileDetailPage;
