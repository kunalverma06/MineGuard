import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  Activity, 
  Database, 
  Camera, 
  AlertTriangle, 
  CloudRain, 
  FileText, 
  Settings 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: "Real-time Risk Maps",
      description: "Visualize vulnerable mine zones with color-coded severity levels powered by AI models.",
      badge: "Live"
    },
    {
      icon: <Activity className="h-8 w-8 text-accent" />,
      title: "Probability Forecasts",
      description: "Get predictive insights with probability-based forecasts for rockfall risks over time.",
      badge: "AI"
    },
    {
      icon: <Database className="h-8 w-8 text-secondary" />,
      title: "Sensor Data Monitoring",
      description: "Track geotechnical data such as displacement, strain, and pore pressure in real time.",
      badge: "IoT"
    },
    {
      icon: <Camera className="h-8 w-8 text-destructive" />,
      title: "Drone & DEM Integration",
      description: "Process drone-captured imagery and digital elevation models for slope stability analysis.",
      badge: "3D"
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-warning" />,
      title: "Instant Alerts",
      description: "Receive SMS/email alerts with severity levels and suggested action plans for safety.",
      badge: "Critical"
    },
    {
      icon: <CloudRain className="h-8 w-8 text-blue-500" />,
      title: "Environmental Tracking",
      description: "Monitor rainfall, temperature, and vibrations to factor environmental risks into predictions.",
      badge: "Live Data"
    },
    {
      icon: <FileText className="h-8 w-8 text-secondary" />,
      title: "Reports & Action Plans",
      description: "Download risk assessment reports and recommended mitigation strategies instantly.",
      badge: "PDF/CSV"
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Custom Integration",
      description: "Easily integrate with low-cost monitoring hardware and open-source tools for scalability.",
      badge: "Flexible"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Intelligent Mine Safety Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From real-time monitoring to predictive analytics, our platform 
            equips mine planners with the tools they need for safer operations.
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
