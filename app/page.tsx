import { FooterSection } from "@/components/home/footer-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { WritingSection } from "@/components/home/writing-section";

export default function Portfolio() {
  return (
    <div className="min-h-screen antialiased">
      <main className="mx-auto max-w-5xl px-6">
        <HeroSection />
        <WritingSection />
        <ProjectsSection />
        <FooterSection />
      </main>
    </div>
  );
}
