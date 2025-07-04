import { CheckCircle, Lightbulb, BookOpen, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AnswerDisplayProps {
  answer: string;
  question?: string;
  subject?: string;
}

const AnswerDisplay = ({ answer, question, subject }: AnswerDisplayProps) => {
  const displayAnswer = answer || `Great question about ${subject}! Let me help you understand this step by step...`;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-green-600 to-red-600 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Here's Your Answer! • Hapa ni Jibu Lako! 🇰🇪
            </h3>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
              {displayAnswer}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Helpful Tips Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md bg-blue-50">
          <CardContent className="p-4 text-center">
            <Lightbulb className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800 mb-1">Pro Tip • Kidokezo</h4>
            <p className="text-sm text-gray-600">Have your child explain the solution back to you in their own words!</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-green-50">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800 mb-1">Practice • Mazoezi</h4>
            <p className="text-sm text-gray-600">Try similar problems together to reinforce the learning concepts.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-red-50">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800 mb-1">Kenya Context</h4>
            <p className="text-sm text-gray-600">Connect learning to real examples from Kenyan life and culture!</p>
          </CardContent>
        </Card>
      </div>

      {/* Encouragement Section */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-orange-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Hongera! You're Supporting Education in Kenya! 🎓
          </h3>
          <p className="text-gray-600">
            Every question you help answer builds a stronger future for Kenya. 
            Keep encouraging your child's curiosity and learning journey!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnswerDisplay;
