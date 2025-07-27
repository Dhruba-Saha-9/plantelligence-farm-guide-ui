import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mic, MicOff, MessageCircle, Send, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { askGemini } from "@/lib/gemini";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const VoiceAssistant = () => {
  console.log('Gemini API Key:', import.meta.env.VITE_GEMINI_API_KEY);
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I am your AI farm assistant. You can ask me any questions about crops, seeds, fertilizers, or farming. You can speak or type your questions.',
      timestamp: new Date()
    }
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { toast } = useToast();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  ];

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setTextInput("My wheat crop leaves are turning yellow");
      toast({
        title: "Voice Captured",
        description: "Your voice message has been converted to text",
      });
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setTextInput("");

    // Show loading message
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: loadingId,
        type: 'assistant',
        content: 'Thinking...'
        ,
        timestamp: new Date()
      }
    ]);

    // Get Gemini response
    const reply = await askGemini(content);

    setMessages(prev => prev.map(m =>
      m.id === loadingId ? { ...m, content: reply } : m
    ));
  };

  const handleSubmit = () => {
    sendMessage(textInput);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'bn' ? 'bn-BD' : selectedLanguage === 'te' ? 'te-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-sunrise rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Voice Assistant</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border border-border rounded px-2 py-1 text-sm"
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

      <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-100px)] flex flex-col">
        {/* Chat Messages */}
        <Card className="flex-1 mb-4 overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              AI Farm Assistant Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-y-auto space-y-4 max-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.type === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakMessage(message.content)}
                        className="h-6 w-6 p-0"
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Voice Input Section */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isListening ? "destructive" : "voice"}
                size="lg"
                onClick={isListening ? stopListening : startListening}
                className={`rounded-full w-16 h-16 ${isListening ? 'animate-pulse' : 'animate-pulse-glow'}`}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              <div className="text-center">
                <p className="font-medium">
                  {isListening ? "Listening..." : "Tap to speak"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isListening ? "Say your farming question" : "Ask about crops, diseases, fertilizers"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your farming question here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button
                variant="default"
                onClick={handleSubmit}
                disabled={!textInput.trim()}
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceAssistant;