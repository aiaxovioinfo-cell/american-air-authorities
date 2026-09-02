/**
 * Service-area cities. Each drives a /service-area/[slug] page from one
 * template. The goal is genuinely local content per city — real
 * neighborhoods, real housing stock, and the HVAC implications that follow
 * from them — not a template with the name swapped.
 *
 * GROUND RULES for this file:
 *  - No invented local facts. Neighborhood names are real areas; housing-era
 *    statements are kept to broadly documented generalities ("built out
 *    largely in the 1980s", "mostly post-2000 construction").
 *  - HVAC engineering implications are ours to state.
 *  - Anything the client should verify or localize further carries a
 *    `TODO: client to confirm` on the relevant field.
 */

export type CityFaq = { q: string; a: string };

export type City = {
  slug: string;
  name: string;
  county: "Hillsborough" | "Pasco";
  /** ≤160 chars. Card text on the homepage + /service-area grid. */
  blurb: string;
  /** Unique 2–3 sentence page intro. Never shared between cities. */
  intro: string;
  /**
   * Real named neighborhoods / subdivisions in this area.
   * TODO: client to confirm coverage list — add or trim to the areas the
   * crew actually services and remove any that are out of range.
   */
  neighborhoods: string[];
  /**
   * Local housing stock and what it means for HVAC here (~90–140 words).
   * TODO: client to confirm local specifics (build eras, common equipment).
   */
  housing: string;
  /** Climate / geography / equipment-siting specifics for this area (~80–120 words). */
  local: string;
  /** City-specific Q&A — 3–4 entries. Answered with local context. */
  faqs: CityFaq[];
};

