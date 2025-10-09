import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, Trash2, Loader2, Settings, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4().replace(/-/g, ""));
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem("n8n_webhook_url") || "");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempWebhookUrl, setTempWebhookUrl] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!webhookUrl) {
      setIsSettingsOpen(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveWebhook = () => {
    if (!tempWebhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("n8n_webhook_url", tempWebhookUrl);
    setWebhookUrl(tempWebhookUrl);
    setIsSettingsOpen(false);
    
    toast({
      title: "Webhook Configured",
      description: "Your n8n webhook URL has been saved successfully.",
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!webhookUrl) {
      toast({
        title: "Configuration Required",
        description: "Please configure your n8n webhook URL in settings first.",
        variant: "destructive",
      });
      setIsSettingsOpen(true);
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create an AbortController with a longer timeout for slow pipelines
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          action: "sendMessage",
          chatInput: userMessage.content,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("n8n response:", data);
      
      // Handle different n8n response formats
      let assistantContent = "";
      
      if (typeof data === 'string') {
        assistantContent = data;
      } else if (Array.isArray(data) && data[0]?.response) {
        assistantContent = data[0].response;
      } else if (data.response) {
        assistantContent = data.response;
      } else if (data.output) {
        assistantContent = data.output;
      } else if (data.text) {
        assistantContent = data.text;
      } else if (data.message) {
        assistantContent = data.message;
      } else if (data.result) {
        assistantContent = data.result;
      }

      // If still no content found, log the full response for debugging
      if (!assistantContent) {
        console.warn("Unexpected response format:", JSON.stringify(data, null, 2));
        assistantContent = "Sorry, I couldn't process your request. The response format was unexpected.";
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: assistantContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      
      let errorMessage = "Failed to send message. ";
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage += "Check if your n8n webhook URL is correct and your workflow is active.";
      } else if (error instanceof Error) {
        errorMessage += error.message;
      }
      
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Remove the user message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-medium border border-border overflow-hidden">
      <div className="bg-gradient-medical p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Welcome to MedAssist AI</h2>
            <p className="text-sm opacity-90">
              Describe your symptoms and I'll help identify potential conditions and treatments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {webhookUrl && (
              <div className="flex items-center gap-1 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">Connected</span>
              </div>
            )}
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-white/20"
                  onClick={() => setTempWebhookUrl(webhookUrl)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="dark">
                <DialogHeader>
                  <DialogTitle>Configure n8n Webhook</DialogTitle>
                  <DialogDescription>
                    Enter your n8n webhook URL to connect the chat interface to your workflow
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Webhook URL
                    </label>
                    <Input
                      placeholder="https://your-n8n-instance.com/webhook/..."
                      value={tempWebhookUrl}
                      onChange={(e) => setTempWebhookUrl(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">How to set up your n8n webhook:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Open your n8n workflow</li>
                      <li><strong>Remove</strong> any "Chat Trigger" node</li>
                      <li><strong>Add</strong> a "Webhook" node as the trigger</li>
                      <li>Set HTTP Method to <strong>POST</strong></li>
                      <li>Copy the webhook URL from the node</li>
                      <li><strong>Activate</strong> your workflow</li>
                      <li>Paste the webhook URL above</li>
                    </ol>
                    <p className="mt-3 text-xs bg-accent/20 p-2 rounded">
                      <strong>Important:</strong> Your n8n workflow should return a JSON response 
                      with a "response" field containing the AI's answer.
                    </p>
                  </div>
                  <Button onClick={handleSaveWebhook} className="w-full">
                    Save Configuration
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleClear}
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/20"
              disabled={messages.length === 0}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12 animate-fade-in">
            <p className="text-lg mb-2">Start by describing your symptoms</p>
            <p className="text-sm">
              For example: "I have a fever, cough, and chest pains"
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing your symptoms...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-muted/30 p-4">
        <div className="flex gap-2 mb-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms here..."
            className="resize-none bg-background"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 self-end"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center px-2">
          ⚕️ <strong>Medical Disclaimer:</strong> This tool is for informational purposes only 
          and is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always seek the advice of your physician or other qualified health provider.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
