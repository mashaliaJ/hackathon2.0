import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { X } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const AuthModal = ({ onClose, onLogin }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    childName: "",
    grade: "",
    county: ""
  });

  const kenyanCounties = [
    "Nairobi", "Mombasa", "Kiambu", "Nakuru", "Machakos", "Kajiado", "Murang'a",
    "Kisumu", "Uasin Gishu", "Meru", "Kilifi", "Kwale", "Nyeri", "Kirinyaga",
    "Embu", "Tharaka Nithi", "Laikipia", "Nyandarua", "Nyandua", "Kericho",
    "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisii",
    "Nyamira", "Narok", "Baringo", "Elgeyo Marakwet", "Nandi", "Trans Nzoia",
    "West Pokot", "Samburu", "Turkana", "Marsabit", "Isiolo", "Mandera",
    "Wajir", "Garissa", "Tana River", "Lamu", "Taita Taveta", "Makueni", "Kitui"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const userData = {
        name: formData.name || "Parent",
        email: formData.email,
        childName: "Student",
        grade: "7",
        county: "Nairobi"
      };
      onLogin(userData);
    } else {
      // Registration logic
      if (!formData.name || !formData.email || !formData.childName || !formData.grade) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        childName: formData.childName,
        grade: formData.grade,
        county: formData.county
      };
      
      toast.success("Registration successful! Welcome to Homework Helper Kenya!");
      onLogin(userData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? "Welcome Back!" : "Join Homework Helper Kenya"}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Input
                  placeholder="Your Name (Parent/Guardian)"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Phone Number (e.g., 0712345678)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </>
            )}
            
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            
            {!isLogin && (
              <>
                <Input
                  placeholder="Child's Name"
                  value={formData.childName}
                  onChange={(e) => setFormData({...formData, childName: e.target.value})}
                  required
                />
                
                <Select onValueChange={(value) => setFormData({...formData, grade: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Child's Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select onValueChange={(value) => setFormData({...formData, county: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select County" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {kenyanCounties.map((county) => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin ? "Don't have an account? Register here" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;	
