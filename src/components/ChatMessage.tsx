import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
