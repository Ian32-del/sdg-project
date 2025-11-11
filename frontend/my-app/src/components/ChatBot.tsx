import { useState } from "react";
import { Send, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // 🧠 Responses Dictionary
  const responses: Record<string, string> = {
  // 💧 Hydration & Nutrition
  "how much water": "Aim for about 6–8 glasses (1.5–2 liters) of water per day 💧 — more if you exercise or it’s hot outside!",
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
  "can’t sleep": "Try reading a book, dimming lights, or playing soft music before bed 🎶",
  "sleep schedule": "Go to bed and wake up at the same time daily to help your body clock stay consistent 🕰️",

  // 🦠 Disease Prevention & Immunity
  "boost immunity": "Eat vitamin-rich foods (especially C and D), stay active, and get enough sleep 🥝💪",
  "wash hands": "Wash your hands with soap for at least 20 seconds — especially before eating or after coughing 🧼",
  "vaccination": "Vaccines help protect you and your community — check with your healthcare provider for updates 💉",
  "cold prevention": "Stay hydrated, eat fruits like oranges, and rest well if you feel run down 🍊",

  // ❤️ General Wellness & Motivation
  "healthy lifestyle": "Eat balanced meals, exercise regularly, manage stress, and sleep well — that’s the foundation of good health 🌿",
  "mental balance": "Balance comes from routine — include moments of calm, laughter, and gratitude in your day 💛",
  "well-being": "True well-being includes physical, mental, and social health — take care of all three 🌍",
  "thank you": "You’re very welcome! Stay healthy and keep going strong 💪😊",
  "hello": "Hey there! 👋 I’m your health assistant. You can ask me about hydration, exercise, stress, or sleep.",
  "who are you": "I’m your friendly health bot 🤖 — here to share wellness tips and guidance for a better lifestyle!"
};


  // ✅ This is the correct function name
  const getBotResponse = (message: string): string => {
    const lower = message.toLowerCase();
    for (const key in responses) {
      if (lower.includes(key)) {
        return responses[key];
      }
    }
    return "I'm here to help with health, fitness, and wellness tips! Try asking about hydration, stress, or sleep 💬";
  };

  // 📨 Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // 👇 FIX: Call getBotResponse (not getBotReply)
    const botResponse = getBotResponse(input);

    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="rounded-full p-4">
          <Bot className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-white shadow-lg rounded-xl w-80 flex flex-col">
          <div className="flex justify-between items-center p-3 bg-primary text-white rounded-t-xl">
            <h4>Health Chatbot</h4>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 h-64">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  m.sender === "user"
                    ? "bg-primary text-white ml-auto"
                    : "bg-gray-100 text-black"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex p-3 border-t">
            <input
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none"
              placeholder="Ask about health..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleSend} className="ml-2 p-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
