/**
 * Selected Google reviews, from the client's review export.
 *
 * RULES for this file:
 *  - `body` is the customer's wording exactly as written — typos, spacing and
 *    punctuation included. Do not tidy it up.
 *  - The export truncates many reviews at "… More". `truncated: true` marks a
 *    review where we only have the visible part; it renders with a trailing
 *    ellipsis. Never complete a truncated sentence.
 *  - No dates (the export only has relative ones like "a month ago").
 *  - `rating` comes from the client's Google profile (all 10 are 5-star; the
 *    export itself has no ratings). It is rendered as stars on every card —
 *    marked-up ratings must be visible on the page.
 *  - Each review gets individual Review JSON-LD (reviewsJsonLd in schema.tsx).
 *    reviewBody is exactly the visible text, ellipsis included.
 *  - NO AggregateRating until we have the business's real overall rating and
 *    total review count from its Google profile. It must reflect every
 *    review, not just these ten, and be shown on the page.
 *    TODO: client to confirm — "ratingValue X.X, reviewCount N".
 *
 * Mix: repair, full install, maintenance, duct work, commercial, and two
 * where we fixed what other contractors couldn't diagnose.
 */
export type CustomerReview = {
  name: string;
  body: string;
  truncated?: boolean;
  /** Star rating from the Google profile, 1–5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** What the job was, for our own sorting — not rendered. */
  job: "repair" | "install" | "maintenance" | "duct" | "commercial" | "general";
};

export const reviews: CustomerReview[] = [
  {
    name: "Gary Kelly",
    rating: 5,
    job: "repair",
    body: "We received excellent service from a knowledgeable staff. We had a tricky A/C issue that several other contractors failed to diagnose correctly, but they got it fixed. I highly recommend these guys.",
  },
  {
    name: "Keith Peterson",
    rating: 5,
    job: "install",
    truncated: true,
    body: "Will and his crew were top notch, My old AC unit died gave them a call. they were out right away. replaced in one day. very reasonable price. he even fashioned an aluminum shrouding so it would hook up tight with my old ductwork with no extra charge. I would give more stars if I could.",
  },
  {
    name: "Kim Cerino",
    rating: 5,
    job: "general",
    body: "They did a great job for a very reasonable amount! Fast response and Dawn in the office was on top of everything! They are a well oiled machine. I felt sorry they had to be out there in 96° heat! Well done guys! Will use you from now on!",
  },
  {
    name: "Alexandria Johnson",
    rating: 5,
    job: "commercial",
    truncated: true,
    body: "William is efficient and always helps our business out in a pinch. We are grateful for the great work he does. Great company, definitely recommend",
  },
  {
    name: "Jennifer Katches",
    rating: 5,
    job: "duct",
    body: "William came out today to clean my air ducts, perform maintenance, and improve the filtration system. He also sealed one of my ducts that the original installers failed to do. He showed me the dust he pulled out of the vents. I’m so happy… my house feels much fresher now. He did an excellent job!",
  },
  {
    name: "Sean Donahoo",
    rating: 5,
    job: "repair",
    truncated: true,
    body: "Highly recommend this company. William is very knowledgeable and trustworthy. Took the time to listen and fix our problems that 3 other AC companies could not troubleshoot.",
  },
  {
    name: "Maureen Calderaro",
    rating: 5,
    job: "install",
    truncated: true,
    body: "William & his staff installed a complete A/C system & they did an amazing job. Their professionalism & quality of work was excellent! They were respectful of my home and cleaned up after the job. Communication was excellent throughout the whole process. Thanks again!",
  },
  {
    name: "Todd Corey",
    rating: 5,
    job: "maintenance",
    body: "Michael was great. New home owner , we needed a tune up and other maintenance work. Michael was honest and explained what had to be done at a very fair price . He was very thorough and took the time to explain how to do some simple preventative work in the future .Highly recommend American Air Authorities and Michael.",
  },
  {
    name: "Butch Oxendine",
    rating: 5,
    job: "repair",
    body: "Very professional. Thorough! Found a Freon leak and was hurting cooling and efficiency. Drive up my electric cost so fixing it was great. Will save me money! The part was under warranty so just paid for labor. Impressive knowledge and did a lot more than any air company I’ve had in 30 years of owning my home. Thank you.",
  },
  {
    name: "Elena Correia",
    rating: 5,
    job: "general",
    truncated: true,
    body: "The best company in all of Tampa!!! Will, Bo, and Dawn are an absolute dream to work with. They are all professional, very knowledgeable, timely and consistent!",
  },
];

/** The client's Google Business Profile (Maps listing by CID). */
export const googleReviewsUrl = "https://www.google.com/maps?cid=5377265067923968222";
