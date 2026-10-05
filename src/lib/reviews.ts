/**
 * Selected Google reviews, from the client's review export.
 *
 * RULES for this file:
 *  - `body` is the customer's wording exactly as written — typos, spacing and
 *    punctuation included. Do not tidy it up.
 *  - The export truncates many reviews at "… More". `truncated: true` marks a
 *    review where we only have the visible part; it renders with a trailing
 *    ellipsis. Never complete a truncated sentence.
 *  - No dates (the export only has relative ones like "a month ago") and no
 *    star ratings (the export doesn't include them).
 *    TODO: client to confirm — ratings for these reviews, if we want stars.
 *  - No Review / AggregateRating JSON-LD: Google's guidelines don't allow
 *    marking up reviews copied from another site (these are Google reviews),
 *    and a business's own LocalBusiness review stars aren't shown anyway.
 *
 * Mix: repair, full install, maintenance, duct work, commercial, and two
 * where we fixed what other contractors couldn't diagnose.
 */
export type CustomerReview = {
  name: string;
  body: string;
  truncated?: boolean;
  /** What the job was, for our own sorting — not rendered. */
  job: "repair" | "install" | "maintenance" | "duct" | "commercial" | "general";
};

export const reviews: CustomerReview[] = [
  {
    name: "Gary Kelly",
    job: "repair",
    body: "We received excellent service from a knowledgeable staff. We had a tricky A/C issue that several other contractors failed to diagnose correctly, but they got it fixed. I highly recommend these guys.",
  },
  {
    name: "Keith Peterson",
    job: "install",
    truncated: true,
    body: "Will and his crew were top notch, My old AC unit died gave them a call. they were out right away. replaced in one day. very reasonable price. he even fashioned an aluminum shrouding so it would hook up tight with my old ductwork with no extra charge. I would give more stars if I could.",
  },
  {
    name: "Kim Cerino",
    job: "general",
    body: "They did a great job for a very reasonable amount! Fast response and Dawn in the office was on top of everything! They are a well oiled machine. I felt sorry they had to be out there in 96° heat! Well done guys! Will use you from now on!",
  },
  {
    name: "Alexandria Johnson",
    job: "commercial",
    truncated: true,
    body: "William is efficient and always helps our business out in a pinch. We are grateful for the great work he does. Great company, definitely recommend",
  },
  {
    name: "Jennifer Katches",
    job: "duct",
    body: "William came out today to clean my air ducts, perform maintenance, and improve the filtration system. He also sealed one of my ducts that the original installers failed to do. He showed me the dust he pulled out of the vents. I’m so happy… my house feels much fresher now. He did an excellent job!",
  },
  {
    name: "Sean Donahoo",
    job: "repair",
    truncated: true,
    body: "Highly recommend this company. William is very knowledgeable and trustworthy. Took the time to listen and fix our problems that 3 other AC companies could not troubleshoot.",
  },
  {
    name: "Maureen Calderaro",
    job: "install",
    truncated: true,
    body: "William & his staff installed a complete A/C system & they did an amazing job. Their professionalism & quality of work was excellent! They were respectful of my home and cleaned up after the job. Communication was excellent throughout the whole process. Thanks again!",
  },
  {
    name: "Todd Corey",
    job: "maintenance",
    body: "Michael was great. New home owner , we needed a tune up and other maintenance work. Michael was honest and explained what had to be done at a very fair price . He was very thorough and took the time to explain how to do some simple preventative work in the future .Highly recommend American Air Authorities and Michael.",
  },
  {
    name: "Butch Oxendine",
    job: "repair",
    body: "Very professional. Thorough! Found a Freon leak and was hurting cooling and efficiency. Drive up my electric cost so fixing it was great. Will save me money! The part was under warranty so just paid for labor. Impressive knowledge and did a lot more than any air company I’ve had in 30 years of owning my home. Thank you.",
  },
  {
    name: "Elena Correia",
    job: "general",
    truncated: true,
    body: "The best company in all of Tampa!!! Will, Bo, and Dawn are an absolute dream to work with. They are all professional, very knowledgeable, timely and consistent!",
  },
];

/**
 * TODO: client to confirm — replace with the Google Business Profile's direct
 * reviews link (Profile → "Read reviews" / share link). This Maps search is a
 * stand-in that lands on the listing.
 */
export const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=American+Air+Authorities+Tampa+FL";
