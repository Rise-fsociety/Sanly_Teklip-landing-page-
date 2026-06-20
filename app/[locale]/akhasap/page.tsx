'use client';

import dynamic from 'next/dynamic';

const LazyEducationVideo = dynamic(
  () => import("@/components/education-video").then((mod) => mod.EducationVideo),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm tracking-widest text-gray-400 uppercase animate-pulse">
          Ýüklenýär...
        </p>
      </div>
    ),
    ssr: false
  }
);

export default function AkhasapPage() {
  return (
    <main className="min-h-screen bg-white">
      <LazyEducationVideo />
    </main>
  );
}