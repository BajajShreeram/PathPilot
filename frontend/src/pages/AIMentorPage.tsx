import React, { useState, useRef, useEffect } from 'react';
import { getAIMentorResponse } from '../services/meshApi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ProfileData {
  name?: string;
  stream?: string;
  field?: string;
  careerInterests?: string[];
  career?: string[];
  studyAbroad?: boolean;
  examPreference?: string;
  favouriteSubjects?: string[];
  subjects?: string[];
  gradeClass: string;
  budget: string;
  needScholarships: boolean;
  preferredCountry?: string;
  dreamUniversity?: string;
  subjectInterests?: string[];
  strongSubjects?: string[];
  weakSubjects?: string[];
  country?: string;
}

const SUGGESTED_PROMPTS = [
  {
    icon: '🎯',
    text: 'What should I do next?',
  },
  {
    icon: '🎓',
    text: 'Which universities fit me?',
  },
  {
    icon: '📚',
    text: 'How should I prepare for my entrance exam?',
  },
  {
    icon: '💰',
    text: 'Which scholarships should I target?',
  },
  {
    icon: '📅',
    text: 'Create a 7-day study plan.',
  },
];

const getProfileValue = (profile: ProfileData | null, newKey: keyof ProfileData, oldKey?: keyof ProfileData, defaultValue: any = null): any => {
  if (!profile) return defaultValue;
  
  if (profile[newKey] !== undefined && profile[newKey] !== null) {
    return profile[newKey];
  }
  
  if (oldKey && profile[oldKey] !== undefined && profile[oldKey] !== null) {
    return profile[oldKey];
  }
  
  return defaultValue;
};

export const AIMentorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('pathpilot_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Failed to parse profile:', error);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getWelcomeMessage = (): string => {
    if (!profile) {
      return `Hi there! 👋

I'm your AI Mentor, here to guide you through your educational journey.

I can help you:
- Build study plans
- Prepare for entrance exams
- Recommend universities
- Find scholarships
- Improve your profile
- Answer career questions

What would you like to work on today?`;
    }

    const name = getProfileValue(profile, 'name', undefined, 'there');
    const stream = getProfileValue(profile, 'stream', 'field', 'Not selected');
    const careerInterestsRaw = getProfileValue(profile, 'careerInterests', 'career', []);
    const safeCareerInterests = Array.isArray(careerInterestsRaw) ? careerInterestsRaw : [];
    const careerInterest = safeCareerInterests.length > 0 ? safeCareerInterests[0] : 'Not selected';

    return `Hi ${name}! 👋

Based on your profile, I can see you're interested in ${careerInterest} through the ${stream} pathway.

I can help you:
- Build study plans
- Prepare for entrance exams
- Recommend universities
- Find scholarships
- Improve your profile
- Answer career questions

What would you like to work on today?`;
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call the real Mesh API
      const aiResponse = await getAIMentorResponse(message, profile || undefined);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error getting AI response:', err);
      
      // Show error message in chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 flex flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="text-center py-12 animate-fadeInUp">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl animate-float">
                🤖
              </div>
              <div className="max-w-2xl mx-auto mb-12">
                <div className="bg-white border-2 border-purple-100 rounded-3xl p-10 text-left shadow-xl">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                    {getWelcomeMessage()}
                  </div>
                </div>
              </div>

              {/* Suggested Prompts */}
              <div className="mt-12">
                <p className="text-base font-semibold text-gray-700 mb-6">💡 Try asking me:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                  {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 border-2 border-gray-200 hover:border-purple-300 rounded-2xl p-6 text-left transition-all duration-300 shadow-md hover:shadow-xl group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {prompt.icon}
                        </span>
                        <span className="text-base font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                          {prompt.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Messages
            <div className="space-y-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-5 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fadeInUp`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg">
                      🤖
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] sm:max-w-[65%] rounded-3xl px-7 py-5 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl'
                        : 'bg-white border-2 border-gray-100 text-gray-800 shadow-lg'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words text-base leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-4 ${
                        message.role === 'user' ? 'text-purple-100' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                      U
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-5 justify-start animate-fadeInUp">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg">
                    🤖
                  </div>
                  <div className="bg-white border-2 border-gray-100 rounded-3xl px-7 py-5 shadow-lg">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/95 backdrop-blur-sm border-t-2 border-gray-200 shadow-2xl sticky bottom-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your career, universities, exams..."
                className="w-full resize-none rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 px-6 py-4 text-base outline-none transition-all max-h-32 shadow-sm"
                rows={1}
                style={{
                  minHeight: '56px',
                  height: 'auto',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = '56px';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
            </div>
            
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-semibold transition-all duration-300 ${
                inputValue.trim() && !isTyping
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-gray-600 font-mono">Enter</kbd> to send • <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-gray-600 font-mono">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
};
