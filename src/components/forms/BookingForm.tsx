"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Booking form. Client-side only for now — on submit it composes a mailto so
 * the site works without a backend. Wire this to a real endpoint (an API
 * route + email/CRM) before launch.
 * {/* TODO: client to confirm — connect submit to a booking/CRM endpoint *\/}
 */
export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `City: ${data.get("city")}`,
      `Service: ${data.get("service")}`,
      `Urgency: ${data.get("urgency")}`,
      "",
      `${data.get("details")}`,
    ].join("\n");
    const subject = encodeURIComponent(
      `Service request — ${data.get("service")}`,
    );
    const body = encodeURIComponent(lines);
    window.location.href = `${site.emailHref}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const field =
    "w-full rounded-sm border border-brass/25 bg-carbon px-4 py-3 text-bone placeholder:text-ash/70 focus:border-brass focus:outline-none";
  const label =
    "mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-light";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-brass/20 bg-graphite p-6 shadow-plate sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(813) 555-0142" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="city" className={label}>
            City
          </label>
          <input id="city" name="city" className={field} placeholder="New Tampa" />
        </div>
        <div>
          <label htmlFor="service" className={label}>
            Service needed
          </label>
          <select id="service" name="service" className={field} defaultValue={services[0].title}>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="urgency" className={label}>
            Urgency
          </label>
          <select id="urgency" name="urgency" className={field} defaultValue="Same day">
            <option>Emergency — no cool now</option>
            <option>Same day</option>
            <option>This week</option>
            <option>Just a quote</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="details" className={label}>
          What&rsquo;s it doing?
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className={field}
          placeholder="Blowing warm air, tripping the breaker, or making a noise it didn't make yesterday…"
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-brass px-6 py-4 font-semibold text-black brushed-brass shadow-plate transition-transform hover:-translate-y-1 sm:w-auto"
        data-cursor="target"
      >
        Book a service call
      </button>

      <p className="mt-4 text-sm text-ash" aria-live="polite">
        {submitted
          ? "Opening your email to send the request. Prefer to talk? Call us — we answer 24/7."
          : "In a hurry? Call us directly and reach a real technician, day or night."}
      </p>
    </form>
  );
}
