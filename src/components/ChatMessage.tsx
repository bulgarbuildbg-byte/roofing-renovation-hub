import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, User, Send, CheckCircle2, Zap, Sun, Calculator, ArrowRight } from "lucide-react";
import type { FunnelMessage, FunnelButton, ResultCard } from "@/hooks/useChatFunnel";

interface ChatMessageProps {
  message: FunnelMessage;
  onButtonClick?: (value: string) => void;
  onFormSubmit?: (data: { name: string; phone: string; email?: string; address?: string; topic?: string }) => void;
  isLast?: boolean;
}

// ---- Button Grid ----
const ButtonGrid = ({ buttons, onClick }: { buttons: FunnelButton[]; onClick: (v: string) => void }) => (
  <div className="flex flex-wrap gap-1.5 mt-2">
    {buttons.map(b => (
      <button
        key={b.value}
        onClick={() => onClick(b.value)}
        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 text-primary font-medium transition-colors"
      >
        {b.label}
      </button>
    ))}
  </div>
);

// ---- Result Card ----
const CalcResultCard = ({ card }: { card: ResultCard }) => {
  const isSolar = !!card.kw;
  return (
    <div className="mt-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-3">
      <div className="grid grid-cols-2 gap-2">
        {isSolar ? (
          <>
            <Metric icon={<Sun className="w-3.5 h-3.5" />} label="Мощност" value={`${card.kw} kW`} />
            <Metric icon={<Calculator className="w-3.5 h-3.5" />} label="Ориент. цена" value={`${card.price?.toLocaleString()} €`} />
            <Metric icon={<Zap className="w-3.5 h-3.5" />} label="Годишно спестяване" value={`${card.saving?.toLocaleString()} €`} />
            <Metric icon={<ArrowRight className="w-3.5 h-3.5" />} label="Изплащане" value={`${card.payback} год.`} />
          </>
        ) : (
          <>
            <Metric icon={<Calculator className="w-3.5 h-3.5" />} label="От" value={`${card.priceMin?.toLocaleString()} €`} />
            <Metric icon={<Calculator className="w-3.5 h-3.5" />} label="До" value={`${card.priceMax?.toLocaleString()} €`} />
          </>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">* Ориентировъчна цена. Точна оферта след оглед.</p>
    </div>
  );
};

const Metric = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-1.5 bg-background/60 rounded-lg px-2 py-1.5">
    <span className="text-primary">{icon}</span>
    <div>
      <p className="text-[10px] text-muted-foreground leading-none">{label}</p>
      <p className="text-sm font-semibold leading-tight">{value}</p>
    </div>
  </div>
);

// ---- Contact Form ----
const ContactForm = ({ type, onSubmit }: { type: "quick" | "full" | "callback"; onSubmit: NonNullable<ChatMessageProps["onFormSubmit"]> }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      topic: topic.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <div className="relative">
        <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
        <Input placeholder="Вашето име *" value={name} onChange={e => setName(e.target.value)} className="pl-8 h-9 text-sm" required />
      </div>
      <div className="relative">
        <Phone className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
        <Input placeholder="Телефон *" value={phone} onChange={e => setPhone(e.target.value)} className="pl-8 h-9 text-sm" required type="tel" />
      </div>
      {type === "callback" && (
        <div className="relative">
          <Input placeholder="За какво става въпрос? (по избор)" value={topic} onChange={e => setTopic(e.target.value)} className="h-9 text-sm" />
        </div>
      )}
      {(type === "full") && (
        <>
          <div className="relative">
            <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Имейл *" value={email} onChange={e => setEmail(e.target.value)} className="pl-8 h-9 text-sm" required type="email" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Адрес (град, район)" value={address} onChange={e => setAddress(e.target.value)} className="pl-8 h-9 text-sm" />
          </div>
        </>
      )}
      <Button type="submit" size="sm" className="w-full gap-1.5">
        <Send className="w-3.5 h-3.5" /> Изпрати
      </Button>
    </form>
  );
};

// ---- Confirmation Card ----
const ConfirmationCard = () => (
  <div className="mt-2 rounded-xl bg-accent/30 border border-accent p-3 flex items-start gap-2">
    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
    <div>
      <p className="font-semibold text-foreground text-sm">Заявката е изпратена!</p>
      <p className="text-xs text-muted-foreground mt-0.5">Ще се свържем с вас възможно най-скоро.</p>
    </div>
  </div>
);

// ---- Main Component ----
const ChatMessage = ({ message, onButtonClick, onFormSubmit, isLast }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full mb-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        {/* Result card */}
        {message.resultCard && <CalcResultCard card={message.resultCard} />}

        {/* Confirmation */}
        {message.confirmation && <ConfirmationCard />}

        {/* Buttons (only on last message) */}
        {message.buttons && isLast && onButtonClick && (
          <ButtonGrid buttons={message.buttons} onClick={onButtonClick} />
        )}

        {/* Contact form (only on last message) */}
        {message.contactForm && isLast && onFormSubmit && (
          <ContactForm type={message.contactForm} onSubmit={onFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
