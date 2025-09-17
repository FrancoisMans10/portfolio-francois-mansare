import { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { BRAND, NAV_LINKS, SOCIALS } from "../config/site";
import { getIcon } from "./icons";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const linkedIn = SOCIALS.find((s) => s.label === "LinkedIn");
  const LinkedInIcon = linkedIn ? getIcon(linkedIn.icon) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/10 bg-black/85 backdrop-blur-2xl">
      {/* Effets d'arrière-plan premium */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Orbes de fond */}
        <div className="absolute -top-10 -right-20 w-40 h-40 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -top-5 -left-10 w-24 h-24 bg-purple-500/3 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Marque -> route SPA */}
        <Link
          to={BRAND.homeHref}
          className="group flex items-center gap-3 font-bold text-white transition-all duration-300 hover:scale-105"
          aria-label="Accueil"
          onClick={() => setOpen(false)}
        >
          {/* Badge multi-points premium */}
          <div className="relative flex items-center gap-1">
            <div className="flex space-x-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 shadow-sm shadow-purple-400/50"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <span
              className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-30"
              aria-hidden
            />
            <span
              className="relative h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50 ml-2"
              aria-hidden
            />
          </div>

          {/* Nom avec gradient premium */}
          <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent font-extrabold tracking-tight">
            {BRAND.name}
          </span>

          {/* Ligne animée */}
          <span className="h-px w-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent transition-all duration-500 group-hover:w-12" />
        </Link>

        {/* Toggle mobile premium */}
        <button
          className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-400/20 hover:scale-105 md:hidden overflow-hidden"
          aria-expanded={open}
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {/* Particules au hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-float"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>

          <span className="relative flex flex-col gap-1 transition-transform duration-300 group-hover:scale-110">
            <span
              className={`h-0.5 w-4 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        {/* Liens premium */}
        <nav
          className={[
            "hidden items-center gap-6 md:flex",
            open
              ? "absolute right-4 top-16 flex flex-col gap-4 rounded-2xl border border-cyan-500/20 bg-black/95 p-6 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20 md:static md:border-0 md:bg-transparent md:p-0 md:shadow-none"
              : "",
          ].join(" ")}
        >
          {/* Effet d'arrière-plan pour mobile */}
          {open && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 md:hidden" />
          )}

          {NAV_LINKS.map(({ label, href }, index) => (
            <RouterNavLink
              key={label}
              to={href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  "group relative overflow-hidden px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 hover:scale-105",
                  isActive
                    ? "text-cyan-400 bg-cyan-400/5 border border-cyan-400/20"
                    : "text-gray-300 hover:text-cyan-300 border border-transparent hover:border-white/10",
                ].join(" ")
              }
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Particules subtiles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div
                  className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-float opacity-60"
                  style={{
                    right: "20%",
                    top: "30%",
                    animationDelay: "0.5s",
                    animationDuration: "3s",
                  }}
                />
              </div>

              <span className="relative z-10 font-medium">{label}</span>

              {/* Barre de progression premium */}
              <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 transition-all duration-500 group-hover:w-full" />

              {/* Lueur subtile */}
              <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </RouterNavLink>
          ))}

          {/* Bouton LinkedIn premium */}
          {linkedIn && LinkedInIcon && (
            <Link
              to={linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-blue-700/5 to-purple-600/10 px-5 py-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-400/40 hover:from-blue-500/20 hover:to-purple-500/20 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 overflow-hidden"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Particules LinkedIn */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-float"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${25 + Math.random() * 50}%`,
                      animationDelay: `${i * 400}ms`,
                      animationDuration: "2.5s",
                    }}
                  />
                ))}
              </div>

              <LinkedInIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10 font-medium">LinkedIn</span>
              <span
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          )}
        </nav>
      </div>

      {/* Lueur premium multi-couches */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Ligne de base subtile */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Styles pour les animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-6px) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}
