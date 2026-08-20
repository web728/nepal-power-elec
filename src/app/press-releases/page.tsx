"use client";

import { Phone, Mail, MapPin, Clock, Sparkles, Download, FileText } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { motion, type Variants } from "framer-motion"; // 1. Variants type import kiya

const breadcrumbs = [{ label: "Media", href: "/news" }, { label: "Press Releases" }];

// 2. Variants explicitly type kar diye
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function PressReleasesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Media", href: "/news" },
          { label: "Press Releases", href: "/press-releases" },
        ]}
      />

      <PageHero
        title="Official Announcements"
        description="Event updates, press materials, and media information from the organizing team."
        breadcrumbs={breadcrumbs}
      />

      <Container as="section" className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-12 sm:space-y-16">

          {/* Main Press Release Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="relative overflow-hidden border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10 md:p-12 transition-all hover:shadow-md">
              {/* Header Badge & Location */}
              <div className="border-b border-slate-100 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                    <Sparkles className="h-3.5 w-3.5" />
                    प्रेस विज्ञप्ति
                  </span>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-teal" />
                    <span>काठमाडौं, नेपाल</span>
                  </div>
                </div>

                <h1 className="mt-5 text-2xl font-black leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै
                </h1>
              </div>

              {/* Banner Image */}
              <div className="relative mt-8 w-full overflow-hidden rounded-2xl border border-slate-100">
                <Image
                  src="/press-release/nepal-electric-expo-2026-banner.jpeg"
                  alt="नेपाल इलेक्ट्रिक, पावर एण्ड लाइट्स तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०२६"
                  width={1429}
                  height={695}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>

              {/* Main Content */}
              <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-slate-700">
                <p>
                  <strong>काठमाडौं —</strong> मिडिया स्पेस सोलुसन्स प्रा.लि., एक्जिबिसन एण्ड ट्रेड सर्भिसेस इन्डिया प्रा.लि. तथा फ्युचरेक्स
                  ट्रेड फेयर एण्ड इभेन्ट्स प्रा.लि. को संयुक्त आयोजनामा नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स
                  एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी आगामी २०८३ साल भदौ १९ देखि २१ गतेसम्म काठमाडौं स्थित भृकुटीमण्डप प्रदर्शनी
                  हलमा आयोजना हुने भएको छ ।
                </p>

                <p>
                  नेपालको विद्युत, ऊर्जा, उपभोक्ता इलेक्ट्रोनिक्स तथा होम अप्लायन्सेस क्षेत्रलाई अन्तर्राष्ट्रिय व्यावसायिक मञ्चसँग जोड्ने
                  उद्देश्यले आयोजना हुन लागेको यस प्रदर्शनीमा स्वदेशी तथा विदेशी गरी १०० भन्दा बढी कम्पनीहरूको स्टल रहनेछन्। प्रदर्शनीले
                  उद्योग, व्यापार तथा प्रविधिबीच सहकार्य अभिवृद्धि गर्दै यस क्षेत्रको समग्र विकासमा महत्वपूर्ण योगदान पुर्‍याउने अपेक्षा
                  गरिएको छ ।
                </p>

                {/* Expo Timing Highlight Box */}
                <div className="my-2 rounded-2xl border border-teal/20 bg-teal/5 p-5 text-slate-800">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-semibold text-slate-900">प्रदर्शनी विवरण:</p>
                      <p className="mt-1">
                        मिति: <strong>२०८३ साल भदौ १९ देखि २१ गतेसम्म (४–६ सेप्टेम्बर २०२६)</strong> । स्थान:{" "}
                        <strong>भृकुटीमण्डप प्रदर्शनी हल, काठमाडौं</strong> । प्रदर्शनीमा निःशुल्क प्रवेश रहनेछ।
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  नेपालमा बढ्दो जलविद्युत उत्पादनको प्रभावकारी उपयोग, ऊर्जा दक्षताको प्रवर्द्धन तथा विद्युतीय पूर्वाधारको विकासलाई थप
                  व्यवस्थित बनाउन प्रदर्शनीले विशेष भूमिका खेल्ने विश्वास आयोजकको रहेको छ । साथै ऊर्जा तथा विद्युतीय व्यवसायसँग सम्बन्धित
                  नवीनतम प्रविधि, उत्पादन तथा सेवाहरूको प्रदर्शनमार्फत उद्योगी, व्यवसायी, उत्पादक, आयातकर्ता, वितरक तथा सेवा प्रदायकबीच
                  नयाँ व्यावसायिक अवसर सिर्जना गर्ने लक्ष्य राखिएको छ ।
                </p>

                <p>
                  प्रदर्शनीले राष्ट्रिय तथा अन्तर्राष्ट्रिय स्तरका उद्योगी, व्यवसायी, उद्यमी, उत्पादक, वितरक तथा सम्बन्धित सरोकारवालाहरूलाई
                  एउटै व्यावसायिक प्लेटफर्ममा ल्याई ज्ञान, अनुभव र प्रविधिको आदानप्रदान गर्ने अवसर प्रदान गर्नेछ। यसबाट विद्युत तथा
                  विद्युतीय सामग्रीसम्बन्धी उद्योगको प्रवर्द्धन, व्यापार विस्तार तथा दीर्घकालीन व्यावसायिक सहकार्यलाई थप मजबुत बनाउने
                  अपेक्षा गरिएको छ। उद्योगमैत्री वातावरण निर्माण, नवप्रवर्तनको प्रवर्द्धन तथा निजी क्षेत्रबीच सहकार्य विस्तारमा समेत
                  प्रदर्शनी महत्वपूर्ण बन्ने विश्वास लिइएको छ ।
                </p>

                <p>
                  प्रदर्शनीमा नेपाली उत्पादनसँगै बहुराष्ट्रिय कम्पनीहरूद्वारा उत्पादित ट्रान्समिसन तथा डिस्ट्रिब्युसन सामग्री, ऊर्जा
                  आपूर्ति तथा नियन्त्रण प्रणाली, हाउस वायरिङ सामग्री, वायर तथा केबल, कन्डक्टर, अत्याधुनिक स्विच, एलईडी लाइटिङ,
                  इलेक्ट्रोनिक्स उपकरण, घरेलु विद्युतीय उपकरण, कार्यालय प्रविधि, सञ्चार उपकरण, सूचना प्रविधि, वैकल्पिक ऊर्जा प्रणाली
                  लगायत विद्युत तथा इलेक्ट्रोनिक्स क्षेत्रसँग सम्बन्धित विविध उत्पादन, प्रविधि तथा सेवाहरू प्रदर्शन गरिनेछन्। निःशुल्क
                  प्रवेश रहने यस प्रदर्शनीमा देश भित्र तथा बाहिरबाट आमन्त्रित अतिथि, उद्योगी व्यवसायी, सरकारका उच्च अधिकारी, आर्किटेक्चर,
                  इलेक्ट्रीकल इन्जीनियर, इन्टेरियर डेकोरेटर, प्राविधिककर्मी, नेपाल भरका विद्युतीय व्यवसायीहरु, मिडियाकर्मी, विद्यार्थी
                  एवं आम सर्वसाधारण गरी ३०,००० भन्दा बढी आगन्तुकहरूले अवलोकन गर्ने विश्वास आयोजकले लिएको छ ।
                </p>

                <p>
                  यस अन्तर्राष्ट्रिय प्रदर्शनीमा सहयोगी संस्थाको भूमिकामा नेपाल चेम्बर अफ कमर्स, नेपाल इन्जिनियर्स एशोसिएसन, सोसाइटी अफ
                  कन्सल्टिङ आर्किटेक्चरल एण्ड इन्जिनियरिङ फर्मस्, सोसाइटी अफ इलेक्ट्रिकल इन्जिनियर्स नेपाल (सीन) तथा स्वतन्त्र ऊर्जा
                  उत्पादकहरूको संस्था (इप्पान) रहेका छन् ।
                </p>

                <p>
                  आयोजकका अनुसार, प्रदर्शनीले नेपालमा ऊर्जा, विद्युत तथा उपभोक्ता इलेक्ट्रोनिक्स उद्योगको व्यावसायिक विस्तार, प्रविधि
                  हस्तान्तरण, लगानी प्रवर्द्धन तथा अन्तर्राष्ट्रिय सहकार्यलाई थप सशक्त बनाउँदै सम्बन्धित क्षेत्रको दिगो विकासमा
                  महत्वपूर्ण योगदान पुर्‍याउने अपेक्षा गरिएको छ ।
                </p>
              </div>

              {/* Download Buttons */}
              <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-100 pt-8">
                <a
                  href="/press-release/nepal-electric-expo-2026-press-release.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal/90"
                >
                  <FileText className="h-4 w-4" />
                  Download Press Release (PDF)
                </a>
                <a
                  href="/press-release/nepal-electric-expo-2026-banner.jpeg"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal/50 hover:text-teal"
                >
                  <Download className="h-4 w-4" />
                  Download Image
                </a>
                <a
                  href="/press-release/Nepal-Electronics-and-Electrical-Expo-2026-Press-Release.docx"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal/50 hover:text-teal"
                >
                  <FileText className="h-4 w-4" />
                  Download Word File
                </a>
              </div>
            </Card>
          </motion.div>

          {/* About the Expo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 sm:p-8"
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal">About the Expo</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              The Nepal Electric, Power and Lights International Expo is a B2B trade exhibition dedicated to the electrical, power,
              renewable-energy, lighting, automation and allied industries. It connects manufacturers, exporters, suppliers and technology
              providers with importers, distributors, EPC contractors, project developers, engineers, consultants, procurement
              professionals and institutional buyers.
            </p>
          </motion.div>

          {/* Media Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeading
              title="Media Enquiries"
              description="Media representatives may contact the organizing team for official event information, interview requests, press materials, exhibition updates, media registration and coverage-related enquiries."
            />

           <motion.div 
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
>
  {/* Array ko reverse karke 1st waale card ko sabse pehle laaya gaya hai */}
 {/* Array items ko rotate karke 1st -> 2nd, 2nd -> 3rd, aur 3rd -> 1st banaya gaya hai */}
{(() => {
  const orgs = siteConfig.organizers;
  // Last element ko sabse aage shift kar rahe hain
  const reorderedOrgs = orgs.length > 0 ? [orgs[orgs.length - 1], ...orgs.slice(0, -1)] : orgs;

  return reorderedOrgs.map((org) => (
    <motion.div key={org.key} variants={itemVariants} whileHover={{ y: -4 }}>
      <Card className="flex h-full flex-col justify-between border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-teal/50 hover:shadow-lg">
        <div>
          <h3 className="text-base font-bold text-slate-900">{org.name}</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">{org.contactName}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm font-medium">
          <a
            href={`tel:${org.phoneHref}`}
            className="group flex items-center gap-2.5 text-slate-700 transition-colors hover:text-teal"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            </div>
            <span className="text-xs sm:text-sm">{org.phone}</span>
          </a>

          <a
            href={`mailto:${org.email}`}
            className="group flex items-center gap-2.5 text-slate-700 transition-colors hover:text-teal"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            </div>
            <span className="break-all text-xs sm:text-sm">{org.email}</span>
          </a>
        </div>
      </Card>
    </motion.div>
  ));
})()}
</motion.div>
          </motion.div>

        </div>
      </Container>
    </>
  );
}