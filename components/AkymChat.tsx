'use client';

import Script from 'next/script';

export default function AkymChatWidget() {
  return (
    <>
      <Script
        id="akym-chat-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.AkymChat = {
              apiUrl: "http://216.250.13.114:9696",
              key: "cef92c1da574464cbb8c2d192ad6c4c5"
            };
          `,
        }}
      />

      <Script
        src="http://216.250.13.114:9696/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
