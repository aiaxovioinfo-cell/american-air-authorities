import Link from "next/link";
import { EmblemMark } from "@/components/brand/EmblemMark";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-brass/20 bg-carbon">
      <div className="container-x grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Contact block — phone set large in the display face */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <EmblemMark className="h-9 w-auto" />
            <span className="font-display text-sm font-extrabold uppercase leading-tight tracking-tight text-bone">
              American
              <br />
              Air Authorities
            </span>
          </div>
          <p className="eyebrow mb-2">Call day or night</p>
          <a
            href={site.phoneHref}
            className="block font-display text-3xl font-extrabold tracking-tight text-brass-light hover:text-brass-spec"
          >
            {site.phoneDisplay}
          </a>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ash">
            {site.phoneVanity}
          </p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-ash">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </address>
          <a
            href={site.emailHref}
            className="mt-3 inline-block text-sm text-bone/80 hover:text-brass-light"
          >
            {site.email}
          </a>
        </div>

        {/* Services */}
        <nav aria-label="Footer services">
          <h2 className="eyebrow mb-4 text-brass-light">Services</h2>
          <ul className="space-y-2.5">
            {footerNav.services.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-bone/80 hover:text-brass-light"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Footer company">
          <h2 className="eyebrow mb-4 text-brass-light">Company</h2>
          <ul className="space-y-2.5">
            {footerNav.company.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-bone/80 hover:text-brass-light"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                className="text-sm text-bone/80 hover:text-brass-light"
              >
                Book a Service Call
              </Link>
            </li>
          </ul>
        </nav>

        {/* Credentials */}
        <div>
          <h2 className="eyebrow mb-4 text-brass-light">Credentials</h2>
          <ul className="space-y-3 text-sm text-ash">
            <li className="rounded-sm border border-brass/25 bg-graphite p-3">
              <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brass-light">
                License
              </span>
              {site.licenseState} #{site.license}
            </li>
            <li className="rounded-sm border border-brass/25 bg-graphite p-3">
              <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brass-light">
                Factory Certified
              </span>
              York Certified Comfort Expert
            </li>
            <li className="rounded-sm border border-brass/25 bg-graphite p-3">
              <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brass-light">
                Coverage
              </span>
              24/7 emergency service
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hairline-rule" />
      <div className="container-x flex flex-col items-start justify-between gap-4 py-6 text-xs text-ash sm:flex-row sm:items-center">
        <p className="font-mono uppercase tracking-[0.12em]">
          © {new Date().getFullYear()} {site.name} · Lic. #{site.license} ·
          Family owned
        </p>
        <div className="flex items-center gap-5">
          <a
            href={site.instagram.url}
            className="hover:text-brass-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram {site.instagram.handle}
          </a>
          <Link href="/contact" className="hover:text-brass-light">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
