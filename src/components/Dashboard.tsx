import { useState } from 'react';
import { LogOut, MessageCircle, X, Send, TrendingUp, Award, Target, BookOpen } from 'lucide-react';
import { Employee } from '../types';

interface DashboardProps {
  employee: Employee;
  onLogout: () => void;
}

export default function Dashboard({ employee, onLogout }: DashboardProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'bot'; message: string }>>([
    { type: 'bot', message: `Hello ${employee.fullName.split(' ')[0]}! I'm your AI Skill Coach. How can I help you develop your skills today?` }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    setChatHistory([...chatHistory, { type: 'user', message: chatMessage }]);

    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "Based on your current skillset, I recommend focusing on advanced topics in this area.",
        "I can create a personalized learning path for you. Would you like to explore that?",
        "Great initiative! Let's build on your existing skills."
      ];
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 1000);

    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Skoda" className="h-10 w-auto" />
              <div className="h-8 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">AI Skill Coach</h1>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{employee.fullName}</div>
                <div className="text-xs text-gray-500">{employee.employeeId}</div>
              </div>
              <div className="h-10 w-px bg-gray-300" />
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {employee.fullName.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Continue your learning journey and develop new skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#4BA82E] p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Info</h3>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-[#4BA82E] pl-4 py-2">
                <div className="text-sm text-gray-500">Department</div>
                <div className="font-semibold text-gray-900">{employee.department}</div>
              </div>

              <div className="border-l-4 border-[#4BA82E] pl-4 py-2">
                <div className="text-sm text-gray-500">Position</div>
                <div className="font-semibold text-gray-900">{employee.position}</div>
              </div>

              <div className="border-l-4 border-[#4BA82E] pl-4 py-2">
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-semibold text-gray-900">{employee.email}</div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#18342B] to-[#1a4d3a] rounded-lg">
                <div className="text-white">
                  <div className="text-sm opacity-90 mb-1">Company Mission</div>
                  <div className="font-semibold text-lg">
                    Driving Innovation Forward
                  </div>
                  <p className="text-sm opacity-80 mt-2">
                    Building the future of mobility with sustainable and intelligent solutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#4BA82E] p-2 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Our Skillset</h3>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-3">Current Skills</div>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-[#4BA82E] to-[#3d8f25] text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="h-5 w-5 text-[#4BA82E]" />
                  <div className="font-semibold text-gray-900">Development Path</div>
                </div>
                <p className="text-sm text-gray-600">
                  Focus on advanced technical skills and leadership development
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-[#4BA82E]" />
                  <div className="font-semibold text-gray-900">Recommended Next Steps</div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cloud Architecture Certification</li>
                  <li>• Advanced Project Management</li>
                  <li>• AI/ML Fundamentals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#4BA82E] mb-2">12</div>
            <div className="text-gray-600">Courses Completed</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#4BA82E] mb-2">4</div>
            <div className="text-gray-600">In Progress</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#4BA82E] mb-2">85%</div>
            <div className="text-gray-600">Skill Progress</div>
          </div>
        </div>
      </main>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 bg-[#4BA82E] hover:bg-[#3d8f25] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 group"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Coach Chat
        </span>
      </button>

      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-[#18342B] to-[#1a4d3a] p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">AI Skill Coach</div>
                <div className="text-white/70 text-xs">Always here to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    chat.type === 'user'
                      ? 'bg-[#4BA82E] text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4BA82E] focus:border-[#4BA82E] outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#4BA82E] hover:bg-[#3d8f25] text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

