import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/cities";
import { CityTemplate } from "@/components/templates/CityTemplate";
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
  const description = `Same-day AC repair, installation, and emergency HVAC (seven days a week, 7 AM–10 PM EST) in ${city.name}, ${city.county} County. ${site.name} · York certified · Lic #${site.license}.`;
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
  return <CityTemplate city={city} />;
}
