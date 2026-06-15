"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/competitions", label: "竞赛" },
  { href: "/skills", label: "技能" },
  { href: "/blog", label: "博客" },
  { href: "/templates", label: "模板" },
  { href: "/about", label: "关于" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-tohsaka-red rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(196,30,58,0.5)] transition-shadow">
            <Code2 size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-text-primary">
            Dosaka<span className="text-tohsaka-red">_Lin</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-tohsaka-red bg-tohsaka-red/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border-subtle bg-bg-deep/95 backdrop-blur-md">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-tohsaka-red bg-tohsaka-red/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
