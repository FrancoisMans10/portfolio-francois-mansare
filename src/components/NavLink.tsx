// src/components/NavLink.tsx
import React from "react";
import { Link } from "react-router-dom";

type Props = React.PropsWithChildren<{ href: string; className?: string }>;

export default function NavLink({ href, className = "", children }: Props) {
  return (
    <Link
      to={href}
      className={[
        "group relative overflow-hidden px-3 py-2 text-gray-300 transition-all duration-300 hover:text-cyan-400",
        className,
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
