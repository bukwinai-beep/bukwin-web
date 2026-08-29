"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Loader2,
  Calendar,
  Clock,
  RefreshCw,
  X,
  Plus,
  History,
  Trash2,
  MessageSquare,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "./chat-context";

const PROMPTS = [
  { label: "Book an appointment", prompt: "I want to book an appointment", icon: "calendar" },
  { label: "Check availability", prompt: "What times are available tomorrow?", icon: "clock" },
  { label: "Reschedule", prompt: "I need to reschedule my appointment", icon: "refresh" },
  { label: "Cancel", prompt: "I want to cancel my appointment", icon: "x" },
];

// ─── Animated Message Bubble ────────────────────────────────────────────────
function MessageBubble({
  msg,
}: {
  msg: { role: "user" | "assistant"; content: string };
}) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-secondary text-foreground rounded-bl-md"
        )}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

// ─── Thinking Indicator ─────────────────────────────────────────────────────
function ThinkingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
      <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── History Sidebar ────────────────────────────────────────────────────────
function HistorySidebar() {
  const {
    conversations,
    activeId,
    setActiveId,
    createConversation,
    deleteConversation,
    sidebarOpen,
    setSidebarOpen,
  } = useChat();

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/30 z-40"
          />
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 bottom-0 w-[260px] bg-background border-r border-border z-50 flex flex-col"
          >
            <div className="p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground">
                <History className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">History</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-3">
              <button
                onClick={() => {
                  createConversation();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="h-4 w-4" />
                New chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
              {conversations.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">No conversations yet</p>
              )}
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-colors",
                    activeId === conv.id
                      ? "bg-accent/10 border border-accent/30"
                      : "hover:bg-secondary border border-transparent"
                  )}
                  onClick={() => {
                    setActiveId(conv.id);
                    setSidebarOpen(false);
                  }}
                >
                  <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{conv.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {conv.messages.length} message{conv.messages.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Chat UI ───────────────────────────────────────────────────────────
export function ChatUI({ className }: { className?: string }) {
  const {
    activeConversation,
    addMessage,
    updateLastMessage,
    isLoading,
    setIsLoading,
    error,
    setError,
    createConversation,
    setSidebarOpen,
    activeId,
  } = useChat();

  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, streamingText, isLoading]);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || !activeId) return;

      setError("");
      setStreamingText("");
      setIsLoading(true);

      addMessage(activeId, { role: "user", content: text.trim() });
      setInput("");

      const currentMessages = activeConversation?.messages || [];
      const apiMessages = [
        ...currentMessages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: text.trim() },
      ];

      addMessage(activeId, { role: "assistant", content: "" });

      try {
        abortRef.current = new AbortController();

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed (${res.status})`);
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const fullReply = data.reply || "";
        const words = fullReply.split(/(\s+)/);
        let currentText = "";

        for (let i = 0; i < words.length; i++) {
          currentText += words[i];
          setStreamingText(currentText);
          updateLastMessage(activeId, currentText);
          await new Promise((r) => setTimeout(r, Math.random() * 30 + 10));
        }

        updateLastMessage(activeId, fullReply);
        setStreamingText("");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setError(msg);
        updateLastMessage(activeId, "Sorry, I couldn't process that. Please try again.");
        console.error("[ChatUI] send error:", msg);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [activeId, activeConversation?.messages, isLoading, addMessage, updateLastMessage, setError, setIsLoading]
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

  const handleStop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  const messages = activeConversation?.messages || [];
  const hasMessages = messages.length > 0;

  return (
    <div className={cn("flex flex-col h-full bg-background relative", className)}>
      <HistorySidebar />

      {/* Minimal top bar — just history + new chat, no heavy header */}
      <div className="flex items-center justify-between px-3 py-2.5 shrink-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          title="Chat history"
        >
          <History className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Bukwin AI
        </div>
        <button
          onClick={() => createConversation()}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          title="New chat"
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        <AnimatePresence mode="popLayout">
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center gap-6"
            >
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-display font-medium text-foreground"
              >
                What can I book for you?
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm"
              >
                {PROMPTS.map((p, i) => (
                  <motion.button
                    key={p.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(p.prompt)}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-2xl border border-border bg-transparent",
                      "text-sm text-left text-foreground hover:border-accent/50 hover:bg-secondary/50",
                      "transition-all disabled:opacity-50"
                    )}
                  >
                    {p.icon === "calendar" && <Calendar className="h-4 w-4 text-accent shrink-0" />}
                    {p.icon === "clock" && <Clock className="h-4 w-4 text-accent shrink-0" />}
                    {p.icon === "refresh" && <RefreshCw className="h-4 w-4 text-accent shrink-0" />}
                    {p.icon === "x" && <X className="h-4 w-4 text-accent shrink-0" />}
                    <span className="truncate">{p.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={{ role: msg.role, content: msg.content }} />
          ))}
        </AnimatePresence>

        {isLoading && !streamingText && <ThinkingIndicator />}

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs px-4 py-2.5 rounded-2xl max-w-[90%] flex items-center gap-2">
              <span>{error}</span>
              <button onClick={() => setError("")} className="underline hover:no-underline font-medium">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input — floating pill, matches theme (dark pill on light bg, light pill on dark bg) */}
      <div className="px-3 pb-3 pt-1 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 max-w-3xl mx-auto">
          <div className="flex-1 rounded-3xl border border-border bg-secondary/60 px-4 py-2.5 focus-within:border-accent/50 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Bukwin…"
              rows={1}
              disabled={isLoading}
              className={cn(
                "w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
                "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                "min-h-[20px] max-h-[120px]"
              )}
            />
          </div>
          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-destructive text-white hover:opacity-90 transition-opacity"
              title="Stop generating"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 transition-opacity",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2 max-w-3xl mx-auto">
          Bukwin AI may make mistakes. Please verify appointment details before confirming.
        </p>
      </div>
    </div>
  );
}
