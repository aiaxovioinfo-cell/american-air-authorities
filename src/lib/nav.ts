export type NavLink = { href: string; label: string };

export const primaryNav: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Service Area" },
  { href: "/financing", label: "Financing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = {
  services: [
    { href: "/services/ac-repair", label: "AC Repair" },
    { href: "/services/installation", label: "System Installation" },
    { href: "/services/commercial-hvac", label: "Commercial HVAC" },
    { href: "/services/maintenance-plans", label: "Maintenance Plans" },
    { href: "/services/emergency", label: "24/7 Emergency" },
  ] satisfies NavLink[],
  company: [
    { href: "/about", label: "About" },
    { href: "/service-area", label: "Service Area" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
  ] satisfies NavLink[],
};
