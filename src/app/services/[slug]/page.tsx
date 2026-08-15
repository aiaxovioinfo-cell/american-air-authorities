import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const title = `${service.title} in Tampa`;
  const description = `${service.intro} ${site.name} · Lic #${site.license}.`;
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
