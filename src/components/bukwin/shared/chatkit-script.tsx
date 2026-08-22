"use client";

import Script from "next/script";
import { useState, useCallback } from "react";

let scriptLoaded = false;
const loadCallbacks: (() => void)[] = [];

export function onChatKitScriptLoad(cb: () => void) {
  if (scriptLoaded) {
    cb();
  } else {
    loadCallbacks.push(cb);
  }
}

export function ChatKitScript() {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    scriptLoaded = true;
    loadCallbacks.forEach((cb) => cb());
    loadCallbacks.length = 0;
    setLoaded(true);
  }, []);

  const scriptUrl =
    process.env.NEXT_PUBLIC_CHATKIT_SCRIPT_URL ||
    "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";

  return (
    <Script
      src={scriptUrl}
      strategy="afterInteractive"
      id="openai-chatkit-script"
      onLoad={handleLoad}
      onError={(e) => {
        console.error("[ChatKitScript] Failed to load:", e);
      }}
    />
  );
}
