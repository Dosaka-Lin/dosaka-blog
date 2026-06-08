import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import Badge from "@/components/ui/Badge";
import { skills } from "@/data/skills";

const badgeVariants = ["red", "gold", "purple", "blue"] as const;

export default function TechStackCloud() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <ScrollReveal>
        <SectionDivider />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-2">技术栈</h2>
          <p className="text-text-muted text-sm">我日常使用的技术与工具</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="flex flex-wrap justify-center gap-2.5">
          {skills.map((skill, i) => (
            <Badge key={skill.name} variant={badgeVariants[i % 4]} size="md">
              {skill.name}
            </Badge>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
