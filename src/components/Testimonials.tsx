
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    company: '',
    content: 'Finding reliable help for my home renovations was always a challenge until I found this platform. The workers are verified, skilled, and professional. Highly recommend!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Ndlovu',
    role: 'Construction Worker',
    company: '',
    content: 'This platform has transformed my career. I now have consistent work and fair pay. The registration process was simple and the support team is always helpful.',
    rating: 5
  },
  {
    id: 3,
    name: 'Thabo Makhaya',
    role: 'Small Business Owner',
    company: 'Makhaya Construction',
    content: 'As a business owner, finding temporary workers used to be time-consuming. Now I can quickly find qualified workers whenever I need them. The verification process gives me peace of mind.',
    rating: 4
  },
  {
    id: 4,
    name: 'Lerato Moloi',
    role: 'Interior Designer',
    company: 'Moloi Designs',
    content: 'I often need specialized workers for my design projects. This platform has connected me with talented individuals who bring my visions to life. The quality of work is exceptional.',
    rating: 5
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the workers and employers who are transforming their work experience with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full transition-all hover:shadow-lg">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">"{testimonial.content}"</p>
                
                <div className="flex items-center mt-auto">
                  <div className="bg-primary/10 text-primary font-medium h-10 w-10 rounded-full flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
