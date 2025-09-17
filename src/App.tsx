import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/tailwind.css";

type Mouse = { x: number; y: number };

const AnimatedCounter = ({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const numericValue = parseInt(value.replace(/\D/g, ""));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!isVisible || !numericValue) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericValue, duration]);

  return (
    <span id={`counter-${value}`}>
      {value.includes("+") ? "+" : ""}
      {count}
    </span>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState<Mouse>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Accessibilité : respecte prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Particules améliorées
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 3}s`,
        size: Math.random() > 0.5 ? "w-1 h-1" : "w-0.5 h-0.5",
      })),
    []
  );

  useEffect(() => {
    setIsVisible(true);
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion]);

  // Petits chiffres clés (modifiables)
  const highlights = [
    { value: "+8", label: "Projets" },
    { value: "5", label: "Leadership & entrepreneuriat" }, // ENSIAS • YIRI TECH AFRICA
    { value: "+30", label: "Interventions & panels" }, // orateur / hackathons
  ];

  // Stack / Outils (modifiables)
  const tools = [
    { name: "React", icon: ReactIcon },
    { name: "Supabase", icon: SupabaseIcon },
    { name: "Python", icon: PythonIcon },
    { name: "IA / RAG", icon: AIIcon },
    { name: "Blockchain", icon: ChainIcon },
    { name: "Excel", icon: ExcelIcon },
    { name: "SQL", icon: DatabaseIcon },
  ];

  return (
    <div
      id="top"
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* Background futuriste amélioré */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" aria-hidden>
        {/* Gradient de base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Grille futuriste avec parallax */}
        <div
          className="absolute inset-0 opacity-20 will-change-transform overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: reduceMotion
              ? undefined
              : `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
          }}
        />

        {/* Orbes lumineux avec mouvement */}
        <div
          className={`absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl transition-all duration-1000 ${
            reduceMotion ? "top-1/4 left-1/4 animate-pulse" : ""
          }`}
          style={
            reduceMotion
              ? {}
              : {
                  top: `${25 + mousePos.y * 0.05}%`,
                  left: `${25 + mousePos.x * 0.05}%`,
                }
          }
        />
        <div
          className={`absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ${
            reduceMotion ? "top-3/4 right-1/4 animate-pulse" : ""
          }`}
          style={
            reduceMotion
              ? { animationDelay: "1000ms" }
              : {
                  top: `${75 + mousePos.y * 0.03}%`,
                  right: `${25 + mousePos.x * 0.03}%`,
                }
          }
        />
        <div
          className={`absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transition-all duration-1000 ${
            reduceMotion ? "top-1/2 left-3/4 animate-pulse" : ""
          }`}
          style={
            reduceMotion
              ? { animationDelay: "2000ms" }
              : {
                  top: `${50 + mousePos.y * 0.04}%`,
                  left: `${75 + mousePos.x * 0.04}%`,
                }
          }
        />

        {/* Lignes de connexion dynamiques */}
        <div className="absolute inset-0">
          <svg
            className="w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="homeLineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <line
              x1="5%"
              y1="20%"
              x2="95%"
              y2="80%"
              stroke="url(#homeLineGradient)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.6;0.2"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="20%"
              y1="85%"
              x2="80%"
              y2="15%"
              stroke="url(#homeLineGradient)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.6;0.2;0.6"
                dur="3s"
                repeatCount="indefinite"
              />
            </line>
            <circle cx="15%" cy="30%" r="2" fill="url(#homeLineGradient)">
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="85%" cy="70%" r="2" fill="url(#homeLineGradient)">
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Particules (cachées sur mobile) */}
      <div
        className="fixed inset-0 pointer-events-none hidden sm:block"
        aria-hidden
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute ${
              p.size
            } bg-cyan-400 rounded-full opacity-30 ${
              reduceMotion ? "" : "animate-pulse"
            }`}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <NavBar />

      {/* HERO minimaliste amélioré */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid items-center gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-32">
          {/* Colonne texte */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Badge futuriste */}
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 backdrop-blur-xl">
              <div className="flex space-x-1">
                <div
                  className={`h-2 w-2 rounded-full bg-cyan-400 ${
                    reduceMotion ? "" : "animate-pulse"
                  }`}
                />
                <div
                  className={`h-2 w-2 rounded-full bg-purple-400 ${
                    reduceMotion ? "" : "animate-pulse"
                  }`}
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className={`h-2 w-2 rounded-full bg-emerald-400 ${
                    reduceMotion ? "" : "animate-pulse"
                  }`}
                  style={{ animationDelay: "1s" }}
                />
              </div>
              <span className="text-xs font-medium uppercase tracking-widest text-cyan-400">
                Portfolio 2025 — ENSIAS • IDF
              </span>
            </div>

            {/* Nom avec gradient */}
            <h1 className="mt-6 text-5xl font-black leading-[1.1] md:text-7xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              FRANCOIS MANSARE
            </h1>

            {/* Description enrichie */}
            <p className="mt-4 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-300">
              Étudiant en{" "}
              <span className="text-cyan-400 font-semibold">
                Ingénierie Digitale pour la Finance
              </span>{" "}
              à l'ENSIAS.
              <br />
              Co-fondateur de{" "}
              <span className="text-purple-400 font-semibold">
                YIRI TECH AFRICA
              </span>
              .
              <br />
              Passionné par la{" "}
              <span className="text-emerald-400 font-semibold">Data</span>, la{" "}
              <span className="text-orange-400 font-semibold">FinTech</span>, l'
              <span className="text-pink-400 font-semibold">IA</span> et l'
              <span className="text-indigo-400 font-semibold">
                Art Oratoire
              </span>
              .
            </p>

            {/* Tags colorés */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                {
                  name: "FinTech",
                  color:
                    "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20",
                },
                {
                  name: "IA/RAG",
                  color:
                    "border-purple-400/30 bg-purple-400/10 text-purple-300 hover:bg-purple-400/20",
                },
                {
                  name: "Blockchain",
                  color:
                    "border-blue-400/30 bg-blue-400/10 text-blue-300 hover:bg-blue-400/20",
                },
                {
                  name: "Data",
                  color:
                    "border-orange-400/30 bg-orange-400/10 text-orange-300 hover:bg-orange-400/20",
                },
                {
                  name: "Entrepreneuriat",
                  color:
                    "border-rose-400/30 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20",
                },
                {
                  name: "Art Oratoire",
                  color:
                    "border-indigo-400/30 bg-indigo-400/10 text-indigo-300 hover:bg-indigo-400/20",
                },
              ].map((tag) => (
                <span
                  key={tag.name}
                  className={`rounded-lg border px-3 py-1.5 text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Boutons avec effets avancés */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-bold text-black shadow-lg shadow-cyan-400/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                aria-label="Voir mes projets"
              >
                <span className="relative z-10">Voir mes projets</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href="public/cv/CV_FRANCOIS_MANSARE.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Télécharger mon CV"
              >
                <span>Télécharger mon CV</span>
              </a>
            </div>
          </div>

          {/* Colonne image améliorée */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group relative mx-auto max-w-md">
              {/* Cadres néon multiples */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 opacity-20 blur transition-all duration-300 group-hover:opacity-40 group-hover:-inset-3" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 opacity-30 blur transition-all duration-300 group-hover:opacity-50 group-hover:-inset-2" />

              {/* Image principale */}
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm">
                <img
                  src="public/frank.jpg"
                  alt="François Mansaré — Étudiant ingénieur et orateur"
                  className="relative z-10 h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={400}
                  height={500}
                  loading="eager"
                />
                {/* Overlay holographique */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-purple-400/20 ${
                    reduceMotion
                      ? "opacity-0"
                      : "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  }`}
                />
                {/* Effet scan */}
                {!reduceMotion && (
                  <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transition-transform duration-[2000ms] group-hover:translate-y-full" />
                )}
              </div>

              {/* Badge disponibilité amélioré */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-emerald-400/30 bg-black/90 px-6 py-2 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 ${
                      reduceMotion ? "" : "animate-pulse"
                    }`}
                  />
                  <span className="text-xs font-medium text-emerald-300">
                    Disponible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator amélioré */}
        <div className="flex justify-center pb-8">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <span className="text-xs uppercase tracking-widest font-medium">
              Scroll pour découvrir
            </span>
            <div className="relative">
              <div className="h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <div
              className={`p-1 rounded-full bg-white/5 border border-white/10 ${
                reduceMotion ? "" : "animate-bounce"
              }`}
            >
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* TECH STACK / OUTILS améliorée */}
        <section id="stack" className="relative z-10 mb-16">
          <h2 className="sr-only">Technos & Outils</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {tools.map(({ name, icon: Icon }, index) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Effet de lueur */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon
                    className="h-6 w-6 text-cyan-300 opacity-90 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  />
                  <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS RAPIDES avec compteurs */}
        <section
          id="highlights"
          className="relative z-10 mx-auto mt-2 mb-14 max-w-6xl px-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {highlights.map((h, index) => (
              <div
                key={h.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10 hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-extrabold text-cyan-300 md:text-4xl">
                      <AnimatedCounter value={h.value} />
                    </div>
                    {/* Pastille discrète */}
                    <span
                      className={`h-2 w-2 rounded-full bg-cyan-400/60 ${
                        reduceMotion ? "" : "animate-pulse"
                      }`}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-300">{h.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sections à remplir plus tard */}
      <section id="projects" className="sr-only">
        Projets
      </section>
      <section id="contact" className="sr-only">
        Contact
      </section>

      {/* Footer au-dessus des calques fixed */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

/* ====== Icônes minimalistes pour la section "Technos & Outils" ====== */
function ReactIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="2" strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth="1.5" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        transform="rotate(60 12 12)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        transform="rotate(-60 12 12)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SupabaseIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M8 3 18 13h-6l6 8L6 13h6L8 3Z" strokeWidth="1.5" />
    </svg>
  );
}

function PythonIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M8 7h6a3 3 0 0 1 3 3v3H11a3 3 0 0 1-3-3V7Z" strokeWidth="1.5" />
      <path
        d="M16 17H10a3 3 0 0 1-3-3v-3h6a3 3 0 0 1 3 3v3Z"
        strokeWidth="1.5"
      />
      <circle cx="9.5" cy="9.5" r="0.8" fill="currentColor" />
      <circle cx="14.5" cy="14.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function AIIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
      <path
        d="M6.5 12H8m8 0h1.5M12 6.5V8m0 8v1.5M9.5 9.5l1 1M14.5 14.5l1 1M14.5 9.5l-1 1M9.5 14.5l-1 1"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChainIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M8 14 6 16a3 3 0 0 0 4 4l2-2M16 10l2-2a3 3 0 0 0-4-4l-2 2"
        strokeWidth="1.5"
      />
      <path d="M9.5 14.5 14.5 9.5" strokeWidth="1.5" />
    </svg>
  );
}

function ExcelIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
      <path d="M8 3v18M16 3v18M3 9h18M3 15h18" strokeWidth="1.2" />
    </svg>
  );
}

function DatabaseIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" strokeWidth="1.5" />
      <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" strokeWidth="1.5" />
      <ellipse cx="12" cy="14" rx="7" ry="3" strokeWidth="1.5" />
    </svg>
  );
}
