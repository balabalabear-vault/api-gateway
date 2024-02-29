import Concept4Section from "./components/Concept4Section";
import LandingSection from "./components/LandingSection";
import SelfIntroSection from "./components/SelfIntroSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <LandingSection />
      <SelfIntroSection />
      <Concept4Section />
      <section className="w-full min-h-lvh" />

    </main>
  );
}
