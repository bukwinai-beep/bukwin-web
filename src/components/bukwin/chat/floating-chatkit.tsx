"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatInterface } from "./chat-interface";

const WORKFLOW_CONFIGURED = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_CONFIGURED === "true";

export function FloatingChatKit() {
  const [isOpen, setIsOpen] = useState(false);

  if (!WORKFLOW_CONFIGURED) {
    return null;
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full border-none",
          "bg-[#4F46E5] text-white cursor-pointer",
          "shadow-lg hover:shadow-xl hover:scale-105",
          "flex items-center justify-center transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat popup panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-[9998] w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)]",
          "rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200",
          "transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <ChatInterface className="w-full h-full" />
      </div>
    </>
  );
}
