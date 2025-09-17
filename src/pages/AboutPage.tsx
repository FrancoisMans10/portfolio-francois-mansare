import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Trophy,
  Users,
  Briefcase,
  Code,
  Database,
  Brain,
  Zap,
  Calendar,
  MapPin,
  Award,
  Star,
  ChevronRight,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

type Edu = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  logoSrc?: string;
  logoAlt?: string;
};

type Award = { title: string; org?: string; year: string };
type Lead = { role: string; org: string; period?: string; bullets: string[] };

const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 ${
        isHovered
          ? "border-cyan-400/50 shadow-2xl shadow-cyan-500/20"
          : "border-white/10"
      } ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(20px)",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Effet de lueur */}
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
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: "2.5s",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">{children}</div>

      {/* Ligne de progression */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
    </div>
  );
};

const EducationCard = ({ edu, index }: { edu: Edu; index: number }) => {
  return (
    <AnimatedCard delay={index * 100} className="p-6">
      <div className="flex items-start gap-4">
        {/* Logo ou initiales */}
        <div className="flex-shrink-0">
          {edu.logoSrc ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur-sm" />
              <img
                src={edu.logoSrc}
                alt={edu.logoAlt || edu.school}
                className="relative h-16 w-16 rounded-xl object-contain bg-white/10 p-2 border border-cyan-400/20"
              />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center text-lg font-bold text-cyan-300">
              {edu.school
                .split(" ")
                .slice(0, 2)
                .map((s) => s[0])
                .join("")}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Diplôme */}
          <h3 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            {edu.degree}
          </h3>

          {/* École */}
          <p className="text-cyan-300 font-medium mb-3 leading-relaxed">
            {edu.school}
          </p>

          {/* Période et localisation */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{edu.period}</span>
            </div>
            {edu.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{edu.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

const LeadershipCard = ({ lead, index }: { lead: Lead; index: number }) => {
  return (
    <AnimatedCard delay={index * 150} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{lead.role}</h3>
            {lead.period && (
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                {lead.period}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-cyan-300 font-medium mb-4">{lead.org}</p>

      <div className="space-y-3">
        {lead.bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3 group/bullet">
            <div className="flex-shrink-0 mt-1">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover/bullet:scale-125 transition-transform duration-300" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed group-hover/bullet:text-gray-200 transition-colors">
              {bullet}
            </p>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
};

const HighlightCard = ({
  highlight,
  index,
}: {
  highlight: any;
  index: number;
}) => {
  return (
    <AnimatedCard delay={index * 100} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
            <Briefcase className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {highlight.title}
          </h3>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          {highlight.period}
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed mb-4 text-sm">
        {highlight.details}
      </p>

      <div className="flex flex-wrap gap-2">
        {highlight.tags.map((tag: string, tagIndex: number) => (
          <span
            key={tag}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 text-purple-300 hover:border-purple-400/40 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 cursor-default"
            style={{ animationDelay: `${tagIndex * 50}ms` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </AnimatedCard>
  );
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const education: Edu[] = [
    {
      school:
        "ENSIAS — École Nationale Supérieure d'Informatique et d'Analyse des Systèmes",
      degree: "Cycle Ingénieur - Ingénierie Digitale pour la Finance",
      period: "Depuis sept. 2024",
      location: "Rabat, Maroc",
      logoSrc: "/logos/ensias.png",
      logoAlt: "Logo ENSIAS",
    },
    {
      school: "Université Sidi Mohamed Ben Abdellah (USMBA)",
      degree: "Licence SMI - Sciences Mathématiques & Informatique",
      period: "Oct. 2021 - Juin 2024",
      location: "Fès, Maroc",
      logoSrc: "/logos/usmba.png",
      logoAlt: "Logo USMBA",
    },
  ];

  const leadership: Lead[] = [
    {
      role: "Secrétaire Général",
      org: "Association des Étudiants Guinéens au Maroc (ASEGUIM) - Fès",
      period: "",
      bullets: [
        "Organisation d'événements culturels & scientifiques (jusqu'à 400 participants).",
        "Coordination partenaires institutionnels/privés, communication et logistique.",
        "Initiatives pour l'intégration et le bien-être des étudiants guinéens.",
      ],
    },
    {
      role: "Maître de cérémonie / Modérateur",
      org: "Conférences & Hackathon Fintech",
      period: "Dont Hackathon Fintech ENSIAS 2025",
      bullets: [
        "Animation de débats & panels, gestion des timings et interactions.",
      ],
    },
  ];

  const awards: Award[] = [
    { title: "Concours d'éloquence CESAM", org: "CESAM", year: "2024" },
    { title: "Débat & Art oratoire", org: "CESAM-Fès", year: "2024" },
    { title: "Concours d'éloquence (national)", org: "ASEGUIM", year: "2023" },
    { title: "Culture générale", org: "ASEGUIM Fès", year: "2022" },
  ];

  const highlights = [
    {
      title: "Co-fondateur - YIRI TECH AFRICA",
      period: "2025 - aujourd'hui",
      details:
        "Initiatives tech & éducation numérique : conception de produits, accompagnement et sensibilisation à l'IA.",
      tags: ["Entrepreneuriat", "Produit", "Impact"],
    },
    {
      title: "Stage - 3D Smart Factory (GuiTroc)",
      period: "2025",
      details:
        "Développement de l'application GuiTroc : plateforme d'échange avec GuiCoins (monnaie locale). Intégration Blockchain & IA (RAG).",
      tags: ["React", "Supabase", "Blockchain", "IA/RAG"],
    },
  ];

  const domains = [
    {
      name: "FinTech",
      icon: Zap,
      color:
        "from-yellow-500/20 to-orange-500/20 border-yellow-400/30 text-yellow-300",
    },
    {
      name: "IA / RAG",
      icon: Brain,
      color:
        "from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300",
    },
    {
      name: "Blockchain",
      icon: Database,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-300",
    },
    {
      name: "Python",
      icon: Code,
      color:
        "from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-300",
    },
    {
      name: "React",
      icon: Code,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-300",
    },
    {
      name: "Supabase",
      icon: Database,
      color:
        "from-emerald-500/20 to-green-500/20 border-emerald-400/30 text-emerald-300",
    },
    {
      name: "SQL",
      icon: Database,
      color:
        "from-indigo-500/20 to-purple-500/20 border-indigo-400/30 text-indigo-300",
    },
    {
      name: "Excel",
      icon: Database,
      color:
        "from-green-500/20 to-teal-500/20 border-green-400/30 text-green-300",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Arrière-plan futuriste */}
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

        {/* Orbes lumineux */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Lignes de connexion */}
        <div className="absolute inset-0">
          <svg
            className="w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="aboutLineGradient"
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
              x1="10%"
              y1="30%"
              x2="90%"
              y2="70%"
              stroke="url(#aboutLineGradient)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="30%"
              y1="80%"
              x2="70%"
              y2="20%"
              stroke="url(#aboutLineGradient)"
              strokeWidth="1"
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
        {/* Header futuriste */}
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
              À PROPOS • PARCOURS • EXPERTISES
            </span>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Mon parcours
          </h1>

          {/* Description enrichie */}
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed">
            <span className="text-cyan-400 font-semibold">
              Étudiant-ingénieur
            </span>{" "}
            (ENSIAS – IDF),
            <span className="text-purple-400 font-semibold">
              {" "}
              co-fondateur
            </span>{" "}
            de YIRI TECH AFRICA. Je transforme des idées en produits utiles -
            <span className="text-pink-400 font-semibold">
              {" "}
              Finance · Data · IA
            </span>
            . Orateur/MC sur des événements FinTech.
          </p>
        </header>

        {/* Domaines & Outils */}
        <section className="mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-50" />
            <div className="relative rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 p-8 backdrop-blur-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                  <Code className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Domaines & Outils
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {domains.map((domain, index) => (
                  <div
                    key={domain.name}
                    className={`group relative overflow-hidden rounded-xl border bg-gradient-to-r ${domain.color} p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <domain.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{domain.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expériences marquantes */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Expériences marquantes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={highlight.title}
                highlight={highlight}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Parcours académique */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Parcours académique
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {education.map((edu, index) => (
              <EducationCard key={edu.school} edu={edu} index={index} />
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Leadership & Engagement
            </h2>
          </div>

          <div className="grid gap-6">
            {leadership.map((lead, index) => (
              <LeadershipCard
                key={lead.role + lead.org}
                lead={lead}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Distinctions & Prix */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Distinctions & Prix
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((award, index) => (
              <AnimatedCard
                key={award.title + award.year}
                delay={index * 100}
                className="p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                </div>

                <h3 className="font-semibold text-white mb-2 leading-snug">
                  {award.title}
                </h3>

                {award.org && (
                  <p className="text-sm text-gray-400 mb-2">{award.org}</p>
                )}

                <div className="flex items-center text-yellow-400 font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  <span className="text-sm">{award.year}</span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Section CTA */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 border border-cyan-400/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Collaborons sur votre prochain projet
              </h2>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Passionné par la FinTech, IA et Data , prêt à transformer vos
                idées en solutions innovantes
              </p>
              <Link
                to="/contact"
                className="group inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Discutons ensemble</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <style>
        {`
        @keyframes gradient-xy {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(-2px, -2px, 0);
          }
          50% {
            transform: translate3d(2px, -2px, 0);
          }
          75% {
            transform: translate3d(-2px, 2px, 0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-12px) rotate(180deg);
            opacity: 0.8;
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}
