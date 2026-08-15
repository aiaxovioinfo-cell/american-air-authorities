import Link from "next/link";
import { EmblemMark } from "@/components/brand/EmblemMark";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-carbon pt-[68px]">
      <div className="engineering-grid pointer-events-none absolute inset-0" />
      <div className="container-x relative text-center">
        <EmblemMark className="mx-auto mb-8 h-24 w-24" />
        <p className="eyebrow mb-3 text-brass-light">Error 404</p>
        <h1 className="font-display text-hero font-extrabold uppercase text-bone">
          Off the map
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-bone/80">
          That page isn&rsquo;t here — but your AC problem still is. Head home or
          give us a call.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm bg-brass px-7 py-3.5 font-semibold text-black brushed-brass transition-transform hover:-translate-y-1"
          >
            Back home
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-sm border border-brass/60 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.12em] text-bone transition-colors hover:border-brass hover:text-brass-light"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
