import { Button } from "@/components/ui/button";

interface SubjectNavProps {
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectNav = ({ selectedSubject, onSubjectChange }: SubjectNavProps) => {
  const subjects = [
    { id: "mathematics", name: "Mathematics", icon: "🧮", color: "blue" },
    { id: "english", name: "English", icon: "📚", color: "green" },
    { id: "kiswahili", name: "Kiswahili", icon: "🗣️", color: "red" },
    { id: "science", name: "Integrated Science", icon: "🔬", color: "purple" },
    { id: "social-studies", name: "Social Studies", icon: "🌍", color: "orange" },
    { id: "cre", name: "Religious Education", icon: "✨", color: "yellow" },
    { id: "creative-arts", name: "Creative Arts", icon: "🎨", color: "pink" },
    { id: "pre-technical", name: "Pre-Technical", icon: "🔧", color: "gray" },
  ];

  const getButtonClass = (subject: any) => {
    const isSelected = selectedSubject === subject.id;
    const colorClasses = {
      blue: isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-blue-700",
      green: isSelected ? "bg-green-600 text-white" : "hover:bg-green-50 text-green-700",
      red: isSelected ? "bg-red-600 text-white" : "hover:bg-red-50 text-red-700",
      purple: isSelected ? "bg-purple-600 text-white" : "hover:bg-purple-50 text-purple-700",
      orange: isSelected ? "bg-orange-600 text-white" : "hover:bg-orange-50 text-orange-700",
      yellow: isSelected ? "bg-yellow-600 text-white" : "hover:bg-yellow-50 text-yellow-700",
      pink: isSelected ? "bg-pink-600 text-white" : "hover:bg-pink-50 text-pink-700",
      gray: isSelected ? "bg-gray-600 text-white" : "hover:bg-gray-50 text-gray-700",
    };
    return colorClasses[subject.color as keyof typeof colorClasses];
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Choose Subject • Chagua Somo 📖
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {subjects.map((subject) => (
          <Button
            key={subject.id}
            variant="outline"
            onClick={() => onSubjectChange(subject.id)}
            className={`p-4 h-auto flex flex-col items-center gap-2 border-2 transition-all ${getButtonClass(subject)}`}
          >
            <span className="text-2xl">{subject.icon}</span>
            <span className="text-sm font-medium text-center leading-tight">
              {subject.name}
            </span>
          </Button>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          All subjects aligned with Kenya's CBC curriculum for Grade 7-9
        </p>
      </div>
    </div>
  );
};

export default SubjectNav;
