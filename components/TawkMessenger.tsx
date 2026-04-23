"use client"

import dynamic from 'next/dynamic';

const TawkMessengerReact = dynamic(
  () => import('@tawk.to/tawk-messenger-react'),
  { ssr: false }
);

export const TawkMessenger = () => {
  return (
    <TawkMessengerReact
      propertyId="69e9f9ad33cf9c1c34ea4dc4"
      widgetId="1jmsvek7c"
    />
  );
};