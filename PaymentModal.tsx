import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { X, Crown, Check, Smartphone } from "lucide-react";

interface PaymentModalProps {
  onClose: () => void;
  user: any;
}

const PaymentModal = ({ onClose, user }: PaymentModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "KES 300",
      period: "per month",
      features: [
        "3 subjects access",
        "20 AI questions per day",
        "Basic video library",
        "Email support"
      ],
      color: "blue"
    },
    {
      id: "standard", 
      name: "Standard Plan",
      price: "KES 500",
      period: "per month",
      features: [
        "All 8 subjects access",
        "50 AI questions per day", 
        "Full video library",
        "Priority support",
        "Progress tracking"
      ],
      color: "green",
      popular: true
    },
    {
      id: "family",
      name: "Family Plan",
      price: "KES 750",
      period: "per month",
      features: [
        "Up to 3 children",
        "All subjects access",
        "Unlimited AI questions",
        "Premium video content",
        "WhatsApp support",
        "Parent progress reports"
      ],
      color: "purple"
    }
  ];

  const handleMpesaPayment = async () => {
    if (!mpesaNumber || mpesaNumber.length < 10) {
      toast.error("Please enter a valid M-Pesa number");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate M-Pesa payment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success("Payment request sent! Check your phone for M-Pesa prompt.");
      
      // Simulate payment confirmation
      setTimeout(() => {
        toast.success("Payment successful! Welcome to Homework Helper Kenya Premium!");
        onClose();
      }, 5000);
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to Premium • Panda Premium
          </CardTitle>
          <p className="text-gray-600">
            Support {user.childName}'s education with unlimited access to all features
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan Selection */}
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all relative ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-green-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-green-600">{plan.price}</span>
                    <span className="text-gray-600 text-sm">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* M-Pesa Payment Section */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">Pay with M-Pesa</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Selected Plan: <strong>{selectedPlanDetails?.name}</strong>
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedPlanDetails?.price} per month
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    M-Pesa Number • Nambari ya M-Pesa
                  </label>
                  <Input
                    placeholder="e.g., 0712345678"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                    maxLength={12}
                  />
                </div>
                
                <Button 
                  onClick={handleMpesaPayment}
                  disabled={isProcessing || !mpesaNumber}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ${selectedPlanDetails?.price} via M-Pesa`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>🔒 Secure payments powered by M-Pesa</p>
            <p>💳 No hidden fees • Cancel anytime</p>
            <p>📞 Support: WhatsApp +2547 8573 9093</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
