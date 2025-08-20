import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Mic } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Smart Farming for
            <span className="block bg-gradient-to-r from-secondary to-yellow-300 bg-clip-text text-transparent">
              Better Harvests
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Get personalized crop suggestions, real-time weather updates, 
            market prices, and government schemes - all in your language. 
            Empowering farmers with technology.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-elevated mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Ask about crops, weather, prices, or schemes..."
                  className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3">
                <Button size="lg" variant="ghost" className="h-14 px-4">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="hero" className="h-14 px-8">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="harvest" 
              size="lg" 
              className="text-lg"
              onClick={() => window.location.href = '/chat'}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat with AI
            </Button>
            <Button variant="outline" size="lg" className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;