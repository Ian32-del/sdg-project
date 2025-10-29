import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, Camera, Heart } from "lucide-react";

const Community = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Health Advocate",
      quote: "Starting my morning walk routine changed everything. I feel more energized and focused throughout the day.",
      avatar: "👩‍💼"
    },
    {
      name: "James K.",
      role: "Fitness Enthusiast",
      quote: "The water tracker helped me build a simple habit that improved my overall health. Small changes matter!",
      avatar: "👨‍🏫"
    },
    {
      name: "Maria L.",
      role: "Wellness Coach",
      quote: "Mental health is just as important as physical health. Taking time for mindfulness has been transformative.",
      avatar: "👩‍⚕️"
    }
  ];

  const events = [
    {
      title: "Community Health Fair",
      date: "Every month",
      description: "Free health screenings, nutrition workshops, and wellness activities for all ages.",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Weekly Walking Group",
      date: "Saturdays 8 AM",
      description: "Join fellow community members for a refreshing morning walk in the park.",
      icon: Heart,
      color: "text-secondary"
    },
    {
      title: "Mindfulness Sessions",
      date: "Wednesdays 6 PM",
      description: "Guided meditation and breathing exercises to reduce stress and improve focus.",
      icon: MessageCircle,
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6">Our Community</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Together we're stronger. Share experiences, celebrate victories,
              and support each other on the journey to better health.
            </p>
          </div>
        </section>

        {/* Community Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mb-4">Upcoming Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join us at these community health events and activities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {events.map((event, index) => {
                const Icon = event.icon;
                return (
                  <Card key={index} className="shadow-soft hover:shadow-hover transition-smooth">
                    <CardHeader>
                      <div className="mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${event.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">{event.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mb-4">Community Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real people, real transformations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{testimonial.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-primary" />
                <h2>Event Gallery</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Moments from our community health initiatives
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center hover:scale-105 transition-smooth cursor-pointer shadow-soft"
                >
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                📸 Gallery photos will be added from community events
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
