
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle, Upload, CreditCard as Bank, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const WorkerPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [bankReference, setBankReference] = useState("");

  const handlePayment = async () => {
    console.log('Processing payment with method:', selectedPaymentMethod);
    setIsProcessing(true);
    
    if (selectedPaymentMethod === "credit-card") {
      // Simulate credit card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      completePayment();
    } else if (selectedPaymentMethod === "eft" || selectedPaymentMethod === "paypal") {
      // For EFT or PayPal, show verification step
      setIsProcessing(false);
      setShowVerification(true);
    }
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofOfPayment(e.target.files[0]);
    }
  };

  const handleVerificationSubmit = async () => {
    console.log('Verifying payment with code:', verificationCode);
    setIsProcessing(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if verification code is correct (for demo purposes, accept any 6-digit code)
    if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
      completePayment();
    } else {
      setIsProcessing(false);
      toast({
        title: "Verification failed",
        description: "Please check your verification code and try again.",
        variant: "destructive"
      });
    }
  };

  const completePayment = () => {
    setIsProcessing(false);
    setIsComplete(true);
    
    toast({
      title: "Payment successful!",
      description: "Your worker account has been fully activated.",
    });
    
    console.log('Payment complete, redirecting to home page...');
    // Redirect to home page after a delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Worker Registration Fee</CardTitle>
            <CardDescription>
              Complete your registration by paying the annual worker registration fee
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-muted">
              <h3 className="font-medium text-lg">Registration Fee Details</h3>
              <p className="text-sm mt-1">Annual Worker Registration: R250.00</p>
              <p className="text-xs text-muted-foreground mt-2">
                This fee covers your annual membership and allows employers to find and hire you through our platform.
              </p>
            </div>
            
            {isComplete ? (
              <div className="flex flex-col items-center p-6 space-y-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-medium text-lg">Payment Complete!</h3>
                <p className="text-sm text-center">
                  Your worker account has been fully activated. You will be redirected to the home page.
                </p>
              </div>
            ) : showVerification ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Verification Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Please enter the verification code sent to your email after payment.
                  </p>
                  
                  {selectedPaymentMethod === "eft" && (
                    <div className="space-y-4 p-4 border rounded-md bg-muted">
                      <h4 className="font-medium">Bank Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Capitec:</span> Account Number 123456789</p>
                        <p><span className="font-medium">FNB:</span> Account Number 2345678888</p>
                        <p className="text-xs italic mt-2">Please use your email as reference</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reference">Your Payment Reference</Label>
                        <Input 
                          id="reference" 
                          value={bankReference}
                          onChange={(e) => setBankReference(e.target.value)}
                          placeholder="Enter the reference you used"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="proof">Upload Proof of Payment</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="proof"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleProofUpload}
                          />
                          {proofOfPayment && (
                            <div className="text-xs text-green-600 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  <Button 
                    onClick={handleVerificationSubmit} 
                    className="w-full" 
                    disabled={isProcessing || (selectedPaymentMethod === "eft" && (!proofOfPayment || !bankReference))}
                  >
                    {isProcessing ? 'Verifying...' : 'Verify Payment'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Tabs defaultValue="credit-card" onValueChange={setSelectedPaymentMethod}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                    <TabsTrigger value="eft">EFT</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit-card" className="space-y-4 pt-4">
                    <div className="border rounded-md p-3 bg-gray-50 flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Credit or Debit Card Payment</span>
                    </div>
                    
                    <Button 
                      onClick={handlePayment} 
                      className="w-full" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Pay R250.00'}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="eft" className="space-y-4 pt-4">
                    <div className="border rounded-md p-3 bg-gray-50 flex items-center space-x-3">
                      <Bank className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Electronic Funds Transfer</span>
                    </div>
                    
                    <div className="p-4 border rounded-md bg-muted space-y-2 text-sm">
                      <p><span className="font-medium">Capitec:</span> Account Number 123456789</p>
                      <p><span className="font-medium">FNB:</span> Account Number 2345678888</p>
                      <p className="text-xs italic mt-2">Please use your email as reference</p>
                    </div>
                    
                    <Button 
                      onClick={handlePayment} 
                      className="w-full" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'I\'ve Made the Payment'}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="space-y-4 pt-4">
                    <div className="border rounded-md p-3 bg-gray-50 flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">PayPal Payment</span>
                    </div>
                    
                    <Button 
                      onClick={handlePayment} 
                      className="w-full" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Pay with PayPal'}
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerPaymentPage;
