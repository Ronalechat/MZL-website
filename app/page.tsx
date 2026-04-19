import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LinksSection from "@/components/sections/LinksSection";

export const metadata = {
  title: "Michael Lin — Frontend Engineer",
  description:
    "Frontend engineer specialising in interactive data visualisation, React, and TypeScript. Based in Sydney.",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <LinksSection />
    </main>
  );
}
