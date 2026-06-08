import Link from "next/link";
import { GithubIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-text-secondary">
            Dosaka<span className="text-tohsaka-red">_Lin</span>
          </span>
          <span className="text-text-muted text-sm">© {new Date().getFullYear()}</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Dosaka"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-tohsaka-red transition-colors"
          >
            <GithubIcon size={18} />
          </Link>
          <Link
            href="mailto:dosaka@example.com"
            className="text-text-muted hover:text-tohsaka-red transition-colors"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
