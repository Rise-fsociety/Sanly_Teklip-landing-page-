'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    AkymChat?: {
      apiUrl: string;
      key: string;
    };
  }
}

interface ChatWidgetProps {
  onComplete: boolean;
}

export default function AkymChatWidget({ onComplete }: ChatWidgetProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (onComplete) {
      if (typeof window !== 'undefined') {
        window.AkymChat = {
          apiUrl: "https://cargo.sanlyteklip.com.tm/chat-api",
          key: "cef92c1da574464cbb8c2d192ad6c4c5"
        };
      }
      setShouldLoad(true);
    }
  }, [onComplete]);

  if (!shouldLoad) return null;

  return (
    <Script
      src="https://cargo.sanlyteklip.com.tm/chat-api/widget.js"
      strategy="lazyOnload"
    />
  );
}