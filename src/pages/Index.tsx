import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Mic, Leaf, Droplets, Sprout, Globe, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { toast } = useToast();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  ];

  const features = [
    {
      icon: Camera,
      title: "Leaf Scanner",
      description: "Scan leaves to detect diseases instantly",
      route: "/leaf-scanner",
      variant: "camera" as const,
    },
    {
      icon: Droplets,
      title: "Soil Analysis",
      description: "Analyze soil health and nutrients",
      route: "/soil-analysis",
      variant: "secondary" as const,
    },
    {
      icon: Sprout,
      title: "Crop Suggestions",
      description: "Get AI-powered crop recommendations",
      route: "/crop-suggestions",
      variant: "success" as const,
    },
    {
      icon: Mic,
      title: "Voice Assistant",
      description: "Speak your farming questions",
      route: "/voice-assistant",
      variant: "voice" as const,
    },
  ];

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-nature rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-nature bg-clip-text text-transparent">
              Plantelligence
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-nature opacity-20 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-nature w-24 h-24 rounded-full mx-auto flex items-center justify-center animate-float">
              <Leaf className="w-12 h-12 text-white animate-leaf-sway" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Your AI Farming
              <span className="bg-gradient-nature bg-clip-text text-transparent"> Assistant</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Scan plants, analyze soil, get crop recommendations, and boost your farm's productivity with AI-powered insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              variant="scan" 
              size="lg" 
              className="animate-pulse-glow"
              onClick={() => navigate('/leaf-scanner')}
            >
              <Camera className="w-5 h-5" />
              Start Scanning
            </Button>
            <Button 
              variant="voice" 
              size="fab" 
              className="animate-pulse-glow"
              onClick={() => navigate('/voice-assistant')}
            >
              <Mic className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.route}
              className="group cursor-pointer hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50"
              onClick={() => handleFeatureClick(feature.route)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      feature.variant === 'camera' ? 'bg-gradient-sky' :
                      feature.variant === 'secondary' ? 'bg-gradient-earth' :
                      feature.variant === 'success' ? 'bg-success' :
                      'bg-gradient-sunrise'
                    }`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-6">Trusted by Farmers Worldwide</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Crops Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          Empowering farmers with AI technology • Made with 🌱 for sustainable agriculture
        </p>
      </footer>
    </div>
  );
};

export default Index;
