export interface RoomReview {
  id: string;
  residentName: string;
  institution: string;
  rating: number;
  date: string;
  comment: string;
}

export interface RoomItem {
  id: string;
  title: string;
  titleUrdu: string;
  roomType: "SINGLE" | "DOUBLE" | "TRIPLE" | "QUAD";
  capacity: number;
  availableBeds: number;
  monthlyRentPKR: number;
  securityDepositPKR: number;
  badge: string;
  badgeUrdu: string;
  images: string[];
  description: string;
  descriptionUrdu: string;
  specifications: {
    floor: string;
    bathType: string;
    acType: string;
    wifiSpeed: string;
    messMeals: string;
  };
  amenities: string[];
  amenitiesUrdu: string[];
  reviews: RoomReview[];
}

export const ROOMS_DATA: RoomItem[] = [
  {
    id: "single-exec",
    title: "Single Executive Master Suite",
    titleUrdu: "سنگل ایگزیکٹو ماسٹر سویٹ",
    roomType: "SINGLE",
    capacity: 1,
    availableBeds: 3,
    monthlyRentPKR: 28000,
    securityDepositPKR: 10000,
    badge: "Most Popular",
    badgeUrdu: "سب سے زیادہ مقبول",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Designed for medical residents, PhD scholars, and executive working women who require total privacy, luxury, and dedicated quiet study space. Features a high-speed private Wi-Fi access point and inverter AC.",
    descriptionUrdu:
      "ڈاکٹرز، پی ایچ ڈی اسکالرز اور ملازمت پیشہ خواتین کے لیے تیار کردہ جہاں مکمل پرائیویسی اور مطالعہ کا خاموش ماحول میسر ہے۔ خصوصی وائی فائی اور انورٹر اے سی کے ساتھ۔",
    specifications: {
      floor: "2nd & 3rd Floor",
      bathType: "Private Attached Tiled Bathroom",
      acType: "1.5 Ton DC Inverter (Cooling & Heating)",
      wifiSpeed: "Dedicated 50 Mbps Fiber Router",
      messMeals: "3-Time Fresh Gourmet Mess Meals + Evening Tea",
    },
    amenities: [
      "Private attached luxury bathroom",
      "Inverter Split Air Conditioner",
      "Executive wooden study desk & ergonomic chair",
      "Dedicated high-speed Wi-Fi router",
      "3-Door wardrobe with personal lock",
      "Daily room cleaning & weekly laundry",
      "UPS & Heavy Generator Electricity Backup",
    ],
    amenitiesUrdu: [
      "پریمیئم اٹیچڈ باتھ روم",
      "ڈی سی انورٹر ایئر کنڈیشنر",
      "اسٹڈی ٹیبل اور آرام دہ کرسی",
      "خصوصی تیز ترین وائی فائی",
      "لاک ایبل تھری ڈور الماری",
      "روزانہ صفائی اور ہفتہ وار کپڑے دھلائی",
      "یو پی ایس اور جنریٹر بیک اپ",
    ],
    reviews: [
      {
        id: "r1",
        residentName: "Dr. Maryam Khattak",
        institution: "Khyber Teaching Hospital (KTH)",
        rating: 5,
        date: "July 2026",
        comment:
          "The private single suite is a lifesaver during night shifts. The internet is rock-solid for medical research and the mess food is clean and wholesome.",
      },
      {
        id: "r2",
        residentName: "Zainab Shah",
        institution: "University of Peshawar (UoP)",
        rating: 5,
        date: "June 2026",
        comment: "Exceptional security! The warden staff treat us like family. Best girls hostel on University Road.",
      },
    ],
  },
  {
    id: "double-deluxe",
    title: "Deluxe Double Sharing Room",
    titleUrdu: "ڈیلکس ڈبل شیئرنگ روم",
    roomType: "DOUBLE",
    capacity: 2,
    availableBeds: 5,
    monthlyRentPKR: 18000,
    securityDepositPKR: 8000,
    badge: "Best Value",
    badgeUrdu: "بہترین قیمت",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Ideal for university friends and medical students. Spacious room layout equipped with two separate study desks, dual wardrobes, attached bath, and continuous generator backup.",
    descriptionUrdu:
      "یونیورسٹی اور میڈیکل کی طالبات کے لیے بہترین۔ کشادہ کمرہ جس میں دو علیحدہ پڑھائی کی میزیں، کبرڈز اور منسلک باتھ روم شامل ہے۔",
    specifications: {
      floor: "1st & 2nd Floor",
      bathType: "Attached Bathroom with Electric Geyser",
      acType: "Split Air Conditioner",
      wifiSpeed: "High-Speed Shared Fiber Wi-Fi",
      messMeals: "3-Time Daily Nutritional Mess Menu",
    },
    amenities: [
      "Attached bathroom with hot water geyser",
      "Split Air Conditioning unit",
      "2 Individual study units with reading lights",
      "2 Wooden lockable cupboards",
      "High-speed fiber Wi-Fi",
      "3 Meals daily included",
      "Biometric security gate pass access",
    ],
    amenitiesUrdu: [
      "گیزر کے ساتھ منسلک باتھ روم",
      "اسپلٹ ایئر کنڈیشنر",
      "مطالعہ کے لیے 2 علیحدہ ٹیبلز",
      "قفل والی لکڑی کی کبرڈز",
      "تیز رفتار وائی فائی",
      "روزانہ تین وقت کا کھانا شامل",
      "بائیو میٹرک گیٹ پاس",
    ],
    reviews: [
      {
        id: "r3",
        residentName: "Ayesha Noor",
        institution: "Khyber Medical University (KMU)",
        rating: 5,
        date: "August 2026",
        comment:
          "My roommate and I love the atmosphere here. The study lounge and mess menu make exam preparation stress-free.",
      },
    ],
  },
  {
    id: "triple-sharing",
    title: "Triple Sharing Economy Suite",
    titleUrdu: "ٹرپل شیئرنگ اکانومی سویٹ",
    roomType: "TRIPLE",
    capacity: 3,
    availableBeds: 2,
    monthlyRentPKR: 14000,
    securityDepositPKR: 6000,
    badge: "Budget Friendly",
    badgeUrdu: "بجٹ کے مطابق",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "An economical yet spacious solution without compromising on comfort or safety. Includes 3 separate study desks, personal wardrobes, attached bathroom, and 3-time mess.",
    descriptionUrdu:
      "کم بجٹ میں معیار پر بغیر کسی سمجھوتے کے پرسکون رہائش۔ تین طالبات کے لیے علیحدہ اسٹڈی ٹیبلز اور الماریاں۔",
    specifications: {
      floor: "Ground & 1st Floor",
      bathType: "Attached Bathroom",
      acType: "Ceiling Fans & Air Cooler / AC unit",
      wifiSpeed: "High-Speed Fiber Wi-Fi",
      messMeals: "3 Meals Daily + Evening Tea",
    },
    amenities: [
      "Spacious room layout with natural daylight",
      "Attached bathroom",
      "3 Individual study units & chairs",
      "3 Individual locked wardrobes",
      "High-speed fiber Wi-Fi",
      "3 Meals daily included",
    ],
    amenitiesUrdu: [
      "روشن اور ہوا دار کشادہ کمرہ",
      "اٹیچڈ باتھ روم",
      "3 طالبات کے لیے علیحدہ اسٹڈی سیٹ",
      "3 انفرادی لاکر کبرڈز",
      "تیز رفتار انٹرنیٹ",
      "تینوں وقت کا کھانا شامل",
    ],
    reviews: [
      {
        id: "r4",
        residentName: "Hira Afridi",
        institution: "Islamia College Peshawar",
        rating: 5,
        date: "May 2026",
        comment: "Very affordable for students. The mess food feels like home and the security gives my parents total peace of mind.",
      },
    ],
  },
  {
    id: "quad-budget",
    title: "Quad Sharing Student Suite",
    titleUrdu: "کواڈ شیئرنگ اسٹوڈنٹ سویٹ",
    roomType: "QUAD",
    capacity: 4,
    availableBeds: 4,
    monthlyRentPKR: 11500,
    securityDepositPKR: 5000,
    badge: "Super Saver",
    badgeUrdu: "بہترین بچت",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Designed for groups of students seeking maximum savings. Large master room layout with 4 study desks, 4 wardrobes, attached bath, and mess meal package.",
    descriptionUrdu:
      "گروپ طالبات کے لیے انتہائی مناسب کرایہ۔ بڑا ماسٹر روم جس میں 4 اسٹڈی ڈیسک اور الماریاں شامل ہیں۔",
    specifications: {
      floor: "Ground Floor",
      bathType: "Attached Double Sink Bathroom",
      acType: "Ceiling Fans + Air Cooler / AC",
      wifiSpeed: "Fiber Wi-Fi",
      messMeals: "3 Meals Daily Included",
    },
    amenities: [
      "Extra large room size",
      "Attached bathroom with instant geyser",
      "4 Individual study desks",
      "4 Personal lockable wardrobes",
      "High-speed fiber Wi-Fi",
      "3 Meals daily included",
    ],
    amenitiesUrdu: [
      "انتہائی بڑا ماسٹر روم",
      "گیزر کے ساتھ منسلک باتھ روم",
      "4 علیحدہ پڑھائی کی میزیں",
      "4 شخصی الماریاں",
      "وائی فائی انٹرنیٹ",
      "روزانہ 3 وقت کا کھانا",
    ],
    reviews: [
      {
        id: "r5",
        residentName: "Laiba Gul",
        institution: "University of Engineering & Tech (UET)",
        rating: 5,
        date: "August 2026",
        comment: "Spacious room, friendly wardens, and very reasonable rent including mess!",
      },
    ],
  },
];
