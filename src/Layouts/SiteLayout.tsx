// src/layouts/SiteLayout.tsx
import type { ReactNode } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-x-hidden">
      <NavBar />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
