import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, ArrowLeft, Droplets, BarChart3, Beaker } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SoilAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageCapture = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSoil = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setResults({
        soilType: "Clay Loam",
        moisture: 65,
        ph: 6.8,
        nitrogen: 45,
        phosphorus: 23,
        potassium: 78,
        organicMatter: 3.2,
        recommendation: "Good for most crops. Consider adding organic compost to improve nitrogen levels."
      });
      setIsAnalyzing(false);
      toast({
        title: "Soil Analysis Complete!",
        description: "Your soil health report is ready",
      });
    }, 3000);
  };

  const getNutrientColor = (value: number) => {
    if (value >= 70) return "text-success";
    if (value >= 40) return "text-warning";
    return "text-destructive";
  };

  const getNutrientBg = (value: number) => {
    if (value >= 70) return "bg-success/10 border-success/20";
    if (value >= 40) return "bg-warning/10 border-warning/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-earth rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Soil Health Analysis</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!selectedImage ? (
          /* Upload Section */
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-earth rounded-full mx-auto flex items-center justify-center animate-float">
                <Droplets className="w-12 h-12 text-white" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Upload Soil Sample</h2>
                <p className="text-muted-foreground">
                  Take a clear photo of your soil sample for comprehensive analysis
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={handleImageCapture}
                  className="animate-pulse-glow"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5" />
                  Upload Image
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Image and Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-accent" />
                    Soil Sample
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={selectedImage} 
                    alt="Soil sample" 
                    className="w-full rounded-lg object-cover mb-4"
                  />
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={analyzeSoil}
                      disabled={isAnalyzing}
                      className="flex-1"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Soil"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedImage(null);
                        setResults(null);
                      }}
                    >
                      New Sample
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Soil Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyzing soil composition...
                      </p>
                    </div>
                  ) : results ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Soil Type</p>
                          <p className="font-semibold">{results.soilType}</p>
                        </div>
                        <div className="text-center p-3 bg-accent/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">pH Level</p>
                          <p className="font-semibold">{results.ph}</p>
                        </div>
                      </div>
                      <div className="text-center p-3 bg-secondary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Moisture</p>
                        <p className="font-semibold">{results.moisture}%</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Upload and analyze your soil sample to see detailed properties.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Nutrient Analysis */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-success" />
                    Nutrient Analysis (NPK)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className={`p-4 rounded-lg border ${getNutrientBg(results.nitrogen)}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Nitrogen (N)</span>
                        <span className={`font-bold ${getNutrientColor(results.nitrogen)}`}>
                          {results.nitrogen}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${results.nitrogen >= 70 ? 'bg-success' : results.nitrogen >= 40 ? 'bg-warning' : 'bg-destructive'}`}
                          style={{ width: `${results.nitrogen}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getNutrientBg(results.phosphorus)}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Phosphorus (P)</span>
                        <span className={`font-bold ${getNutrientColor(results.phosphorus)}`}>
                          {results.phosphorus}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${results.phosphorus >= 70 ? 'bg-success' : results.phosphorus >= 40 ? 'bg-warning' : 'bg-destructive'}`}
                          style={{ width: `${results.phosphorus}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getNutrientBg(results.potassium)}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Potassium (K)</span>
                        <span className={`font-bold ${getNutrientColor(results.potassium)}`}>
                          {results.potassium}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${results.potassium >= 70 ? 'bg-success' : results.potassium >= 40 ? 'bg-warning' : 'bg-destructive'}`}
                          style={{ width: `${results.potassium}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <h4 className="font-medium text-success mb-2">Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      {results.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;