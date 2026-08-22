"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};

type ChatContextType = {
  conversations: Conversation[];
  activeId: string | null;
  activeConversation: Conversation | null;
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  setActiveId: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<Message, "id" | "createdAt">) => void;
  updateLastMessage: (conversationId: string, content: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  error: string;
  setError: (v: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
};

const STORAGE_KEY = "bukwin_chat_conversations_v2";

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {}
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-save
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const createConversation = useCallback(() => {
    const id = generateId();
    const newConv: Conversation = {
      id,
      title: "New conversation",
      messages: [],
      updatedAt: Date.now(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
    setError("");
    return id;
  }, []);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      // If we deleted the active one, switch to the next available
      if (activeId === id) {
        const next = filtered[0]?.id || null;
        setActiveId(next);
      }
      return filtered;
    });
  }, [activeId]);

  const addMessage = useCallback((conversationId: string, msg: Omit<Message, "id" | "createdAt">) => {
    const newMsg: Message = { ...msg, id: generateId(), createdAt: Date.now() };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              updatedAt: Date.now(),
              title: c.messages.length === 0 && msg.role === "user"
                ? msg.content.slice(0, 40) + (msg.content.length > 40 ? "..." : "")
                : c.title,
            }
          : c
      )
    );
  }, []);

  const updateLastMessage = useCallback((conversationId: string, content: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        const msgs = [...c.messages];
        const last = msgs[msgs.length - 1];
        if (last && last.role === "assistant") {
          last.content = content;
        }
        return { ...c, messages: msgs, updatedAt: Date.now() };
      })
    );
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  // Auto-create first conversation if none exist
  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    } else if (!activeId) {
      setActiveId(conversations[0].id);
    }
  }, [conversations.length, activeId, createConversation, conversations]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeId,
        activeConversation,
        createConversation,
        deleteConversation,
        setActiveId,
        addMessage,
        updateLastMessage,
        isLoading,
        setIsLoading,
        error,
        setError,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
