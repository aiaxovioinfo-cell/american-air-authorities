import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/cities";
import { CityTemplate } from "@/components/templates/CityTemplate";
import { faqJsonLd, JsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

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
  return pageMetadata({
    title: `HVAC & AC Repair in ${city.name}, FL`,
    description: city.metaDescription,
    path: `/service-area/${city.slug}`,
  });
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
