import React, { useState, useEffect } from "react";
import {
  Eye,
  ExternalLink,
  Calendar,
  Code,
  Zap,
  Database,
  Brain,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

type Project = {
  title: string;
  period?: string;
  description: string;
  tags: string[];
  links?: { label: string; href: string }[];
  category?: string;
  status?: "completed" | "in-progress" | "prototype";
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryIcons = {
    FinTech: Zap,
    IA: Brain,
    Data: Database,
    Web: Code,
  };

  const statusColors = {
    completed: "from-emerald-500/20 to-emerald-400/10 border-emerald-400/30",
    "in-progress": "from-amber-500/20 to-amber-400/10 border-amber-400/30",
    prototype: "from-purple-500/20 to-purple-400/10 border-purple-400/30",
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 ${
        isHovered
          ? "border-cyan-400/50 shadow-2xl shadow-cyan-500/20"
          : "border-white/10"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(20px)",
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Effet de lueur animé */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy" />
      </div>

      {/* Particules flottantes */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 p-8">
        {/* Header avec status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {project.category &&
              categoryIcons[project.category as keyof typeof categoryIcons] &&
              React.createElement(
                categoryIcons[project.category as keyof typeof categoryIcons],
                {
                  className: "w-6 h-6 text-cyan-400",
                }
              )}
            {project.status && (
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  statusColors[project.status]
                }`}
              >
                {project.status === "completed" && "Terminé"}
                {project.status === "in-progress" && "En cours"}
                {project.status === "prototype" && "Prototype"}
              </div>
            )}
          </div>
          {project.period && (
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              {project.period}
            </div>
          )}
        </div>

        {/* Titre avec effet de typing */}
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6 text-sm">
          {project.description}
        </p>

        {/* Tags avec effets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className="relative px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-gray-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 cursor-default"
              style={{
                animationDelay: `${tagIndex * 50}ms`,
              }}
            >
              <span className="relative z-10">{tag}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 to-purple-500/0 hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300" />
            </span>
          ))}
        </div>

        {/* Links avec animations */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, linkIndex) => (
              <Link
                key={link.label}
                to={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group/link inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 text-cyan-300 hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                style={{
                  animationDelay: `${linkIndex * 100}ms`,
                }}
              >
                <Eye className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">{link.label}</span>
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        )}

        {/* Ligne de progression animée */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      </div>
    </article>
  );
};

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects: Project[] = [
    {
      title: "GuiTroc - Monnaie locale numérique (GuiCoins)",
      period: "2025",
      description:
        "Plateforme d'échange locale révolutionnaire avec comptes intelligents, transactions sécurisées et gouvernance communautaire décentralisée. Intelligence artificielle RAG pour l'assistance utilisateur et intégration blockchain native.",
      tags: ["React", "Supabase", "Blockchain", "IA/RAG", "Web3"],
      category: "FinTech",
      status: "in-progress",
    },
    {
      title: "Détection de fraudes bancaires",
      period: "ENSIAS, 2025",
      description:
        "Pipeline de machine learning avancé combinant KNN, Régression Logistique, Random Forest et XGBoost. Feature engineering sophistiqué et interface de démonstration interactive avec Streamlit.",
      tags: ["Python", "Scikit-learn", "Pandas", "Streamlit", "ML"],
      category: "IA",
      status: "completed",
    },
    {
      title: "Analyse de tweets par IA",
      period: "Licence SMI, 2024",
      description:
        "Système de classification de sentiments sur tweets utilisant le NLP avancé. Pipeline complet de nettoyage de données, vectorisation de texte et architecture MongoDB pour le stockage optimisé.",
      tags: ["NLP", "Python", "MongoDB", "Sentiment Analysis"],
      category: "IA",
      status: "completed",
    },
    {
      title: "Dashboard boursier interactif",
      period: "2024 — 2025",
      description:
        "Plateforme de visualisation financière temps réel exploitant yfinance et Plotly. Interface utilisateur moderne avec Streamlit et déploiement cloud haute disponibilité pour l'analyse de marché.",
      tags: ["Python", "Streamlit", "Plotly", "API", "Finance"],
      category: "Data",
      status: "completed",
      links: [
        {
          label: "Demo Streamlit",
          href: "https://dashbordfinancierdefrancoismans.streamlit.app",
        },
      ],
    },
  ];

  const filters = [
    { key: "all", label: "Tous", count: projects.length },
    {
      key: "FinTech",
      label: "FinTech",
      count: projects.filter((p) => p.category === "FinTech").length,
    },
    {
      key: "IA",
      label: "IA",
      count: projects.filter((p) => p.category === "IA").length,
    },
    {
      key: "Data",
      label: "Data",
      count: projects.filter((p) => p.category === "Data").length,
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Arrière-plan futuriste amélioré */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" aria-hidden>
        {/* Gradient de base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Grille futuriste */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Orbes lumineux animés */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Lignes de connexion dynamiques */}
        <div className="absolute inset-0">
          <svg
            className="w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <line
              x1="10%"
              y1="20%"
              x2="90%"
              y2="80%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="20%"
              y1="80%"
              x2="80%"
              y2="10%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.8;0.2;0.8"
                dur="3s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>
      </div>

      <NavBar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Header futuriste amélioré */}
        <header className="mb-16">
          {/* Badge animé */}
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 backdrop-blur-xl mb-6">
            <div className="flex space-x-1">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <span className="text-[11px] tracking-widest text-cyan-300 font-medium">
              PORTFOLIO • PROJETS • INNOVATIONS
            </span>
          </div>

          {/* Titre principal avec effet gradient */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Mes projets & réalisations
          </h1>

          {/* Description enrichie */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            De la{" "}
            <span className="text-cyan-400 font-semibold">
              FinTech révolutionnaire
            </span>{" "}
            à l'
            <span className="text-purple-400 font-semibold">
              Intelligence Artificielle
            </span>{" "}
            avancée - Conception produit, développement et déploiement à
            l'échelle.
          </p>
        </header>

        {/* Système de filtres interactifs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`group relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/50 text-white shadow-lg shadow-cyan-500/20"
                  : "border border-white/20 text-gray-300 hover:border-cyan-400/30 hover:text-cyan-300 hover:bg-cyan-500/5"
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{filter.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === filter.key
                      ? "bg-cyan-400/20 text-cyan-200"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {filter.count}
                </span>
              </span>
              {activeFilter === filter.key && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/20 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Grille de projets avec animations */}
        <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </section>

        {/* Section Call-to-Action améliorée */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 border border-cyan-400/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Intéressé par mes projets ?
              </h2>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Collaborons ensemble sur votre prochain projet innovant
              </p>
              <Link
                to="/contact"
                className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden inline-block"
              >
                <span className="relative z-10">Me contacter</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <style>{`
        @keyframes gradient-xy {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(-3px, -3px, 0);
          }
          50% {
            transform: translate3d(3px, -3px, 0);
          }
          75% {
            transform: translate3d(-3px, 3px, 0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 0.7;
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
