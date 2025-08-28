import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { ChatMessage } from "@/types/student/resume-builder";

interface AIChatAssistantProps {
  showChat: boolean;
  onCloseChat: () => void;
  messages: ChatMessage[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isGenerating: boolean;
}

const AIChatAssistant = ({
  showChat,
  onCloseChat,
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isGenerating
}: AIChatAssistantProps) => {
  const suggestions = ['Improve descriptions', 'Add skills', 'Better summary', 'Format resume'];

  if (!showChat) return null;

  return (
    <div className="w-96 border-l bg-card flex flex-col h-screen">
      <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AI Resume Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by AI</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCloseChat}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
            {message.type === 'user' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex gap-3 justify-start">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI is analyzing your resume...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask AI to improve your resume..."
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            disabled={isGenerating}
          />
          <Button
            onClick={onSendMessage}
            disabled={isGenerating || !inputMessage.trim()}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => setInputMessage(suggestion)}
              disabled={isGenerating}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;
