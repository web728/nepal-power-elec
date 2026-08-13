export type Faq = {
  question: string;
  answer: string;
  plainText?: string;
  linkHref?: string;
  linkLabel?: string;
};

export const generalFaqs: Faq[] = [
  {
    question: "When and where will the Nepal Electric, Power and Lights Expo 2026 take place?",
    answer: "The 5th Nepal Electric, Power and Lights International Expo 2026 will take place from 4-6 September 2026 at Bhrikuti Mandap Exhibition Hall in Kathmandu, Nepal.",
  },
  {
    question: "What are the exhibition timings?",
    answer: "The exhibition will be open from 10:00 AM to 6:00 PM on all three event days: 4, 5, and 6 September 2026."
  },
  {
    question: "What industries and product categories does the 5th Nepal Power Expo cover?",
    answer: "The exhibition covers electrical equipment, power generation, transmission and distribution, renewable energy, solar technology, lighting, wires and cables, transformers, switchgear, batteries, inverters, UPS systems, automation, electrical components, electro-mobility, home appliances, and allied technologies."
  },
  {
    question: "Who organizes the Nepal Electric, Power and Lights Expo?",
    answer: "The expo is jointly organized by Futurex Trade Fair and Events Pvt. Ltd., Exhibitions & Trade Services India Pvt. Ltd. (ETSIPL), and Media Space Solutions Pvt. Ltd."
  },
  {
    question: "Where can I download the event brochure and post-show report?",
    answer: "You can download the official 2026 Event Brochure and the 2025 Post-Show Report directly from our Event Documents section or request it via our About The Expo section."
  },
  {
    question: "What were the results and statistics of the 2025 edition?",
    answer: "The 2025 edition featured more than 150 exhibitors, participation from over 5 countries, 300+ brands and solutions, and over 15,000 visitors. Attendance and participation figures are compiled from post-show evaluations."
  },
  {
    question: "How can media representatives get accreditation or details?",
    answer: "Media representatives can request official press passes, interviews, photos, and press materials by getting in touch through our Contact Us page."
  },
  {
    question: "Who should I contact for more information?",
    answer: "For exhibitor participation, visitor registration, sponsorship, or general assistance, please reach out via our official Contact Us page."
  }
];

export const exhibitorFaqs: Faq[] = [
  {
    question: "Who is eligible to exhibit at the 5th Nepal Power & Electric Expo 2026?",
    answer: "Manufacturers, suppliers, exporters, technology providers, and solution partners across electrical, energy, lighting, and automation sectors are eligible."
  },
  {
    question: "Why should my company exhibit at this trade fair in Nepal?",
    answer: "Exhibiting gives you direct access to key decision-makers, government officials, contractors, and distributors in Nepal's rapidly growing energy market."
  },
  {
    question: "How can my company book a stand or participate as an exhibitor?",
    answer: "Companies can submit a stand enquiry through our Book a Stand page or reach out directly via the Contact Us page. Stand allocation is subject to availability, technical requirements, and organizer approval."
  },
  {
    question: "Does submitting the enquiry form guarantee stall allocation?",
    answer: "No, submitting a request via the Book a Stand form is an initial enquiry. Space allocation is confirmed only after formal documentation, approval, and completion of the booking process."
  },
  {
    question: "Can I choose or request a specific stall location in the exhibition hall?",
    answer: "Yes, stall location preferences can be submitted during booking. However, final stall allocation at Bhrikuti Mandap Hall depends on availability, hall layouts, booth size, and organizer approval."
  },
  {
    question: "Can international companies exhibit at the expo?",
    answer: "Yes. International manufacturers, exporters, technology providers, and solution companies can apply. Overseas exhibitors are responsible for arranging their visas, travel, accommodation, freight, insurance, and customs clearance."
  },
  {
    question: "Is the 2026 exhibitor list available?",
    answer: "The official list of confirmed exhibitors participating in the 5th Nepal Electric, Power and Lights Expo 2026 will be published on our website prior to the event."
  },
  {
    question: "Are live machinery or powered equipment demonstrations allowed at the booth?",
    answer: "Yes. Exhibitors planning live, moving, heated, noisy, high-load, or technically complex demonstrations must disclose requirements during booking and obtain written permission from the Organizers for safety compliance."
  },
  {
    question: "Can exhibitors sell products directly during the exhibition?",
    answer: "Commercial discussions, order enquiries, and distributor negotiations are encouraged. Any direct sales activity must strictly comply with organizer rules, venue regulations, and local laws in Nepal."
  },
  {
    question: "Are sponsorship and branding opportunities available?",
    answer: "Yes. Companies can contact the organizing team to enquire about sponsorship, branding, promotional, and visibility opportunities for the 2026 edition."
  },
  {
    question: "Can I use the 5th Nepal Electric Expo branding and logo on my marketing materials?",
    answer: "Official event logos and promotional banners can be used by exhibitors only after formal stall booking confirmation."
  },
  {
    question: "Who is responsible for freight, customs clearance, and travel logistics?",
    answer: "Exhibitors are responsible for managing their shipping, customs clearance, travel visas, and accommodations. Detailed logistical guidance can be obtained through our Contact Us team."
  },
  {
    question: "How do I make payments for stand booking?",
    answer: "All payments must be made strictly according to the official invoices and banking instructions issued during the Stand Booking process."
  }
];

