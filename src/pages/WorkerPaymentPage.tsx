
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Check } from 'lucide-react';

const WorkerPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('eft');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | null>(null);
  const [activationCode, setActivationCode] = useState<string | null>(null);

  const handleSubmitProof = async () => {
    if (!proofFile) {
      toast({
        title: "No file selected",
        description: "Please upload proof of payment first.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload and verification process
    try {
      console.log('Uploading payment proof:', proofFile.name);
      
      // Simulate API processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVerificationStatus('verified');
      setActivationCode('WORK' + Math.random().toString(36).substring(2, 8).toUpperCase());
      
      toast({
        title: "Payment verified!",
        description: "Your payment has been verified successfully.",
      });
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Verification failed",
        description: "There was an error verifying your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueToHome = () => {
    console.log('Registration complete. Redirecting to home...');
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
      setVerificationStatus('pending');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Worker Registration Payment</CardTitle>
            <CardDescription>
              Complete your annual worker registration fee of R250 to activate your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 text-blue-800 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Your worker profile has been created. To activate your account, please complete the annual registration fee payment of R250.
              </p>
            </div>

            <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="eft">Bank Transfer</TabsTrigger>
                <TabsTrigger value="deposit">Bank Deposit</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="eft" className="space-y-4 pt-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">EFT Payment Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Account Name:</span>
                      <span className="col-span-2">Worker Platform (Pty) Ltd</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Bank:</span>
                      <span className="col-span-2">Capitec Bank</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Account Number:</span>
                      <span className="col-span-2">123456789</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Branch Code:</span>
                      <span className="col-span-2">470010</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Reference:</span>
                      <span className="col-span-2">WORKER-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Amount:</span>
                      <span className="col-span-2 font-bold">R250.00</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proof-of-payment">Upload Proof of Payment</Label>
                  <Input 
                    id="proof-of-payment" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, JPG, PNG. Max size: 5MB
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="deposit" className="space-y-4 pt-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">Bank Deposit Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Account Name:</span>
                      <span className="col-span-2">Worker Platform (Pty) Ltd</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Bank:</span>
                      <span className="col-span-2">FNB</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Account Number:</span>
                      <span className="col-span-2">2345678888</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Branch Code:</span>
                      <span className="col-span-2">250655</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Reference:</span>
                      <span className="col-span-2">WORKER-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="font-medium">Amount:</span>
                      <span className="col-span-2 font-bold">R250.00</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proof-of-deposit">Upload Proof of Deposit</Label>
                  <Input 
                    id="proof-of-deposit" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, JPG, PNG. Max size: 5MB
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="paypal" className="space-y-4 pt-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium text-lg mb-2">PayPal Payment</h3>
                  <p className="mb-4">
                    Send R250.00 (approx $15 USD) to the following PayPal account:
                  </p>
                  <div className="p-3 bg-gray-100 rounded text-center mb-4 font-medium">
                    payments@workerplatform.com
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Please include your name and email in the payment notes
                  </p>
                  <Button className="w-full" onClick={() => window.open('https://www.paypal.com')}>
                    Pay with PayPal
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proof-of-paypal">Upload PayPal Receipt Screenshot</Label>
                  <Input 
                    id="proof-of-paypal" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500">
                    Accepted formats: PDF, JPG, PNG. Max size: 5MB
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {verificationStatus === 'verified' && activationCode && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md space-y-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-1.5 rounded-full mr-3">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-green-800">Payment Verified!</h3>
                </div>
                <p className="text-green-700">
                  Your payment has been verified and your account is now activated.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-sm font-medium mb-1">Your Activation Code:</p>
                  <p className="text-lg font-bold text-center">{activationCode}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Please save this code for your records. You may need it in the future.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            {verificationStatus === 'verified' ? (
              <Button onClick={handleContinueToHome}>
                Continue to Home
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitProof} 
                disabled={!proofFile || isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Submit Proof of Payment'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default WorkerPaymentPage;
