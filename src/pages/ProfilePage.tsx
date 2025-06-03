
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ProfilesPage = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      const { data, error } = await supabase.from('public.worker_profiles').select('*');
      if (error) {
        console.error('Error fetching workers:', error.message);
        return;
      }
      setWorkers(data);
    };
    fetchWorkers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Helpers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map(worker => (
          <div key={worker.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{worker.full_name}</h2>
            <p><strong>City:</strong> {worker.city}</p>
            <p><strong>Experience:</strong> {worker.experience}</p>
            <p><strong>Skills:</strong> {worker.skills}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => navigate(`/profile/${worker.id}`)}
            >
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;
