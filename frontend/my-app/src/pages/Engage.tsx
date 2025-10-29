import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Award, Heart, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Engage = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [pledgeName, setPledgeName] = useState("");
  const [totalPledges, setTotalPledges] = useState(247);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const { toast } = useToast();

  const waterGoal = 8;

  const handleWaterAdd = () => {
    if (waterCount < waterGoal) {
      setWaterCount(prev => prev + 1);
      if (waterCount + 1 === waterGoal) {
        toast({
          title: "🎉 Goal Achieved!",
          description: "You've reached your daily water goal!",
        });
      }
    }
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pledgeName.trim()) {
      setTotalPledges(prev => prev + 1);
      toast({
        title: "✨ Pledge Recorded!",
        description: `Thank you, ${pledgeName}! You're part of ${totalPledges + 1} health commitments.`,
      });
      setPledgeName("");
    }
  };

  const quizQuestions = [
    {
      question: "How many hours of sleep do you get on average?",
      options: ["Less than 6", "6-7", "7-9", "More than 9"],
      scores: [0, 1, 3, 2]
    },
    {
      question: "How often do you exercise per week?",
      options: ["Never", "1-2 times", "3-4 times", "5+ times"],
      scores: [0, 1, 2, 3]
    },
    {
      question: "How many servings of fruits/vegetables do you eat daily?",
      options: ["0-1", "2-3", "4-5", "6+"],
      scores: [0, 1, 2, 3]
    }
  ];

  const handleQuizAnswer = (questionIndex: number, score: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = score;
    setQuizAnswers(newAnswers);
  };

  const getQuizResult = () => {
    const total = quizAnswers.reduce((sum, score) => sum + (score || 0), 0);
    const max = quizQuestions.reduce((sum, q) => sum + Math.max(...q.scores), 0);
    const percentage = (total / max) * 100;

    if (percentage >= 80) return { emoji: "🌟", text: "Excellent! You have great health habits.", color: "text-primary" };
    if (percentage >= 60) return { emoji: "💚", text: "Good job! A few small improvements can help.", color: "text-secondary" };
    if (percentage >= 40) return { emoji: "💛", text: "Fair. Consider focusing on one area at a time.", color: "text-accent" };
    return { emoji: "🌱", text: "There's room to grow. Start with small changes!", color: "text-muted-foreground" };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6">Take Action Today</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Small steps lead to big changes. Track your progress, commit to goals,
              and join a community of health champions.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Water Tracker */}
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Droplet className="h-6 w-6 text-secondary" />
                    <CardTitle>Water Tracker</CardTitle>
                  </div>
                  <CardDescription>Track your daily hydration goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setWaterCount(prev => Math.max(0, prev - 1))}
                        disabled={waterCount === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="text-center">
                        <div className="text-5xl font-bold text-secondary">{waterCount}</div>
                        <div className="text-sm text-muted-foreground">of {waterGoal} glasses</div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleWaterAdd}
                        disabled={waterCount >= waterGoal}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-secondary to-primary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(waterCount / waterGoal) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      {waterCount >= waterGoal
                        ? "🎉 Daily goal achieved!"
                        : `${waterGoal - waterCount} more glasses to go!`}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Health Pledge */}
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-accent" />
                    <CardTitle>Health Pledge</CardTitle>
                  </div>
                  <CardDescription>Commit to a healthier you</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePledgeSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your name"
                        value={pledgeName}
                        onChange={(e) => setPledgeName(e.target.value)}
                      />
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>I pledge to:</strong> Take at least one positive health action
                        every day for the next week.
                      </p>
                    </div>
                    <Button type="submit" className="w-full">
                      Make My Pledge
                    </Button>
                    <div className="text-center pt-2">
                      <div className="text-3xl font-bold text-primary">{totalPledges}</div>
                      <div className="text-sm text-muted-foreground">people have pledged</div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Health Quiz */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-soft">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Health Habits Quiz</CardTitle>
                  <CardDescription>How healthy are your daily habits?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quizQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="space-y-3">
                      <h4 className="font-medium">{q.question}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((option, oIndex) => (
                          <Button
                            key={oIndex}
                            variant={quizAnswers[qIndex] === q.scores[oIndex] ? "default" : "outline"}
                            className="w-full"
                            onClick={() => handleQuizAnswer(qIndex, q.scores[oIndex])}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {quizAnswers.length === quizQuestions.length && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg text-center animate-in fade-in">
                      <div className="text-5xl mb-2">{getQuizResult().emoji}</div>
                      <h3 className={`text-xl font-bold mb-2 ${getQuizResult().color}`}>
                        Your Result
                      </h3>
                      <p className="text-muted-foreground">{getQuizResult().text}</p>
                    </div>
                  )}
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

export default Engage;
