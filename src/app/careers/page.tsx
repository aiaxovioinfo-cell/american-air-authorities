import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join a family-owned, York-certified HVAC shop in Tampa. No commission board — just honest work. ${site.name}.`,
  alternates: { canonical: `${site.url}/careers` },
};

const ROLES = [
  {
    title: "HVAC Service Technician",
    type: "Full-time · Tampa",
    body: "Diagnose and repair residential and light commercial systems. EPA certification and a clean driving record required.",
  },
  {
    title: "Install Crew Lead",
    type: "Full-time · Tampa",
    body: "Run new-system installs from load calc to commissioning. Experience with York equipment a plus.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the crew"
        title={["Work with", "us"]}
        intro="We're a small, family-owned shop where technicians are paid to do honest work — not to hit a sales quota. If that's the job you want, we'd like to talk."
      />

      <section className="relative z-10 bg-carbon py-20 md:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr]">
          <Reveal className="space-y-4">
            {ROLES.map((r) => (
              <RevealItem
                as="article"
                key={r.title}
                className="rounded-md border border-brass/20 bg-graphite p-8 shadow-plate"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-light">
                  {r.type}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-bone">
                  {r.title}
                </h2>
                <p className="mt-3 max-w-measure leading-relaxed text-bone/75">
                  {r.body}
                </p>
              </RevealItem>
            ))}
            <RevealItem as="p" className="text-sm text-ash">
              {/* TODO: client to confirm — open roles, pay ranges, and benefits. */}
              Roles shown are examples. Confirm current openings before applying.
            </RevealItem>
          </Reveal>

          <Reveal>
            <RevealItem className="rounded-lg border border-brass/30 bg-graphite p-8 shadow-plate">
              <p className="eyebrow mb-2 text-brass-light">Apply</p>
              <p className="leading-relaxed text-bone/85">
                Send your experience and certifications to{" "}
                <a
                  href={site.emailHref}
                  className="text-brass-light hover:text-brass-spec"
                >
                  {site.email}
                </a>{" "}
                or call and ask for the manager.
              </p>
              <a
                href={site.phoneHref}
                className="mt-5 block font-display text-2xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
              >
                {site.phoneDisplay}
              </a>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
