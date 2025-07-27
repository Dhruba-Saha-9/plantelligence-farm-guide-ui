import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LeafScanner from "./pages/LeafScanner";
import SoilAnalysis from "./pages/SoilAnalysis";
import CropSuggestions from "./pages/CropSuggestions";
import VoiceAssistant from "./pages/VoiceAssistant";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import MarketPrices from "./pages/MarketPrices";
import WeatherUpdate from "./pages/WeatherUpdate";
import GovtSchemes from "./pages/GovtSchemes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leaf-scanner" element={<LeafScanner />} />
          <Route path="/soil-analysis" element={<SoilAnalysis />} />
          <Route path="/crop-suggestions" element={<CropSuggestions />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/community" element={<Community />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/weather-update" element={<WeatherUpdate />} />
          <Route path="/govt-schemes" element={<GovtSchemes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
