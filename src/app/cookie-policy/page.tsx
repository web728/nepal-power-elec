import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Cookie Policy | Nepal Electric, Power and Lights Expo" },
  description:
    "Learn how the expo website uses essential, analytics and third-party cookies and how preferences can be managed.",
  alternates: { canonical: "/cookie-policy" },
};

const sections = [
  {
    heading: "What Cookies Are",
    body: "Cookies are small files stored on a user's device. They may support website security, form operation, session management, preferences, analytics and embedded services.",
  },
  {
    heading: "Cookie Categories",
    body: [
      "Essential Cookies — Required for security, form submission, session operation, preference storage and basic navigation. These cookies cannot normally be disabled through the website settings.",
      "Preference Cookies — Remember selected choices, such as language or interface preferences.",
      "Analytics Cookies — Help the organizers understand aggregate website use, popular pages, downloads, devices and referral sources. These should operate only in accordance with the website's consent settings.",
      "Third-Party Content — Maps, videos, registration systems or social platforms may use their own cookies when the user activates or visits those services.",
    ],
  },
  {
    heading: "User Choices",
    body: "The cookie banner should provide Accept All, Reject Non-Essential and Manage Preferences options. Users should be able to reopen Cookie Settings from the website footer.",
  },
  {
    heading: "Browser Controls",
    body: "Users may also delete or block cookies through browser settings. Blocking essential cookies may affect forms or other website functions.",
  },
  {
    heading: "Contact",
    body: "Cookie and tracking questions may be submitted through the Contact page.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Cookie Policy", href: "/cookie-policy" }]} />
      <LegalPage
        title="Cookie Policy"
        effectiveNote=""
        sections={sections}
      />
    </>
  );
}
