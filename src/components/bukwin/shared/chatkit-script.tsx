"use client";

import Script from "next/script";

export function ChatKitScript() {
  const scriptUrl =
    process.env.NEXT_PUBLIC_CHATKIT_SCRIPT_URL ||
    "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";

  return (
    <Script
      src={scriptUrl}
      strategy="beforeInteractive"  // ← THIS puts it in <head>
      id="openai-chatkit"
    />
  );
}
