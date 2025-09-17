// src/components/Footer.tsx
import React, { useState } from "react";
import { NAV_LINKS, SOCIALS } from "../config/site";
import NavLink from "./NavLink";
import { getIcon } from "./icons";

const AnimatedCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 ${
        isHovered
          ? "border-cyan-400/30 shadow-lg shadow-cyan-500/10"
          : "border-white/10"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(20px)",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      </div>

      <div className="relative z-10 p-6">{children}</div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
    </div>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-gradient-to-b from-transparent to-white/[0.03]">
      <div className="pointer-events-none absolute inset-x-0 -top-px">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div
          className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand Section */}
          <AnimatedCard delay={0}>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1">
              <div className="flex space-x-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
              <span className="text-[11px] tracking-widest text-cyan-300 font-medium">
                PORTFOLIO
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              François Mansaré
            </h3>

            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Étudiant ingénieur (
              <span className="text-cyan-400 font-medium">ENSIAS</span> –
              Ingénierie Digitale pour la Finance).
              <br />
              Co-fondateur{" "}
              <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-1 rounded">
                YIRI TECH AFRICA
              </span>
              .
            </p>

            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <div className="h-1 w-1 rounded-full bg-emerald-400/60" />
              </div>
              <span className="text-xs text-emerald-300 font-medium">
                Disponible pour des opportunités
              </span>
            </div>
          </AnimatedCard>

          {/* Navigation Section */}
          <AnimatedCard delay={150}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                <svg
                  className="w-3 h-3 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-white/90">
                Navigation
              </h4>
            </div>

            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <div className="group relative">
                    <NavLink
                      href={href}
                      className="relative inline-flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                    >
                      <div className="w-1 h-1 rounded-full bg-cyan-400/60 mr-2 group-hover:bg-cyan-400 transition-colors" />
                      {label}
                    </NavLink>
                  </div>
                </li>
              ))}
            </ul>
          </AnimatedCard>

          {/* Socials Section */}
          <AnimatedCard delay={300}>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                <svg
                  className="w-3 h-3 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h2V6a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2h-2z"
                  />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-white/90">Me suivre</h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SOCIALS.map(({ label, href, icon }, index) => {
                const Icon = getIcon(icon);
                const isExternal =
                  href.startsWith("http") || href.startsWith("mailto:");

                return isExternal ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                    className="group relative overflow-hidden inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    <Icon className="relative z-10 h-4 w-4 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
                    <span className="relative z-10 font-medium">{label}</span>
                  </a>
                ) : (
                  // Si jamais tu mets un social interne plus tard
                  <NavLink
                    key={label}
                    href={href}
                    className="relative inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white hover:scale-105"
                  >
                    <Icon className="h-4 w-4 opacity-80" />
                    <span className="font-medium">{label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Contact direct — <a> */}
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-400/20">
              <p className="text-sm text-gray-400 mb-2 font-medium">
                Contact direct :
              </p>
              <a
                className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white underline decoration-cyan-400/40 underline-offset-4 hover:decoration-cyan-400/80 transition-all duration-300"
                href={
                  SOCIALS.find((s) => s.icon === "mail")?.href ||
                  "mailto:francoismansare@gmail.com"
                }
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {SOCIALS.find((s) => s.icon === "mail")?.href.replace(
                  "mailto:",
                  ""
                ) || "francoismansare@gmail.com"}
              </a>
            </div>
          </AnimatedCard>
        </div>

        <div className="mt-12 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="pt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                <div className="w-1 h-1 rounded-full bg-cyan-400/60 mt-0.5" />
              </div>
              <p className="text-xs text-gray-400">
                © {year}{" "}
                <span className="text-gray-300 font-medium">
                  François Mansaré
                </span>
                . Tous droits réservés.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Conçu par François Mansaré</span>
              <div className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-cyan-400">Portfolio 2025</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50%      { transform: translateY(-8px) rotate(180deg); opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}
