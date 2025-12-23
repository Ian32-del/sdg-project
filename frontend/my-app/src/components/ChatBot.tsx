import { useState, useEffect, useRef } from "react";
import { Send, Bot, X, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockDeepSeek } from '@/lib/mock-deepseek';

// 🚨 DANGEROUS TOPICS - Redirect to emergency services
const DANGEROUS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die',
  'heart attack', 'chest pain', 'stroke', 'severe pain',
  'overdose', 'poison', 'bleeding profusely', 'can\'t breathe',
  'pregnant bleeding', 'unconscious', 'seizure'
];

// 🩺 MEDICAL ADVICE TOPICS - Require doctor consultation
const MEDICAL_KEYWORDS = [
  'diagnose', 'diagnosis', 'cure', 'treatment for',
  'medicine for', 'take pills', 'dosage', 'prescription',
  'disease', 'illness', 'infection', 'cancer', 'covid',
  'pregnant', 'surgery', 'operation', 'blood test'
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [aiConsent, setAiConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 🧠 Your curated safe responses (FIRST priority)
  const responses: Record<string, string> = {
    // 💧 Hydration & Nutrition
    "how much water": "Aim for about 6–8 glasses (1.5–2 liters) of water per day 💧 — more if you exercise or it's hot outside!",
    "signs of dehydration": "Common signs include dry mouth, fatigue, dark urine, dizziness, and headaches. 💧",
    "healthy snacks": "Try fruits, nuts, yogurt, boiled eggs, or whole-grain crackers for long-lasting energy 🍎",
    "balanced diet": "A balanced diet includes fruits, vegetables, lean proteins, whole grains, and healthy fats 🥦🍗🍚",
    "vitamin deficiency": "Common symptoms include fatigue, brittle nails, and poor concentration — try eating more leafy greens or consult a doctor 💊",
    "sugar intake": "Limit added sugars to less than 10% of your daily calories — prefer natural sugars from fruits 🍓",

    // 🧘 Mental Health & Wellness
    "reduce stress": "Take short breaks, practice deep breathing, stretch, or meditate for a few minutes 🌿",
    "breathing exercises": "Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7, exhale for 8 — repeat 4 times 🫁",
    "feel anxious": "When anxiety hits, pause and breathe slowly, focus on your surroundings, or write down what you feel 💬",
    "mental health": "Take care of your mind by resting, connecting with friends, and doing things you enjoy ❤️",
    "mindfulness": "Mindfulness means being present in the moment — start with 5 minutes of focused breathing 🧘‍♂️",
    "motivation": "Set small goals and celebrate your wins — progress builds confidence 🌱",

    // 🏃 Fitness & Lifestyle
    "easy exercises": "Start with bodyweight moves like squats, push-ups, jumping jacks, or stretching routines 🏋️",
    "walk or jog": "Beginners can start with 20–30 minutes of walking or light jogging daily 🚶‍♀️",
    "home workout": "Try yoga, skipping rope, or resistance bands — no gym needed 💪",
    "muscle gain": "Eat enough protein, lift weights consistently, and rest your muscles 🥩🏋️",
    "daily routine": "Balance your day with work, exercise, hydration, and enough sleep for full well-being 🌞",

    // 😴 Sleep & Rest
    "sleep quality": "Keep a consistent bedtime, reduce screen time before bed, and avoid caffeine late in the day 😴",
    "sleep hours": "Adults need 7–9 hours of sleep per night for full recovery 🛏️",
    "can't sleep": "Try reading a book, dimming lights, or playing soft music before bed 🎶",
    "sleep schedule": "Go to bed and wake up at the same time daily to help your body clock stay consistent 🕰️",

    // 🦠 Disease Prevention & Immunity
    "boost immunity": "Eat vitamin-rich foods (especially C and D), stay active, and get enough sleep 🥝💪",
    "wash hands": "Wash your hands with soap for at least 20 seconds — especially before eating or after coughing 🧼",
    "vaccination": "Vaccines help protect you and your community — check with your healthcare provider for updates 💉",
    "cold prevention": "Stay hydrated, eat fruits like oranges, and rest well if you feel run down 🍊",

    // ❤️ General Wellness & Motivation
    "healthy lifestyle": "Eat balanced meals, exercise regularly, manage stress, and sleep well — that's the foundation of good health 🌿",
    "mental balance": "Balance comes from routine — include moments of calm, laughter, and gratitude in your day 💛",
    "well-being": "True well-being includes physical, mental, and social health — take care of all three 🌍",
    "thank you": "You're very welcome! Stay healthy and keep going strong 💪😊",
    "hello": "Hey there! 👋 I'm your health assistant. You can ask me about hydration, exercise, stress, or sleep.",
    "who are you": "I'm your friendly health bot 🤖 — here to share wellness tips and guidance for a better lifestyle!"
  };

  // 🛡️ SAFETY CHECK FUNCTIONS
  const containsDangerousKeyword = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return DANGEROUS_KEYWORDS.some(keyword => lowerText.includes(keyword));
  };

  const containsMedicalKeyword = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return MEDICAL_KEYWORDS.some(keyword => lowerText.includes(keyword));
  };

  // 🧠 Get response - HYBRID SYSTEM
  const getBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // 1️⃣ FIRST: Check for EMERGENCY keywords
    if (containsDangerousKeyword(lowerMessage)) {
      return "🚨 **EMERGENCY NOTICE**: If you're experiencing a medical emergency, please call emergency services immediately. For mental health support, contact a crisis helpline in your country.";
    }
    
    // 2️⃣ SECOND: Check for MEDICAL advice keywords
    if (containsMedicalKeyword(lowerMessage)) {
      return "⚠️ **IMPORTANT**: I cannot provide medical diagnoses or treatment advice. Please consult with a qualified healthcare professional for medical concerns.";
    }
    
    // 3️⃣ THIRD: Check your CURATED responses
    for (const key in responses) {
      if (lowerMessage.includes(key)) {
        return responses[key];
      }
    }
    
    // 4️⃣ FOURTH: If user hasn't consented to AI, return generic response
    if (!aiConsent) {
      return "I can help with general wellness topics like hydration, exercise, sleep, and stress management. Could you ask about one of those areas? 💪";
    }
    
    // 5️⃣ FIFTH: Use DeepSeek AI for other questions
    return await getDeepSeekResponse(userMessage);
  };

  // 🤖 DEEPSEEK AI INTEGRATION
  const getDeepSeekResponse = async (userMessage: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // ✅ LOCAL DEVELOPMENT: Use mock
      if (import.meta.env.DEV) {
        console.log("🔧 Using mock AI for local development");
        return await mockDeepSeek(userMessage);
      }
      
      // ✅ PRODUCTION: Use real DeepSeek API via Vercel function
      console.log("🚀 Using real DeepSeek API in production");
      
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a supportive health and wellness assistant. Follow these STRICT rules:
              1. ONLY provide general wellness, fitness, nutrition, and mental health TIPS
              2. NEVER diagnose conditions, prescribe treatments, or suggest medications
              3. ALWAYS encourage users to consult healthcare professionals for medical advice
              4. If a question is medical or requires diagnosis, say: "I recommend consulting a doctor"
              5. Keep responses under 100 words, friendly, and simple
              6. Focus on: hydration, exercise, sleep, stress management, nutrition basics
              7. Always add: "Remember to consult a healthcare professional for personal advice"
              8. NEVER suggest specific dosages, supplements, or alternative therapies`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 200,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 
        "I'm here to help with health and wellness tips!";
      
      return `${aiResponse}\n\n---\n*⚠️ AI-Generated Response: For informational purposes only.*`;
      
    } catch (error: any) {
      console.error('API error:', error);
      // Fallback to mock if real API fails
      return await mockDeepSeek(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 📨 Send message handler
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    
    const botResponse = await getBotResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    setInput("");
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Enter key support
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
  };

  // 📋 Consent Modal Component
  const ConsentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center gap-2 mb-4 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="text-lg font-bold">AI Assistant Notice</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="text-sm"><strong>This chatbot uses AI for general wellness information.</strong></p>
          
          <div className="text-sm space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>NOT a medical tool</strong> - Cannot diagnose or treat</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>AI may make mistakes</strong> - Verify important information</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Consult professionals</strong> for medical concerns</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>Free service</strong> - Powered by DeepSeek AI</span>
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => {
              setAiConsent(false);
              setIsOpen(false);
            }}
            className="flex-1"
          >
            Decline
          </Button>
          <Button 
            onClick={() => setAiConsent(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            I Understand & Continue
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && !aiConsent && <ConsentModal />}
      
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <Button 
            onClick={() => setIsOpen(true)} 
            className="rounded-full p-4 bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Bot className="h-6 w-6" />
          </Button>
        ) : (
          <div className="bg-white shadow-2xl rounded-xl w-80 md:w-96 flex flex-col border border-gray-300 max-h-[600px]">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h4 className="font-semibold">Health & Wellness Assistant</h4>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                    title="Clear chat"
                  >
                    Clear
                  </button>
                )}
                <X 
                  className="h-5 w-5 cursor-pointer hover:bg-white/20 p-1 rounded transition-colors" 
                  onClick={() => setIsOpen(false)} 
                />
              </div>
            </div>
            
            {/* Chat Messages Container - FIXED HEIGHT WITH SCROLL */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[400px]"
            >
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500 h-full flex flex-col justify-center">
                  <div className="mb-4">
                    <Bot className="h-12 w-12 mx-auto text-gray-300" />
                  </div>
                  <p className="font-medium">👋 Hello! I'm your Health Assistant</p>
                  <p className="text-sm mt-3 text-gray-600">You can ask me about:</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs">• Hydration & Nutrition</p>
                    <p className="text-xs">• Exercise & Fitness</p>
                    <p className="text-xs">• Sleep & Stress Management</p>
                    <p className="text-xs">• General Wellness Tips</p>
                  </div>
                  <p className="text-xs mt-4 text-gray-400">
                    Type your question below to get started!
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          m.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none shadow-sm"
                            : "bg-gray-50 text-gray-800 rounded-bl-none border border-gray-200 shadow-sm"
                        }`}
                      >
                        {m.text}
                        {m.sender === "bot" && m.text.includes("AI-Generated") && (
                          <div className="mt-2 pt-2 border-t border-gray-300 border-dashed">
                            <p className="text-xs text-gray-500">
                              🤖 AI Assistant • General wellness tips only
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-50 rounded-2xl px-4 py-3 rounded-bl-none border border-gray-200">
                        <div className="flex gap-2">
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Thinking...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Empty div for auto-scroll */}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
            
            {/* Message Count Indicator */}
            {messages.length > 0 && (
              <div className="px-4 py-1 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {messages.length} message{messages.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ChevronDown className="h-3 w-3" />
                    Scroll to bottom
                  </button>
                </div>
              </div>
            )}
            
            {/* Input Area - STICKY BOTTOM */}
            <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
              <div className="flex gap-2">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Type your health question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSend} 
                  className="px-4 bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  💡 Try: "How much water?" or "Easy home workout"
                </p>
                {!aiConsent && messages.length > 0 && (
                  <button
                    onClick={() => setAiConsent(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Enable AI Assistant
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;