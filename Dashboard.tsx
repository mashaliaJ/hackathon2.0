import { useState } from "react";
import { Button } from "@/components/ui/button";
import SubjectNav from "@/components/SubjectNav";
import QuestionInput from "@/components/QuestionInput";
import AnswerDisplay from "@/components/AnswerDisplay";
import VideoLibrary from "@/components/VideoLibrary";
import PaymentModal from "@/components/PaymentModal";
import { LogOut, Crown, User } from "lucide-react";
import { toast } from "sonner";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [currentView, setCurrentView] = useState("homework");
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleQuestionSubmit = async (question: string, image?: File) => {
    setIsLoading(true);
    setCurrentQuestion(question);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response with Kenyan context
      const mockResponse = generateKenyanContextResponse(question, selectedSubject);
      setCurrentAnswer(mockResponse);
      toast.success("Got your answer! Scroll down to see the explanation.");
      
    } catch (error) {
      toast.error("Sorry, something went wrong. Please try again.");
      console.error("Error processing question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateKenyanContextResponse = (question: string, subject: string) => {
    return `**Jambo! Let me help you with this ${subject} question.**

**Understanding the Problem:**
This is a common topic in Kenya's CBC curriculum for Grade ${user.grade || '7-9'}.

**Step-by-Step Solution:**
1. **Hatua ya kwanza (First step)**: Let's identify what we know
2. **Hatua ya pili (Second step)**: Apply the concept we learned
3. **Hatua ya mwisho (Final step)**: Check our answer

**Kenyan Context Example:**
Think of this like... ${getKenyanExample(subject)}

**For Parents:**
Explain to ${user.childName || 'your child'} using examples from daily life in ${user.county || 'Kenya'}.

**Quick Check (Ukaguzi wa haraka):**
✓ Does the answer make sense?
✓ Can we explain it in both English and Kiswahili?

Hongera! You're doing great supporting your child's education! 🇰🇪`;
  };

  const getKenyanExample = (subject: string) => {
    const examples = {
      mathematics: "calculating the cost of maize at the local market in your county",
      english: "writing a story about Mount Kenya or Lake Victoria",
      kiswahili: "mazungumzo kuhusu sherehe za kitamaduni Kenya",
      science: "observing the wildlife in Maasai Mara or studying Mount Kilimanjaro",
      "social-studies": "learning about Kenya's 47 counties and their resources"
    };
    return examples[subject as keyof typeof examples] || "something familiar from Kenyan culture";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">HK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Homework Helper Kenya</h1>
              <p className="text-sm text-gray-600">Karibu, {user.name}! 🇰🇪</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPayment(true)}
              className="text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <Crown className="h-4 w-4 mr-1" />
              Upgrade
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.childName} - Grade {user.grade}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            <Button
              variant={currentView === "homework" ? "default" : "ghost"}
              onClick={() => setCurrentView("homework")}
              className={currentView === "homework" ? "bg-green-600 text-white" : ""}
            >
              📚 Homework Help
            </Button>
            <Button
              variant={currentView === "videos" ? "default" : "ghost"}
              onClick={() => setCurrentView("videos")}
              className={currentView === "videos" ? "bg-red-600 text-white" : ""}
            >
              📹 Video Library
            </Button>
            <Button
              variant={currentView === "progress" ? "default" : "ghost"}
              onClick={() => setCurrentView("progress")}
              className={currentView === "progress" ? "bg-blue-600 text-white" : ""}
            >
              📊 Progress
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {currentView === "homework" && (
          <>
            <SubjectNav 
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
            />
            
            <QuestionInput 
              onSubmit={handleQuestionSubmit}
              isLoading={isLoading}
              selectedSubject={selectedSubject}
            />
            
            {(currentAnswer || currentQuestion) && (
              <AnswerDisplay 
                answer={currentAnswer}
                question={currentQuestion}
                subject={selectedSubject}
              />
            )}
          </>
        )}

        {currentView === "videos" && (
          <VideoLibrary 
            grade={user.grade || "7"}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
          />
        )}

        {currentView === "progress" && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
            <p className="text-gray-600">Coming soon! Track {user.childName}'s learning journey.</p>
          </div>
        )}
      </div>

      {showPayment && (
        <PaymentModal 
          onClose={() => setShowPayment(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;


