"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatProvider } from "./chat-context";
import { ChatUI } from "./chat-ui";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full",
          "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white",
          "shadow-lg shadow-[#4F46E5]/30 hover:shadow-xl hover:shadow-[#4F46E5]/40",
          "flex items-center justify-center transition-shadow",
          "focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed bottom-24 right-6 z-[9998] w-[420px] max-w-[calc(100vw-48px)]",
              "h-[650px] max-h-[calc(100vh-140px)]",
              "rounded-3xl shadow-2xl shadow-black/10 overflow-hidden bg-white",
              "border border-gray-100"
            )}
          >
            <ChatProvider>
              <ChatUI className="w-full h-full" />
            </ChatProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
