import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useRef, useEffect } from "react";
import { Message } from "@/types/student/ai-educational-counselor";

interface ChatInterfaceProps {
  messages: Message[];
  isInitializing: boolean;
  isLoading: boolean;
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  onQuickQuestion: (question: string) => void;
  quickQuestions: string[];
}

const ChatInterface = ({
  messages,
  isInitializing,
  isLoading,
  input,
  setInput,
  onSend,
  onQuickQuestion,
  quickQuestions
}: ChatInterfaceProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current && messages.length > 0) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-ai-secondary" />
          Educational Counseling Session
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4 max-h-96" ref={scrollAreaRef}>
          {isInitializing ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-ai-secondary animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">Initializing your educational counseling session...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8">
                    {message.type === 'user' ? (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback className="bg-ai-secondary/10">
                        <Bot className="w-4 h-4 text-ai-secondary" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-ai-secondary text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="w-6 h-6 text-ai-secondary animate-spin" />
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        {/* Quick Questions */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onQuickQuestion(question)}
                className="text-xs"
                disabled={isLoading || isInitializing}
              >
                {question}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Ask about your learning path..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || isInitializing}
            />
            <Button onClick={handleSend} size="sm" disabled={isLoading || isInitializing}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
