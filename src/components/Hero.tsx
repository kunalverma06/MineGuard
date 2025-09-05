import { Button } from "@/components/ui/button";
import { AlertTriangle, BarChart3, PlayCircle } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered Rockfall
            <span className="block bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              Prediction & Monitoring
            </span>
          </h1>

          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Ensure safer mining operations with real-time risk maps, predictive 
            analytics, and instant alerts. Harness the power of AI and IoT to 
            protect people, equipment, and resources.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              size="lg"
              className="text-lg"
              onClick={() => window.location.href = '/dashboard'}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              View Dashboard
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="text-lg"
              onClick={() => window.location.href = '/alerts'}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Get Alerts
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
