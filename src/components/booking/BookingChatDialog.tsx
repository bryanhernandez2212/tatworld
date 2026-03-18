import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import type { BookingRequest } from "@/hooks/useBookingRequests";

interface ChatMessage {
  id: string;
  sender: "client" | "artist";
  text: string;
  timestamp: string;
}

const CHAT_KEY_PREFIX = "tatts_chat_";

function loadMessages(bookingId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_KEY_PREFIX + bookingId);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(bookingId: string, messages: ChatMessage[]) {
  localStorage.setItem(CHAT_KEY_PREFIX + bookingId, JSON.stringify(messages));
}

const AUTO_REPLIES = [
  "¡Hola! Gracias por tu mensaje. Lo revisaré pronto.",
  "Claro, déjame revisar los detalles y te respondo en un momento.",
  "¡Perfecto! Estoy trabajando en tu diseño, cualquier duda me dices.",
  "Sí, podemos ajustar eso sin problema. ¿Tienes alguna referencia visual?",
  "Excelente, nos vemos en la cita. ¡Va a quedar increíble! 🔥",
];

interface Props {
  request: BookingRequest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingChatDialog = ({ request, open, onOpenChange }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMessages(loadMessages(request.id));
    }
  }, [open, request.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "client",
      text,
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(request.id, updated);
    setInput("");

    // Simulate artist reply after 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "artist",
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => {
        const withReply = [...prev, reply];
        saveMessages(request.id, withReply);
        return withReply;
      });
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[80vh] flex flex-col p-0 gap-0 bg-background border-border">
        <DialogTitle className="sr-only">Chat con {request.artistName}</DialogTitle>

        {/* Chat header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => onOpenChange(false)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img
            src={request.artistImage}
            alt={request.artistName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-foreground text-sm">{request.artistName}</p>
            <p className="text-xs text-green-500">En línea</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">
                Inicia una conversación con {request.artistName}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Pregunta sobre tu diseño, horarios o cualquier duda
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  msg.sender === "client"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === "client" ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-secondary border-border"
            />
            <Button
              size="icon"
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingChatDialog;
