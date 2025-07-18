import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, ArrowLeft, Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LeafScanner = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageCapture = () => {
    // In a real app, this would open camera
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

  const analyzeLeaf = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        disease: "Early Blight",
        confidence: 87,
        severity: "Moderate",
        treatment: "Apply copper-based fungicide every 7-10 days",
        prevention: "Ensure proper air circulation and avoid overhead watering"
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Disease detected with 87% confidence",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-success/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-nature rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Leaf Disease Scanner</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!selectedImage ? (
          /* Upload Section */
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-nature rounded-full mx-auto flex items-center justify-center animate-float">
                <Camera className="w-12 h-12 text-white" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Upload Leaf Image</h2>
                <p className="text-muted-foreground">
                  Take a clear photo of the affected leaf for AI analysis
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="scan" 
                  size="lg" 
                  onClick={handleImageCapture}
                  className="animate-pulse-glow"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </Button>
                <Button 
                  variant="secondary" 
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
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-success" />
                  Uploaded Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={selectedImage} 
                  alt="Uploaded leaf" 
                  className="w-full rounded-lg object-cover"
                />
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="scan" 
                    onClick={analyzeLeaf}
                    disabled={isAnalyzing}
                    className="flex-1"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Leaf"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedImage(null);
                      setResults(null);
                    }}
                  >
                    New Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Analysis Results
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
                      AI is analyzing your leaf image...
                    </p>
                  </div>
                ) : results ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <h3 className="font-semibold text-destructive flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {results.disease} Detected
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Confidence: {results.confidence}% • Severity: {results.severity}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          Treatment
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {results.treatment}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium">Prevention</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {results.prevention}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Click "Analyze Leaf" to start the disease detection process.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeafScanner;