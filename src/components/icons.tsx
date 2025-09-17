// src/components/icons.tsx
import React from "react";

export function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.84v2.11h.05c.53-1 1.84-2.11 3.78-2.11 4.04 0 4.79 2.66 4.79 6.11V24h-4v-6.87c0-1.64-.03-3.74-2.28-3.74-2.29 0-2.64 1.78-2.64 3.62V24h-4V8.5z" />
    </svg>
  );
}

export function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.3-1.68-1.3-1.68-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.59.24 2.77.12 3.06.75.81 1.2 1.84 1.2 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.2.68.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
      {...props}
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
      />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m22 8-10 6L2 8"
      />
    </svg>
  );
}

export function getIcon(name: string) {
  switch (name) {
    case "linkedin":
      return LinkedInIcon;
    case "github":
      return GitHubIcon;
    case "mail":
      return MailIcon;
    default:
      return () => null;
  }
}
// src/components/NavBar.tsx
