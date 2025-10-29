import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Dumbbell, Apple, Brain, Shield, Smile } from "lucide-react";

const Learn = () => {
  const topics = [
    {
      icon: Apple,
      title: "Nutrition Basics",
      description: "Learn about balanced diets, essential nutrients, and healthy eating habits for optimal health.",
      color: "text-primary",
    },
    {
      icon: Dumbbell,
      title: "Exercise & Fitness",
      description: "Discover simple exercises and movement routines that fit into your daily life.",
      color: "text-secondary",
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Explore strategies for stress management, mindfulness, and emotional well-being.",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Hygiene & Prevention",
      description: "Essential practices to prevent illness and maintain personal health.",
      color: "text-primary",
    },
    {
      icon: Heart,
      title: "Heart Health",
      description: "Understanding cardiovascular health and ways to keep your heart strong.",
      color: "text-secondary",
    },
    {
      icon: Smile,
      title: "Healthy Habits",
      description: "Small daily actions that lead to long-term health improvements.",
      color: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6">Learn About Health</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Knowledge is the first step to wellness. Explore practical health information
              that empowers you to make informed decisions.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <Card 
                    key={index}
                    className="shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1 cursor-pointer"
                  >
                    <CardHeader>
                      <div className="mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${topic.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <CardTitle>{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Quick Health Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">💧 Stay Hydrated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aim for 8 glasses of water daily. Proper hydration supports all body functions
                    and improves energy levels.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🚶 Move Regularly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Take a 5-minute walk every hour. Small movements throughout the day add up
                    to significant health benefits.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">😴 Prioritize Sleep</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get 7-9 hours of quality sleep. Good sleep is fundamental to mental clarity,
                    immune function, and overall wellness.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🧘 Practice Mindfulness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Take 5 minutes daily for deep breathing. Mindfulness reduces stress and
                    improves emotional resilience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
