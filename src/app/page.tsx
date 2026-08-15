import { Hero } from "@/components/hero/Hero";
import { CredentialStrip } from "@/components/sections/CredentialStrip";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialStrip />
      <Services />
      <Process />
      <WhyUs />
      <Reviews />
      <ServiceArea />
      <CtaBand />
    </>
  );
}
