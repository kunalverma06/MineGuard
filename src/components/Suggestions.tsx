import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, MapPin, CloudRain } from "lucide-react";

const RiskZones = () => {
  const zones = [
    {
      name: "Zone A - North Slope",
      severity: "High Risk",
      probability: "85%",
      factors: "Heavy rainfall, high displacement readings",
      recommendation: "Immediate inspection and slope reinforcement needed",
      color: "bg-destructive"
    },
    {
      name: "Zone B - East Wall",
      severity: "Moderate Risk",
      probability: "60%",
      factors: "Moderate pore pressure, increasing strain",
      recommendation: "Increase monitoring frequency",
      color: "bg-warning"
    },
    {
      name: "Zone C - South Pit",
      severity: "Low Risk",
      probability: "25%",
      factors: "Stable conditions, minor vibrations",
      recommendation: "Routine monitoring",
      color: "bg-primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Predicted Rockfall Risk Zones
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            AI-powered predictions highlighting vulnerable areas in the mine, 
            with severity levels and recommended actions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              Open-Pit Mine Site
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <CloudRain className="h-4 w-4 mr-2" />
              Last 24h Rainfall: 42 mm
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {zones.map((zone, index) => (
            <Card key={index} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
              <div className={`h-2 ${zone.color}`} />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {zone.name}
                  </CardTitle>
                  <Badge className={zone.color + " text-white"}>
                    {zone.severity}
                  </Badge>
                </div>
                <CardDescription className="text-primary font-medium">
                  Probability: {zone.probability}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Key Factors</p>
                  <p className="font-semibold">{zone.factors}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Recommended Action</p>
                      <p className="text-base font-bold text-foreground">{zone.recommendation}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  View Detailed Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Get Real-Time Monitoring
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Sign up to receive live alerts and detailed reports for your mine site
          </p>
        </div>
      </div>
    </section>
  );
};

export default RiskZones;
