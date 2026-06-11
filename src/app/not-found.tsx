import Link from "next/link";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <div className="glass gem-shine rounded-2xl p-12 max-w-md mx-auto">
        <h1 className="text-6xl font-display font-bold text-tohsaka-red mb-4">404</h1>
        <p className="text-text-secondary mb-2">页面未找到</p>
        <p className="text-sm text-text-muted mb-8">
          你访问的页面不存在，可能已被移动或删除。
        </p>
        <Button href="/" variant="primary">
          <Home size={16} />
          返回首页
        </Button>
      </div>
    </div>
  );
}
