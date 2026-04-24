import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import TierCards from "@/components/TierCards";
import Tokenomics from "@/components/Tokenomics";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <TierCards />
        <HowItWorks />
        <Tokenomics />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
