export type MediaItem = {
  title: string;
  source: string;
  href: string;
  date?: string;
};

export type PressAsset = {
  id: string;
  title: string;
  size: string;
  href: string;
  type: "pdf" | "image";
  description: string;
  previewUrl?: string;
};

export const pressAssets: PressAsset[] = [
  {
    id: "pdf-1",
    title: "NewsPaper Coverage",
    size: "2.4 MB PDF",
    href: "/media/press-release-official-2026.pdf",
    type: "pdf",
    description: "News paper coverage regarding the 5th Nepal Electric, Power and Lights International Expo 2026.",
  },
  {
    id: "pdf-2",
    title: "Newspaper Coverage",
    size: "4.8 MB PDF",
    href: "/media/expo-guidebook-2026.pdf",
    type: "pdf",
    description: "News paper coverage regarding the 5th Nepal Electric, Power and Lights International Expo 2026.",
  },
  {
    id: "pdf-3",
    title: "Newspaper Coverage",
    size: "3.2 MB PDF",
    href: "/media/nepal-electric-expo-2026-news.pdf",
    type: "pdf",
    description: "News paper coverage regarding the 5th Nepal Electric, Power and Lights International Expo 2026.",
  },
  {
    id: "img-1",
    title: "Official Expo HD Banner",
    size: "1.8 MB JPG",
    href: "/media/nepal-electric-power-and-lights.jpeg",
    previewUrl: "/media/nepal-electric-power-and-lights.jpeg",
    type: "image",
    description: "High-resolution main poster image for news publishing.",
  }, {
    id: "img-2",
    title: "Official Expo HD Banner",
    size: "1.8 MB JPG",
    href: "/media/nepal-electric-power-lights-expo.jpeg",
    previewUrl: "/media/nepal-electric-power-lights-expo.jpeg",
    type: "image",
    description: "High-resolution main poster image for news publishing.",
  }, {
    id: "img-3",
    title: "Official Expo HD Banner",
    size: "1.8 MB JPG",
    href:  "/media/nepal-electric-power-lights-expo-2026.jpeg",
    previewUrl: "/media/nepal-electric-power-lights-expo-2026.jpeg",
    type: "image",
    description: "High-resolution main poster image for news publishing.",
  },
//    {
//     id: "img-4",
//     title: "Official Expo HD Banner",
//     size: "1.8 MB JPG",
//     href: "/media/nepal-electric-power-lights-expo-news.jpeg",
//     previewUrl: "/media/nepal-electric-power-lights-expo-news.jpeg",
//     type: "image",
//     description: "High-resolution main poster image for news publishing.",
//   }, 
//   {
//     id: "img-5",
//     title: "Official Expo HD Banner",
//     size: "1.8 MB JPG",
//     href: "/media/nepal-power-elec.jpeg",
//     previewUrl: "/media/nepal-power-elec.jpeg",
//     type: "image",
//     description: "High-resolution main poster image for news publishing.",
//   },
  {
    id: "img-6",
    title: "Inauguration Stage Visual",
    size: "2.1 MB JPG",
    href:  "/media/nepal-power-expo-news.jpeg",
     previewUrl: "/media/nepal-power-expo-news.jpeg",
   
    type: "image",
    description: "Official stage setup photo with event branding.",
  },{
    id: "img-7",
    title: "Inauguration Stage Visual",
    size: "2.1 MB JPG",
    href: "/media/inauguration-ceremony.jpeg",
    previewUrl: "/media/inauguration-ceremony.jpeg",
    type: "image",
    description: "Official stage setup photo with event branding.",
  },
  {
    id: "img-8",
    title: "Exhibition Hall Overview",
    size: "3.5 MB JPG",
    href: "/media/exhibition-floor-view.jpeg",
    previewUrl: "/media/exhibition-floor-view.jpeg",
    type: "image",
    description: "Wide angle shot of Bhrikutimandap expo floor.",
  },
  {
    id: "img-9",
    title: "Consumer Electronics Zone",
    size: "2.9 MB JPG",
    href: "/media/consumer-electronics-zone.jpeg",
    previewUrl: "/media/consumer-electronics-zone.jpeg",
    type: "image",
    description: "Snapshots of home appliances and smart tech stalls.",
  },
  {
    id: "img-10",
    title: "Power & Energy Stalls",
    size: "3.1 MB JPG",
    href: "/media/power-energy-stalls.jpeg",
    previewUrl: "/media/power-energy-stalls.jpeg",
    type: "image",
    description: "Lighting and renewable power tech exhibits.",
  },
  {
    id: "img-11",
    title: "Nepal Power News Clipping",
    size: "3.1 MB JPG",
    href: "/media/nepal-power-news.jpeg",
    previewUrl: "/media/nepal-power-news.jpeg",
    type: "image",
    description: "Lighting and renewable power tech exhibits.",
  },
  {
    id: "img-12",
    title: "Media Coverage Highlights 2026",
    size: "3.1 MB JPG",
    href: "/media/news-2026.jpeg",
    previewUrl: "/media/news-2026.jpeg",
    type: "image",
    description: "Lighting and renewable power tech exhibits.",
  },
];

