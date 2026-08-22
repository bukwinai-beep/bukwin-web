import type { Metadata } from "next";
import { ChatUI } from "@/components/bukwin/chat/chat-ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chat with Bukwin AI — Book & Manage Appointments",
  description: "Talk to Bukwin AI to book, reschedule, or cancel appointments. Available 24/7.",
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4F46E5] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-800">Bukwin AI</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px]">
          <ChatUI className="w-full h-full" showPrompts={true} />
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by Bukwin AI — Book appointments, check availability, or reschedule anytime.
        </p>
      </main>
    </div>
  );
}
