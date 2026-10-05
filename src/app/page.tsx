import { Hero } from "@/components/hero/Hero";
import { CredentialStrip } from "@/components/sections/CredentialStrip";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { JobPhotos } from "@/components/sections/JobPhotos";
import { photosFor } from "@/lib/gallery";
import { reviews } from "@/lib/reviews";
import { JsonLd, reviewsJsonLd } from "@/lib/schema";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialStrip />
      <Services />
      <Process />
      <WhyUs />
      <JobPhotos title="Recent work" photos={photosFor("home")} />
      <Reviews />
      <ServiceArea />
      <CtaBand />
      {/* The reviews carousel is a client component; its Review markup lives here. */}
      <JsonLd data={reviewsJsonLd(reviews)} />
    </>
  );
}
