import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CloudRain, 
  TrendingUp, 
  FileText, 
  Beaker, 
  MessageSquare, 
  Smartphone,
  Globe,
  Shield
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <CloudRain className="h-8 w-8 text-accent" />,
      title: "Weather Insights",
      description: "7-day forecasts, rain alerts, and season-specific guidance to plan your farming activities.",
      badge: "Live Data"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Mandi Prices",
      description: "Real-time market prices from nearby mandis with trend analysis and price predictions.",
      badge: "Real-time"
    },
    {
      icon: <FileText className="h-8 w-8 text-secondary" />,
      title: "Government Schemes",
      description: "Access to latest agricultural schemes, subsidies, and application assistance.",
      badge: "Updated"
    },
    {
      icon: <Beaker className="h-8 w-8 text-destructive" />,
      title: "Fertilizer Guidance",
      description: "Soil-specific fertilizer recommendations and crop nutrition advice.",
      badge: "Expert"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-accent" />,
      title: "WhatsApp Bot",
      description: "Get instant answers via WhatsApp in your preferred language.",
      badge: "24/7"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Voice Search",
      description: "Ask questions in your voice - works in Hindi, Tamil, Marathi, and more.",
      badge: "Multi-lingual"
    },
    {
      icon: <Globe className="h-8 w-8 text-secondary" />,
      title: "Offline Support",
      description: "Access critical information even without internet connectivity.",
      badge: "PWA"
    },
    {
      icon: <Shield className="h-8 w-8 text-destructive" />,
      title: "Trusted Advice",
      description: "Verified information from agricultural experts and government sources.",
      badge: "Verified"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything Farmers Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From weather updates to market prices, we provide comprehensive 
            agricultural intelligence to help you make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-soft transition-all duration-300 hover:scale-105 border-border/50"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;