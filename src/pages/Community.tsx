import { Button } from "@/components/ui/button";
import { Users, ArrowLeft, MessageCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-sunrise rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Community</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-6 rounded-lg border bg-background/80 shadow">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-primary" /> Discussions
            </h2>
            <p className="text-muted-foreground mb-4">Coming soon: Post questions, share advice, and discuss crop yielding, selling, and more with fellow farmers.</p>
          </div>
          <div className="flex-1 p-6 rounded-lg border bg-background/80 shadow">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" /> Meetings
            </h2>
            <p className="text-muted-foreground mb-4">Coming soon: Schedule and join meetings to collaborate on farming and market strategies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community; 