// /src/lib/mock-deepseek.ts
export const mockDeepSeek = async (userMessage: string): Promise<string> => {
  // Simulate API delay (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock responses for testing
  const mockResponses: Record<string, string> = {
    // Health-related questions
    "exercise": "For beginners, start with 20-minute walks daily. Gradually increase to 30 minutes with light jogging. 🏃‍♂️",
    "water": "Aim for 6-8 glasses (1.5-2 liters) of water daily. More if you exercise or it's hot. 💧",
    "sleep": "Adults need 7-9 hours of quality sleep. Keep a consistent bedtime and avoid screens before bed. 😴",
    "stress": "Try the 4-7-8 breathing technique: Inhale 4s, hold 7s, exhale 8s. Repeat 4 times. 🌿",
    "diet": "Eat a balanced plate: ½ vegetables, ¼ protein, ¼ whole grains. Add healthy fats like avocado. 🥑",
    
    // Default response
    "default": "For better health, focus on consistent hydration, regular movement, quality sleep, and stress management. 🌟"
  };
  
  // Check keywords in the question
  const lowerMsg = userMessage.toLowerCase();
  let response = mockResponses.default;
  
  if (lowerMsg.includes("exercise") || lowerMsg.includes("workout")) {
    response = mockResponses.exercise;
  } else if (lowerMsg.includes("water") || lowerMsg.includes("hydrat")) {
    response = mockResponses.water;
  } else if (lowerMsg.includes("sleep") || lowerMsg.includes("rest")) {
    response = mockResponses.sleep;
  } else if (lowerMsg.includes("stress") || lowerMsg.includes("anxious")) {
    response = mockResponses.stress;
  } else if (lowerMsg.includes("diet") || lowerMsg.includes("food") || lowerMsg.includes("eat")) {
    response = mockResponses.diet;
  }
  
  return `${response}\n\n---\n*⚠️ AI-Generated Response: For informational purposes only.*`;
};