export const mediaCoverage: MediaItem[] = [
  // Existing Media Items
  { title: "भृकुटीमण्डपमा विद्युत् र इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुने", source: "Kantipur Press", href: "https://kantipurpress.com/2026/3912/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Banijya Post", href: "https://banijyapost.com/news/electronic-expo" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्स प्रदर्शनी", source: "Britant News", href: "https://britantnews.com/2026/08/20/48945/electrical-and-electronics-exhibition-in-kathmandu-from-bhadra-19/" },
  { title: "भदौ १९ देखि विद्युत् तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी, १०० बढी कम्पनी सहभागी हुने", source: "Bizpati", href: "https://bizpati.com/2026/08/214988/" },
  { title: "'नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३' आयोजना हुँदै", source: "Bizshala", href: "https://bizshala.com/article/31906" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Equity Nepal", href: "https://equitynepal.com/2026/08/20/97987/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Mountain Khabar", href: "https://www.mountainkhabar.com/2026/08/20/235570/" },
  { title: "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुने", source: "Hamro Artha", href: "https://hamroartha.com/news/134973" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "CNN Khabar", href: "https://cnnkhabar.com/content/15606" },
  { title: "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Corporate Khabar", href: "https://corporatekhabar.com/electric-and-electronics/" },
  { title: "१०० भन्दा बढी इलेक्ट्रिकल तथा इलेक्ट्रोनिक्स कम्पनीहरूको प्रदर्शनी", source: "Aarthik News", href: "https://aarthiknews.com/news/125753/exhibition-of-more-than-100-electrical-and/" },
  { title: "भदौ १९ देखि विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Arthakoartha", href: "https://arthakoartha.com/archives/115373" },
  { title: "काठमाडौंमा भदौ १९ देखि 'नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स' प्रदर्शनी हुने", source: "Merolagani", href: "https://merolagani.com/NewsDetail.aspx?newsID=129907" },
  { title: "भदौ १९ देखि भृकुटीमण्डपमा विद्युत् तथा इलेक्ट्रोनिक्ससम्बन्धी अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Arthabazar", href: "https://arthabazar.com/131948" },
  { title: "भदौ १९ देखि प्रदर्शनी हुँदै", source: "Arthapranali", href: "https://arthapranali.com/2026/08/33701/" },
  { title: "भृकुटीमण्डपमा विद्युत, ऊर्जा र विद्युतीय उपकरणको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै, ३० हजारभन्दा बढी आगन्तुकको अपेक्षा", source: "Nepal Profit", href: "https://nepalprofit.com/2026/08/58753/" },
  { title: "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Notebazar", href: "https://notebazar.com/news/2026/08/20/165322/" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Sourya Online", href: "https://www.souryaonline.com/2026/08/727407.html" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी हुँदै", source: "Corporate Nepal", href: "https://www.corporatenepal.com/story/285416" },
  { title: "भदौ १९ देखि भृकुटीमण्डपमा 'नेपाल इलेक्ट्रिक, पावर तथा कन्ज्युमर इलेक्ट्रोनिक्स' अन्तर्राष्ट्रिय प्रदर्शनी हुने", source: "Bittiya Post", href: "https://www.bittiyapost.com/news/2026/08/20/25903" },
  { title: "भदौ १९ देखि विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Artha Nepal", href: "https://arthanepal.com/2026/08/115866/" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Sagarmatha Pana", href: "https://sagarmathapana.com/news/36952" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी २०८३ आयोजना हुँदै", source: "Hulak Sanchar", href: "https://www.hulaksanchar.com/2026/08/20/14/118244/" },
  { title: "भदौ १९ देखि काठमाडौंमा नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी", source: "Arthikpati", href: "https://www.arthikpati.com/content/2026/08/20/143984" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी हुँदै", source: "Karobar Daily", href: "https://www.karobardaily.com/news/407691" },
  { title: "भदौ १९ गतेदेखि २१ गतेसम्म इलेक्ट्रिक तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Pahilo Awaj", href: "https://pahiloawaj.com/2026/08/20/12/593/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट एण्ड नेपाल कन्ज्युमर इलेक्ट्रोनिक्स एण्ड होम अप्लायन्सेस अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै", source: "Nagarik News", href: "https://nagariknews.nagariknetwork.com/Bazar/nepal-electric-power-light-and-nepal-consumer-electronics-and-home-appliances-international-exhibition-being-organized-16-71.html" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Desh Sanchar", href: "https://deshsanchar.com/2026/08/20/1217993/" },
  { title: "काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Arthik Pati", href: "https://www.arthikpati.com/content/2026/08/20/143984" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Ukeraa", href: "https://www.ukeraa.com/news/detail/178951/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी आयोजना हुँदै", source: "News of Nepal", href: "https://newsofnepal.com/2026/08/20/783098/" },
  { title: "भदौ १९ देखि भृकुटीमण्डपमा विद्युत् प्रदर्शनी", source: "Nepal Purbadhar", href: "https://nepalpurbadhar.com/53641/" },
  { title: "विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Corporate Bazar", href: "https://corporatebazar.com/corporate-bazar/45013.html" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै", source: "Kendrabindu", href: "https://kendrabindu.com/economy/547552/" },
  { title: "भदौ १९ देखि काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Arthatantra", href: "https://www.arthatantra.com/2026/08/20/230699/" },
  { title: "भृकुटीमण्डपमा विद्युत्, इलेक्ट्रोनिक्स तथा होम अप्लायन्सेसको अन्तर्राष्ट्रिय प्रदर्शनी हुँदै", source: "Kalika Khabar", href: "https://kalikakhabar.com/bhrikutiimn-dpma-wid-yut-ilek-t-ronik-s-ttha-hom-ap-layn-sesko-an-tr-rash-t-riy-p-rdr-shnii-hundai/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी आयोजना हुँदै", source: "Bizness Views", href: "https://biznessviews.com/market/62893/" },
  { title: "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट (Official Notice)", source: "Facebook", href: "https://www.facebook.com/share/1E4A3Nvhe4/" },
  { title: "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट (Official Notice)", source: "Jana Akash", href: "https://www.janaakash.com/2026/08/21/52544/" },

  // 🆕 Newly Added Cleaned Media Items
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी सम्बन्धी समाचार", source: "Bizpati", href: "https://bizpati.com/2026/08/216518/" },
  { title: "इलेक्ट्रिक तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी updates", source: "KTM Voice", href: "https://www.ktmvoice.com/news/116847.html/" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा नेपाल कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी स्थगन/अपडेट", source: "Equity Nepal", href: "https://equitynepal.com/2026/08/30/99500/" },
  { title: "प्रदर्शनी सम्बन्धी पछिल्लो समाचार", source: "Ajako Artha", href: "https://www.ajakoartha.com/story/144712" },
  { title: "Nepal Electric, Power, Light & Consumer Electronics International Exhibition Notice", source: "Artha Path", href: "https://www.arthapath.com/2026/08/30/215930/nepal-electric-power-light-and-consumer-electronics-international-exhibition-postponed-until-further-notice/" },
  { title: "भृकुटीमण्डप प्रदर्शनी सम्बन्धी विशेष समाचार", source: "Lalitpur Press", href: "https://lalitpurpress.com/2026/08/156311/" },
  { title: "विद्युत् तथा इलेक्ट्रोनिक्स अन्तर्राष्ट्रिय प्रदर्शनी सम्बन्धी अपडेट", source: "Bittiya Post", href: "https://www.bittiyapost.com/news/2026/08/30/26159" },
  { title: "नेपाल इलेक्ट्रिक, पावर, लाइट तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी", source: "Hulak Sanchar", href: "https://www.hulaksanchar.com/2026/08/30/17/119448/" },
  { title: "इलेक्ट्रिक तथा इलेक्ट्रोनिक्स प्रदर्शनी सूचना", source: "News of Nepal", href: "https://newsofnepal.com/2026/08/30/784823/" },
  { title: "प्रदर्शनी सम्बन्धी आधिकारिक अपडेट", source: "Kendrabindu", href: "https://kendrabindu.com/economy/550568/" },
  { title: "विद्युत् तथा इलेक्ट्रोनिक्सको अन्तर्राष्ट्रिय प्रदर्शनी", source: "Artha Nepal", href: "https://arthanepal.com/2026/08/117464/" },
  { title: "नेपाल इलेक्ट्रिक प्रदर्शनी सम्बन्धी समाचार", source: "Pahilo Awaj", href: "https://pahiloawaj.com/806/" },
  { title: "नेपाल इलेक्ट्रिक तथा कन्ज्युमर इलेक्ट्रोनिक्स प्रदर्शनी", source: "Himal Daily", href: "https://himaldaily.com/news/35753" },
  { title: "प्रदर्शनी सम्बन्धी विशेष समाचार अपडेट", source: "Bizshala", href: "https://bizshala.com/article/32517" },
  { title: "इलेक्ट्रिक, पावर, लाइट प्रदर्शनी updates", source: "Artha Dabali", href: "https://arthadabali.com/2026/08/30/92934" },
  { title: "काठमाडौंमा विद्युत् तथा इलेक्ट्रोनिक्स प्रदर्शनी सम्बन्धी समाचार", source: "Madhyantar", href: "https://www.madhyantar.com/samachar/163889" },
  { title: "प्रदर्शनी अपडेट तथा सूचना", source: "Khabarbindu", href: "https://khabarbindu.com/news/74370" },
];

export const uniqueSources = Array.from(new Set(mediaCoverage.map((item) => item.source)));