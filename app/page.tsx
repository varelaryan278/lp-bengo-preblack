import Script from "next/script";
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
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','2492846604552010');
        fbq('track','PageView');
      `}
    </Script>
    <noscript>
      {/* Meta requires a plain image request when JavaScript is disabled. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=2492846604552010&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  </main>
);

export default Page;
