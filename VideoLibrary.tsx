import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, ExternalLink } from "lucide-react";
import SubjectNav from "@/components/SubjectNav";

interface VideoLibraryProps {
  grade: string;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const VideoLibrary = ({ grade, selectedSubject, onSubjectChange }: VideoLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock curated video content for Kenyan curriculum
  const videoContent = {
    mathematics: [
      { title: "Algebra Basics for Grade 7-9", channel: "Kenya Math Hub", duration: "15:30", thumbnail: "🧮", description: "Learn algebra with Kenyan examples" },
      { title: "Geometry: Angles and Triangles", channel: "Shule Digital", duration: "12:45", thumbnail: "📐", description: "Understanding shapes in our environment" },
      { title: "Statistics and Data Collection", channel: "CBC Mathematics", duration: "18:20", thumbnail: "📊", description: "Collecting data in Kenyan communities" }
    ],
    english: [
      { title: "Essay Writing Techniques", channel: "English Kenya", duration: "20:15", thumbnail: "✍️", description: "How to write compelling essays" },
      { title: "Grammar: Tenses Made Easy", channel: "Learn English KE", duration: "14:30", thumbnail: "📝", description: "Master English tenses step by step" },
      { title: "Reading Comprehension Skills", channel: "CBC English", duration: "16:45", thumbnail: "📚", description: "Improve your reading understanding" }
    ],
    kiswahili: [
      { title: "Utungaji wa Insha", channel: "Kiswahili Kenya", duration: "22:10", thumbnail: "🗣️", description: "Jinsi ya kuandika insha nzuri" },
      { title: "Sarufi: Nomino na Vivumishi", channel: "Lugha Yetu", duration: "17:30", thumbnail: "📖", description: "Kuelewa sarufi ya Kiswahili" },
      { title: "Mazungumzo ya Kila Siku", channel: "Kiswahili CBC", duration: "19:25", thumbnail: "💬", description: "Kuongea Kiswahili vizuri" }
    ],
    science: [
      { title: "Photosynthesis Explained Simply", channel: "Science Kenya", duration: "13:40", thumbnail: "🌱", description: "How plants make their food" },
      { title: "The Human Body Systems", channel: "Bio Kenya", duration: "25:30", thumbnail: "🫀", description: "Understanding our body parts" },
      { title: "Chemical Reactions Basics", channel: "Chemistry KE", duration: "16:20", thumbnail: "⚗️", description: "Simple chemistry experiments" }
    ]
  };

  const currentVideos = videoContent[selectedSubject as keyof typeof videoContent] || [];

  const openYouTubeSearch = (query: string) => {
    const searchQuery = `${query} Kenya CBC Grade ${grade} ${selectedSubject}`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Video Library • Maktaba ya Video 📹
        </h2>
        <p className="text-gray-600">Educational videos aligned with Kenya's CBC curriculum</p>
      </div>

      <SubjectNav 
        selectedSubject={selectedSubject}
        onSubjectChange={onSubjectChange}
      />

      {/* Search Section */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for specific topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => openYouTubeSearch(searchTerm || selectedSubject)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              YouTube
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
                <span className="text-4xl">{video.thumbnail}</span>
              </div>
              <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Channel:</strong> {video.channel}</p>
                <p><strong>Duration:</strong> {video.duration}</p>
                <p>{video.description}</p>
              </div>
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => openYouTubeSearch(video.title)}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch on YouTube
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access to Popular Kenyan Educational Channels */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-center">Popular Kenyan Educational Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Shule Digital", subjects: "All CBC Subjects" },
              { name: "Kenya Math Hub", subjects: "Mathematics" },
              { name: "Science Kenya", subjects: "Integrated Science" },
              { name: "English Kenya", subjects: "English Language" },
              { name: "Kiswahili CBC", subjects: "Kiswahili" },
              { name: "CBC Learning", subjects: "All Subjects" }
            ].map((channel, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto flex flex-col items-center gap-2"
                onClick={() => openYouTubeSearch(channel.name)}
              >
                <span className="font-semibold">{channel.name}</span>
                <span className="text-xs text-gray-600">{channel.subjects}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoLibrary;
