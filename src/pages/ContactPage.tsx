import React, { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Zap,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { SOCIALS } from "../config/site";
import { getIcon } from "../components/icons";

const ContactCard = ({
  icon: Icon,
  title,
  value,
  href,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
  description?: string;
  delay?: number;
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const content = (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 ${
        isHovered
          ? "border-cyan-400/50 shadow-2xl shadow-cyan-500/20"
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

      <div className="relative z-10 p-6">
        {/* Icône avec effet glow */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>

          {/* Bouton copier */}
          <button
            onClick={() => handleCopy(value)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 group/copy"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 group-hover/copy:text-cyan-400" />
            )}
          </button>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </h3>

        {/* Valeur */}
        <p className="text-cyan-300 font-medium mb-2 break-all">{value}</p>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        )}

        {/* Indicateur d'action au hover */}
        {href && (
          <div className="mt-4 flex items-center text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span>Cliquer pour ouvrir</span>
          </div>
        )}

        {/* Barre de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

const SocialCard = ({ social, index }: { social: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={social.href}
      target={social.href.startsWith("http") ? "_blank" : undefined}
      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
          isHovered
            ? "border-cyan-400/40 shadow-lg shadow-cyan-500/20"
            : "border-white/10"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(15px)",
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Effet de lueur subtile */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
            <social.Icon className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="font-medium text-white group-hover:text-cyan-300 transition-colors">
              {social.label}
            </p>
            <p className="text-xs text-gray-400">
              {social.href.startsWith("http")
                ? "Profil en ligne"
                : "Contact direct"}
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors ml-auto" />
        </div>
      </div>
    </a>
  );
};

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Email depuis SOCIALS
  const email = useMemo(() => {
    const mail = SOCIALS.find(
      (s) =>
        s.label?.toLowerCase() === "email" ||
        s.icon === "mail" ||
        s.href?.startsWith("mailto:")
    );
    if (!mail) return "contact@example.com";
    return mail.href.replace(/^mailto:/, "");
  }, []);

  // Réseaux sociaux (sans email)
  const socials = useMemo(() => {
    return SOCIALS.filter((s) => s.label !== "Email").map((s) => ({
      ...s,
      Icon: getIcon(s.icon),
    }));
  }, []);

  const phoneNumber = "+212710914717";

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
                id="contactLineGradient"
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
              x1="15%"
              y1="25%"
              x2="85%"
              y2="75%"
              stroke="url(#contactLineGradient)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="25%"
              y1="75%"
              x2="75%"
              y2="15%"
              stroke="url(#contactLineGradient)"
              strokeWidth="1"
            >
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="3s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>
      </div>

      <NavBar />

      <main
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20"
        id="contact"
      >
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
              CONTACT • COLLABORATION • INNOVATION
            </span>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Discutons de vos idées
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            Un projet{" "}
            <span className="text-cyan-400 font-semibold">FinTech</span>,{" "}
            <span className="text-purple-400 font-semibold">Data</span> ou{" "}
            <span className="text-pink-400 font-semibold">IA</span> ?
            Contactez-moi directement, je réponds rapidement.
          </p>
        </header>

        {/* Section principale de contact */}
        <section className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Coordonnées principales */}
          <div className="xl:col-span-2 grid gap-6 sm:grid-cols-2">
            {/* Email */}
            <ContactCard
              icon={Mail}
              title="Email"
              value={email}
              href={`mailto:${email}`}
              description="Pour les opportunités professionnelles, collaborations et projets"
              delay={0}
            />

            {/* Téléphone */}
            <ContactCard
              icon={Phone}
              title="Téléphone"
              value={phoneNumber}
              href={`tel:${phoneNumber}`}
              description="Disponible du lundi au vendredi, 9h-18h (GMT+1)"
              delay={100}
            />

            {/* Localisation */}
            <ContactCard
              icon={MapPin}
              title="Localisation"
              value="Maroc, Rabat"
              description="Ouvert au télétravail et aux missions en remote"
              delay={200}
            />

            {/* Disponibilité */}
            <ContactCard
              icon={Clock}
              title="Disponibilité"
              value="Immédiate"
              description="Prêt pour de nouveaux défis et collaborations"
              delay={300}
            />
          </div>

          {/* Réseaux sociaux */}
          <aside className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50" />
              <div className="relative rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 p-6 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Réseaux & Profils
                  </h2>
                </div>

                <div className="space-y-3">
                  {socials.map((social, index) => (
                    <SocialCard
                      key={social.label}
                      social={social}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Message rapide */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-50" />
              <div className="relative rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 p-6 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-emerald-300">
                    Message rapide
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Préférez-vous un échange rapide ? Appelez-moi directement ou
                  envoyez un email avec vos coordonnées.
                </p>
                <div className="flex space-x-2">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 rounded-lg text-sm font-medium text-emerald-300 hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-300 hover:scale-105"
                  >
                    Appeler
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-lg text-sm font-medium text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Section CTA */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative p-8 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 border border-cyan-400/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Prêt à innover ensemble ?
              </h2>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Que ce soit pour une mission, un projet ou une collaboration,
                discutons de vos besoins.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${phoneNumber}`}
                  className="group px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Appeler maintenant</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
                <a
                  href={`mailto:${email}`}
                  className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Envoyer un email</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
              </div>
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
      `}</style>
    </div>
  );
}
