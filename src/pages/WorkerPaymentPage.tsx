
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle } from 'lucide-react';

const WorkerPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    
    toast({
      title: "Payment successful!",
      description: "Your worker account has been fully activated.",
    });
    
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
            ) : (
              <div className="space-y-4">
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerPaymentPage;
