import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/cities";
import { CityTemplate } from "@/components/templates/CityTemplate";
import { faqJsonLd, JsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  const title = `HVAC & AC Repair in ${city.name}, FL`;
  // Each city's own intro drives its meta description, so no two are alike.
  const description = `${city.intro} ${site.name} · York certified · Lic #${site.license}.`;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/service-area/${city.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}/service-area/${city.slug}`,
    },
  };
}

export default function CityPage({
  params,
}: {
  params: { city: string };
}) {
  const city = getCity(params.city);
  if (!city) notFound();
  return (
    <>
      <JsonLd data={faqJsonLd(city.faqs)} />
      <CityTemplate city={city} />
    </>
  );
}
