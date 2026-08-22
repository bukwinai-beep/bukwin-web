"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  User,
  Bot,
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

// ─── Typewriter Hook ────────────────────────────────────────────────────────
function useTypewriter(text: string, speed: number = 15) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

// ─── Animated Message Bubble ────────────────────────────────────────────────
function MessageBubble({
  msg,
  isLatest,
}: {
  msg: { role: "user" | "assistant"; content: string };
  isLatest: boolean;
}) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shrink-0 mt-1 shadow-md"
        >
          <Bot className="h-4 w-4 text-white" />
        </motion.div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-gradient-to-r from-[#4F46E5] to-[#5B4DFF] text-white rounded-br-md"
            : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
        )}
      >
        {msg.content}
      </div>

      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1"
        >
          <User className="h-4 w-4 text-gray-600" />
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Thinking Indicator ─────────────────────────────────────────────────────
function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shrink-0 shadow-md">
        <Sparkles className="h-4 w-4 text-white animate-pulse" />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Bukwin is thinking</span>
          <div className="flex gap-1">
            <motion.span
              className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.span
              className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
          </div>
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          />
          {/* Sidebar */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-gray-200 z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-[#4F46E5]" />
                <span className="font-semibold text-gray-900">History</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* New Chat Button */}
            <div className="p-3">
              <button
                onClick={() => {
                  createConversation();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F46E5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </button>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
              {conversations.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-8">No conversations yet</p>
              )}
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors",
                    activeId === conv.id
                      ? "bg-[#4F46E5]/10 border border-[#4F46E5]/20"
                      : "hover:bg-gray-50 border border-transparent"
                  )}
                  onClick={() => {
                    setActiveId(conv.id);
                    setSidebarOpen(false);
                  }}
                >
                  <MessageSquare className="h-4 w-4 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 truncate">{conv.title}</p>
                    <p className="text-[10px] text-gray-400">
                      {conv.messages.length} message{conv.messages.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
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

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, streamingText, isLoading]);

  // Auto-resize textarea
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

      // Add user message
      addMessage(activeId, { role: "user", content: text.trim() });
      setInput("");

      // Build messages for API
      const currentMessages = activeConversation?.messages || [];
      const apiMessages = [
        ...currentMessages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: text.trim() },
      ];

      // Add placeholder assistant message
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

        if (data.error) {
          throw new Error(data.error);
        }

        // Stream the reply word by word
        const fullReply = data.reply || "";
        const words = fullReply.split(/(\s+)/); // Keep spaces
        let currentText = "";

        for (let i = 0; i < words.length; i++) {
          currentText += words[i];
          setStreamingText(currentText);
          updateLastMessage(activeId, currentText);
          // Small delay for word-by-word effect
          await new Promise((r) => setTimeout(r, Math.random() * 30 + 10));
        }

        // Final update with complete text
        updateLastMessage(activeId, fullReply);
        setStreamingText("");
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setError(msg);
        // Remove the empty assistant message on error
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
    <div className={cn("flex flex-col h-full bg-gray-50/50 relative", className)}>
      {/* History Sidebar */}
      <HistorySidebar />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            title="Chat history"
          >
            <History className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-800">Bukwin AI</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => createConversation()}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            title="New chat"
          >
            <Plus className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#4F46E5]/20"
              >
                <Bot className="h-10 w-10 text-white" />
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-gray-900"
                >
                  Bukwin AI
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-500 mt-1 max-w-xs"
                >
                  Your AI receptionist. Book, reschedule, or cancel appointments anytime.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm"
              >
                {PROMPTS.map((p, i) => (
                  <motion.button
                    key={p.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(p.prompt)}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white",
                      "text-sm text-left text-gray-700 hover:border-[#4F46E5]/30 hover:shadow-sm",
                      "transition-all disabled:opacity-50"
                    )}
                  >
                    {p.icon === "calendar" && <Calendar className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                    {p.icon === "clock" && <Clock className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                    {p.icon === "refresh" && <RefreshCw className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                    {p.icon === "x" && <X className="h-4 w-4 text-[#4F46E5] shrink-0" />}
                    <span className="truncate">{p.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              msg={{ role: msg.role, content: msg.content }}
              isLatest={i === messages.length - 1}
            />
          ))}
        </AnimatePresence>

        {isLoading && !streamingText && <ThinkingIndicator />}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl max-w-[90%] flex items-center gap-2">
              <span>{error}</span>
              <button onClick={() => setError("")} className="underline hover:no-underline font-medium">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about scheduling..."
            rows={1}
            disabled={isLoading}
            className={cn(
              "flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3",
              "text-sm text-gray-900 placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "min-h-[44px] max-h-[120px] transition-all"
            )}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 bg-red-500 text-white hover:bg-red-600 transition-colors"
              title="Stop generating"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className={cn(
                "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white",
                "hover:shadow-lg hover:shadow-[#4F46E5]/25 transition-all",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-2 max-w-3xl mx-auto">
          Bukwin AI may make mistakes. Please verify appointment details before confirming.
        </p>
      </div>
    </div>
  );
}
