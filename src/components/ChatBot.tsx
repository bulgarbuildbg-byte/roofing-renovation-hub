import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import { useChatFunnel } from "@/hooks/useChatFunnel";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import chatAvatar from "@/assets/chat-avatar.jpg";

type WidgetState = "collapsed" | "prompt" | "expanded";

const PRIMARY_BUTTONS = [
  { label: "🔍 Искам безплатен оглед", value: "INSPECTION" },
  { label: "📋 Искам оферта", value: "QUOTE" },
];

const SECONDARY_BUTTONS = [
  { label: "🚨 Теч / спешно", value: "LEAK" },
  { label: "📞 Обадете ми се", value: "CALLBACK" },
  { label: "🏠 Ремонт на покрив", value: "ROOF_REPAIR" },
  { label: "☀️ Соларна система", value: "SOLAR" },
  { label: "❓ Имам въпрос", value: "QUESTION" },
];

const ALL_BUTTONS = [...PRIMARY_BUTTONS, ...SECONDARY_BUTTONS];

const ChatBot = () => {
  const [state, setState] = useState<WidgetState>("collapsed");
  const [textInput, setTextInput] = useState("");
  const [dismissed, setDismissed] = useState(() =>
    sessionStorage.getItem("chat-dismissed") === "1"
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const funnel = useChatFunnel();
  const aiChat = useChat();

  // Scroll-triggered prompt card
  useEffect(() => {
    if (dismissed || state !== "collapsed") return;
    const onScroll = () => {
      if (window.scrollY > 300 && state === "collapsed" && !dismissed) {
        setState("prompt");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [state, dismissed]);

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [funnel.messages, aiChat.messages]);

  // Focus input
  useEffect(() => {
    if (state === "expanded" && funnel.showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state, funnel.showInput]);

  const dismissPrompt = () => {
    setState("collapsed");
    setDismissed(true);
    sessionStorage.setItem("chat-dismissed", "1");
  };

  const handleButtonClick = (value: string) => {
    const label = ALL_BUTTONS.find((b) => b.value === value)?.label || value;
    funnel.addUser(label);
    funnel.startFlow(value as any);
    setState("expanded");
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    const text = textInput.trim();
    setTextInput("");

    if (funnel.currentFlow === "QUESTION") {
      funnel.addUser(text);
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
    setState("prompt");
  };

  // Merge AI messages
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
      {/* ── Prompt Card ── */}
      {state === "prompt" && (
        <div
          className={cn(
            "fixed z-50 animate-fade-in",
            "bottom-[88px] right-4 lg:right-6",
            "w-[320px] max-w-[calc(100vw-2rem)]"
          )}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-5 relative">
            {/* Close */}
            <button
              onClick={dismissPrompt}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Затвори"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Avatar + Text */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 mb-3">
                <img
                  src={chatAvatar}
                  alt="Консултант"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={64}
                  height={64}
                />
              </div>
              <p className="text-sm font-semibold text-foreground leading-snug">
                Здравейте! Имате нужда
                <br />
                от оглед или оферта?
              </p>
            </div>

            {/* Primary CTAs — orange/accent */}
            <div className="space-y-2 mb-3">
              {PRIMARY_BUTTONS.map((b) => (
                <button
                  key={b.value}
                  onClick={() => handleButtonClick(b.value)}
                  className="w-full text-sm font-medium px-4 py-2.5 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Secondary CTAs — blue/primary, 2-col grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {SECONDARY_BUTTONS.slice(0, 4).map((b) => (
                <button
                  key={b.value}
                  onClick={() => handleButtonClick(b.value)}
                  className="text-xs font-medium px-2 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {b.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleButtonClick("QUESTION")}
              className="w-full mt-1.5 text-xs font-medium px-2 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ❓ Имам въпрос
            </button>
          </div>
        </div>
      )}

      {/* ── Chat Bubble (always visible when not expanded) ── */}
      {state !== "expanded" && (
        <button
          onClick={() => setState(state === "prompt" ? "expanded" : "prompt")}
          className={cn(
            "fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-primary text-primary shadow-lg hover:scale-105 transition-all duration-300",
            "bottom-[88px] right-4 lg:right-6",
            state === "prompt" && "bottom-4 lg:bottom-6"
          )}
          aria-label="Отвори чат"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Green online dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {/* ── Expanded Chat ── */}
      {state === "expanded" && (
        <div
          className={cn(
            "fixed z-50 bg-white border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden",
            "inset-2 lg:inset-auto",
            "lg:bottom-6 lg:right-6 lg:w-[380px] lg:h-[550px]"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-foreground/30">
                <img src={chatAvatar} alt="" className="w-full h-full object-cover" width={32} height={32} />
              </div>
              <div>
                <span className="font-semibold text-sm">Консултант</span>
                <span className="flex items-center gap-1 text-xs text-primary-foreground/70">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Онлайн
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {funnel.messages.length > 0 && (
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
                onClick={() => setState("prompt")}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {funnel.messages.length === 0 ? (
              <div className="space-y-4">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 text-sm">
                  <p className="font-medium mb-1">Здравейте! 👋</p>
                  <p className="text-muted-foreground">Как можем да ви помогнем?</p>
                </div>
                <div className="space-y-2">
                  {PRIMARY_BUTTONS.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => handleButtonClick(b.value)}
                      className="w-full text-left text-sm px-3 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent-foreground hover:bg-accent/20 transition-colors font-medium"
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {SECONDARY_BUTTONS.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => handleButtonClick(b.value)}
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

          {/* Input */}
          {showTextInput && funnel.messages.length > 0 && (
            <form onSubmit={handleTextSubmit} className="p-3 border-t border-border bg-white">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
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
