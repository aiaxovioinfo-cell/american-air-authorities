import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceIcon } from "@/components/icons/ServiceIcons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "HVAC Services in Tampa",
  description: `AC repair, installation, commercial HVAC, maintenance plans, and emergency service seven days a week, 7 AM–10 PM EST, across Tampa Bay. ${site.name} · Lic #${site.license}.`,
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesHub() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title={["HVAC", "Services"]}
        intro="Repairs, installs, and commercial work handled by licensed, York-certified technicians. Pick a service to see what's included and what it costs."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <Reveal className="container-x grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((s) => (
            <RevealItem as="div" key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-md border border-brass/20 bg-graphite p-8 shadow-plate transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex text-brass transition-transform duration-300 group-hover:-translate-y-1">
                  <ServiceIcon name={s.icon} />
                </div>
                <p className="eyebrow mb-2 text-brass-light">{s.eyebrow}</p>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-bone">
                  {s.title}
                </h2>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-bone/75">
                  {s.short}
                </p>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
