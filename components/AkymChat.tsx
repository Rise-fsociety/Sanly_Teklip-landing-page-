'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    AkymChat?: {
      apiUrl: string;
      key: string;
    };
  }
}

export default function AkymChatWidget() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.AkymChat = {
        apiUrl: "https://cargo.sanlyteklip.com.tm/chat-api",
        key: "cef92c1da574464cbb8c2d192ad6c4c5"
      };
    }
  }, []);

  return (
    <>
      <Script
        src="https://cargo.sanlyteklip.com.tm/chat-api/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}