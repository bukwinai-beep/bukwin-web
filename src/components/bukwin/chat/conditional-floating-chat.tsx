"use client";

import { usePathname } from "next/navigation";
import { FloatingChat } from "./floating-chat";

// Pages that already embed the live agent chat directly (see live-demo.tsx).
// Showing the floating bubble there too is a redundant second entry point.
const PAGES_WITH_EMBEDDED_CHAT = ["/", "/demo"];

export function ConditionalFloatingChat() {
  const pathname = usePathname();
  if (PAGES_WITH_EMBEDDED_CHAT.includes(pathname)) return null;
  return <FloatingChat />;
}
