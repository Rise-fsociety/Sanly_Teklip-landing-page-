'use client';

import Script from 'next/script';

export default function AkymChatWidget() {
  return (
    <>
      {/* 1. Global CSS Injection for the Glowing/Sunburst Effect */}
      <Script
        id="akym-chat-styles"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            /* Targets the floating chat button wrapper */
            /* Note: Adjust the selector if AkymChat uses a different container ID/class */
            #akym-chat-button, 
            .akym-chat-launcher,
            [class*="akym-chat"] {
              position: fixed;
              bottom: 20px;
              right: 20px;
              z-index: 999999;
              border-radius: 50%;
              
              /* Sunburst glowing effect */
              box-shadow: 
                0 0 20px 5px rgba(0, 150, 255, 0.6), 
                0 0 40px 15px rgba(0, 150, 255, 0.3),
                inset 0 0 15px rgba(255, 255, 255, 0.6);
                
              animation: sunburst-pulse 3s infinite ease-in-out;
            }

            /* Pulsing animation to make it dynamic and eye-catching */
            @keyframes sunburst-pulse {
              0% {
                box-shadow: 
                  0 0 15px 3px rgba(0, 140, 255, 0.6), 
                  0 0 30px 10px rgba(0, 140, 255, 0.3);
                transform: scale(1);
              }
              50% {
                box-shadow: 
                  0 0 30px 12px rgba(0, 180, 255, 0.8), 
                  0 0 60px 25px rgba(0, 100, 255, 0.5);
                transform: scale(1.05); /* Slight grow like a shining sun */
              }
              100% {
                box-shadow: 
                  0 0 15px 3px rgba(0, 140, 255, 0.6), 
                  0 0 30px 10px rgba(0, 140, 255, 0.3);
                transform: scale(1);
              }
            }
          `,
        }}
      />

      {/* 2. Widget Configuration */}
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

      {/* 3. External Widget Script */}
      <Script
        src="http://216.250.13.114:9696/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}