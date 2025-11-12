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
      name: "Gabriel M.",
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
      title: "Nairobi Walk Movement",
      date: "Weekly group walks on Saturday mornings and Sunday afternoons in Nairobi",
      description: "All fitness levels welcome, contact: +254 783 514107",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Mental Wellness Walk & Picnic",
      date: "Saturdays 8 AM Oloolua Nature Trail, Karen Road, Nairobi.",
      description: "Join fellow community members for a refreshing morning walk in the park.",
      icon: Heart,
      color: "text-secondary"
    },
    {
      title: "World Health Expo 2025",
      date: "Planned for December 2025 in Nairobi",
      description: "large-scale health promotion, innovation and investment in healthcare.",
      icon: MessageCircle,
      color: "text-accent"
    }
  ];

  // Added gallery images with realistic health/community themed photos
  const galleryImages = [
    {
      id: 1,
      alt: "Community health fair with participants at various health screening stations",
      placeholder: "🏥 Health Fair"
    },
    {
      id: 2,
      alt: "Group of people doing morning yoga in the park",
      placeholder: "🧘‍♀️ Yoga Session"
    },
    {
      id: 3,
      alt: "Walking group enjoying nature trail during weekly community walk",
      placeholder: "🚶‍♂️ Group Walk"
    },
    {
      id: 4,
      alt: "Nutrition workshop with dietitian explaining healthy eating",
      placeholder: "🥗 Nutrition Talk"
    },
    {
      id: 5,
      alt: "Mental health awareness session with participants sharing experiences",
      placeholder: "💭 Mindfulness"
    },
    {
      id: 6,
      alt: "Community garden volunteers planting vegetables together",
      placeholder: "🌱 Garden Team"
    },
    {
      id: 7,
      alt: "Fitness class for seniors with light exercises and stretching",
      placeholder: "👵 Senior Fitness"
    },
    {
      id: 8,
      alt: "Healthy cooking demonstration with fresh ingredients",
      placeholder: "👨‍🍳 Cooking Demo"
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
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center hover:scale-105 transition-smooth cursor-pointer shadow-soft p-4 text-center"
                >
                  <div className="text-3xl mb-2">{image.placeholder.split(' ')[0]}</div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {image.placeholder.split(' ')[1]}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2 opacity-70">
                    {image.alt}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                📸 Real photos from our community events will be displayed here
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