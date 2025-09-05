import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-bold text-xl">
                M
              </div>
              <span className="text-2xl font-bold">MineGuard</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Enhancing mine safety with AI-powered rockfall prediction, 
              real-time monitoring, and proactive risk management solutions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Features</a></li>
              <li><a href="#risk-zones" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Risk Zones</a></li>
              <li><a href="#dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Dashboard</a></li>
              <li><a href="#alerts" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Alerts</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#help" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</a></li>
              <li><a href="#docs" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Documentation</a></li>
              <li><a href="#terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/80">+91 9876-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/80">support@mineguard.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-primary-foreground/80">Available Globally</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-primary-foreground/80 mb-3">Get safety insights & updates</p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="harvest" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 MineGuard. All rights reserved. Built for safer mining operations.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="harvest" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
