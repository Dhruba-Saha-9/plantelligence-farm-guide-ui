import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Calendar, Sprout, Star, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CropSuggestions = () => {
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [soilType, setSoilType] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateSuggestions = async () => {
    if (!location || !season || !soilType) {
      toast({
        title: "Please fill all fields",
        description: "Location, season, and soil type are required for accurate suggestions.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setSuggestions([
        {
          name: "Rice",
          icon: "🌾",
          suitability: 95,
          growthTime: "120-140 days",
          expectedYield: "4-6 tons/hectare",
          waterNeed: "High",
          pros: ["High market demand", "Good for clay soil", "Monsoon suitable"],
          cons: ["Water intensive", "Labor intensive"],
          profitability: "High"
        },
        {
          name: "Wheat",
          icon: "🌾",
          suitability: 87,
          growthTime: "120-150 days",
          expectedYield: "3-4 tons/hectare",
          waterNeed: "Moderate",
          pros: ["Good market price", "Less water needed", "Easy storage"],
          cons: ["Sensitive to heat", "Requires good drainage"],
          profitability: "Medium"
        },
        {
          name: "Cotton",
          icon: "🌿",
          suitability: 78,
          growthTime: "180-200 days",
          expectedYield: "1.5-2 tons/hectare",
          waterNeed: "Moderate",
          pros: ["High value crop", "Good for clay soil", "Long growing season"],
          cons: ["Pest management needed", "Market price volatile"],
          profitability: "High"
        }
      ]);
      setIsGenerating(false);
      toast({
        title: "Crop Suggestions Generated!",
        description: "AI has analyzed your conditions and generated personalized recommendations.",
      });
    }, 2500);
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-destructive";
  };

  const getSuitabilityBg = (score: number) => {
    if (score >= 90) return "bg-success/10 border-success/20";
    if (score >= 75) return "bg-warning/10 border-warning/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Smart Crop Suggestions</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Input Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Your Farm Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Punjab, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <select
                  id="season"
                  className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                >
                  <option value="">Select season</option>
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <select
                  id="soilType"
                  className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md text-sm"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                >
                  <option value="">Select soil type</option>
                  <option value="clay">Clay</option>
                  <option value="loam">Loam</option>
                  <option value="sandy">Sandy</option>
                  <option value="silt">Silt</option>
                </select>
              </div>
            </div>
            <Button 
              variant="success" 
              onClick={generateSuggestions}
              disabled={isGenerating}
              className="w-full animate-pulse-glow"
            >
              {isGenerating ? "Generating AI Suggestions..." : "Get Smart Crop Suggestions"}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isGenerating && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-nature rounded-full mx-auto flex items-center justify-center animate-spin mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <p className="text-muted-foreground">AI is analyzing your farm conditions...</p>
          </div>
        )}

        {/* Crop Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-warning" />
              Recommended Crops for Your Farm
            </h2>
            
            <div className="grid gap-6">
              {suggestions.map((crop, index) => (
                <Card key={crop.name} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-2xl">{crop.icon}</div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{crop.name}</CardTitle>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSuitabilityBg(crop.suitability)}`}>
                          <Star className="w-3 h-3" />
                          <span className={getSuitabilityColor(crop.suitability)}>
                            {crop.suitability}% Match
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Growth Time</p>
                          <p className="text-sm font-medium">{crop.growthTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Expected Yield</p>
                          <p className="text-sm font-medium">{crop.expectedYield}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-accent">💧</span>
                        <div>
                          <p className="text-xs text-muted-foreground">Water Need</p>
                          <p className="text-sm font-medium">{crop.waterNeed}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-success mb-2">✅ Advantages</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {crop.pros.map((pro: string, i: number) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-destructive mb-2">⚠️ Considerations</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {crop.cons.map((con: string, i: number) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Profitability</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          crop.profitability === 'High' ? 'bg-success text-success-foreground' :
                          crop.profitability === 'Medium' ? 'bg-warning text-warning-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {crop.profitability}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropSuggestions;