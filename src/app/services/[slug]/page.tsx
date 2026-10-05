import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { ServiceTemplate } from "@/components/templates/ServiceTemplate";
import { pageMetadata } from "@/lib/metadata";

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
  return pageMetadata({
    title: `${service.title} in Tampa`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
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
