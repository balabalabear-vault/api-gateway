import Concept4Section from "./components/Concept4Section";
import LandingSection from "./components/LandingSection";
import SelfIntroSection from "./components/SelfIntroSection";
import EndingSection from "./components/EndingSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-slate-800">
      <LandingSection />
      <SelfIntroSection />
      <Concept4Section />
      <EndingSection />
    </main>
  );
}
