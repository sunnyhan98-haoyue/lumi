import { Suspense } from "react";
import { TimelineClient } from "./timeline-client";

export default function TimelinePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F9FAFB] font-[family-name:var(--font-inter)]">
          <main className="mx-auto max-w-3xl px-6 py-12">
            <p className="text-sm text-gray-500">加载中…</p>
          </main>
        </div>
      }
    >
      <TimelineClient />
    </Suspense>
  );
}
