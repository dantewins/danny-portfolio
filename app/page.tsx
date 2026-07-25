import { FooterSection } from "@/components/home/footer-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowIBuild } from "@/components/home/how-i-build";
import { ProjectsSection } from "@/components/home/projects-section";

export default function Portfolio() {
  return (
    <div className="min-h-screen antialiased">
      <main className="mx-auto max-w-5xl px-6">
        <HeroSection />
        <HowIBuild />
        <ProjectsSection />
        <FooterSection />
      </main>
    </div>
  );
}
