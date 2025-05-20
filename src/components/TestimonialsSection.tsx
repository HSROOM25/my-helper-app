import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-shadcn";
import { Star } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types';

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Since we don't have a testimonials table yet, we're using mock data
        // In a real scenario, you would fetch from the database
        const mockTestimonials: Testimonial[] = [
          {
            id: '1',
            name: 'Sarah Johnson',
            role: 'Employer',
            company: 'Tech Solutions Inc.',
            content: 'I found an excellent domestic helper through MyHelper. The verification process gave me peace of mind about who I was bringing into my home.',
            rating: 5,
            image_url: 'https://randomuser.me/api/portraits/women/44.jpg',
            approved: true
          },
          {
            id: '2',
            name: 'Michael Chen',
            role: 'Worker',
            content: 'This platform has helped me secure consistent work opportunities. The registration process was straightforward and the annual fee is worth the connections I\'ve made.',
            rating: 4,
            approved: true
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            role: 'Employer',
            company: 'Family of Four',
            content: 'MyHelper simplified the process of finding childcare. I appreciate the detailed profiles and being able to directly contact potential nannies.',
            rating: 5,
            image_url: 'https://randomuser.me/api/portraits/women/68.jpg',
            approved: true
          }
        ];
        
        setTestimonials(mockTestimonials);
      } catch (err) {
        console.error('Error in fetchTestimonials:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Users Say</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Read what employers and workers have to say about their experience using MyHelper
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4 h-full flex flex-col">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-blue-100">
                    {testimonial.image_url ? (
                      <AvatarImage src={testimonial.image_url} alt={testimonial.name} />
                    ) : (
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-700">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 flex-1 italic">&ldquo;{testimonial.content}&rdquo;</p>
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