export const visitorFaqs: Faq[] = [
  {
    question: "Who should visit the 5th Nepal Electric & Power Expo 2026?",
    answer: "The expo is designed for trade and professional visitors including electricians, engineers, consultants, EPC contractors, project developers, utility professionals, importers, distributors, architects, government representatives, and institutional buyers."
  },
  {
    question: "Is entry to the exhibition free?",
    answer: "Yes. Entry to the Nepal Electric, Power and Lights International Expo 2026 is completely free for registered visitors."
  },
  {
    question: "How can I register as a visitor?",
    answer: "You can pre-register for free entry by filling out the form on our Register to Visit page. Advance registration is recommended for faster entry at the venue."
  },
  {
    question: "Does pre-registration or visitor registration guarantee entry?",
    answer: "Visitor entry remains subject to verification, venue capacity regulations, and the official event entry guidelines at the venue gates."
  },
  {
    question: "Is the exhibition open to the general public?",
    answer: "The expo is primarily intended for trade and professional visitors. General visitors with an interest in electrical, energy, lighting, and automation industries may attend after completing registration."
  },
  {
    question: "Can visitors below 18 years of age attend the exhibition?",
    answer: "Visitors below 18 years of age may attend only when accompanied by a parent or legal guardian. Unaccompanied minors will not be permitted entry."
  },
  {
    question: "Can I register multiple colleagues or group delegations?",
    answer: "Yes, each colleague or trade delegate should individually complete the registration form."
  },
  {
    question: "Can visitors arrange meetings with exhibitors before the event?",
    answer: "Visitors may contact confirmed exhibitors directly once the exhibitor directory is published or reach out to the organizing team for networking opportunities."
  },
  {
    question: "Are product photography and video recording allowed inside the exhibition?",
    answer: "General photography is allowed, but photography or video recording may be restricted at certain stands. Visitors should obtain permission from the exhibitor before photographing or recording specific booths."
  },
  {
    question: "Can visitors directly purchase products or equipment at the expo?",
    answer: "The expo is primarily a B2B trade show for networking and sourcing. Commercial deals or direct purchases are arranged independently between visitors and exhibitors subject to local regulations."
  },
  {
    question: "Does the organizer provide visa assistance or arrange travel/hotels?",
    answer: "Visitors and exhibitors are responsible for their own travel, hotel stays, and Nepal visa arrangements. The organizer can provide event-related participation documents where applicable."
  },
  {
    question: "Is parking available at the venue?",
    answer: "Parking availability at Bhrikuti Mandap may be limited and subject to venue arrangements. Visitors are advised to plan travel in advance."
  },
  {
    question: "How can I request special accessibility or assistance at the venue?",
    answer: "If you require special assistance at the venue, please reach out to us prior to your arrival via our Contact Us page."
  }
];