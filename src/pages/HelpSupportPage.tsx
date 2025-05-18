
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Search, HelpCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: "How do I register as a worker?",
    answer: "To register as a worker, click on the 'Register' button on the homepage, select 'Worker' account type, fill in your details, and complete the verification process. After registration, you'll need to complete your profile and pay the R250 annual registration fee."
  },
  {
    question: "What is the registration fee for workers?",
    answer: "Workers are required to pay a R250 annual registration fee. This fee helps us maintain the platform and ensure the quality of workers. You can pay this fee via EFT, bank deposit, or PayPal after creating your account."
  },
  {
    question: "How do I find workers for my project?",
    answer: "As an employer, you can browse worker profiles, post job listings, or use our search filters to find workers with specific skills and experience. You can contact workers directly through our messaging system."
  },
  {
    question: "How do payments work?",
    answer: "Employers can pay workers directly through the platform or arrange payment methods directly with workers. We recommend using our secure payment system to ensure both parties are protected."
  },
  {
    question: "What if I have a dispute with a worker or employer?",
    answer: "We have a dispute resolution process. Contact our support team, and we'll mediate between both parties to find a fair resolution. You can initiate a dispute through your account settings."
  },
  {
    question: "How can I update my profile information?",
    answer: "You can update your profile information by logging in to your account, navigating to your profile page, and clicking on the 'Edit Profile' button. Make sure to keep your profile updated to increase your chances of finding work or workers."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take security seriously. We use encryption to protect your data and follow strict privacy policies. We only share your information with other users when necessary for work arrangements."
  },
  {
    question: "How can I deactivate my account?",
    answer: "You can deactivate your account by going to your account settings and selecting 'Deactivate Account'. Note that if you're a worker, your registration fee is non-refundable."
  },
];

const HelpSupportPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here we would handle contact form submission
      console.log('Contact form submitted:', contactForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will respond shortly.",
      });
      
      // Clear form
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Message failed to send",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Help & Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or contact our support team for assistance
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search for answers..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2" /> 
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to the most common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <p className="py-4 text-center text-gray-500">
                      No results found. Try a different search term or browse all FAQs.
                    </p>
                  )}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2" /> 
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      required
                      value={contactForm.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required
                      value={contactForm.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="How can we help?" 
                      required
                      value={contactForm.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Please describe your issue or question in detail..." 
                      rows={5} 
                      required
                      value={contactForm.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>

                {/* Additional Contact Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-4">Other ways to reach us:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-gray-600" />
                      <span>support@example.com</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-gray-600" />
                      <span>Live chat available 8am-5pm SAST</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
