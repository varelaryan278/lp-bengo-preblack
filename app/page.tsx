import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { WhyJoin } from "@/components/WhyJoin";
import { Numbers } from "@/components/Numbers";
import { Stores } from "@/components/Stores";
import { Press } from "@/components/Press";
import { FinalCta } from "@/components/FinalCta";
import { BigMarquee } from "@/components/BigMarquee";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Tracker } from "@/components/Tracker";
import { JsonLd } from "@/components/JsonLd";

const Page = () => (
  <main className="flex-1">
    <TopBar />
    <Hero />
    <BigMarquee />
    <WhyJoin />
    <Numbers />
    <Stores />
    <Press />
    <FinalCta />
    <Footer />
    <StickyCta />
    <Tracker />
    <JsonLd />
  </main>
);

export default Page;
