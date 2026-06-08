export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 py-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-tohsaka-red/30 to-transparent" />
      <div className="w-2 h-2 rotate-45 bg-tohsaka-red/60" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-tohsaka-gold/30 to-transparent" />
    </div>
  );
}
