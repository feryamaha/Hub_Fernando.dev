"use client";

import Footer from "@/components/footer/footer";
import MainContent from "@/components/main-content/main-content";
import TopBar from "@/components/top-bar/top-bar";

export default function Page() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden bg-[var(--background)]">
      <TopBar />
      <MainContent />
      <Footer />
    </div>
  );
}
