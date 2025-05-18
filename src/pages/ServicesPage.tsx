
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from '@/components/Testimonials';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'domestic',
    title: 'Domestic Workers',
    description: 'Reliable help for your home, including cleaning, cooking, and childcare.',
    icon: <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    features: [
      'Verified and background-checked workers',
      'Flexible scheduling options',
      'Specialized skills like cooking, cleaning, and childcare',
      'Replacement guarantee if you're not satisfied'
    ],
    popular: true
  },
  {
    id: 'construction',
    title: 'Construction Workers',
    description: 'Skilled laborers for construction projects of any size.',
    icon: <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    features: [
      'Experienced workers with verified skills',
      'Workers for short-term and long-term projects',
      'Various specializations: masonry, carpentry, electrical',
      'Proper safety training and certifications'
    ]
  },
  {
    id: 'gardening',
    title: 'Gardening & Landscaping',
    description: 'Keep your outdoor spaces beautiful with our skilled gardeners.',
    icon: <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    features: [
      'Experienced gardeners and landscapers',
      'Regular maintenance and one-time services',
      'Sustainable gardening practices',
      'Knowledge of local plants and conditions'
    ]
  },
  {
    id: 'security',
    title: 'Security Services',
    description: 'Protect your home or business with our professional security personnel.',
    icon: <Shield className="h-10 w-10 text-primary" />,
    features: [
      'Trained and certified security guards',
      'Residential and commercial security',
      'Event security services',
      'Background-checked personnel'
    ]
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            We connect employers with verified workers across various service categories, ensuring quality work and fair employment.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className={`h-full transition-all hover:shadow-lg ${service.popular ? 'border-primary' : ''}`}
              >
                {service.popular && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 absolute right-4 top-4 rounded-full">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link to={service.popular ? "/register?type=employer" : `/services/${service.id}`}>
                      {service.popular ? 'Hire Now' : 'Learn More'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-600">
                Create an account as an employer to hire workers or as a worker to offer your services.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Browse profiles, post job listings, or search for specific skills and connect directly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Work</h3>
              <p className="text-gray-600">
                Enjoy reliable service or consistent work opportunities through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of employers and workers who are transforming how work gets done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/register?type=employer">Hire Workers</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-primary-foreground hover:text-primary" asChild>
              <Link to="/register?type=worker">Become a Worker</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
