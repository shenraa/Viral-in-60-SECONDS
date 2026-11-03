/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario } from '../types/game';

export const SCENARIOS: Scenario[] = [
  // =========================================================================
  // CATEGORY 1: RAGEBAIT (10 scenarios)
  // Provocative, outrage-inducing posts designed to make readers furious
  // =========================================================================
  {
    id: 'rb-01-restaurant-air-fee',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'AngryDinerClub',
    handle: '@dining_nightmares',
    avatarColor: '#EF4444',
    avatarInitials: 'AD',
    verified: false,
    timestamp: '15m ago',
    headline: 'Restaurants are now charging a $5 "Clean Air & Oxygen" fee per person!',
    bodyText: 'Look at this receipt! They are literally making us pay to breathe inside the dining room. Greedy owners have gone completely insane. Boycott now!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: '$5 OXYGEN FEE ADDED TO RESTAURANT BILLS',
      badge: 'OUTRAGE ALERT',
      sourceUrlSnippet: 'viral-anger-feed.net/oxygen-charge',
      accentColor: '#EF4444',
    },
    stats: { likes: 14200, shares: 9800, comments: 2450 },
    question: 'What is the right action for this viral restaurant fee receipt?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb01-1',
        type: 'image_context',
        title: 'Check 1: Receipt Origin',
        content: 'The image was created by a comedy satire channel as a joke meme, complete with a comedy watermark in the corner.',
        reliability: 'suspicious',
        note: 'Satirical prank receipts are frequently reposted as real news to spark rage.'
      },
      {
        id: 'clue-rb01-2',
        type: 'corroboration',
        title: 'Check 2: Restaurant Statement',
        content: 'The named restaurant confirmed the receipt is completely fabricated and no such fee exists on their menu.',
        reliability: 'verified_official',
        note: 'Always check with the business or look for original source watermarks.'
      }
    ],
    explanation: 'This bill is a fake satire meme reposted as real news to generate outrage and angry clicks.',
    whyItMatters: 'Ragebait tricks people into attacking real businesses over completely invented charges.',
    learningTakeaway: 'When a claim sounds absurdly greedy or unfair, check if it originated as an internet parody.',
    tags: ['Ragebait', 'Fake Receipt', 'Viral Outrage']
  },
  {
    id: 'rb-02-dog-park-ban',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'PetLoversUnited',
    handle: '@fury_pets_daily',
    avatarColor: '#F97316',
    avatarInitials: 'PL',
    verified: false,
    timestamp: '30m ago',
    headline: 'City passes law banning dogs from walking on public sidewalks to "protect concrete"!',
    bodyText: 'Corrupt city council just banned all dog walking on sidewalks! Any owner caught walking their dog outside faces an instant $300 fine. Repost to make your voice heard!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'CITY BANS ALL DOGS FROM PUBLIC SIDEWALKS',
      badge: 'BREAKING OUTRAGE',
      sourceUrlSnippet: 'click-rage-buzz.org/dog-ban',
      accentColor: '#F97316',
    },
    stats: { likes: 19800, shares: 14200, comments: 3900 },
    question: 'How should you respond to this claim that dogs are banned from sidewalks?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb02-1',
        type: 'corroboration',
        title: 'Check 1: Official City Council Minutes',
        content: 'City Council records show no such ban was ever proposed or passed. Sidewalks remain completely open to all pets.',
        reliability: 'verified_official',
        note: 'Official council ordinances are public record and easy to verify online.'
      },
      {
        id: 'clue-rb02-2',
        type: 'source',
        title: 'Check 2: Publisher History',
        content: 'The account regularly posts manufactured outrage stories about pet bans to sell dropshipped pet products.',
        reliability: 'suspicious',
        note: 'Emotional rage is often used as clickbait for affiliate product sales.'
      }
    ],
    explanation: 'The city council never passed any dog walking ban. The story was fabricated to generate emotional rage.',
    whyItMatters: 'Pet-related ragebait triggers intense emotional reactions that lead to rapid sharing without verification.',
    learningTakeaway: 'Always verify controversial local government laws through city council portals or local newspapers.',
    tags: ['Ragebait', 'Fake Law', 'Pet Outrage']
  },
  {
    id: 'rb-03-mandatory-weekend-work',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'WorkplaceWatchdog',
    handle: '@workers_revolt_now',
    avatarColor: '#DC2626',
    avatarInitials: 'WW',
    verified: false,
    timestamp: '45m ago',
    headline: 'Government declares mandatory 6-day work weeks without any overtime pay!',
    bodyText: 'Starting next month, every single worker will be legally forced to work Saturdays with zero extra compensation. Corporate greed has taken over our laws! Share everywhere!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'MANDATORY UNPAID SATURDAYS SIGNED INTO LAW',
      badge: 'URGENT LABOR ALERT',
      sourceUrlSnippet: 'daily-outrage-wire.com/labor-law',
      accentColor: '#DC2626',
    },
    stats: { likes: 31200, shares: 25400, comments: 6100 },
    question: 'What should you do with this viral labor policy post?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb03-1',
        type: 'corroboration',
        title: 'Check 1: Department of Labor',
        content: 'The Department of Labor issued a clarification stating standard 40-hour overtime protections remain unchanged.',
        reliability: 'verified_official',
        note: 'Major federal labor laws require congressional approval and months of public notice.'
      },
      {
        id: 'clue-rb03-2',
        type: 'source',
        title: 'Check 2: News Outlets',
        content: 'Zero credible news agencies or labor unions have reported on this supposed legal change.',
        reliability: 'suspicious',
        note: 'A monumental change in labor law would dominate every major news network worldwide.'
      }
    ],
    explanation: 'Federal labor laws have not changed. This post is pure fiction crafted to incite public panic and anger.',
    whyItMatters: 'Manufactured labor panic causes immense stress for working families.',
    learningTakeaway: 'If a massive national law is announced only on social media memes, it is almost certainly fake.',
    tags: ['Ragebait', 'Fake Law', 'Labor Panic']
  },
  {
    id: 'rb-04-airplane-seatbelt-rental',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'TravelTruthLeaks',
    handle: '@airline_leaks_exposed',
    avatarColor: '#EA580C',
    avatarInitials: 'TT',
    verified: false,
    timestamp: '1h ago',
    headline: 'Budget airlines to charge a $18 "Seatbelt Safety Fee" before takeoff!',
    bodyText: 'A flight attendant leaked that budget airlines will now lock seatbelts until passengers swipe a credit card for $18. If you refuse, they kick you off the flight! Disgusting greed!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'AIRLINES INTRODUCING $18 SEATBELT UNLOCK FEE',
      badge: 'TRAVEL SCANDAL',
      sourceUrlSnippet: 'aviation-insider-hoax.com/fees',
      accentColor: '#EA580C',
    },
    stats: { likes: 22100, shares: 18400, comments: 4300 },
    question: 'How should you evaluate this claim about airline seatbelt fees?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb04-1',
        type: 'corroboration',
        title: 'Check 1: Aviation Safety Regulations',
        content: 'Federal Aviation Administration (FAA) rules strictly mandate free, functioning seatbelts on all passenger flights by law.',
        reliability: 'verified_official',
        note: 'Airlines cannot legally operate aircraft without meeting mandatory baseline safety requirements.'
      },
      {
        id: 'clue-rb04-2',
        type: 'source',
        title: 'Check 2: Satire Origins',
        content: 'The meme originated from an airline parody account celebrating April Fools Day and was re-posted as a factual leak.',
        reliability: 'suspicious',
        note: 'Old satirical jokes are frequently stripped of context and recycled as ragebait.'
      }
    ],
    explanation: 'Aviation laws strictly prohibit charging for safety equipment. The post recycled an old parody joke.',
    whyItMatters: 'Aviation ragebait misinforms travelers and spreads unnecessary hostility toward flight crews.',
    learningTakeaway: 'Safety equipment on commercial planes is strictly federally regulated and cannot be locked behind fees.',
    tags: ['Ragebait', 'Aviation Hoax', 'Travel Outrage']
  },
  {
    id: 'rb-05-library-silence-tax',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'LocalCommunityEye',
    handle: '@city_hall_watch',
    avatarColor: '#D97706',
    avatarInitials: 'LC',
    verified: false,
    timestamp: '2h ago',
    headline: 'Public library installs sound meters and will fine patrons $10 for coughing!',
    bodyText: 'Can you believe this? Public libraries now charge a $10 penalty every time you cough or clear your throat. Taxpayer money being used to punish sick people!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'PUBLIC LIBRARY TO FINE PATRONS $10 FOR COUGHING',
      badge: 'COMMUNITY OUTRAGE',
      sourceUrlSnippet: 'metro-rumors-daily.net/library-fine',
      accentColor: '#D97706',
    },
    stats: { likes: 11500, shares: 7900, comments: 1800 },
    question: 'What is the appropriate action for this viral library coughing fine post?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb05-1',
        type: 'corroboration',
        title: 'Check 1: Library System Director',
        content: 'The Public Library Director issued an official release calling the rumor absurd and confirming libraries are 100% free to all.',
        reliability: 'verified_official',
        note: 'Public libraries do not impose bodily function fines.'
      },
      {
        id: 'clue-rb05-2',
        type: 'image_context',
        title: 'Check 2: Fake Sound Meter Photo',
        content: 'The attached photo is actually a standard indoor air quality CO2 monitor, not a "coughing penalty meter".',
        reliability: 'suspicious',
        note: 'Photos of ordinary environmental monitors are often misrepresented to support fake narratives.'
      }
    ],
    explanation: 'The library never introduced any coughing fines. The photo merely showed a routine indoor air quality monitor.',
    whyItMatters: 'Attacking community libraries harms trusted public institutions that provide free community learning.',
    learningTakeaway: 'Look closely at photos attached to outrageous claims—they often depict completely ordinary equipment.',
    tags: ['Ragebait', 'Public Services', 'Misleading Image']
  },
  {
    id: 'rb-06-landlord-refrigerator-rent',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'RenterRightsAlert',
    handle: '@housing_scandals',
    avatarColor: '#B91C1C',
    avatarInitials: 'RR',
    verified: false,
    timestamp: '3h ago',
    headline: 'Landlord installs smart lock on fridge: charges $2 every time tenant opens it!',
    bodyText: 'Look what this predatory landlord did! A Bluetooth fridge lock that charges your credit card $2 per door opening. Housing has become a dystopian nightmare!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'LANDLORD CHARGING $2 PER FRIDGE DOOR OPENING',
      badge: 'HOUSING OUTRAGE',
      sourceUrlSnippet: 'viral-renter-drama.com/fridge-lock',
      accentColor: '#B91C1C',
    },
    stats: { likes: 45000, shares: 33000, comments: 8200 },
    question: 'What action should be taken regarding this viral fridge lock post?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb06-1',
        type: 'image_context',
        title: 'Check 1: Prank Video Origin',
        content: 'The clip was created by a comedy TikTok creator as a staged comedy sketch with friends and clearly marked as entertainment.',
        reliability: 'suspicious',
        note: 'Viral comedy skits are often re-uploaded without credits to trick viewers into believing they are genuine.'
      },
      {
        id: 'clue-rb06-2',
        type: 'corroboration',
        title: 'Check 2: Legal Tenancy Regulations',
        content: 'Tenant protection laws strictly prohibit landlords from tampering with essential food storage appliances in rental properties.',
        reliability: 'verified_official',
        note: 'Basic habitability laws make such hypothetical setups completely illegal.'
      }
    ],
    explanation: 'This was a staged comedy sketch on TikTok that was ripped and reposted as a real landlord scandal.',
    whyItMatters: 'Staged prank videos presented as reality distort genuine conversations about real tenant rights.',
    learningTakeaway: 'Extremely cartoonish villain behavior online is frequently staged content masquerading as reality.',
    tags: ['Ragebait', 'Staged Skit', 'Housing Drama']
  },
  {
    id: 'rb-07-verified-consumer-warning',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'StateAttorneyGeneral',
    handle: '@state_ag_consumer',
    avatarColor: '#0284C7',
    avatarInitials: 'AG',
    verified: true,
    timestamp: '4h ago',
    headline: 'CONSUMER ALERT: 3 food delivery apps fined $4.2M for deceptive hidden checkout fees.',
    bodyText: 'Our Consumer Protection Bureau concluded a 10-month investigation fining three major delivery apps for secretly adding undisclosed service fees at checkout. Full settlement details on our official portal.',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'OFFICIAL CONSUMER ALERT: $4.2M FINE FOR HIDDEN APP FEES',
      badge: 'STATE ENFORCEMENT ACTION',
      sourceUrlSnippet: 'ag.state.gov/news/2026/delivery-apps-settlement',
      accentColor: '#0284C7',
    },
    stats: { likes: 8900, shares: 5400, comments: 620 },
    question: 'How should you treat this verified Consumer Protection enforcement notice?',
    correctAction: 'SHARE',
    acceptableActions: ['SHARE'],
    verdict: 'authentic_and_verified',
    evidence: [
      {
        id: 'clue-rb07-1',
        type: 'source',
        title: 'Check 1: Official Government Agency',
        content: 'Posted from the verified State Attorney General official account linking directly to an authenticated .gov domain.',
        reliability: 'verified_official',
        note: 'Official state government agency announcements with verifiable case files are authentic.'
      },
      {
        id: 'clue-rb07-2',
        type: 'corroboration',
        title: 'Check 2: News Coverage & Court Filings',
        content: 'Covered by Reuters, AP News, and backed by public court dockets with signed consent decrees.',
        reliability: 'verified_official',
        note: 'Real enforcement actions have public legal documents accessible through official channels.'
      }
    ],
    explanation: 'This is an authentic, verified consumer advisory from the State Attorney General regarding real legal settlements.',
    whyItMatters: 'Sharing verified consumer warnings empowers consumers to claim eligible restitution refunds.',
    learningTakeaway: 'Distinguish genuine government consumer protection advisories from fake social media outrage posts.',
    tags: ['Consumer Alert', 'Official Enforcement', 'Verified News']
  },
  {
    id: 'rb-08-supermarket-scanner-rage',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'GroceryScamSpotter',
    handle: '@shopper_beware',
    avatarColor: '#E11D48',
    avatarInitials: 'GS',
    verified: false,
    timestamp: '5h ago',
    headline: 'Viral video claims self-checkout machines are rigged to secretly double your bill!',
    bodyText: 'A video with 2 million views claims machines add phantom items when you scan groceries. Is every supermarket secretly stealing from us? Investigate before shopping!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'DO SELF-CHECKOUT REGISTERS SECRETLY DOUBLE ITEMS?',
      badge: 'UNCONFIRMED CLAIM',
      sourceUrlSnippet: 'grocery-watch-unverified.com/scanner-glitch',
      accentColor: '#E11D48',
    },
    stats: { likes: 16700, shares: 11200, comments: 2900 },
    question: 'How should you treat this unverified viral video claiming scanners are rigged?',
    correctAction: 'VERIFY',
    acceptableActions: ['VERIFY'],
    verdict: 'unverified_rumour',
    evidence: [
      {
        id: 'clue-rb08-1',
        type: 'corroboration',
        title: 'Check 1: Audit Analysis',
        content: 'Weights and Measures regulators reviewed the video: the shopper accidentally double-tapped their barcode against the sensor.',
        reliability: 'suspicious',
        note: 'Viral video claims often mistake user handling errors for intentional corporate conspiracies.'
      },
      {
        id: 'clue-rb08-2',
        type: 'uncertainty',
        title: 'Check 2: Independent Testing',
        content: 'Independent consumer watchdog groups tested over 100 registers and found no hidden programming to double charges.',
        reliability: 'inconclusive',
        note: 'Always verify scanner allegations with official weights and measures testing data before spreading panic.'
      }
    ],
    explanation: 'The video showed user error rather than an intentional scam. Independent audits confirmed no rigged software.',
    whyItMatters: 'Unverified retail conspiracy claims spread baseless panic among everyday grocery shoppers.',
    learningTakeaway: 'Verify sensational viral videos with consumer testing bodies before sharing them as factual scams.',
    tags: ['Ragebait', 'Unverified Video', 'Consumer Panic']
  },
  {
    id: 'rb-09-school-bans-water-bottles',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'ParentOutrageNetwork',
    handle: '@furious_parents_voice',
    avatarColor: '#C026D3',
    avatarInitials: 'PO',
    verified: false,
    timestamp: '6h ago',
    headline: 'Elementary school bans water bottles to force children to purchase vending machine soda!',
    bodyText: 'Administrators have banned kids from bringing reusable water bottles so the school can profit off soda machine contracts! Our children are being dehydrated for corporate profit!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'SCHOOL BANS WATER BOTTLES TO SELL SODA TO KIDS',
      badge: 'PARENTAL OUTRAGE',
      sourceUrlSnippet: 'school-drama-unfiltered.org/water-ban',
      accentColor: '#C026D3',
    },
    stats: { likes: 28400, shares: 21900, comments: 5100 },
    question: 'What is the correct action for this post claiming schools banned water bottles?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb09-1',
        type: 'corroboration',
        title: 'Check 1: School District Statement',
        content: 'The school district published an official statement confirming reusable water bottles are actively encouraged and hydration stations are free.',
        reliability: 'verified_official',
        note: 'Public schools are required by state education codes to provide free drinking water to all students.'
      },
      {
        id: 'clue-rb09-2',
        type: 'source',
        title: 'Check 2: Origin of Rumor',
        content: 'The rumor started when one student was asked to put away an unsealed glass bottle for playground safety.',
        reliability: 'suspicious',
        note: 'Routine safety rules are frequently exaggerated into malicious institutional conspiracy stories.'
      }
    ],
    explanation: 'The school never banned water bottles. A routine safety policy regarding glass containers was twisted into ragebait.',
    whyItMatters: 'Baseless accusations against schools divert resources away from educating students.',
    learningTakeaway: 'Check official school district communications when seeing outrageous claims about school policies.',
    tags: ['Ragebait', 'School Rumor', 'Exaggeration']
  },
  {
    id: 'rb-10-gym-shower-meter',
    category: 'ragebait',
    difficulty: 'easy',
    authorName: 'GymBroGrievances',
    handle: '@fitness_drama_now',
    avatarColor: '#7C3AED',
    avatarInitials: 'GB',
    verified: false,
    timestamp: '7h ago',
    headline: 'National gym chain installs $3 coin meters on locker room shower doors!',
    bodyText: 'You pay $70 a month just for them to lock the showers behind a coin slot! Greediest gym chain in human history. Cancel your memberships immediately!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'POPULAR GYM CHAIN INSTALLS COIN METERS ON SHOWERS',
      badge: 'FITNESS FRAUD',
      sourceUrlSnippet: 'viral-gym-leaks.net/shower-meter',
      accentColor: '#7C3AED',
    },
    stats: { likes: 17300, shares: 12400, comments: 2700 },
    question: 'How should you respond to this claim about gym coin-operated showers?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-rb10-1',
        type: 'image_context',
        title: 'Check 1: Photo Reverse Search',
        content: 'Reverse image search shows the photo is from a public camping campground shower house in Europe taken in 2014, not a commercial gym.',
        reliability: 'suspicious',
        note: 'Old photos from campgrounds are frequently recycled to invent outrage against modern businesses.'
      },
      {
        id: 'clue-rb10-2',
        type: 'corroboration',
        title: 'Check 2: Gym Chain Response',
        content: 'The gym chain confirmed all locker room showers remain completely complimentary with membership.',
        reliability: 'verified_official',
        note: 'Commercial gyms do not operate coin-operated showers.'
      }
    ],
    explanation: 'The photo was taken from an old campground shower in 2014 and falsely blamed on a modern gym chain.',
    whyItMatters: 'Misleading recycled photos are among the most common ways online trolls manufacture fake anger.',
    learningTakeaway: 'Always reverse search striking images before assuming they depict what the headline claims.',
    tags: ['Ragebait', 'Recycled Photo', 'Gym Outrage']
  },

  // =========================================================================
  // CATEGORY 2: FAKE NEWS (10 scenarios)
  // Fabricated emergencies, false crisis reports, bogus regulations
  // =========================================================================
  {
    id: 'fn-01-metro-curfew',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'CityBreakingAlerts',
    handle: '@city_pulse_now',
    avatarColor: '#FF4D5A',
    avatarInitials: 'CB',
    verified: false,
    timestamp: '8m ago',
    headline: 'BREAKING: Mandatory 8 PM citywide curfew announced starting tonight for all districts!',
    bodyText: 'Officials have ordered the immediate shutdown of all buses, trains, and stores for an unspecified emergency. Share with friends now so nobody gets stranded!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'CITYWIDE CURFEW IN EFFECT TONIGHT',
      badge: 'URGENT BULLETIN',
      sourceUrlSnippet: 'breaking-alerts-news24.xyz/article/8819',
      accentColor: '#FF4D5A',
    },
    stats: { likes: 1420, shares: 3890, comments: 412 },
    question: 'How should you treat this breaking curfew announcement?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn01-1',
        type: 'source',
        title: 'Check 1: Website Link',
        content: 'The link goes to "breaking-alerts-news24.xyz", a fake website registered just 3 days ago with no editorial staff or address.',
        reliability: 'suspicious',
        note: 'Scam news alerts often use disposable web addresses created a few days ago.'
      },
      {
        id: 'clue-fn01-2',
        type: 'corroboration',
        title: 'Check 2: Official City Statement',
        content: 'City Hall and the Transit Authority confirmed: No curfew exists. Buses and trains are running on normal schedule.',
        reliability: 'verified_official',
        note: 'Real emergencies are always posted directly on official city and police channels.'
      }
    ],
    explanation: 'This curfew warning is completely made up. The link is a fake website, and city officials confirmed everything is running normally.',
    whyItMatters: 'Fake emergency alerts cause real panic and disrupt daily travel.',
    learningTakeaway: 'Always check the city or police official website before believing breaking emergency claims.',
    tags: ['Fake Emergency', 'Panic Bait', 'Disposable Domain']
  },
  {
    id: 'fn-02-solar-flare-blackout',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'CosmicAlertDaily',
    handle: '@space_watch_live',
    avatarColor: '#F59E0B',
    avatarInitials: 'CA',
    verified: false,
    timestamp: '22m ago',
    headline: 'Massive solar flare to permanently fry all smartphones this Friday worldwide!',
    bodyText: 'NASA issued a code-red warning: a solar storm will hit Earth at noon Friday, permanently destroying all lithium smartphone batteries. Back up everything now!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'SOLAR STORM WILL DESTROY ALL CELL PHONES FRIDAY',
      badge: 'COSMIC EMERGENCY',
      sourceUrlSnippet: 'space-rumors-daily.net/solar-strike',
      accentColor: '#F59E0B',
    },
    stats: { likes: 2190, shares: 7420, comments: 890 },
    question: 'What is the correct action for this solar storm phone destruction post?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn02-1',
        type: 'corroboration',
        title: 'Check 1: NOAA Space Weather Center',
        content: 'NOAA Space Weather Prediction Center confirms current solar activity is normal (G1 baseline). No hazardous storm is predicted.',
        reliability: 'verified_official',
        note: 'NOAA and NASA publish live 24/7 space weather monitors for free public viewing.'
      },
      {
        id: 'clue-fn02-2',
        type: 'source',
        title: 'Check 2: Scientific Accuracy',
        content: 'Solar storms cannot fry phone batteries inside pockets. Space weather primarily affects upper atmosphere radio waves.',
        reliability: 'suspicious',
        note: 'Scientific hoaxes often invent pseudoscientific physics to sound scary.'
      }
    ],
    explanation: 'NASA made no such statement and space weather experts confirm there is no dangerous solar storm.',
    whyItMatters: 'Science hoaxes mislead people and cause needless anxiety.',
    learningTakeaway: 'Check official scientific bodies like NOAA or NASA when reading sensational space claims.',
    tags: ['Fake Science', 'Panic Bait', 'Doomsday Hoax']
  },
  {
    id: 'fn-03-tap-water-chemical-leak',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'MetroHealthLeaks',
    handle: '@water_safety_truth',
    avatarColor: '#DC2626',
    avatarInitials: 'MH',
    verified: false,
    timestamp: '35m ago',
    headline: 'DO NOT DRINK TAP WATER: Secret chemical spill poisoned city reservoir system!',
    bodyText: 'A whistle-blower from the municipal water plant leaked that high levels of toxic solvent leaked into city pipes 2 hours ago. Stop drinking tap water immediately!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'TOXIC CHEMICAL LEAK IN CITY DRINKING WATER',
      badge: 'HEALTH EMERGENCY',
      sourceUrlSnippet: 'emergency-leak-now.biz/water-alert',
      accentColor: '#DC2626',
    },
    stats: { likes: 5400, shares: 12100, comments: 1950 },
    question: 'How should you respond to this unverified toxic water alert?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn03-1',
        type: 'corroboration',
        title: 'Check 1: Water Quality Department Testing',
        content: 'The Municipal Water Authority tested all reservoir lines and confirmed 100% clean drinking water meeting all safety standards.',
        reliability: 'verified_official',
        note: 'Legitimate water advisories are broadcast across local TV stations and direct phone emergency alerts.'
      },
      {
        id: 'clue-fn03-2',
        type: 'source',
        title: 'Check 2: Domain Investigation',
        content: 'The link directs to an affiliate landing page selling expensive bottled water subscriptions.',
        reliability: 'suspicious',
        note: 'Scaremongering about public water is a frequent marketing tactic for filter and bottled water scams.'
      }
    ],
    explanation: 'The Municipal Water Authority confirmed all tap water is completely safe. The post was a fake scare to sell bottled water.',
    whyItMatters: 'Fake water poison claims trigger runs on supermarkets and deprive vulnerable people of drinking water.',
    learningTakeaway: 'Genuine public health emergencies trigger broadcast alerts, not anonymous web blog posts.',
    tags: ['Fake News', 'Water Hoax', 'Sales Scam']
  },
  {
    id: 'fn-04-laptop-airline-ban',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'AeroTravelDaily',
    handle: '@air_travel_buzz',
    avatarColor: '#3B82F6',
    avatarInitials: 'AT',
    verified: false,
    timestamp: '50m ago',
    headline: 'Aviation authorities ban all laptops and tablets from commercial flights indefinitely!',
    bodyText: 'New strict international security mandate announced this morning: travelers can no longer bring any laptops, iPads, or e-readers on any airplane flights starting tonight!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'ALL LAPTOPS AND TABLETS BANNED FROM COMMERCIAL FLIGHTS',
      badge: 'GLOBAL TRAVEL ALERT',
      sourceUrlSnippet: 'aviation-update-247.org/laptop-ban',
      accentColor: '#3B82F6',
    },
    stats: { likes: 4300, shares: 8900, comments: 1400 },
    question: 'What is the correct action for this supposed international laptop flight ban?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn04-1',
        type: 'corroboration',
        title: 'Check 1: FAA & TSA Official Guidelines',
        content: 'The TSA and International Air Transport Association (IATA) confirmed regular carry-on electronics rules remain in full effect.',
        reliability: 'verified_official',
        note: 'Global airport security policies are posted publicly on tsa.gov and airline portals.'
      },
      {
        id: 'clue-fn04-2',
        type: 'source',
        title: 'Check 2: Recycled Historical News',
        content: 'The article distorted a temporary regional restriction from 2017 that applied only to select flights and ended years ago.',
        reliability: 'suspicious',
        note: 'Old, expired security rules are frequently revived as fresh breaking news.'
      }
    ],
    explanation: 'TSA and international regulators confirmed laptops remain permitted on all standard flights. The post recycled an expired 2017 news event.',
    whyItMatters: 'False travel restrictions cause travelers to abandon expensive belongings or miss flights.',
    learningTakeaway: 'Verify airport security changes directly on the official TSA.gov website or your airline ticket portal.',
    tags: ['Fake News', 'Travel Hoax', 'Recycled News']
  },
  {
    id: 'fn-05-real-boil-water-advisory',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'CountyHealthDepartment',
    handle: '@county_health_dept',
    avatarColor: '#10B981',
    avatarInitials: 'CH',
    verified: true,
    timestamp: '1h ago',
    headline: 'OFFICIAL NOTICE: Boil Water Advisory issued for North District following main pipe repair.',
    bodyText: 'Due to a water main break at 5th and Elm, residents in North District should boil tap water for 1 minute before drinking or cooking until tests clear tomorrow. Call 311 for assistance.',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'BOIL WATER ADVISORY IN EFFECT FOR NORTH DISTRICT',
      badge: 'OFFICIAL HEALTH ADVISORY',
      sourceUrlSnippet: 'health.county.gov/water-advisories/north-district',
      accentColor: '#10B981',
    },
    stats: { likes: 1800, shares: 4100, comments: 230 },
    question: 'How should you treat this verified county health boil water advisory?',
    correctAction: 'SHARE',
    acceptableActions: ['SHARE'],
    verdict: 'authentic_and_verified',
    evidence: [
      {
        id: 'clue-fn05-1',
        type: 'source',
        title: 'Check 1: Official .gov Website',
        content: 'The advisory is posted on the authenticated county.gov portal with signed direct contact information.',
        reliability: 'verified_official',
        note: 'Verified government health notices provide actionable protective guidance for neighborhood safety.'
      },
      {
        id: 'clue-fn05-2',
        type: 'corroboration',
        title: 'Check 2: City Public Works Confirmation',
        content: 'Public works crews are actively on site repairing the water pipe at 5th and Elm as described.',
        reliability: 'verified_official',
        note: 'Real local health advisories correspond with physical public works activity.'
      }
    ],
    explanation: 'This is an authentic, verified public health notice from local officials to protect residents while a pipe is repaired.',
    whyItMatters: 'Sharing verified public health alerts protects vulnerable neighbors from drinking contaminated water.',
    learningTakeaway: 'When an advisory comes from a verified .gov department with local phone support, it is genuine and important.',
    tags: ['Official Notice', 'Public Health', 'Boil Water']
  },
  {
    id: 'fn-06-gas-pump-tax-doubling',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'MotoristFreedomVoice',
    handle: '@gas_price_revolt',
    avatarColor: '#E11D48',
    avatarInitials: 'MF',
    verified: false,
    timestamp: '2h ago',
    headline: 'State secretly doubled gasoline tax overnight at 3 AM today!',
    bodyText: 'Gas stations just received an emergency order to raise prices by $1.50 per gallon immediately due to a covert midnight fuel tax hike! Go fill your tanks before sunrise!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'SECRET OVERNIGHT GAS TAX HIKE RAISES PUMP PRICES',
      badge: 'TAX EMERGENCY',
      sourceUrlSnippet: 'daily-fuel-revolt.com/midnight-tax',
      accentColor: '#E11D48',
    },
    stats: { likes: 8200, shares: 15300, comments: 2700 },
    question: 'How should you respond to this claim of an overnight fuel tax increase?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn06-1',
        type: 'corroboration',
        title: 'Check 1: Department of Revenue',
        content: 'The State Department of Revenue confirmed the state fuel tax rate is unchanged and can only be modified by legislature vote.',
        reliability: 'verified_official',
        note: 'Tax rate changes require legislative debate, vote counts, and months of public notice.'
      },
      {
        id: 'clue-fn06-2',
        type: 'source',
        title: 'Check 2: Independent Fuel Monitors',
        content: 'AAA and GasBuddy confirmed regional wholesale gasoline prices are stable and no tax increase took effect.',
        reliability: 'credible',
        note: 'Independent gasoline tracking services provide objective price verification.'
      }
    ],
    explanation: 'State fuel tax rates did not increase. State law requires legislative voting, which did not occur.',
    whyItMatters: 'False fuel panic triggers dangerous rushes and artificially creates localized gas shortages.',
    learningTakeaway: 'State tax laws cannot be passed secretly overnight without recorded legislative roll calls.',
    tags: ['Fake News', 'Fuel Panic', 'Tax Hoax']
  },
  {
    id: 'fn-07-meteorite-struck-suburb',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'DisasterCameraLive',
    handle: '@earth_events_now',
    avatarColor: '#84CC16',
    avatarInitials: 'DC',
    verified: false,
    timestamp: '3h ago',
    headline: 'Flaming meteorite struck a suburban parking lot just 20 minutes ago!',
    bodyText: 'Witnesses recorded a smoking space rock crashing right through asphalt in a shopping center parking lot. Emergency crews have surrounded the alien crater!',
    graphicType: 'photo_preview',
    graphicDetails: {
      headlineSnippet: 'SMOKING METEORITE CRASHES IN SUBURB',
      badge: 'DISASTER FOOTAGE',
      sourceUrlSnippet: 'space-crashes-live.org/meteor-suburb',
      accentColor: '#84CC16',
    },
    stats: { likes: 9800, shares: 14700, comments: 1900 },
    question: 'What is the correct action for this suburban meteorite crash photo?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn07-1',
        type: 'image_context',
        title: 'Check 1: Movie Prop Origins',
        content: 'Reverse image search revealed the photo shows a movie film set constructed in 2019 for a sci-fi streaming series.',
        reliability: 'suspicious',
        note: 'Movie sets and practical effects props are frequently posted as genuine disaster footage.'
      },
      {
        id: 'clue-fn07-2',
        type: 'corroboration',
        title: 'Check 2: Local Police & Geological Survey',
        content: 'Local police and the National Geological Survey confirmed zero seismic or impact events were detected in the area.',
        reliability: 'verified_official',
        note: 'Real meteorite impacts large enough to crack parking lots create detectable seismic shockwaves.'
      }
    ],
    explanation: 'The photo depicts a movie film set from 2019. Geological monitoring instruments detected zero impacts.',
    whyItMatters: 'Movie set hoaxes mislead people and erode trust in legitimate space tracking agencies.',
    learningTakeaway: 'Sensational photos of smoking craters are almost always old film sets or special effects exercises.',
    tags: ['Fake News', 'Movie Prop', 'Meteorite Hoax']
  },
  {
    id: 'fn-08-earthquake-drill-alert',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'SeismicTrackerBot',
    handle: '@quake_pulse_feed',
    avatarColor: '#F59E0B',
    avatarInitials: 'ST',
    verified: false,
    timestamp: '4h ago',
    headline: 'Breaking: Scientists announce major 7.2 earthquake will hit at exactly 3:15 PM today!',
    bodyText: 'Top geologists leaked that a massive earthquake is scheduled to strike the metro area this afternoon at 3:15 PM sharp. Evacuate all high-rise buildings right now!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'MAJOR 7.2 EARTHQUAKE PREDICTED FOR 3:15 PM TODAY',
      badge: 'URGENT EVACUATION',
      sourceUrlSnippet: 'quake-alerts-daily.net/predicted-strike',
      accentColor: '#F59E0B',
    },
    stats: { likes: 7400, shares: 16800, comments: 2300 },
    question: 'How should you evaluate this prediction of a specific earthquake time?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn08-1',
        type: 'corroboration',
        title: 'Check 1: USGS Earthquake Science Facts',
        content: 'The USGS explicitly states that no scientist has ever predicted an exact earthquake time, date, or minute. It is scientifically impossible.',
        reliability: 'verified_official',
        note: 'The USGS repeatedly emphasizes that earthquake predictions giving specific hours are always hoaxes.'
      },
      {
        id: 'clue-fn08-2',
        type: 'source',
        title: 'Check 2: Annual Preparedness Drill',
        content: 'Today is the annual Great ShakeOut statewide emergency preparedness practice drill, not a real predicted catastrophe.',
        reliability: 'credible',
        note: 'Routine safety drill notices are often maliciously spun as actual incoming disasters.'
      }
    ],
    explanation: 'Earthquakes cannot be predicted to an exact hour or minute. The post twisted a routine preparedness drill into panic.',
    whyItMatters: 'False evacuation rumors create crowd surges, road accidents, and emergency room overload.',
    learningTakeaway: 'Scientists cannot predict the exact day or time of an earthquake; any post claiming an exact hour is a hoax.',
    tags: ['Fake News', 'Earthquake Hoax', 'Drill Confusion']
  },
  {
    id: 'fn-09-bridge-reopening-official',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'StateDeptTransportation',
    handle: '@state_dot_traffic',
    avatarColor: '#059669',
    avatarInitials: 'DT',
    verified: true,
    timestamp: '5h ago',
    headline: 'TRAVEL UPDATE: Central River Bridge officially reopened ahead of schedule.',
    bodyText: 'Repairs to the Central River Bridge are complete. All 4 lanes are now open to vehicular traffic with normal speed limits restored. Live traffic cameras available on our DOT portal.',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'CENTRAL RIVER BRIDGE REOPENED TO ALL TRAFFIC',
      badge: 'OFFICIAL TRAFFIC BULLETIN',
      sourceUrlSnippet: 'dot.state.gov/bridges/central-river-open',
      accentColor: '#059669',
    },
    stats: { likes: 3600, shares: 7200, comments: 410 },
    question: 'What is the right action for this Department of Transportation bridge reopening notice?',
    correctAction: 'SHARE',
    acceptableActions: ['SHARE'],
    verdict: 'authentic_and_verified',
    evidence: [
      {
        id: 'clue-fn09-1',
        type: 'source',
        title: 'Check 1: Official Verified Account',
        content: 'Posted directly from the state Department of Transportation verified portal with live highway camera feeds.',
        reliability: 'verified_official',
        note: 'Official transit agencies provide trustworthy real-time traffic updates.'
      },
      {
        id: 'clue-fn09-2',
        type: 'corroboration',
        title: 'Check 2: Local Traffic Radio Confirmation',
        content: 'Local radio stations and GPS navigation apps confirmed traffic is flowing smoothly across the bridge.',
        reliability: 'verified_official',
        note: 'GPS navigation systems and radio updates confirm physical road availability.'
      }
    ],
    explanation: 'This is an authentic, verified bulletin from the State Department of Transportation.',
    whyItMatters: 'Sharing verified travel reopenings saves commuters time and reduces congestion on detour routes.',
    learningTakeaway: 'Verified highway department notices are trustworthy sources for commute planning.',
    tags: ['Official News', 'Traffic Update', 'Verified Source']
  },
  {
    id: 'fn-10-free-subway-forever',
    category: 'fake_news',
    difficulty: 'easy',
    authorName: 'MetroFreeCommute',
    handle: '@free_transit_leaks',
    avatarColor: '#6366F1',
    avatarInitials: 'MF',
    verified: false,
    timestamp: '6h ago',
    headline: 'Metro transit makes all subway rides completely free forever starting tomorrow!',
    bodyText: 'Transit Authority voted to abolish all fares permanently! Turnstiles will be unlocked at midnight and fare cards are being discontinued. Spread the good news!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'ALL SUBWAYS FREE FOREVER STARTING TOMORROW',
      badge: 'TRANSIT LEAK',
      sourceUrlSnippet: 'metro-fares-abolished.com/free-rides',
      accentColor: '#6366F1',
    },
    stats: { likes: 14500, shares: 23100, comments: 3400 },
    question: 'How should you respond to this claim that subway rides are permanently free?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-fn10-1',
        type: 'corroboration',
        title: 'Check 1: Transit Authority Official Announcement',
        content: 'The Transit Authority stated standard fare policies remain in effect and no vote to eliminate fares occurred.',
        reliability: 'verified_official',
        note: 'Major fare adjustments require months of public board hearings and formal announcements.'
      },
      {
        id: 'clue-fn10-2',
        type: 'source',
        title: 'Check 2: Domain Check',
        content: 'The website hosting the article is an ad-revenue farm with zero contact information or physical address.',
        reliability: 'suspicious',
        note: 'Fake policy promises are written to harvest clicks from excited commuters.'
      }
    ],
    explanation: 'The transit agency confirmed that fares remain standard. The story is a click-farming fabrication.',
    whyItMatters: 'Believing fake free-transit rumors can lead riders to be fined for fare evasion.',
    learningTakeaway: 'Always verify public transit fares directly on the transit agency’s official website.',
    tags: ['Fake News', 'Transit Hoax', 'Fare Evasion']
  },

  // =========================================================================
  // CATEGORY 3: GOSSIPS (10 scenarios)
  // Celebrity rumors, influencer feuds, leaked casting whispers, entertainment drama
  // =========================================================================
  {
    id: 'gs-01-actor-passing-hoax',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'HollywoodWhisperer',
    handle: '@celeb_insider_scoop',
    avatarColor: '#EC4899',
    avatarInitials: 'HW',
    verified: false,
    timestamp: '10m ago',
    headline: 'RUMOR: Beloved action star unexpectedly passed away in his home this morning!',
    bodyText: 'Devastating entertainment news. Sources close to the family say the legend has left us at age 62. Leave your tributes in the comments below!',
    graphicType: 'quote_card',
    graphicDetails: {
      headlineSnippet: 'BELOVED ACTION STAR PASSES AWAY AT 62',
      badge: 'CELEB TRAGEDY',
      sourceUrlSnippet: 'hollywood-gossip-central.net/tragic-loss',
      accentColor: '#EC4899',
    },
    stats: { likes: 25400, shares: 38200, comments: 9400 },
    question: 'How should you treat this breaking celebrity death rumor?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-gs01-1',
        type: 'corroboration',
        title: 'Check 1: Actor’s Verified Social Profile',
        content: 'The actor posted a live video from his training gym 15 minutes ago, talking directly to fans in perfect health.',
        reliability: 'verified_official',
        note: 'Celebrity death hoaxes are frequently debunked by the living celebrity themselves.'
      },
      {
        id: 'clue-gs01-2',
        type: 'source',
        title: 'Check 2: Major News Services',
        content: 'AP, Reuters, and Hollywood Reporter have posted zero reports regarding any passing.',
        reliability: 'suspicious',
        note: 'The passing of a major cultural icon is always immediately verified by major news syndicates.'
      }
    ],
    explanation: 'The action star is alive and well, having just posted live video. This is a common death hoax designed to harvest condolences.',
    whyItMatters: 'Celebrity death hoaxes distress friends, family, and millions of fans.',
    learningTakeaway: 'Never believe celebrity death claims until corroborated by the individual or major international news wires.',
    tags: ['Gossips', 'Death Hoax', 'Celebrity Rumor']
  },
  {
    id: 'gs-02-popstar-mic-drama',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'PopCultureFever',
    handle: '@pop_tea_exposed',
    avatarColor: '#8B5CF6',
    avatarInitials: 'PC',
    verified: false,
    timestamp: '25m ago',
    headline: 'SCANDAL: Pop sensation caught lip-syncing when microphone falls on stage!',
    bodyText: 'Watch the tape! Her mic dropped to the floor but loud singing vocals kept playing perfectly through the stadium speakers. Exposed as a total fake!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'POP STAR EXPOSED LIP-SYNCING IN FRONT OF 80,000 FANS',
      badge: 'STAGE SCANDAL',
      sourceUrlSnippet: 'viral-music-tea.com/mic-drop',
      accentColor: '#8B5CF6',
    },
    stats: { likes: 34100, shares: 21200, comments: 6700 },
    question: 'What is the correct action for this viral lip-sync scandal video?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-gs02-1',
        type: 'image_context',
        title: 'Check 1: Original Concert Recording',
        content: 'The unedited live broadcast shows the audio completely cut out when the mic fell; the viral clip had a studio track dubbed over it.',
        reliability: 'suspicious',
        note: 'Viral drama videos frequently dub studio tracks over concert bloopers to fake lip-sync accusations.'
      },
      {
        id: 'clue-gs02-2',
        type: 'corroboration',
        title: 'Check 2: Stadium Audio Crew Statement',
        content: 'The venue sound engineer confirmed the performance was 100% live and the viral clip is an edited fake.',
        reliability: 'verified_official',
        note: 'Sound engineers and full uncut concert footage provide original audio verification.'
      }
    ],
    explanation: 'The viral clip was intentionally edited with studio audio dubbed over it to manufacture a fake lip-sync scandal.',
    whyItMatters: 'Manipulated video clips damage performers’ reputations and spread false gossip.',
    learningTakeaway: 'Always check full, uncut performance videos when sensational audio anomalies are claimed.',
    tags: ['Gossips', 'Dubbed Audio', 'Pop Star Scandal']
  },
  {
    id: 'gs-03-superhero-casting-rumor',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'MovieLeaksUncut',
    handle: '@film_insider_rumors',
    avatarColor: '#0EA5E9',
    avatarInitials: 'ML',
    verified: false,
    timestamp: '40m ago',
    headline: 'CONFIDENTIAL LEAK: Indie actor secretly signed to play Batman in next trilogy!',
    bodyText: 'An anonymous insider claims studio executives finalized the deal yesterday behind closed doors. Contract is reportedly worth $20M for 3 movies!',
    graphicType: 'quote_card',
    graphicDetails: {
      headlineSnippet: 'SECRET BATMAN CASTING DEAL LEAKED BY INSIDER',
      badge: 'UNCONFIRMED LEAK',
      sourceUrlSnippet: 'cine-rumors-daily.net/batman-leak',
      accentColor: '#0EA5E9',
    },
    stats: { likes: 12400, shares: 6800, comments: 1900 },
    question: 'How should you treat this anonymous studio casting whisper?',
    correctAction: 'VERIFY',
    acceptableActions: ['VERIFY'],
    verdict: 'unverified_rumour',
    evidence: [
      {
        id: 'clue-gs03-1',
        type: 'corroboration',
        title: 'Check 1: Official Studio Trades',
        content: 'Industry trade journals (Variety, Deadline, Hollywood Reporter) have not reported any casting decision or negotiations.',
        reliability: 'suspicious',
        note: 'Legitimate Hollywood contracts are always reported first by the major industry trade publications.'
      },
      {
        id: 'clue-gs03-2',
        type: 'uncertainty',
        title: 'Check 2: Studio Response',
        content: 'The production studio stated that scriptwriting is still ongoing and no casting auditions have begun.',
        reliability: 'inconclusive',
        note: 'Wait for official studio press releases before accepting superhero casting rumors as fact.'
      }
    ],
    explanation: 'This is an unverified internet rumor from an anonymous account. No official casting has taken place.',
    whyItMatters: 'Premature casting rumors create false expectations and spam fan communities with unverified gossip.',
    learningTakeaway: 'Only trust Hollywood casting announcements when verified by recognized industry trades or studio press releases.',
    tags: ['Gossips', 'Casting Rumor', 'Wait For Confirmation']
  },
  {
    id: 'gs-04-celebrity-divorce-rumor',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'TabloidConfidential',
    handle: '@celeb_splits_daily',
    avatarColor: '#F43F5E',
    avatarInitials: 'TC',
    verified: false,
    timestamp: '1h ago',
    headline: 'Power couple quietly filed divorce papers this morning after fiery argument!',
    bodyText: 'Insiders say the beloved Hollywood couple has officially called it quits after 8 years of marriage. Documents were reportedly filed under seal. Sad day for romance!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'HOLLYWOOD POWER COUPLE FILES SECRET DIVORCE',
      badge: 'RELATIONSHIP RUMOR',
      sourceUrlSnippet: 'exclusive-splits-hub.com/divorce-filed',
      accentColor: '#F43F5E',
    },
    stats: { likes: 18900, shares: 9200, comments: 3100 },
    question: 'How should you evaluate this unverified celebrity divorce report?',
    correctAction: 'VERIFY',
    acceptableActions: ['VERIFY'],
    verdict: 'unverified_rumour',
    evidence: [
      {
        id: 'clue-gs04-1',
        type: 'corroboration',
        title: 'Check 1: Official Public Court Records',
        content: 'County family court clerks confirmed no filings or petitions have been submitted for either spouse.',
        reliability: 'inconclusive',
        note: 'Real divorces involve public court docket filings even when sealed components exist.'
      },
      {
        id: 'clue-gs04-2',
        type: 'source',
        title: 'Check 2: Spokesperson Status',
        content: 'Representatives for both celebrities declined to comment on anonymous tabloid whispers.',
        reliability: 'suspicious',
        note: 'Tabloid blogs frequently invent divorce stories for web traffic during slow entertainment news cycles.'
      }
    ],
    explanation: 'There are no court records or official confirmations. This is an unverified rumor based on anonymous tabloid chatter.',
    whyItMatters: 'Unverified personal relationship gossip infringes on privacy and spreads unfounded stories.',
    learningTakeaway: 'Do not share personal relationship gossip until backed by public legal filings or direct statements.',
    tags: ['Gossips', 'Relationship Rumor', 'Unconfirmed Tabloid']
  },
  {
    id: 'gs-05-influencer-charity-theft',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'DramaChannelNow',
    handle: '@streamer_tea_time',
    avatarColor: '#9333EA',
    avatarInitials: 'DC',
    verified: false,
    timestamp: '2h ago',
    headline: 'SCANDAL: Popular gaming streamer caught stealing $500K from animal shelter fundraiser!',
    bodyText: 'Leaked financial screenshots claim the creator pocketed all donations from last weekend’s 24-hour charity stream. Total betrayal of his audience!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'STREAMER CAUGHT EMBEZZLING ANIMAL CHARITY DONATIONS',
      badge: 'CREATOR DRAMA',
      sourceUrlSnippet: 'streamer-drama-wire.com/charity-theft',
      accentColor: '#9333EA',
    },
    stats: { likes: 41200, shares: 27500, comments: 7800 },
    question: 'What is the right action for this influencer charity theft allegation?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-gs05-1',
        type: 'corroboration',
        title: 'Check 1: Animal Shelter Official Statement',
        content: 'The animal shelter published audited receipts confirming they received 100% of the $500,000 directly through Tiltify platform.',
        reliability: 'verified_official',
        note: 'Reputable charity platforms route donations directly to the non-profit without passing through creator accounts.'
      },
      {
        id: 'clue-gs05-2',
        type: 'image_context',
        title: 'Check 2: Forged Bank Screenshot',
        content: 'The leaked screenshot had visible Photoshop alignment artifacts and an invalid routing code.',
        reliability: 'suspicious',
        note: 'Fabricated bank screenshots are commonly generated using free online invoice generator templates.'
      }
    ],
    explanation: 'The animal shelter confirmed receiving all donations directly. The bank screenshots were forged fakes.',
    whyItMatters: 'False charity fraud accusations damage charitable causes and discourage donors from supporting future drives.',
    learningTakeaway: 'Charity streaming platforms deposit funds directly to registered non-profits, making creator theft claims easy to verify.',
    tags: ['Gossips', 'Charity Hoax', 'Forged Evidence']
  },
  {
    id: 'gs-06-world-tour-official',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'PopSuperstarOfficial',
    handle: '@popstar_official',
    avatarColor: '#14B8A6',
    avatarInitials: 'PS',
    verified: true,
    timestamp: '3h ago',
    headline: 'ANNOUNCEMENT: 2026 Stadium World Tour dates and ticket pre-sale officially open!',
    bodyText: 'We are hitting 30 cities across North America and Europe starting this August! Pre-sale registration is now live on our verified artist portal and Ticketmaster.',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: '2026 WORLD TOUR DATES ANNOUNCED',
      badge: 'OFFICIAL TOUR BULLETIN',
      sourceUrlSnippet: 'popstar-official-tour.com/tickets-2026',
      accentColor: '#14B8A6',
    },
    stats: { likes: 112000, shares: 64000, comments: 14200 },
    question: 'How should you treat this verified artist tour announcement?',
    correctAction: 'SHARE',
    acceptableActions: ['SHARE'],
    verdict: 'authentic_and_verified',
    evidence: [
      {
        id: 'clue-gs06-1',
        type: 'source',
        title: 'Check 1: Verified Official Artist Account',
        content: 'Posted from the verified official channel and cross-posted to the artist’s verified YouTube and Spotify pages.',
        reliability: 'verified_official',
        note: 'Official verified channels of artists are authentic sources for tour and release announcements.'
      },
      {
        id: 'clue-gs06-2',
        type: 'corroboration',
        title: 'Check 2: Ticketing Partner Listings',
        content: 'Ticketmaster and major stadium venues have the concert dates officially listed on their verified calendars.',
        reliability: 'verified_official',
        note: 'Stadium venues publish direct calendar bookings for legitimate tours.'
      }
    ],
    explanation: 'This is an authentic, verified tour announcement published directly by the artist and ticketing partner venues.',
    whyItMatters: 'Sharing verified official tour dates helps fans buy genuine tickets at face value rather than through scalper scams.',
    learningTakeaway: 'Trust tour dates when announced directly by verified artists with confirmed venue listings.',
    tags: ['Official News', 'Tour Announcement', 'Verified Artist']
  },
  {
    id: 'gs-07-secret-royal-feud',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'RoyalWhispersDaily',
    handle: '@monarchy_insider',
    avatarColor: '#6B7280',
    avatarInitials: 'RW',
    verified: false,
    timestamp: '4h ago',
    headline: 'LEAKED FOOTAGE: Royal family member storms out of palace during fiery private summit!',
    bodyText: 'Secret security camera clip shows prince throwing tea cup and storming into awaiting limousine after furious family row. Royal experts stunned!',
    graphicType: 'photo_preview',
    graphicDetails: {
      headlineSnippet: 'SECURITY FOOTAGE OF ROYAL PALACE ALTERCATION',
      badge: 'LEAKED VIDEO',
      sourceUrlSnippet: 'royal-scandals-exposed.net/palace-fight',
      accentColor: '#6B7280',
    },
    stats: { likes: 19500, shares: 12800, comments: 3400 },
    question: 'What is the correct action for this supposed leaked palace fight video?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-gs07-1',
        type: 'image_context',
        title: 'Check 1: Clip Provenance',
        content: 'The footage is actually a scene from a 2021 fictional TV drama series filmed at an estate in Surrey, England.',
        reliability: 'suspicious',
        note: 'Television period drama clips are frequently degraded in quality and branded as "leaked CCTV footage".'
      },
      {
        id: 'clue-gs07-2',
        type: 'corroboration',
        title: 'Check 2: Palace Communications',
        content: 'Press correspondents verified no family summits took place on the date and the location shown is not a royal residence.',
        reliability: 'verified_official',
        note: 'Real royal palace grounds are distinct and verifiable by accredited architectural historians.'
      }
    ],
    explanation: 'The video is a clip from a 2021 fictional television series passed off as "leaked CCTV footage".',
    whyItMatters: 'Using TV clips to fabricate real-world family fights is deceptive entertainment clickbait.',
    learningTakeaway: 'Blurry "security camera leaks" of famous figures are frequently scenes from TV series or commercial movies.',
    tags: ['Gossips', 'TV Scene Hoax', 'Royal Gossip']
  },
  {
    id: 'gs-08-director-quits-blockbuster',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'CinemaBuzzScoop',
    handle: '@hollywood_breakdowns',
    avatarColor: '#047857',
    avatarInitials: 'CB',
    verified: false,
    timestamp: '5h ago',
    headline: 'CRISIS ON SET: Famous director walks off $200M sci-fi sequel after fist fight with lead actor!',
    bodyText: 'Production has shut down indefinitely after the Oscar-winning director reportedly got into a physical fight with the lead star. Studio in complete panic!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'DIRECTOR QUITS SCI-FI SEQUEL AFTER FIST FIGHT ON SET',
      badge: 'PRODUCTION DISASTER',
      sourceUrlSnippet: 'movie-meltdowns-247.com/director-walkout',
      accentColor: '#047857',
    },
    stats: { likes: 21300, shares: 13900, comments: 3600 },
    question: 'How should you treat this movie set fist fight and walkout story?',
    correctAction: 'FLAG',
    acceptableActions: ['FLAG'],
    verdict: 'fabricated',
    evidence: [
      {
        id: 'clue-gs08-1',
        type: 'corroboration',
        title: 'Check 1: Director & Star Social Media',
        content: 'The director and actor posted a funny video together from the film set two hours ago, laughing about the fake report.',
        reliability: 'verified_official',
        note: 'Active production teams often debunk fake set drama with direct behind-the-scenes video updates.'
      },
      {
        id: 'clue-gs08-2',
        type: 'source',
        title: 'Check 2: Studio Production Notice',
        content: 'The film studio confirmed principal photography is progressing exactly on schedule with no production shutdown.',
        reliability: 'verified_official',
        note: 'Actual production halts for major blockbusters require formal union and insurer notifications.'
      }
    ],
    explanation: 'The director and lead actor are currently filming together normally. The story was invented for viral drama clicks.',
    whyItMatters: 'Invented movie production chaos creates false drama to monetize fan anxiety.',
    learningTakeaway: 'When wild claims of set violence surface, check if the creators themselves have posted updates.',
    tags: ['Gossips', 'Movie Drama', 'Fabricated Scandal']
  },
  {
    id: 'gs-09-music-collab-whisper',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'RapDropAlerts',
    handle: '@music_leaks_central',
    avatarColor: '#6D28D9',
    avatarInitials: 'RD',
    verified: false,
    timestamp: '6h ago',
    headline: 'SURPRISE ALBUM: Rival rap stars secretly recorded a joint album dropping at midnight tonight!',
    bodyText: 'Industry leaks claim their bitter rivalry was fake all along. The 14-track collab LP has reportedly already been loaded into streaming databases!',
    graphicType: 'news_card',
    graphicDetails: {
      headlineSnippet: 'RIVAL ICONS DROPPING SURPRISE JOINT ALBUM TONIGHT',
      badge: 'ALBUM LEAK',
      sourceUrlSnippet: 'surprise-music-drops.net/collab-album',
      accentColor: '#6D28D9',
    },
    stats: { likes: 47800, shares: 31200, comments: 8500 },
    question: 'How should you evaluate this unconfirmed surprise album drop rumor?',
    correctAction: 'VERIFY',
    acceptableActions: ['VERIFY'],
    verdict: 'unverified_rumour',
    evidence: [
      {
        id: 'clue-gs09-1',
        type: 'corroboration',
        title: 'Check 1: Music Streaming Databases',
        content: 'Spotify, Apple Music, and ASCAP registry show zero metadata or track registrations for the rumored album.',
        reliability: 'inconclusive',
        note: 'Commercial albums require registered ISRC codes and distributor ingestion prior to release.'
      },
      {
        id: 'clue-gs09-2',
        type: 'image_context',
        title: 'Check 2: Cover Art Investigation',
        content: 'The shared album artwork was created by a graphic design student and posted on Behance last month as a fan concept.',
        reliability: 'suspicious',
        note: 'Fan-made concept art is frequently picked up by gossip accounts and presented as official album covers.'
      }
    ],
    explanation: 'The album cover was fan art and no songs are registered with music distributors. It is an unverified rumor.',
    whyItMatters: 'Unverified album drop rumors disappoint fans and spread misleading music release dates.',
    learningTakeaway: 'Check official distributor registries or artist profiles before staying up for unannounced midnight album drops.',
    tags: ['Gossips', 'Album Rumor', 'Fan Art']
  },
  {
    id: 'gs-10-actor-donates-salary',
    category: 'gossips',
    difficulty: 'easy',
    authorName: 'GlobalCharityNews',
    handle: '@humanitarian_spotlight',
    avatarColor: '#0D9488',
    avatarInitials: 'GC',
    verified: true,
    timestamp: '7h ago',
    headline: 'HEARTWARMING: A-list action star donates entire $15M movie salary to children’s cancer hospital.',
    bodyText: 'The hospital network confirmed receiving the transformational gift to fund new pediatric oncology wings and family housing. A true hero on and off screen.',
    graphicType: 'quote_card',
    graphicDetails: {
      headlineSnippet: 'ACTION STAR DONATES $15M SALARY TO CHILDREN’S HOSPITAL',
      badge: 'VERIFIED PHILANTHROPY',
      sourceUrlSnippet: 'childrens-health-network.org/press/pediatric-gift-2026',
      accentColor: '#0D9488',
    },
    stats: { likes: 88000, shares: 42000, comments: 7900 },
    question: 'What is the appropriate action for this verified hospital donation report?',
    correctAction: 'SHARE',
    acceptableActions: ['SHARE'],
    verdict: 'authentic_and_verified',
    evidence: [
      {
        id: 'clue-gs10-1',
        type: 'source',
        title: 'Check 1: Children’s Hospital Press Release',
        content: 'The authenticated hospital foundation published an official press release and held a press conference thanking the donor.',
        reliability: 'verified_official',
        note: 'Hospital foundations publish audited announcements for major philanthropic gifts.'
      },
      {
        id: 'clue-gs10-2',
        type: 'corroboration',
        title: 'Check 2: Associated Press Coverage',
        content: 'The Associated Press and major newspapers covered the donation ceremony with direct quotes from hospital medical directors.',
        reliability: 'verified_official',
        note: 'Major philanthropic gifts covered by recognized news agencies are verified.'
      }
    ],
    explanation: 'This is an authentic, verified philanthropic donation confirmed by both the hospital foundation and major news agencies.',
    whyItMatters: 'Sharing verified acts of charity spreads positive news and highlights vital medical facilities.',
    learningTakeaway: 'Look for direct confirmation from the receiving institution when reading about celebrity charity donations.',
    tags: ['Official News', 'Verified Charity', 'Celebrity Giving']
  }
];
