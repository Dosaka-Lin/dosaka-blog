import HeroSection from "@/components/home/HeroSection";
import StatsCards from "@/components/home/StatsCards";
import TechStackCloud from "@/components/home/TechStackCloud";
import BlogPreview from "@/components/home/BlogPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCards />
      <TechStackCloud />
      <BlogPreview />
    </>
  );
}
