import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Droplets, Sun, MapPin } from "lucide-react";

const CropSuggestions = () => {
  const crops = [
    {
      name: "Rice (Basmati)",
      season: "Kharif",
      duration: "120-140 days",
      yield: "18-22 quintals/acre",
      profit: "₹25,000-35,000",
      suitability: "Perfect for your region",
      color: "bg-primary"
    },
    {
      name: "Wheat",
      season: "Rabi", 
      duration: "110-130 days",
      yield: "15-20 quintals/acre",
      profit: "₹20,000-28,000",
      suitability: "Good for winter",
      color: "bg-secondary"
    },
    {
      name: "Cotton",
      season: "Kharif",
      duration: "160-180 days", 
      yield: "8-12 quintals/acre",
      profit: "₹30,000-45,000",
      suitability: "High market demand",
      color: "bg-accent"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Recommended Crops for Your Area
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Based on your location, soil type, and current market conditions, 
            here are the best crops to plant this season.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              Punjab, India
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Sun className="h-4 w-4 mr-2" />
              Kharif Season
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Droplets className="h-4 w-4 mr-2" />
              Alluvial Soil
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {crops.map((crop, index) => (
            <Card key={index} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
              <div className={`h-2 ${crop.color}`} />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {crop.name}
                  </CardTitle>
                  <Badge className={crop.color + " text-white"}>
                    {crop.season}
                  </Badge>
                </div>
                <CardDescription className="text-primary font-medium">
                  {crop.suitability}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{crop.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Yield</p>
                    <p className="font-semibold">{crop.yield}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Profit</p>
                      <p className="text-xl font-bold text-primary">{crop.profit}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Get Detailed Guide
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Get Personalized Recommendations
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Sign up to get recommendations based on your exact location and soil conditions
          </p>
        </div>
      </div>
    </section>
  );
};

export default CropSuggestions;