import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Droplet, Brain, Users, ArrowRight, Target, Smile, TrendingUp } from "lucide-react";

const Index = () => {
  const stats = [
    { icon: Users, value: "247", label: "Health Pledges", color: "text-primary" },
    { icon: Heart, value: "89%", label: "Engagement Rate", color: "text-secondary" },
    { icon: Smile, value: "1,234", label: "Community Members", color: "text-accent" },
  ];

  const features = [
    {
      icon: Droplet,
      title: "Track Your Habits",
      description: "Simple tools to monitor water intake, exercise, and daily wellness activities.",
      link: "/engage",
      color: "text-secondary"
    },
    {
      icon: Brain,
      title: "Learn & Grow",
      description: "Access evidence-based health information on nutrition, fitness, and mental wellness.",
      link: "/learn",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "Connect with others, share experiences, and participate in health events.",
      link: "/community",
      color: "text-accent"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-white py-20 md:py-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/health-banner.jpg')" }}>
    
    {/* Dim overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6 animate-float">
          <Heart className="h-12 w-12 fill-white" />
        </div>
        <h1 className="mb-6">Good Health & Well-being for All</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          SDG 3 is about ensuring healthy lives and promoting well-being.
          Start your journey to better health today—one small step at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/engage">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/learn">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 rounded-full bg-background shadow-soft flex items-center justify-center ${stat.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="mb-4">Everything You Need for Better Health</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interactive tools, reliable information, and a supportive community—all in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-2">
                    <CardHeader>
                      <div className="mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center ${feature.color}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={feature.link}>
                        <Button variant="ghost" className="group">
                          Explore
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Daily Tip Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto shadow-soft border-2">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Target className="h-10 w-10 text-primary animate-pulse-slow" />
                </div>
                <CardTitle className="text-3xl">Today's Health Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-lg">
                    <strong className="text-primary">Stay Hydrated:</strong> Aim to drink 8 glasses of water throughout the day.
                    Proper hydration improves energy, focus, and overall health.
                  </p>
                  <Link to="/engage">
                    <Button size="lg">
                      Track Your Water Intake
                      <Droplet className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-primary animate-float" />
              <h2 className="mb-6">Ready to Take the First Step?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of people committed to improving their health.
                Small changes today lead to significant improvements tomorrow.
              </p>
              <Link to="/engage">
                <Button size="lg" className="text-lg px-8">
                  Start Your Health Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
