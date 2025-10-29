import { Heart, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="font-bold text-lg">SDG 3</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Promoting health and well-being for all at all ages.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/learn" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Learn About Health
              </Link>
              <Link to="/engage" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Take Action
              </Link>
              <Link to="/resources" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Find Help
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Emergency Contacts</h4>
            <div className="space-y-2">
              <a href="tel:911" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                Emergency: 911
              </a>
              <a href="mailto:health@sdg3.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                health@sdg3.org
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SDG 3 Health Initiative. Building healthier communities together.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
