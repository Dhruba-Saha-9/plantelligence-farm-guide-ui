import { Button } from "@/components/ui/button";
import { ArrowLeft, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GovtSchemes = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-green-100/40">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-earth rounded-lg flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Government Schemes</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="p-6 rounded-lg border bg-background/80 shadow">
          <h2 className="text-2xl font-semibold mb-2">Schemes & Subsidies</h2>
          <p className="text-muted-foreground mb-4">Coming soon: Explore the latest government schemes, subsidies, and how to apply.</p>
        </div>
      </div>
    </div>
  );
};

export default GovtSchemes; 