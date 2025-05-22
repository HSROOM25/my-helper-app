
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Search, HelpCircle, Mail, Phone, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  {
    question: "How do I verify my OTP code?",
    answer: "After registration, we send a one-time password (OTP) to your email or phone number. Enter this code on the verification page to activate your account. If you don't receive a code, you can request a new one on the verification page."
  },
  {
    question: "What are the payment options for worker registration?",
    answer: "Workers can pay the R250 registration fee through EFT bank transfer to Capitec (123456789) or FNB (2345678888), or via PayPal. After payment, you need to submit proof of payment which will be verified before your account is activated."
  },
];

const bankDetails = [
  { bank: "Capitec", accountNumber: "123456789", reference: "Your Email/Phone" },
  { bank: "FNB", accountNumber: "2345678888", reference: "Your Email/Phone" },
];

const supportContacts = [
  { 
    method: "Email",
    contact: "support@example.com",
    icon: <Mail className="h-5 w-5 mr-2 text-gray-600" />,
    availability: "Responses within 24 hours" 
  },
  { 
    method: "Phone",
    contact: "+27 12 345 6789",
    icon: <Phone className="h-5 w-5 mr-2 text-gray-600" />,
    availability: "Mon-Fri 8am-5pm SAST" 
  },
  { 
    method: "Live Chat",
    contact: "Available on website",
    icon: <MessageSquare className="h-5 w-5 mr-2 text-gray-600" />,
    availability: "8am-5pm SAST" 
  }
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
  const [messageSent, setMessageSent] = useState(false);
  const [activeTab, setActiveTab] = useState("faqs");
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
      // Here we would handle contact form submission to backend
      console.log('Contact form submitted:', contactForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We've received your message and will respond shortly.",
      });
      
      setMessageSent(true);
      
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

  const resetForm = () => {
    setMessageSent(false);
  };

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
        <div className="max-w-2xl mx-auto mb-8">
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
        
        {/* Tabs Navigation */}
        <div className="max-w-5xl mx-auto mb-8">
          <Tabs defaultValue="faqs" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faqs" className="flex items-center justify-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center justify-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center justify-center">
                <Info className="mr-2 h-4 w-4" />
                Payment Info
              </TabsTrigger>
            </TabsList>
            
            {/* FAQs Content */}
            <TabsContent value="faqs">
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
            </TabsContent>
            
            {/* Contact Us Content */}
            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
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
                      {messageSent ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-medium mb-2">Message Received!</h3>
                          <p className="text-gray-600 mb-6">
                            Thank you for contacting us. One of our support representatives will get back to you soon.
                          </p>
                          <Button onClick={resetForm}>Send Another Message</Button>
                        </div>
                      ) : (
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
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Support Contact Info */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Other ways to reach our support team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {supportContacts.map((contact, index) => (
                          <div key={index} className="flex items-start">
                            {contact.icon}
                            <div>
                              <h4 className="font-semibold">{contact.method}</h4>
                              <p className="text-sm text-gray-600">{contact.contact}</p>
                              <p className="text-xs text-gray-500">{contact.availability}</p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="font-semibold mb-2">Office Hours</h4>
                          <p className="text-sm text-gray-600">Monday to Friday: 8am - 5pm SAST</p>
                          <p className="text-sm text-gray-600">Saturday: 9am - 1pm SAST</p>
                          <p className="text-sm text-gray-600">Sunday & Public Holidays: Closed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Payment Info Content */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Details for Worker Registration</CardTitle>
                  <CardDescription>
                    Use these details when making your R250 registration payment via EFT or bank deposit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bank Name</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bankDetails.map((bank, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{bank.bank}</TableCell>
                          <TableCell>{bank.accountNumber}</TableCell>
                          <TableCell>{bank.reference}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>
                      Remember to upload your proof of payment on the Worker Payment page
                    </TableCaption>
                  </Table>
                  
                  <div className="mt-6 space-y-6">
                    <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
                      <p className="text-amber-800 text-sm">
                        <strong>Important:</strong> After making your payment, you must submit proof of payment on the 
                        Worker Payment page. Your account will be verified and activated within 24-48 hours.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Payment Process:</h3>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>Complete your worker registration</li>
                        <li>Make payment using one of the payment methods below</li>
                        <li>Upload proof of payment on the Worker Payment page</li>
                        <li>Wait for verification (24-48 hours)</li>
                        <li>Receive activation confirmation</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Available Payment Methods:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <Card className="shadow-sm">
                          <CardHeader className="py-4 px-5">
                            <CardTitle className="text-base">EFT Transfer</CardTitle>
                          </CardHeader>
                          <CardContent className="py-4 px-5">
                            <p className="text-sm text-gray-600">Transfer to one of our bank accounts listed above</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-sm">
                          <CardHeader className="py-4 px-5">
                            <CardTitle className="text-base">Bank Deposit</CardTitle>
                          </CardHeader>
                          <CardContent className="py-4 px-5">
                            <p className="text-sm text-gray-600">Make a cash deposit at your nearest branch</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-sm">
                          <CardHeader className="py-4 px-5">
                            <CardTitle className="text-base">PayPal</CardTitle>
                          </CardHeader>
                          <CardContent className="py-4 px-5">
                            <p className="text-sm text-gray-600">Send payment to finance@example.com</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
