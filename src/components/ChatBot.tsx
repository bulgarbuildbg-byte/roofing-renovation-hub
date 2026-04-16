import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { useChatFunnel } from "@/hooks/useChatFunnel";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

const INITIAL_BUTTONS = [
  { label: "🚨 Имам теч / спешен проблем", value: "LEAK" },
  { label: "📋 Искам оферта", value: "QUOTE" },
  { label: "📞 Искам да ми се обадите", value: "CALLBACK" },
  { label: "🔍 Искам безплатен оглед", value: "INSPECTION" },
  { label: "🏠 Ремонт на покрив", value: "ROOF_REPAIR" },
  { label: "☀️ Соларна система", value: "SOLAR" },
  { label: "❓ Имам въпрос", value: "QUESTION" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const funnel = useChatFunnel();
  const aiChat = useChat();

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [funnel.messages, aiChat.messages]);

  // Focus input
  useEffect(() => {
    if (isOpen && funnel.showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, funnel.showInput]);

  const handleInitialClick = (value: string) => {
    funnel.addUser(INITIAL_BUTTONS.find(b => b.value === value)?.label || value);
    funnel.startFlow(value as any);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    const text = textInput.trim();
    setTextInput("");

    if (funnel.currentFlow === "QUESTION") {
      funnel.addUser(text);
      // Send to AI
      aiChat.sendMessage(text).then(() => {
        funnel.showAfterQuestionCTA();
      });
    } else {
      funnel.handleTextInput(text);
    }
  };

  const handleReset = () => {
    funnel.reset();
    aiChat.clearMessages();
  };

  const isStartScreen = funnel.messages.length === 0;

  // Merge AI messages into funnel display
  const allMessages = [...funnel.messages];
  if (funnel.currentFlow === "QUESTION" && aiChat.messages.length > 0) {
    const lastAiMsg = aiChat.messages[aiChat.messages.length - 1];
    if (lastAiMsg?.role === "assistant") {
      allMessages.push({ role: "bot", content: lastAiMsg.content });
    }
  }

  const showTextInput = funnel.showInput || funnel.currentFlow === "QUESTION";

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105",
          "bottom-24 right-4 md:bottom-24 md:right-6",
          isOpen && "hidden"
        )}
        aria-label="Отвори чат"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat dialog */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden",
            "inset-4 md:inset-auto",
            "md:bottom-6 md:left-6 md:w-[380px] md:h-[550px]"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Чат с нас</span>
            </div>
            <div className="flex items-center gap-1">
              {!isStartScreen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleReset}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  title="Нов разговор"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {isStartScreen ? (
              <div className="space-y-4">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 text-sm">
                  <p className="font-medium mb-1">Здравейте! 👋</p>
                  <p className="text-muted-foreground">Как можем да ви помогнем?</p>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {INITIAL_BUTTONS.map(b => (
                    <button
                      key={b.value}
                      onClick={() => handleInitialClick(b.value)}
                      className="text-left text-sm px-3 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {allMessages.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    message={msg}
                    onButtonClick={funnel.handleButtonClick}
                    onFormSubmit={funnel.handleFormSubmit}
                    isLast={i === allMessages.length - 1}
                  />
                ))}
                {(aiChat.isLoading || funnel.isSubmitting) && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input form — only visible when text input is needed */}
          {showTextInput && !isStartScreen && (
            <form onSubmit={handleTextSubmit} className="p-3 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  placeholder={funnel.currentFlow === "QUESTION" ? "Напишете въпрос..." : "Напишете отговор..."}
                  disabled={aiChat.isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={aiChat.isLoading || !textInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
