"use client";

import MainContent from "@/components/main-content/main-content";
import TopBar from "@/components/top-bar/top-bar";

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      <TopBar />
      <MainContent />
    </div>
  );
}