export const cities: City[] = [
  {
    slug: "tampa",
    name: "Tampa",
    county: "Hillsborough",
    blurb:
      "From the 1920s bungalows of Seminole Heights to downtown condos, we keep the city cool through every August storm.",
    intro:
      "Tampa is really a dozen housing markets in one, and an AC that works in a new Westshore townhome is sized and installed nothing like the one that belongs in a 1925 Seminole Heights bungalow. We work across all of it — the historic core, the mid-century blocks, and the newer infill — and we quote each house on what it actually needs.",
    neighborhoods: [
      "Seminole Heights",
      "Tampa Heights",
      "Hyde Park",
      "Davis Islands",
      "Palma Ceia",
      "Riverside Heights",
      "Ybor City",
      "VM Ybor",
      "Forest Hills",
      "Sulphur Springs",
    ],
    housing:
      "The bungalow belt — Seminole Heights, Tampa Heights, parts of Hyde Park — is full of 1920s and 1930s homes with ductwork that was added decades after the house was built, run through hot attics, and often fed by a single undersized return. That is the usual reason one room bakes while the next is fine. Many of these homes also have electrical panels that need attention before a modern condenser goes in. Elsewhere you have 1950s–70s concrete-block ranches with their original duct layouts, and downtown a growing stock of condos and townhomes where the work is association-coordinated and access is tight.",
    local:
      "Downtown and the close-in neighborhoods sit in an urban heat island, so west- and south-facing units carry a heavier afternoon load than the same equipment would in the suburbs. Lots are small: condensers get wedged against the house, a fence, or a neighbor's wall with too little clearance for airflow and service, which shortens their life. In the low areas near the river and the bay — Davis Islands, parts of Hyde Park — flood-zone rules push air handlers into garages and closets rather than onto a slab.",
    faqs: [
      {
        q: "My Seminole Heights bungalow has one return and the back bedrooms never cool — is that fixable?",
        a: "Usually, yes. A single central return can't pull enough air from rooms with their doors closed, so the system starves those rooms. We look at adding returns or transfer paths and at whether the existing ducts are the right size before anyone talks about a bigger unit.",
      },
      {
        q: "Can you put a modern system in a 1920s Tampa house without tearing it apart?",
        a: "In most cases. We run a load calculation for the actual house — insulation, windows, shade — and look at whether the existing duct runs can be reused or sealed. Where original ducts won't work, a compact or ducted-mini-split layout often fits historic homes with minimal disruption.",
      },
      {
        q: "My condenser is jammed against the fence. Does that matter?",
        a: "It does. A condenser rejects heat through the top and sides; blocked clearance makes it run hotter, use more power, and wear out sooner. We'll tell you if yours has room to breathe and what relocating it would involve.",
      },
      {
        q: "Do you handle condo and townhome work downtown?",
        a: "Yes, including buildings that require scheduling through an association or HOA. Tell us the building when you call so we can plan access.",
      },
    ],
  },
  {
    slug: "new-tampa",
    name: "New Tampa",
    county: "Hillsborough",
    blurb:
      "Our home base off Amberly Drive. Master-planned neighborhoods full of two-story homes with builder systems now reaching end of life.",
    intro:
      "New Tampa is where our shop is based, and most of it went up between the mid-1990s and the late 2000s — Tampa Palms, Hunter's Green, Cross Creek, Live Oak Preserve. The two-story production homes here were built with builder-grade single-stage systems, and a lot of those systems are now 15 to 25 years old and asking to be replaced rather than repaired again.",
    neighborhoods: [
      "Tampa Palms",
      "Hunter's Green",
      "Cross Creek",
      "Live Oak Preserve",
      "K-Bar Ranch",
      "Arbor Greene",
      "Grand Hampton",
      "Heritage Isles",
      "Pebble Creek",
      "Easton Park",
    ],
    housing:
      "The typical New Tampa house is a two-story built 15–25 years ago on one system, or on a two-zone setup that was never balanced properly. That's why the upstairs runs five to eight degrees warmer than the thermostat downstairs on a hot afternoon. The original equipment was chosen to hit a price point, not matched to the house, so when it fails we look at whether a right-sized, staged replacement with a real duct balance will fix the comfort problem — not just swap in another box the same size.",
    local:
      "The area is heavily wooded — Live Oak Preserve, the Flatwoods conservation land, mature landscaping in the older sections — so outdoor coils pick up pollen, leaf litter, and organic film faster than they would on an open lot, and drain lines grow algae. Retention ponds and conservation buffers keep humidity up. Most communities also have HOA rules about screening the condenser and where it can sit, which we match when we replace equipment.",
    faqs: [
      {
        q: "Upstairs is always hotter than downstairs. Do I need zoning or a second system?",
        a: "It depends on how the house is ducted. If one system feeds both floors, adding a properly designed zone with a damper and a second thermostat often solves it. If the ducts upstairs are undersized, that has to be addressed too. We'll measure airflow before recommending either.",
      },
      {
        q: "My builder system is about 18 years old. Repair or replace?",
        a: "At that age, with a major failure like a compressor or coil leak, replacement usually wins — parts for older units are pricier and less available, and a new system will cut your summer bills. For a small failure like a capacitor, we just fix it.",
      },
      {
        q: "Will a new outdoor unit meet my HOA's screening rules?",
        a: "Yes. Tell us the community and we'll set the new condenser to match the existing screening or fencing requirement.",
      },
      {
        q: "Why does my outdoor coil clog so quickly out here?",
        a: "The tree canopy. We can add a maintenance visit to rinse the coil and clear the drain before peak season, which is cheaper than a mid-July no-cool call.",
      },
    ],
  },
  {
    slug: "south-tampa",
    name: "South Tampa",
    county: "Hillsborough",
    blurb:
      "Historic Hyde Park bungalows next door to brand-new three-story rebuilds, plus salt air near the bay. Two very different HVAC problems.",
    intro:
      "South Tampa has split into two housing types that need opposite things from an HVAC contractor. The 1920s–40s bungalows and Mediterranean homes in Hyde Park, Palma Ceia, and Virginia Park have tight attics, undersized ducts, and additions the original system was never meant to reach. The teardown-and-rebuild new construction going up all over the same streets has the reverse problem — often an oversized system in a tight, spray-foamed envelope that short-cycles and leaves the house clammy.",
    neighborhoods: [
      "Hyde Park",
      "Historic Hyde Park",
      "SoHo",
      "Palma Ceia",
      "Bayshore Beautiful",
      "Sunset Park",
      "Beach Park",
      "Virginia Park",
      "Golf View",
      "Ballast Point",
    ],
    housing:
      "In the older homes, the work is usually about airflow: original ducts that are too small, no return path from the added-on rooms, and an attic air handler with no room to service it. Right-sizing and duct correction matter more than raw tonnage. In the new builds, the envelope is far tighter than the rule-of-thumb sizing the system was picked with, so a 4- or 5-ton unit satisfies temperature in a few minutes, shuts off before it removes any humidity, and the house feels cool but damp. A staged or variable-capacity system matched to the real load is the fix.",
    local:
      "The neighborhoods along the water — Beach Park, Sunset Park, Bayshore Beautiful — get salt-laden air that corrodes standard condenser coils and cabinets. Coastal coil coatings and a corrosion-resistant cabinet are worth specifying that close to the bay. Flood zone also drives design: in an AE zone the air handler may need to be elevated rather than sitting low in a garage, and we check the zone before locating equipment.",
    faqs: [
      {
        q: "How long does a condenser last near Bayshore with the salt air?",
        a: "A standard unit can lose years to coil and cabinet corrosion that close to the water. We spec coastal-rated coils and cabinets for homes near the bay, and a yearly coil rinse helps a lot.",
      },
      {
        q: "Can you cool a new addition off my existing 1926 bungalow system?",
        a: "Sometimes, if the system has capacity to spare and we can get properly sized duct to the new space. Often the cleaner answer for a rear addition is a dedicated mini-split zone, so you're not fighting the original ductwork.",
      },
      {
        q: "The builder put a 5-ton in our new house and it feels humid. Is it oversized?",
        a: "Very possibly. Tight new construction needs less capacity than older sizing rules assume. We can measure run times and humidity and run a load calc; if it's oversized, a staged system or a smaller properly matched unit will dehumidify far better.",
      },
      {
        q: "We're in a flood zone. Where should the air handler go?",
        a: "That depends on your flood zone designation. In higher-risk zones the air handler and connections may need to be elevated. We check the zone and set the equipment to meet it.",
      },
    ],
  },
  {
    slug: "brandon",
    name: "Brandon",
    county: "Hillsborough",
    blurb:
      "1980s and 90s neighborhoods where a lot of systems are on their second compressor and past the point where another repair makes sense.",
    intro:
      "Brandon filled in heavily through the 1980s and 90s, and a large share of the AC systems here are now well into their second decade — second compressor, aging refrigerant lines, dropping efficiency. In Bloomingdale, Providence Lakes, and the neighborhoods off Lumsden and Bell Shoals, the honest conversation is often about replacement timing, not another patch on a system that's telling you it's done.",
    neighborhoods: [
      "Bloomingdale",
      "Providence Lakes",
      "Brandon Estates",
      "Lakeview Village",
      "Sterling Ranch",
      "Heather Lakes",
      "Peppermill",
    ],
    housing:
      "The common Brandon system is a builder unit from the late 80s or 90s that's had a compressor or a coil replaced already. Some are still running R-22, the refrigerant that's no longer produced — a leak in one of those means an expensive recharge or a partial rebuild that rarely pencils out. Original attic ductwork from that era is often crushed flex with boots that have pulled loose, so the house has quietly lost 10–20% of its airflow. We measure that before quoting, because sometimes a duct repair buys real years and sometimes it's throwing money at a system that should be replaced.",
    local:
      "Brandon's older streets have a lot of mature tree canopy, which is good for the roof load and hard on outdoor equipment — leaf litter packs the coil and drops seeds into the drain pan. Homes on well water pick up mineral scale on the outdoor coil. Most lots have room to relocate a badly placed condenser if airflow clearance is the problem.",
    faqs: [
      {
        q: "My system uses R-22 / Freon. What does that mean for a repair?",
        a: "R-22 hasn't been produced since 2020, so what's left is expensive and getting more so. A small non-refrigerant repair is still fine. But a refrigerant leak on an R-22 system usually means paying a lot to refill a system that will leak again — that's the point where replacement makes sense.",
      },
      {
        q: "I've had three repairs in two summers. When do I stop?",
        a: "When the repairs start clustering and the unit is 12-plus years old, you're paying to keep a losing system alive. We'll give you a straight repair-versus-replace number so you can decide with real figures, not a sales pitch.",
      },
      {
        q: "Is the original ductwork in my 1988 house worth resealing?",
        a: "Often yes — sealing leaks and reconnecting pulled boots can restore lost airflow for a fraction of a full replacement. We'll tell you if yours is a candidate or if it's too far gone.",
      },
      {
        q: "How fast can you get to Bloomingdale on a no-cool call?",
        a: "We hold same-day slots for no-cool emergencies and run calls seven days a week, 7 AM to 10 PM EST.",
      },
    ],
  },
  {
    slug: "riverview",
    name: "Riverview",
    county: "Hillsborough",
    blurb:
      "Two eras side by side — 2000s builder homes needing their first replacement, and post-2015 subdivisions already fighting humidity.",
    intro:
      "Riverview has grown in waves, and it shows in the HVAC work. The late-90s and 2000s homes in Rivercrest and Summerfield are reaching first-replacement age. The newer subdivisions — Triple Creek, South Fork, Lucaya Lake — are only a few years old but were built on former farmland with single-stage systems sized by rule of thumb, and a lot of those homeowners are already calling about a house that cools but stays damp.",
    neighborhoods: [
      "Panther Trace",
      "Summerfield",
      "Rivercrest",
      "South Fork",
      "Triple Creek",
      "Winthrop",
      "Lucaya Lake Club",
      "Boyette Farms",
    ],
    housing:
      "In the older Riverview neighborhoods the systems are 15–25 years old, single-stage, and near the end of a normal service life — the usual first-replacement candidates. In the newer builds the equipment is young but frequently oversized for the house: it hits the thermostat setpoint fast, shuts off before it wrings any moisture out of the air, and the home sits at 74° and 60%-plus humidity. A properly sized system, or a two-stage one that runs longer at lower capacity, is what actually dries the house out.",
    local:
      "Riverview is low and flat with wetlands and retention ponds threaded through nearly every community, so the latent (humidity) load is high year-round. Many of the newer subdivisions have almost no mature shade yet, which puts a full afternoon sun load on west-facing units and rooms. Both point the same direction: run-time and sizing matter more here than headline SEER numbers.",
    faqs: [
      {
        q: "My house is only six years old. Why is it already humid?",
        a: "Usually because the system is oversized for a tight newer house. It cools the air quickly and shuts off before it removes moisture. We can check run times and indoor humidity and, if that's the cause, fix it with staging or a right-sized unit rather than a dehumidifier band-aid.",
      },
      {
        q: "My builder warranty is about to run out. What should I have checked?",
        a: "Refrigerant charge, airflow across the coil, the drain and safety switch, electrical connections, and whether the system was actually sized for the house. We document what we find so you have leverage while the warranty still applies.",
      },
      {
        q: "Can you tell whether my system was sized correctly?",
        a: "Yes. We run a load calculation for your specific house and compare it to the installed capacity. Oversizing is extremely common in production homes and it's the root cause of most humidity complaints.",
      },
      {
        q: "My west-facing unit in Triple Creek runs all afternoon. Is that normal?",
        a: "Long afternoon run times on the sunny side of a new, unshaded house are normal and actually good for humidity — as long as the house is holding temperature. If it's running constantly and losing ground, that's a sizing, charge, or airflow problem worth a look.",
      },
    ],
  },
  {
    slug: "wesley-chapel",
    name: "Wesley Chapel",
    county: "Pasco",
    blurb:
      "Newer master-planned communities off SR-56 where tight, unshaded houses make right-sizing and humidity control the whole game.",
    intro:
      "Wesley Chapel is one of the newest parts of the metro — Seven Oaks, Meadow Pointe, Union Park, Epperson with its lagoon — and most of it was built after 2000 on former pasture along SR-56. The homes are tighter and better sealed than older Tampa Bay housing, which sounds good until an oversized builder system short-cycles and never pulls the humidity down. That's the call we get most often out here.",
    neighborhoods: [
      "Seven Oaks",
      "Meadow Pointe",
      "Union Park",
      "Epperson",
      "Watergrass",
      "Persimmon Park",
      "The Ridge at Wiregrass",
      "Country Walk",
      "Lexington Oaks",
      "Quail Hollow",
    ],
    housing:
      "The typical Wesley Chapel home is post-2000, often post-2010, with a 14–15 SEER builder heat pump and a two-story floor plan that gains heat upstairs through the afternoon. Because the building envelope is relatively tight, a system sized by the old rules is usually too big: it satisfies the thermostat in a few minutes, cycles off, and the interior humidity climbs. Right-sizing on a real load calculation, and choosing equipment that can run at a lower stage for longer, is what keeps these houses at a comfortable 75–76° without feeling swampy.",
    local:
      "The SR-56 corridor was open pasture until recently, so tree cover is minimal and solar load on roofs and west walls is high. Summers bring heavy humidity and daily convective storms. Newer, tighter homes don't leak that moisture out on their own the way an older house does, so the AC has to do all the dehumidification — which again comes back to run time and correct sizing rather than brute tonnage.",
    faqs: [
      {
        q: "My newer house in Seven Oaks short-cycles. Is the system too big?",
        a: "Frequently, yes. Short cycles on a tight newer home almost always mean oversized equipment. We verify with run-time and humidity measurements and a load calc before recommending anything.",
      },
      {
        q: "Heat pump or straight AC for a Wesley Chapel home?",
        a: "A heat pump makes sense here. Winters are mild, so a heat pump covers heating cheaply most days, with electric backup heat for the few cold mornings. Most homes in the area already have one.",
      },
      {
        q: "The second floor in my Meadow Pointe house can't keep up. What are the options?",
        a: "Depending on the ductwork: adding a properly designed upstairs zone, correcting undersized supply runs, or in some layouts a dedicated system for the second floor. We measure airflow room by room before recommending one.",
      },
      {
        q: "How humid should the house feel at 76 degrees?",
        a: "Indoor relative humidity in the low 50s or below feels comfortable at 76°. If you're at 76° and it still feels sticky, the system isn't running long enough to dehumidify — usually a sizing or airflow issue.",
      },
    ],
  },
  {
    slug: "lutz",
    name: "Lutz",
    county: "Hillsborough",
    blurb:
      "Lakefront lots and larger semi-custom homes where a load calculation matters and a bigger unit is not the answer.",
    intro:
      "Lutz spreads out over lakes and larger lots, and the homes tend to be bigger and more custom than the production housing to the south — higher ceilings, more glass, gated communities like Cheval. On a house like that, guessing the system size a ton high leaves you with a cold, clammy home, so a real load calculation earns its keep here more than almost anywhere in our area.",
    neighborhoods: [
      "Cheval",
      "Lakeshore Ranch",
      "Ladera",
      "Sanctuary on Livingston",
      "Calusa Trace",
      "Van Dyke Farms",
      "Willow Bend",
      "Heritage Harbor",
    ],
    housing:
      "Lutz homes often have volume ceilings, large window walls, and open plans that behave very differently from a boxy production home — the load swings hard between a shaded morning and a west-glass afternoon. That's exactly the situation where oversized equipment short-cycles and under-dehumidifies. Many properties also have a detached garage, guest suite, or pool bath that's either starved by the main system or running on its own aging mini-split. We size the main system to the calculated load and handle the outbuildings as their own small zones.",
    local:
      "Lakefront humidity is real, and lawn irrigation drawn from a well or a lake throws mineral-laden overspray onto outdoor coils, leaving white scale that insulates the coil and cuts capacity. Gated and acreage properties — Cheval especially — mean we coordinate gate access and longer equipment hauls when we replace a system. Homes along the older Van Dyke and Lutz-Lake Fern corridors tend to have 1990s systems on borrowed time, while the newer sections off the Suncoast Parkway are tight builds with the usual oversizing questions. Acreage homes here often run a whole-house generator, and we make sure the AC's electrical load and start-up draw are accounted for in that transfer setup.",
    faqs: [
      {
        q: "We were quoted a 5-ton for our Cheval home. How do you decide the size?",
        a: "With a room-by-room load calculation: square footage, ceiling volume, window area and orientation, insulation, and shade. On big open-plan homes the honest number is often smaller than a quick quote assumes, and the smaller right-sized system will dehumidify far better.",
      },
      {
        q: "Our lake house feels muggy even when the thermostat says it's cool. Why?",
        a: "The system is reaching temperature before it removes enough moisture — common with oversized equipment near the water. A staged or variable-speed system that runs longer at low capacity fixes it.",
      },
      {
        q: "Guest house and pool bath — separate system or extend the main one?",
        a: "Usually a small dedicated system or mini-split. Stretching the main system's ductwork to an outbuilding tends to rob the main house and never satisfies the addition.",
      },
      {
        q: "There's white scale building up on the outdoor coil. Is that the sprinklers?",
        a: "Almost certainly. Irrigation overspray from well or lake water leaves mineral deposits that choke airflow through the coil. We can clean it and help you adjust the sprinkler throw so it stops.",
      },
    ],
  },
  {
    slug: "carrollwood",
    name: "Carrollwood",
    county: "Hillsborough",
    blurb:
      "Original Carrollwood dates to the 1960s and the Village to the 70s — a lot of homes on their second or third system under heavy oak canopy.",
    intro:
      "Carrollwood is one of Tampa's older suburbs — Original Carrollwood goes back to the 1960s, Carrollwood Village to the 1970s and 80s. Many homes here are on their second or third AC system, still using the original refrigerant lines and undersized return ducts, and shaded by mature oaks that are hard on outdoor equipment. We find the real fault before quoting a full replacement, because on a house this age it's not always the obvious answer.",
    neighborhoods: [
      "Original Carrollwood",
      "Carrollwood Village",
      "Lake Carroll",
      "Village XVII",
      "North Lakes",
      "Emerald Forest",
      "Whitaker Oaks",
    ],
    housing:
      "The classic Carrollwood system is a builder unit that's been replaced once or twice, reusing a lineset and ductwork from the 60s or 70s. Those older ducts often have a single small return, so the system can't move the air a modern unit expects, and the house has hot and cold rooms regardless of what's on the pad outside. Some homes still have original single-pane windows driving the load up. We check the ducts, the return sizing, and the lineset condition before recommending a replacement — sometimes correcting those is what actually fixes the comfort complaint.",
    local:
      "The oak canopy that makes Carrollwood shady also drops leaves, catkins, and organic debris onto condenser coils and into drain pans, where it turns into algae and clogs the line. Older slab homes here typically have the air handler in a hall closet with barely enough room to open the door, which affects what replacement equipment will physically fit.",
    faqs: [
      {
        q: "Our 1972 Carrollwood Village house — cheaper to keep fixing or replace?",
        a: "We'll give you the actual numbers both ways. If the system is on its original compressor and hitting 15-plus years with a major failure, replacement usually wins on total cost once you count the efficiency gain. Minor repairs on an otherwise healthy unit, we just do.",
      },
      {
        q: "Can you reuse my existing lineset and ductwork?",
        a: "Sometimes. A lineset in good condition can often be flushed and reused; ducts can sometimes be sealed and re-returned. We inspect both and tell you honestly what's reusable and what isn't.",
      },
      {
        q: "The drain line keeps clogging under the oaks. Is there a permanent fix?",
        a: "We can add a proper trap and cleanout, treat the pan, and put you on a maintenance visit that clears the line before summer. That's far cheaper than the water damage a blocked drain causes.",
      },
      {
        q: "The air handler is in a hall closet. Will a new one fit?",
        a: "We measure the closet before quoting. Modern air handlers vary in footprint, and there are low-profile and horizontal options if space is tight.",
      },
    ],
  },
  {
    slug: "temple-terrace",
    name: "Temple Terrace",
    county: "Hillsborough",
    blurb:
      "A 1920s-platted city built out mid-century, plus a large rental belt near USF where maintenance tends to get deferred.",
    intro:
      "Temple Terrace was laid out in the 1920s around its golf course and built out heavily through the 1950s, 60s, and 70s. The result is a lot of concrete-block ranch homes with original duct layouts and older electrical, plus — near USF — a large stock of rental houses where maintenance has usually been put off. Both need a contractor who diagnoses honestly and quotes flat-rate.",
    neighborhoods: [
      "Theodore Roosevelt area",
      "Raintree",
      "Woodmont",
      "Grovewood",
      "Terrace Oaks",
      "Whiteway Estates",
      "the USF rental belt",
    ],
    housing:
      "The mid-century core homes typically have their original duct trunk in the attic, one or two returns, and a panel that may need a load evaluation before a new condenser goes on. On the rental side, we're often called to a system that simply hasn't been serviced in years: the coil is packed solid, the blower wheel is caked, the drain is overflowing, and the unit 'runs but doesn't cool' because airflow and heat transfer have both collapsed. Frequently a thorough cleaning and a few parts bring it back; sometimes it's genuinely finished.",
    local:
      "The Hillsborough River wraps the city, so homes near the water fall in flood zones that affect where an air handler can sit. Mature landscaping shades roofs but feeds debris into outdoor coils. For rental properties we give owners a clear, lasting fix rather than the cheapest possible stopgap that fails again mid-lease.",
    faqs: [
      {
        q: "I'm a landlord here. What's the most cost-effective fix that actually lasts a lease?",
        a: "Usually a proper cleaning and the specific failed parts, plus fixing whatever caused the failure — a clogged drain, a dirty coil, a bad capacitor. We tell you when a system is worth maintaining and when you're better off replacing it before it strands a tenant.",
      },
      {
        q: "My 1961 ranch has the original ducts. Reseal or replace?",
        a: "If the trunk and branches are intact metal or sound flex, sealing and adding return capacity often restores performance affordably. If it's brittle, undersized, or full of disconnected boots, replacement is the better spend. We measure airflow first.",
      },
      {
        q: "A tenant says the AC 'runs but doesn't cool.' What does that usually mean?",
        a: "Most often a badly clogged coil or blower, low refrigerant from a leak, or a failing compressor. We diagnose which it is and give you a flat-rate price to fix it — no guessing.",
      },
      {
        q: "We're near the river in a flood zone. Can the air handler stay in the garage?",
        a: "It depends on your flood zone designation. In higher-risk zones the equipment may need to be elevated. We check before we set anything.",
      },
    ],
  },
  {
    slug: "valrico",
    name: "Valrico",
    county: "Hillsborough",
    blurb:
      "Mature Bloomingdale and River Hills neighborhoods that lean on their AC eight months a year, many on a first or second replacement.",
    intro:
      "Valrico's established neighborhoods — Bloomingdale, the gated River Hills golf community, Diamond Hill — are mostly 20 to 30 years old, and their systems run hard eight months a year. A lot of them are at first- or second-replacement age, and the two-story plans with a bonus room over the garage have their own predictable comfort complaint.",
    neighborhoods: [
      "Bloomingdale",
      "River Hills",
      "Diamond Hill",
      "Copper Ridge",
      "Twin Lakes",
      "Buckhorn",
      "Rose Tree",
    ],
    housing:
      "Most Valrico homes are 1980s–2000s suburban builds on their first or second AC system. The recurring issue is the bonus room or fourth bedroom over the garage: it's the hottest space in the house because it's surrounded by unconditioned attic and garage, and it's usually fed by one long undersized duct run. Pool homes add another wrinkle — the pool pump and the AC condenser sometimes share a stressed electrical circuit. We check the panel and the duct to that hot room before assuming the whole system is undersized.",
    local:
      "Valrico is more open than the older oak-canopy suburbs, so roofs and west walls take more direct sun, and the cooling season here effectively runs from March into November. Homes on well water get mineral scale on the outdoor coil that cuts capacity over time. River Hills is gated, so we coordinate gate access for service and equipment delivery. The rapid growth out toward Lithia and FishHawk has pulled a lot of contractor capacity east, which is part of why a same-day no-cool call in Valrico can be hard to get from the bigger companies in peak summer — we hold slots for it.",
    faqs: [
      {
        q: "Our River Hills system is 22 years old and still 'fine.' Should I get ahead of it?",
        a: "A 22-year-old system is on borrowed time and running at maybe two-thirds of a modern unit's efficiency. Planning the replacement now — off-season, on your schedule — beats an emergency swap during a July heat wave. We can lay out the numbers so you decide.",
      },
      {
        q: "The pool pump and the AC seem to be on the same circuit. Is that a problem?",
        a: "It can be, if the circuit is undersized for both starting loads. We check the panel and the breaker sizing and tell you whether it needs to be separated.",
      },
      {
        q: "The bonus room over the garage never cools. What are the options?",
        a: "Improving the duct run and return to that room, adding a small dedicated zone, or in some cases a mini-split for that space. It's usually a duct and insulation problem, not a whole-system one.",
      },
      {
        q: "How often should a system be serviced if it runs eight months a year?",
        a: "Twice a year — once before cooling season and once mid-season — keeps the coil clean, the drain clear, and the charge correct, which is what prevents most peak-summer breakdowns.",
      },
    ],
  },
  {
    slug: "odessa",
    name: "Odessa",
    county: "Pasco",
    blurb:
      "Acreage properties with guest houses and workshops on multiple systems, almost all on private wells that scale the coils.",
    intro:
      "Odessa keeps its rural-estate character — larger homes on acre-plus lots around Keystone and the Eagles, often with a guest house, a detached garage, or a workshop, each on its own system. Starkey Ranch is the exception, a dense post-2015 community on the Pasco side. Nearly everyone out here is on a private well, which changes how the equipment ages.",
    neighborhoods: [
      "Keystone",
      "Ivy Lake Estates",
      "The Eagles",
      "Starkey Ranch",
      "Parker Pointe",
      "Grey Hawk at Lake Polo",
      "Van Dyke Farms",
    ],
    housing:
      "A typical Odessa property has two or three separate HVAC systems — main house, guest suite or in-law wing, and a mini-split or package unit on a garage or workshop — often of different ages and brands, installed years apart by different contractors. Keystone especially runs to larger equestrian and estate lots on well and septic, where the homes have volume ceilings, big west-facing glass, and long duct runs that make load calculations and proper zoning matter far more than raw tonnage. Starkey Ranch, on the Pasco side, is the opposite: dense post-2015 construction with tight envelopes and single-stage builder heat pumps that raise the same sizing and humidity questions we see across all newer subdivisions.",
    local:
      "Well water is the defining local factor: iron and hard minerals scale outdoor coils and clog condensate drains faster than city water does, so coil cleaning and drain maintenance need to happen more often here than in the city. Long gated or unpaved driveways and detached structures mean access planning, longer refrigerant linesets, and correct charge for those runs. Rural power lines see more voltage sag and surge activity in summer storms, so we check contactors, capacitors, and surge protection on service visits. Larger conditioned volumes across a property make multi-zone design and right-sizing each system more important than picking one big unit.",
    faqs: [
      {
        q: "There are three systems on our property. Can you maintain them all in one visit?",
        a: "Yes. We service every system on the property in a single scheduled visit and give you one written report covering all of them.",
      },
      {
        q: "Our well water is scaling the outdoor coil. What helps?",
        a: "Keeping irrigation overspray off the condenser, a periodic coil cleaning, and in some cases relocating the unit out of the sprinkler pattern. We can't change the water, but we can slow what it does to the coil.",
      },
      {
        q: "We're adding a workshop with an apartment. Mini-split or extend a system?",
        a: "For a detached structure, a dedicated mini-split is almost always the right call — efficient, independently controlled, and no long duct run stealing capacity from the main house.",
      },
      {
        q: "Is our Starkey Ranch builder system sized for all the west-facing glass?",
        a: "We can check. Builder sizing often doesn't fully account for large west window walls. A load calculation tells us whether the capacity and the duct to those rooms are right.",
      },
    ],
  },
  {
    slug: "land-o-lakes",
    name: "Land O' Lakes",
    county: "Pasco",
    blurb:
      "Far enough north that the big chains quote a multi-day wait in a heat wave. We answer the same day.",
    intro:
      "Land O' Lakes sits north of the Pasco line, split between established 1980s–90s homes around the Lake Padgett chain and large newer master-planned communities like Bexley and Connerton. It's far enough out that when a system quits in a heat wave, the regional chains often quote a multi-day wait — so we hold same-day slots for no-cool calls up here.",
    neighborhoods: [
      "Connerton",
      "Bexley",
      "Ballantrae",
      "Lake Padgett",
      "Stonegate",
      "Wilderness Lake Preserve",
      "Plantation Palms",
      "Sanders Farms",
    ],
    housing:
      "Two housing types, two sets of issues. The older homes around Lake Padgett and Plantation Palms are 25–35 years old with original ductwork and systems near the end of their life — first-replacement territory, often with lingering humidity from leaky duct in hot attics. The newer communities — Bexley, Connerton, Wilderness Lake — have tight envelopes and single-stage builder heat pumps that short-cycle and under-dehumidify when they're sized to the old rules. Right-sizing and staging is the fix on the new side; duct sealing and replacement on the old side.",
    local:
      "The area is dense with lakes and conservation land, so humidity load is high through the long cooling season. Along the older US-41 corridor there are pockets of manufactured and 1970s–80s block homes on well water, where scale on the coil and belly-duct issues are common; the master-planned west side is newer and tighter. Distance is the other factor — being at the north edge of most contractors' range is exactly why a no-cool call here can turn into a three-day wait, and why we keep capacity for same-day dispatch to Land O' Lakes seven days a week.",
    faqs: [
      {
        q: "How long does it take to get someone out to Land O' Lakes when it's 96 degrees?",
        a: "We hold same-day slots for no-cool emergencies and run calls seven days a week, 7 AM to 10 PM EST, including out here where the bigger companies often can't.",
      },
      {
        q: "My Bexley home short-cycles and stays humid. Is that the size?",
        a: "Usually. Tight newer homes need less capacity than standard sizing assumes; an oversized unit cools fast and quits before it dehumidifies. We verify with run-time and humidity readings and a load calc.",
      },
      {
        q: "Lake Padgett house with 1990s ductwork — worth sealing?",
        a: "Often yes. Sealing leaky attic duct recovers lost capacity and cuts the humidity those leaks pull in from the attic, and it costs a fraction of a full system. We'll assess whether yours is a candidate.",
      },
      {
        q: "My heat pump won't keep up on a cold morning. Is it broken?",
        a: "Not necessarily. Heat pumps lose output as it gets colder and rely on backup heat strips for the coldest hours. If the backup heat isn't engaging, that's a real fault worth diagnosing.",
      },
    ],
  },
  {
    slug: "seffner",
    name: "Seffner",
    county: "Hillsborough",
    blurb:
      "Unincorporated Hillsborough — older and manufactured homes on larger lots, plus small commercial off I-4 that can't lose a day.",
    intro:
      "Seffner is unincorporated Hillsborough east of Tampa, on the agricultural fringe that runs toward Dover and Plant City: older single-family and manufactured homes on larger lots around Mango and Kingsway, mixed with warehouses, shops, and small offices along the US-92 and Martin Luther King corridors near I-4. It's an area where flat-rate pricing matters — so the invoice matches the quote — and where a fair number of contractors won't touch the manufactured-home systems or the window units that still need replacing with central air.",
    neighborhoods: [
      "Mango",
      "Kingsway",
      "Parsons",
      "Billy Bowlegs",
      "Williams Point",
      "the US-92 / MLK commercial corridor",
    ],
    housing:
      "Seffner's housing runs from 1970s–90s concrete-block site-built homes on well water to manufactured and modular homes that need mobile-home-rated equipment — self-contained or specifically listed units and belly-duct repair — which many companies decline to service. We do. Some of the older block homes are still cooling with through-wall or window units and are ready to move to a proper central or ductless system, which means a load calculation and a new duct or line-set plan rather than a like-for-like swap. On the commercial side near I-4 it's mostly rooftop package units on shops and small warehouses, often past their service life and running on failing economizers and contactors. Rural lots frequently put the condenser a long way from the air handler, so line-set length and refrigerant charge have to be right.",
    local:
      "Well water is common, so mineral scale on outdoor coils and faster condensate-drain fouling are the norm here — regular coil rinsing and drain maintenance pay for themselves. Larger lots and detached workshops or barns mean outbuildings on their own systems and longer runs to reach them. For the businesses along the interstate, a down rooftop unit is lost revenue by the hour, so we schedule commercial work around the operating day and hold priority response for existing accounts.",
    faqs: [
      {
        q: "I have a manufactured / mobile home. Can you work on that system?",
        a: "Yes. Manufactured homes need mobile-home-rated equipment and often belly-duct repair, both of which we handle — it's work a lot of contractors turn down.",
      },
      {
        q: "Flat-rate pricing — will the invoice really match the quote?",
        a: "Yes. We diagnose the fault, quote the repair as a flat price, and that's what you pay. No hourly surprises, and the price you approve is the price you pay.",
      },
      {
        q: "I run a small warehouse off I-4 with a rooftop unit. Do you do commercial?",
        a: "We service rooftop package units and light commercial systems for restaurants, retail, and small offices, scheduled around your operating hours.",
      },
      {
        q: "Well water and a long lineset out to the house — anything special?",
        a: "Longer linesets need correct refrigerant charge and sometimes a larger line size, and well water means the outdoor coil should be cleaned more often. We account for both when we service or replace a system.",
      },
    ],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
