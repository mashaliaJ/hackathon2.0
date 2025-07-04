import { BookOpen, Users, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center mb-12 px-4">
      <div className="flex justify-center items-center mb-6">
        <div className="bg-gradient-to-br from-green-600 via-black to-red-600 p-4 rounded-full">
          <BookOpen className="h-10 w-10 text-white" />
        </div>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
        Homework Helper
        <span className="text-green-600"> Kenya</span>
        <span className="text-red-600"> 🇰🇪</span>
      </h1>
      
      <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
        Your trusted companion for Grade 7-9 homework help
      </p>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        AI-powered explanations • YouTube videos • KICD curriculum aligned • Available in English & Kiswahili
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Mathematics & Sciences</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Languages (English & Kiswahili)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Social Studies & Arts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>All KICD Subjects</span>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="bg-gradient-to-r from-green-100 to-red-100 p-6 rounded-xl max-w-md mx-auto">
        <h3 className="font-semibold text-lg mb-2">Affordable for Every Family</h3>
        <p className="text-2xl font-bold text-green-600 mb-1">From KES 300/month</p>
        <p className="text-sm text-gray-600">Pay easily with M-Pesa • No hidden fees</p>
      </div>
    </div>
  );
};

export default HeroSection;
