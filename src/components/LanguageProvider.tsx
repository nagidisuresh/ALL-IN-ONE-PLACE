import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "te";

const translations: Record<Language, Record<string, string>> = {
  en: {
    // General / Navbar
    search: "Search",
    signIn: "Sign In",
    signOut: "Sign Out",
    themeMode: "Theme Mode",
    useDarkMode: "Use Dark Mode",
    useLightMode: "Use High-Contrast Light",
    myDashboard: "My Dashboard & Profile",
    careerHub: "Career Hub",
    eamcetHub: "EAMCET Hub",
    initiatives: "Initiatives & Platforms",
    disclaimer: "Disclaimer",
    
    // Career Nav Items
    interview: "Interview",
    roadmap: "Roadmap",
    devRoadmaps: "Developer Roadmaps",
    jobPrep: "Job Prep",
    resume: "Resume",
    portfolio: "Portfolio",
    aiTools: "AI Tools",
    freePlatforms: "Free Platforms",
    foundersPrime: "FoundersPrime",
    aiChat: "AI Chat",
    threeDLab: "3D Lab",
    about: "About",
    tcsNqt: "TCS NQT",

    // EAMCET Nav Items
    eamcetHome: "Home",
    eamcetPlans: "Study Plans",
    eamcetPractice: "Practice MCQs",
    eamcetResources: "Materials & PYQs",
    eamcetTips: "Expert Tips",
    eamcetCounseling: "Counseling Hub",
    eamcetProfile: "Personal Details",

    // Free Education Items
    studentPainSolver: "Student Pain Solver",
    globalDirectory: "Global Directory",
    after10thGuide: "After 10th Guide",
    codingCareers: "IT & Coding Careers",
    subjectResources: "Subject Resources",
    freeBooks: "Free Books & Textbooks",
    interactiveTools: "Interactive Tools",
    bookmarkShelf: "My Bookmark Shelf",

    // Profile & Dashboard
    welcome: "Welcome",
    welcomeMessage: "Embark on your learning and preparation journey today.",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    deleteAccount: "Delete Account",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    joinDate: "Join Date",
    provider: "Auth Provider",
    recentActivity: "Recent Activity",
    noActivity: "No recent activity recorded yet.",
    profileUpdated: "Profile updated successfully!",
    
    // About View / Welcome Hero
    heroTitle: "Proof-of-Work Education & Career Co-Pilot",
    heroSubtitle: "Zero marketing fluff. Deep learning pathways, simulated tools, and discovery engines for modern engineers and students.",
    exploreHubs: "Explore Knowledge Hubs",
    learnWithSuresh: "Learn with Suresh",
    
    // Suresh Hero Banner
    sureshBadge: "Learn with Suresh",
    sureshIntro: "Hi, I'm Suresh",
    sureshDesc: "I built Learn With Suresh to put the world's best free learning resources in one place — so every student in India can grow without paying a rupee.",
    startLearning: "Start Learning",
    askAI: "🤖 Ask the AI Advisor",

    // Newsletter
    newsletterTitle: "Stay Updated",
    newsletterPlaceholder: "Enter your email...",
    newsletterSubscribe: "Subscribe",
    newsletterSuccess: "Subscribed successfully!",
    newsletterError: "Please enter a valid email.",
    newsletterModalTitle: "Thank you for subscribing!",
    newsletterModalSubtitle: "You are now part of our learning community. Get ready to receive deep learning pathways, resource discovery digests, and platform updates.",
    newsletterModalClose: "Awesome!",
  },
  hi: {
    // General / Navbar
    search: "खोजें",
    signIn: "लॉग इन करें",
    signOut: "साइन आउट",
    themeMode: "थीम मोड",
    useDarkMode: "डार्क मोड का उपयोग करें",
    useLightMode: "लाइट मोड का उपयोग करें",
    myDashboard: "मेरा डैशबोर्ड और प्रोफाइल",
    careerHub: "करियर हब",
    eamcetHub: "EAMCET हब",
    initiatives: "पहल और प्लेटफॉर्म",
    disclaimer: "अस्वीकरण",
    
    // Career Nav Items
    interview: "इंटरव्यू",
    roadmap: "रोडमैप",
    devRoadmaps: "डेवलपर रोडमैप",
    jobPrep: "नौकरी तैयारी",
    resume: "रिज्यूम",
    portfolio: "पोर्टफोलियो",
    aiTools: "एआई टूल्स",
    freePlatforms: "मुफ्त प्लेटफॉर्म",
    foundersPrime: "फाउंडर्स प्राइम",
    aiChat: "एआई चैट",
    threeDLab: "3D लैब",
    about: "हमारे बारे में",
    tcsNqt: "TCS NQT",

    // EAMCET Nav Items
    eamcetHome: "होम",
    eamcetPlans: "अध्ययन योजनाएं",
    eamcetPractice: "अभ्यास MCQs",
    eamcetResources: "सामग्री और PYQs",
    eamcetTips: "विशेषज्ञ टिप्स",
    eamcetCounseling: "परामर्श हब",
    eamcetProfile: "व्यक्तिगत विवरण",

    // Free Education Items
    studentPainSolver: "छात्र दर्द निवारक",
    globalDirectory: "वैश्विक निर्देशिका",
    after10thGuide: "10वीं के बाद गाइड",
    codingCareers: "आईटी और कोडिंग करियर",
    subjectResources: "विषय संसाधन",
    freeBooks: "मुफ्त किताबें",
    interactiveTools: "इंटरैक्टिव टूल्स",
    bookmarkShelf: "मेरा बुकमार्क शेल्फ",

    // Profile & Dashboard
    welcome: "स्वागत है",
    welcomeMessage: "आज ही अपनी सीखने और तैयारी की यात्रा शुरू करें।",
    editProfile: "प्रोफ़ाइल संपादित करें",
    changePassword: "पासवर्ड बदलें",
    deleteAccount: "खाता हटाएं",
    saveChanges: "बदलाव सहेजें",
    cancel: "रद्द करें",
    joinDate: "शामिल होने की तिथि",
    provider: "प्रदाता",
    recentActivity: "हाल की गतिविधि",
    noActivity: "अभी तक कोई गतिविधि दर्ज नहीं की गई है।",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!",

    // About View / Welcome Hero
    heroTitle: "प्रूफ-ऑफ-वर्क शिक्षा और करियर सह-पायलट",
    heroSubtitle: "शून्य मार्केटिंग दिखावा। आधुनिक इंजीनियरों और छात्रों के लिए गहन शिक्षण पथ, सिमुलेटेड उपकरण और खोज इंजन।",
    exploreHubs: "ज्ञान केंद्रों का अन्वेषण करें",
    learnWithSuresh: "सुरेश के साथ सीखें",

    // Suresh Hero Banner
    sureshBadge: "सुरेश के साथ सीखें",
    sureshIntro: "नमस्ते, मैं सुरेश हूँ",
    sureshDesc: "मैंने भारत के हर छात्र को बिना एक भी रुपया खर्च किए आगे बढ़ने के लिए दुनिया के सर्वश्रेष्ठ मुफ्त सीखने के संसाधनों को एक जगह लाने के लिए 'सुरेश के साथ सीखें' का निर्माण किया।",
    startLearning: "सीखना शुरू करें",
    askAI: "🤖 एआई सलाहकार से पूछें",

    // Newsletter
    newsletterTitle: "नवीनतम जानकारी प्राप्त करें",
    newsletterPlaceholder: "अपना ईमेल दर्ज करें...",
    newsletterSubscribe: "सदस्यता लें",
    newsletterSuccess: "सफलतापूर्वक सदस्यता ली गई!",
    newsletterError: "कृपया एक मान्य ईमेल दर्ज करें।",
    newsletterModalTitle: "सदस्यता लेने के लिए धन्यवाद!",
    newsletterModalSubtitle: "अब आप हमारे सीखने के समुदाय का हिस्सा हैं। गहन शिक्षण पथ, संसाधन खोज सारांश और प्लेटफ़ॉर्म अपडेट प्राप्त करने के लिए तैयार हो जाएँ।",
    newsletterModalClose: "बहुत बढ़िया!",
  },
  te: {
    // General / Navbar
    search: "శోధించండి",
    signIn: "లాగిన్ అవ్వండి",
    signOut: "లాగ్ అవుట్",
    themeMode: "థీమ్ మోడ్",
    useDarkMode: "డార్క్ మోడ్ ఉపయోగించండి",
    useLightMode: "లైట్ మోడ్ ఉపయోగించండి",
    myDashboard: "నా డ్యాష్‌బోర్డ్ & ప్రొఫైల్",
    careerHub: "కెరీర్ హబ్",
    eamcetHub: "EAMCET హబ్",
    initiatives: "కార్యక్రమాలు & ప్లాట్‌ఫారమ్‌లు",
    disclaimer: "డిస్క్లైమర్",
    
    // Career Nav Items
    interview: "ఇంటర్వ్యూ",
    roadmap: "రోడ్‌మ్యాప్",
    devRoadmaps: "డెవలపర్ రోడ్‌మ్యాప్స్",
    jobPrep: "ఉద్యోగ తయారీ",
    resume: "రెజ్యూమ్",
    portfolio: "పోర్ట్‌ఫోలియో",
    aiTools: "AI సాధనాలు",
    freePlatforms: "ఉచిత ప్లాట్‌ఫారమ్‌లు",
    foundersPrime: "ఫౌండర్స్ ప్రైమ్",
    aiChat: "AI చాట్",
    threeDLab: "3D ల్యాబ్",
    about: "గురించి",
    tcsNqt: "TCS NQT",

    // EAMCET Nav Items
    eamcetHome: "హోమ్",
    eamcetPlans: "స్టడీ ప్లాన్స్",
    eamcetPractice: "ప్రాక్టీస్ MCQs",
    eamcetResources: "మెటీరియల్స్ & PYQs",
    eamcetTips: "నిపుణుల చిట్కాలు",
    eamcetCounseling: "కౌన్సెలింగ్ హబ్",
    eamcetProfile: "వ్యక్తిగత వివరాలు",

    // Free Education Items
    studentPainSolver: "స్టూడెంట్ పెయిన్ సాల్వర్",
    globalDirectory: "గ్లోబల్ డైరెక్టరీ",
    after10thGuide: "10వ తరగతి తర్వాత గైడ్",
    codingCareers: "ఐటీ & కోడింగ్ కెరీర్స్",
    subjectResources: "సబ్జెక్ట్ రీసోర్సెస్",
    freeBooks: "ఉచిత పుస్తకాలు & పాఠ్యపుస్తకాలు",
    interactiveTools: "ఇంటరాక్టివ్ టూల్స్",
    bookmarkShelf: "నా బుక్‌మార్క్ షెల్ఫ్",

    // Profile & Dashboard
    welcome: "స్వాగతం",
    welcomeMessage: "ఈరోజే మీ అభ్యాసం మరియు సన్నద్ధత ప్రయాణాన్ని ప్రారంభించండి.",
    editProfile: "ప్రొఫైల్ ఎడిట్ చేయండి",
    changePassword: "పాస్‌వర్డ్ మార్చండి",
    deleteAccount: "ఖాతా తొలగించండి",
    saveChanges: "మార్పులను సేవ్ చేయి",
    cancel: "రద్దు చేయి",
    joinDate: "చేరిన తేదీ",
    provider: "ఆథ్ ప్రొవైడర్",
    recentActivity: "ఇటీవలి కార్యాచరణ",
    noActivity: "ఇంకా ఎటువంటి ఇటీవలి కార్యాచరణ నమోదు కాలేదు.",
    profileUpdated: "ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ చేయబడింది!",

    // About View / Welcome Hero
    heroTitle: "ప్రూఫ్-ఆఫ్-వర్క్ ఎడ్యుకేషన్ & కెరీర్ కో-పైలట్",
    heroSubtitle: "మార్కెటింగ్ జిమ్మిక్కులు లేవు. ఆధునిక ఇంజనీర్లు మరియు విద్యార్థుల కోసం లోతైన అభ్యాస మార్గాలు, సిమ్యులేటెడ్ టూల్స్ మరియు అన్వేషణ ఇంజన్లు.",
    exploreHubs: "నాలెడ్జ్ హబ్‌లను అన్వేషించండి",
    learnWithSuresh: "సురేష్‌తో నేర్చుకోండి",

    // Suresh Hero Banner
    sureshBadge: "సురేష్‌తో నేర్చుకోండి",
    sureshIntro: "నమస్తే, నేను సురేష్",
    sureshDesc: "భారతదేశంలోని ప్రతి విద్యార్థి ఒక్క రూపాయి కూడా చెల్లించకుండా ఎదిగేలా ప్రపంచంలోని అత్యుత్తమ ఉచిత అభ్యాస వనరులను ఒకే చోట చేర్చడానికి నేను 'సురేష్‌తో నేర్చుకోండి' ని నిర్మించాను.",
    startLearning: "నేర్చుకోవడం ప్రారంభించండి",
    askAI: "🤖 AI అడ్వైజర్‌ను అడగండి",

    // Newsletter
    newsletterTitle: "అప్‌డేట్‌గా ఉండండి",
    newsletterPlaceholder: "మీ ఈమెయిల్ నమోదు చేయండి...",
    newsletterSubscribe: "సబ్‌స్క్రయిబ్ చేయండి",
    newsletterSuccess: "విజయవంతంగా సబ్‌స్క్రయిబ్ చేయబడింది!",
    newsletterError: "దయచేసి సరైన ఈమెయిల్ నమోదు చేయండి.",
    newsletterModalTitle: "సబ్‌స్క్రయిబ్ చేసినందుకు ధన్యవాదాలు!",
    newsletterModalSubtitle: "మీరు ఇప్పుడు మా లెర్నింగ్ కమ్యూనిటీలో భాగమయ్యారు. లోతైన అభ్యాస మార్గాలు, వనరుల అన్వేషణ సమాచారం మరియు ప్లాట్‌ఫారమ్ అప్‌డేట్‌లను స్వీకరించడానికి సిద్ధంగా ఉండండి.",
    newsletterModalClose: "అద్భుతం!",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("nextroundprep_language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("nextroundprep_language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
