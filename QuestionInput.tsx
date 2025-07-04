import { useState } from "react";
import { Camera, MessageSquare, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface QuestionInputProps {
  onSubmit: (question: string, image?: File) => void;
  isLoading: boolean;
  selectedSubject: string;
}

const QuestionInput = ({ onSubmit, isLoading, selectedSubject }: QuestionInputProps) => {
  const [question, setQuestion] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const subjectNames = {
    "mathematics": "Mathematics",
    "english": "English", 
    "kiswahili": "Kiswahili",
    "science": "Integrated Science",
    "social-studies": "Social Studies",
    "cre": "Religious Education",
    "creative-arts": "Creative Arts",
    "pre-technical": "Pre-Technical Studies"
  };

  const getSubjectPlaceholder = (subject: string) => {
    const placeholders = {
      "mathematics": "Type your math problem here... Example: 'Solve for x: 2x + 5 = 15' or 'Find the area of a circle with radius 7cm'",
      "english": "Ask about grammar, composition, or literature... Example: 'Explain the difference between simile and metaphor'",
      "kiswahili": "Uliza swali lako la Kiswahili hapa... Mfano: 'Eleza tofauti kati ya nomino na kivumishi'",
      "science": "Ask about biology, chemistry, or physics... Example: 'Explain the process of photosynthesis'",
      "social-studies": "Ask about geography, history, or civics... Example: 'Name the 47 counties of Kenya'",
      "cre": "Ask about religious studies... Example: 'Explain the importance of the Ten Commandments'",
      "creative-arts": "Ask about art, music, or drama... Example: 'What are the primary colors?'",
      "pre-technical": "Ask about agriculture, home science, or business... Example: 'What are the benefits of crop rotation?'"
    };
    return placeholders[subject as keyof typeof placeholders] || "Type your question here...";
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleSubmit = () => {
    if (!question.trim() && !selectedImage) {
      toast.error("Please enter a question or upload an image");
      return;
    }

    onSubmit(question, selectedImage || undefined);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur mb-8">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Need help with {subjectNames[selectedSubject as keyof typeof subjectNames]}?
          </h3>
          <p className="text-gray-600">Take a photo or type your question below</p>
        </div>

        <div className="space-y-4">
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
            {imagePreview ? (
              <div className="space-y-3">
                <img 
                  src={imagePreview} 
                  alt="Uploaded homework" 
                  className="max-h-40 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600">Homework image uploaded ✓</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="text-gray-600 font-medium">📸 Take a photo of your homework</p>
                <p className="text-sm text-gray-500">Works best with clear, well-lit images</p>
                <label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </span>
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Text Input Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <MessageSquare className="h-5 w-5" />
              <span className="font-medium">Or type your question</span>
            </div>
            
            <Textarea
              placeholder={getSubjectPlaceholder(selectedSubject)}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[120px] resize-none border-gray-300 focus:border-green-400"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || (!question.trim() && !selectedImage)}
            className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-medium py-4 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 text-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Getting your answer... Subiri kidogo...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Get AI Help • Pata Msaada 🤖
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionInput;

