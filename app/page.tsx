import LandingSection from "./components/LandingSection";
import SelfIntroSection from "./components/SelfIntroSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <LandingSection />
      <SelfIntroSection />
      <section className="w-full min-h-lvh p-24 ">

      </section>
    </main>
  );
}
