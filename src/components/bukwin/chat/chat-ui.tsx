"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, User, Bot, Calendar, Clock, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const PROMPTS = [
  { label: "Book an appointment", prompt: "I want to book an appointment", icon: "calendar" },
  { label: "Check availability", prompt: "What times are available tomorrow?", icon: "clock" },
  { label: "Reschedule", prompt: "I need to reschedule my appointment", icon: "refresh" },
  { label: "Cancel", prompt: "I want to cancel my appointment", icon: "x" },
];

function getDeviceId(): string {
  if (typeof window === "undefined") return "server";
  const key = "bukwin_chat_device_id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("bukwin_chat_history");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveHistory(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("bukwin_chat_history", JSON.stringify(messages.slice(-50)));
  } catch {}
}

interface ChatUIProps {
  className?: string;
  showPrompts?: boolean;
  placeholder?: string;
}

export function ChatUI({ className, showPrompts = true, placeholder = "Ask me about scheduling..." }: ChatUIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setError("");
      setLoading(true);

      const userMsg: ChatMessage = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        if (data.messages && Array.isArray(data.messages)) {
          const displayMessages: ChatMessage[] = data.messages
            .filter((m: any) => m.role === "user" || m.role === "assistant")
            .map((m: any) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.content || "",
            }));
          setMessages(displayMessages);
        } else if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setError(msg);
        console.error("[ChatUI] send error:", msg);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bukwin_chat_history");
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {!hasMessages && showPrompts && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#4F46E5]/10 flex items-center justify-center">
              <Bot className="h-8 w-8 text-[#4F46E5]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Bukwin AI</h3>
              <p className="text-sm text-gray-500 mt-1">
                I can help you book, reschedule, or cancel appointments.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm">
              {PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.prompt)}
                  disabled={loading}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200",
                    "text-sm text-left text-gray-700 hover:bg-gray-50 hover:border-gray-300",
                    "transition-colors disabled:opacity-50"
                  )}
                >
                  {p.icon === "calendar" && <Calendar className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                  {p.icon === "clock" && <Clock className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                  {p.icon === "refresh" && <RefreshCw className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                  {p.icon === "x" && <X className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                  <span className="truncate">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-[#4F46E5] text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              )}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2 rounded-xl max-w-[90%]">
              {error}
              <button onClick={() => setError("")} className="ml-2 underline hover:no-underline">Dismiss</button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-200 px-4 py-3">
        {hasMessages && (
          <div className="flex justify-end mb-2">
            <button onClick={clearChat} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Clear conversation
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={loading}
            className={cn(
              "flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3",
              "text-sm text-gray-900 placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "min-h-[44px] max-h-[120px]"
            )}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
              "bg-[#4F46E5] text-white hover:bg-[#4338ca] transition-colors",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Bukwin AI may make mistakes. Please verify appointment details.
        </p>
      </div>
    </div>
  );
}
