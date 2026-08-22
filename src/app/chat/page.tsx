import type { Metadata } from "next";
import { ChatProvider } from "@/components/bukwin/chat/chat-context";
import { ChatUI } from "@/components/bukwin/chat/chat-ui";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chat with Bukwin AI — Book & Manage Appointments",
  description: "Talk to Bukwin AI to book, reschedule, or cancel appointments. Available 24/7.",
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4F46E5] transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#4F46E5]" />
          <span className="text-sm font-semibold text-gray-800">Bukwin AI</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-1" />
        </div>
      </header>

      {/* Full-page Chat */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ChatProvider>
          <ChatUI className="w-full h-full" />
        </ChatProvider>
      </main>
    </div>
  );
}
