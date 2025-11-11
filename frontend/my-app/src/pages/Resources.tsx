import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, Globe, Heart, Brain, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resources = () => {
  const emergencyContacts = [
    { service: "Emergency Services", number: "112 or 999", icon: Phone, color: "text-destructive" },
    { service: "Mental Health Crisis", number: "1199", icon: Brain, color: "text-accent" },
    { service: "Poison Control", number: "+254 709 770 100", icon: Shield, color: "text-secondary" },
  ];

  const localResources = [
    {
      name: "Community Health Center",
      address: "123 Health St, Your City",
      phone: "(555) 123-4567",
      services: ["Primary Care", "Vaccinations", "Health Screenings"]
    },
    {
      name: "Mental Wellness Clinic",
      address: "456 Wellness Ave, Your City",
      phone: "(555) 234-5678",
      services: ["Counseling", "Support Groups", "Crisis Intervention"]
    },
    {
      name: "Fitness & Recreation Center",
      address: "789 Active Blvd, Your City",
      phone: "(555) 345-6789",
      services: ["Gym Access", "Group Classes", "Personal Training"]
    }
  ];

  const onlineResources = [
    {
      title: "WHO Health Topics",
      description: "Comprehensive health information from the World Health Organization",
      url: "https://www.who.int/health-topics",
      icon: Globe
    },
    {
      title: "Mental Health America",
      description: "Resources and support for mental health and wellness",
      url: "https://www.mhanational.org",
      icon: Brain
    },
    {
      title: "CDC Healthy Living",
      description: "Tips and guidelines for maintaining a healthy lifestyle",
      url: "https://www.cdc.gov/healthyliving",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6">Health Resources</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Access to health services and information is a right, not a privilege.
              Find the support you need, when you need it.
            </p>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-destructive">Emergency Contacts</h2>
              <p className="text-muted-foreground">
                In case of emergency, don't hesitate to call
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {emergencyContacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <Card key={index} className="shadow-soft border-2">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center ${contact.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{contact.service}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <a
                        href={`tel:${contact.number}`}
                        className={`text-3xl font-bold ${contact.color} hover:underline`}
                      >
                        {contact.number}
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Local Resources */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mb-4">Local Health Services</h2>
              <p className="text-muted-foreground">
                Health facilities and services in your community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {localResources.map((resource, index) => (
                <Card key={index} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl mb-2">{resource.name}</CardTitle>
                        <CardDescription className="text-sm">{resource.address}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a
                      href={`tel:${resource.phone}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {resource.phone}
                    </a>
                    <div className="pt-2">
                      <div className="text-sm font-medium mb-2">Services:</div>
                      <div className="flex flex-wrap gap-2">
                        {resource.services.map((service, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Online Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="mb-4">Trusted Online Resources</h2>
              <p className="text-muted-foreground">
                Reliable health information from reputable organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {onlineResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="shadow-soft hover:shadow-hover transition-smooth">
                    <CardHeader>
                      <div className="mb-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto shadow-soft">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
                <CardTitle className="text-2xl">Need Immediate Support?</CardTitle>
                <CardDescription>You're not alone. Help is available 24/7.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  If you or someone you know is experiencing a mental health crisis,
                  reach out to these confidential support lines:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4">
                    <div className="text-left">
                      <div className="font-semibold">Crisis Text Line</div>
                      <div className="text-sm text-muted-foreground">Text HOME to 741741</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4">
                    <div className="text-left">
                      <div className="font-semibold">National Suicide Prevention</div>
                      <div className="text-sm text-muted-foreground">Call 988</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
