import { db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ROOMS_DATA, RoomItem } from "@/data/roomsData";

// --- Types ---
export interface BookingRecord {
  id: string;
  residentName: string;
  email: string;
  phone: string;
  cnic: string;
  institution?: string;
  guardianName: string;
  guardianPhone: string;
  roomId: string;
  roomTitle: string;
  checkIn: string;
  durationMonths: number;
  monthlyRentPKR: number;
  securityDepositPKR: number;
  totalPKR: number;
  paymentMethod: "STRIPE" | "JAZZCASH" | "BANK_TRANSFER" | "CASH";
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "REJECTED";
  createdAt?: any;
  notes?: string;
}

export interface GatePassRecord {
  id: string;
  residentName: string;
  room: string;
  type: "DAY_OUT" | "NIGHT_STAY" | "VACATION";
  destination: string;
  departure: string;
  expectedReturn: string;
  guardianPhone: string;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: any;
}

export interface MaintenanceRecord {
  id: string;
  residentName: string;
  room: string;
  category: "PLUMBING" | "ELECTRICAL" | "WIFI" | "AC" | "OTHER";
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  date: string;
  createdAt?: any;
}

export interface MessMenuDay {
  id: string;
  day: string;
  dayUrdu: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  special?: string;
}

export interface ResidentRecord {
  id: string;
  name: string;
  cnic: string;
  room: string;
  bed: string;
  institution: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  paymentStatus: "PAID" | "OVERDUE" | "PARTIAL";
  joinedDate: string;
}

// Initial In-Memory / Local Storage Store for resilient offline/dev support
const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "EGH-10029",
    residentName: "Fatima Khan",
    email: "fatima.khan@gmail.com",
    phone: "+92 300 1112233",
    cnic: "17301-1234567-8",
    institution: "University of Peshawar (UoP)",
    guardianName: "Tariq Khan",
    guardianPhone: "+92 300 4445566",
    roomId: "double-deluxe",
    roomTitle: "Deluxe Double (Room 204)",
    checkIn: "2026-09-01",
    durationMonths: 6,
    monthlyRentPKR: 18000,
    securityDepositPKR: 8000,
    totalPKR: 116000,
    paymentMethod: "STRIPE",
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
  },
  {
    id: "EGH-10030",
    residentName: "Sobia Afridi",
    email: "sobia.afridi@gmail.com",
    phone: "+92 301 9876543",
    cnic: "17301-9876543-1",
    institution: "Khyber Medical University (KMU)",
    guardianName: "Haji Gul Afridi",
    guardianPhone: "+92 301 2223344",
    roomId: "single-exec",
    roomTitle: "Single Executive (Room 301)",
    checkIn: "2026-09-05",
    durationMonths: 12,
    monthlyRentPKR: 28000,
    securityDepositPKR: 10000,
    totalPKR: 346000,
    paymentMethod: "JAZZCASH",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  },
  {
    id: "EGH-10031",
    residentName: "Mahnoor Khattak",
    email: "mahnoor.k@gmail.com",
    phone: "+92 333 5554443",
    cnic: "17301-5554443-2",
    institution: "Islamia College Peshawar",
    guardianName: "Dr. Khattak",
    guardianPhone: "+92 333 7778899",
    roomId: "triple-sharing",
    roomTitle: "Triple Sharing (Room 105)",
    checkIn: "2026-08-20",
    durationMonths: 6,
    monthlyRentPKR: 14000,
    securityDepositPKR: 6000,
    totalPKR: 90000,
    paymentMethod: "BANK_TRANSFER",
    status: "CHECKED_IN",
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_GATE_PASSES: GatePassRecord[] = [
  {
    id: "GP-401",
    residentName: "Fatima Khan",
    room: "Room 204",
    type: "DAY_OUT",
    destination: "Peshawar Mall & Central Library",
    departure: "Today, 02:00 PM",
    expectedReturn: "Today, 07:30 PM",
    guardianPhone: "+92 300 4445566",
    reason: "Research books purchase",
    status: "PENDING",
  },
  {
    id: "GP-402",
    residentName: "Ayesha Malik",
    room: "Room 204",
    type: "NIGHT_STAY",
    destination: "Islamabad (Family Residence)",
    departure: "Aug 18, 09:00 AM",
    expectedReturn: "Aug 20, 06:00 PM",
    guardianPhone: "+92 301 5556677",
    reason: "Sister wedding ceremony",
    status: "APPROVED",
  },
  {
    id: "GP-403",
    residentName: "Laiba Gul",
    room: "Room 105",
    type: "VACATION",
    destination: "Swat (Summer Vacation)",
    departure: "Aug 22, 08:00 AM",
    expectedReturn: "Sep 01, 05:00 PM",
    guardianPhone: "+92 302 7778899",
    reason: "Summer semester break",
    status: "PENDING",
  },
];

const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: "TKT-301",
    residentName: "Fatima Khan",
    room: "Room 204",
    category: "AC",
    title: "DC Inverter AC Filter Service Needed",
    description: "AC cooling reduced over the last 2 days. Filter needs routine cleaning.",
    priority: "HIGH",
    status: "OPEN",
    date: "Aug 17, 2026",
  },
  {
    id: "TKT-302",
    residentName: "Ayesha Noor",
    room: "Room 108",
    category: "PLUMBING",
    title: "Bathroom Wash Basin Tap Leakage",
    description: "Water dripping under the sink faucet.",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    date: "Aug 16, 2026",
  },
  {
    id: "TKT-303",
    residentName: "Dr. Maryam Khattak",
    room: "Room 301",
    category: "WIFI",
    title: "Floor 3 Wi-Fi Speed Drop",
    description: "Router restarted and fiber line tested, speed normal.",
    priority: "LOW",
    status: "RESOLVED",
    date: "Aug 14, 2026",
  },
];

const INITIAL_MESS_MENU: MessMenuDay[] = [
  {
    id: "mon",
    day: "Monday",
    dayUrdu: "پیر",
    breakfast: "Paratha + Fried Egg / Omelette + Fresh Milk Tea",
    lunch: "Daal Chawal (Special Tarka) + Fresh Salad + Raita",
    dinner: "Chicken Karahi + Tandoori Roti + Kheer Dessert",
    special: "Special Fresh Mint Raita",
  },
  {
    id: "tue",
    day: "Tuesday",
    dayUrdu: "منگل",
    breakfast: "Aloo Paratha + Yogurt / Butter + Chai",
    lunch: "Mixed Seasonal Vegetables (Sabzi) + Roti + Mint Chutney",
    dinner: "Beef Kofta Curry + Hot Naan / Roti + Fruit Custard",
    special: "Desi Ghee Paratha",
  },
  {
    id: "wed",
    day: "Wednesday",
    dayUrdu: "بدھ",
    breakfast: "Boiled Eggs / French Toast + Jam + Chai",
    lunch: "Chana Pulao + Vegetable Salad + Raita",
    dinner: "Chicken Biryani (Peshawari Style) + Cold Drinks",
    special: "Peshawari Special Biryani Night",
  },
  {
    id: "thu",
    day: "Thursday",
    dayUrdu: "جمعرات",
    breakfast: "Halwa Puri + Chana + Cardamom Tea",
    lunch: "Kadhi Pakora + Steamed Basmati Rice",
    dinner: "Chicken Handi / Qorma + Tandoori Naan + Gulab Jamun",
    special: "Special Halwa Puri Breakfast",
  },
  {
    id: "fri",
    day: "Friday",
    dayUrdu: "جمعہ",
    breakfast: "Cheese Omelette + Plain Paratha + Karak Chai",
    lunch: "Special Friday Beef Pulao + Kachumber Salad + Cold Drink",
    dinner: "Chicken Roast / Broast + Roti + Russian Salad",
    special: "Friday Feast Buffet Lunch",
  },
  {
    id: "sat",
    day: "Saturday",
    dayUrdu: "ہفتہ",
    breakfast: "Egg Paratha / Butter Toast + Milk Tea",
    lunch: "Lobia / Red Beans Gravy + Steamed Rice + Achar",
    dinner: "Chicken Nihari / Haleem + Tandoori Naan + Sweet Dish",
    special: "Special Weekend Dinner",
  },
  {
    id: "sun",
    day: "Sunday",
    dayUrdu: "اتوار",
    breakfast: "Special Sunday Brunch: Lahori Chana + Puri + Chai",
    lunch: "Light Veg Pulao + Seasonal Fruit Salad",
    dinner: "Chicken Tikka / BBQ Seekh Kabab + Paratha + Green Raita",
    special: "Rooftop BBQ Night",
  },
];

const INITIAL_RESIDENTS: ResidentRecord[] = [
  {
    id: "RES-101",
    name: "Fatima Khan",
    cnic: "17301-1234567-8",
    room: "Room 204",
    bed: "Bed A",
    institution: "University of Peshawar",
    phone: "+92 300 1112233",
    guardianName: "Tariq Khan",
    guardianPhone: "+92 300 4445566",
    paymentStatus: "OVERDUE",
    joinedDate: "Sep 01, 2025",
  },
  {
    id: "RES-102",
    name: "Ayesha Malik",
    cnic: "17301-9988776-5",
    room: "Room 204",
    bed: "Bed B",
    institution: "KMU Peshawar",
    phone: "+92 301 2223344",
    guardianName: "Malik Akbar",
    guardianPhone: "+92 301 5556677",
    paymentStatus: "PAID",
    joinedDate: "Aug 15, 2025",
  },
  {
    id: "RES-103",
    name: "Dr. Maryam Khattak",
    cnic: "17301-4433221-9",
    room: "Room 301",
    bed: "Single Suite",
    institution: "Khyber Teaching Hospital",
    phone: "+92 333 9998877",
    guardianName: "Dr. Khattak",
    guardianPhone: "+92 333 1112233",
    paymentStatus: "PAID",
    joinedDate: "Jan 10, 2026",
  },
  {
    id: "RES-104",
    name: "Laiba Gul",
    cnic: "17301-7788990-1",
    room: "Room 105",
    bed: "Bed C",
    institution: "UET Peshawar",
    phone: "+92 302 7778899",
    guardianName: "Gul Zaman",
    guardianPhone: "+92 302 9991122",
    paymentStatus: "PAID",
    joinedDate: "Feb 01, 2026",
  },
];

// Helper to interact with LocalStorage for reactive fallback
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(`egh_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`egh_${key}`, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(`egh_event_${key}`, { detail: data }));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

// -------------------------------------------------------------
// 1. ROOMS CRUD (Real-time Firestore + Local Sync)
// -------------------------------------------------------------
export function subscribeToRooms(callback: (rooms: RoomItem[]) => void) {
  if (typeof window === "undefined") return () => {};

  // Try Firestore onSnapshot
  let isFirestoreWorking = false;
  let unsubscribeFirestore = () => {};

  try {
    const roomsCol = collection(db, "rooms");
    unsubscribeFirestore = onSnapshot(
      roomsCol,
      (snapshot) => {
        if (!snapshot.empty) {
          isFirestoreWorking = true;
          const list: RoomItem[] = [];
          snapshot.forEach((doc) => list.push({ ...(doc.data() as RoomItem), id: doc.id }));
          callback(list);
          setLocal("rooms", list);
        } else {
          // If empty in cloud, initialize with local/default data
          const currentLocal = getLocal<RoomItem[]>("rooms", ROOMS_DATA);
          callback(currentLocal);
        }
      },
      (error) => {
        // Fallback to local storage
        const currentLocal = getLocal<RoomItem[]>("rooms", ROOMS_DATA);
        callback(currentLocal);
      }
    );
  } catch {
    const currentLocal = getLocal<RoomItem[]>("rooms", ROOMS_DATA);
    callback(currentLocal);
  }

  // Cross-tab/window local event listener
  const handleLocalChange = () => {
    if (!isFirestoreWorking) {
      callback(getLocal<RoomItem[]>("rooms", ROOMS_DATA));
    }
  };
  window.addEventListener("egh_event_rooms", handleLocalChange);
  window.addEventListener("storage", handleLocalChange);

  // Initial push
  callback(getLocal<RoomItem[]>("rooms", ROOMS_DATA));

  return () => {
    unsubscribeFirestore();
    window.removeEventListener("egh_event_rooms", handleLocalChange);
    window.removeEventListener("storage", handleLocalChange);
  };
}

export async function addRoom(room: Omit<RoomItem, "id">): Promise<string> {
  const newId = `room-${Date.now()}`;
  const newRoom: RoomItem = { ...room, id: newId };

  // 1. Update LocalStorage immediately
  const existing = getLocal<RoomItem[]>("rooms", ROOMS_DATA);
  const updated = [newRoom, ...existing];
  setLocal("rooms", updated);

  // 2. Sync to Firestore
  try {
    await setDoc(doc(db, "rooms", newId), newRoom);
  } catch (err) {
    console.warn("Firestore sync skipped for addRoom, saved locally.", err);
  }

  return newId;
}

export async function updateRoom(roomId: string, updates: Partial<RoomItem>): Promise<void> {
  // 1. Update Local
  const existing = getLocal<RoomItem[]>("rooms", ROOMS_DATA);
  const updated = existing.map((r) => (r.id === roomId ? { ...r, ...updates } : r));
  setLocal("rooms", updated);

  // 2. Sync to Firestore
  try {
    await updateDoc(doc(db, "rooms", roomId), updates);
  } catch (err) {
    console.warn("Firestore sync skipped for updateRoom, saved locally.", err);
  }
}

export async function deleteRoom(roomId: string): Promise<void> {
  // 1. Update Local
  const existing = getLocal<RoomItem[]>("rooms", ROOMS_DATA);
  const updated = existing.filter((r) => r.id !== roomId);
  setLocal("rooms", updated);

  // 2. Sync to Firestore
  try {
    await deleteDoc(doc(db, "rooms", roomId));
  } catch (err) {
    console.warn("Firestore sync skipped for deleteRoom, saved locally.", err);
  }
}

// -------------------------------------------------------------
// 2. BOOKINGS MANAGEMENT (Real-time Stream)
// -------------------------------------------------------------
export function subscribeToBookings(callback: (bookings: BookingRecord[]) => void) {
  if (typeof window === "undefined") return () => {};

  let isFirestoreWorking = false;
  let unsubscribeFirestore = () => {};

  try {
    const bookingsCol = collection(db, "bookings");
    const q = query(bookingsCol, orderBy("createdAt", "desc"));
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          isFirestoreWorking = true;
          const list: BookingRecord[] = [];
          snapshot.forEach((doc) => list.push({ ...(doc.data() as BookingRecord), id: doc.id }));
          callback(list);
          setLocal("bookings", list);
        } else {
          callback(getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS));
        }
      },
      () => {
        callback(getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS));
      }
    );
  } catch {
    callback(getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS));
  }

  const handleLocal = () => {
    if (!isFirestoreWorking) {
      callback(getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS));
    }
  };
  window.addEventListener("egh_event_bookings", handleLocal);
  window.addEventListener("storage", handleLocal);

  // Initial call
  callback(getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS));

  return () => {
    unsubscribeFirestore();
    window.removeEventListener("egh_event_bookings", handleLocal);
    window.removeEventListener("storage", handleLocal);
  };
}

export async function createBooking(data: Omit<BookingRecord, "id" | "createdAt">): Promise<string> {
  const ref = `EGH-${Math.floor(100000 + Math.random() * 900000)}`;
  const newBooking: BookingRecord = {
    ...data,
    id: ref,
    createdAt: new Date().toISOString(),
  };

  // 1. Update Local Immediately
  const existing = getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS);
  const updated = [newBooking, ...existing];
  setLocal("bookings", updated);

  // 2. Sync to Firestore
  try {
    await setDoc(doc(db, "bookings", ref), newBooking);
  } catch (err) {
    console.warn("Firestore sync skipped for createBooking, saved locally.", err);
  }

  return ref;
}

export async function updateBookingStatus(
  bookingId: string,
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "REJECTED"
): Promise<void> {
  const existing = getLocal<BookingRecord[]>("bookings", INITIAL_BOOKINGS);
  const updated = existing.map((b) => (b.id === bookingId ? { ...b, status } : b));
  setLocal("bookings", updated);

  try {
    await updateDoc(doc(db, "bookings", bookingId), { status });
  } catch (err) {
    console.warn("Firestore updateBookingStatus skipped, saved locally.", err);
  }
}

// -------------------------------------------------------------
// 3. GATE PASSES (Real-time Resident & Warden Desk)
// -------------------------------------------------------------
export function subscribeToGatePasses(callback: (passes: GatePassRecord[]) => void) {
  if (typeof window === "undefined") return () => {};

  let isFirestoreWorking = false;
  let unsubscribeFirestore = () => {};

  try {
    const colRef = collection(db, "gate_passes");
    unsubscribeFirestore = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          isFirestoreWorking = true;
          const list: GatePassRecord[] = [];
          snapshot.forEach((doc) => list.push({ ...(doc.data() as GatePassRecord), id: doc.id }));
          callback(list);
          setLocal("gate_passes", list);
        } else {
          callback(getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES));
        }
      },
      () => {
        callback(getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES));
      }
    );
  } catch {
    callback(getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES));
  }

  const handleLocal = () => {
    if (!isFirestoreWorking) {
      callback(getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES));
    }
  };
  window.addEventListener("egh_event_gate_passes", handleLocal);
  window.addEventListener("storage", handleLocal);

  callback(getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES));

  return () => {
    unsubscribeFirestore();
    window.removeEventListener("egh_event_gate_passes", handleLocal);
    window.removeEventListener("storage", handleLocal);
  };
}

export async function createGatePass(pass: Omit<GatePassRecord, "id">): Promise<string> {
  const newId = `GP-${Math.floor(400 + Math.random() * 500)}`;
  const record: GatePassRecord = { ...pass, id: newId };

  const existing = getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES);
  setLocal("gate_passes", [record, ...existing]);

  try {
    await setDoc(doc(db, "gate_passes", newId), record);
  } catch (err) {
    console.warn("Firestore createGatePass skipped, saved locally.", err);
  }

  return newId;
}

export async function updateGatePassStatus(
  id: string,
  status: "PENDING" | "APPROVED" | "REJECTED"
): Promise<void> {
  const existing = getLocal<GatePassRecord[]>("gate_passes", INITIAL_GATE_PASSES);
  const updated = existing.map((p) => (p.id === id ? { ...p, status } : p));
  setLocal("gate_passes", updated);

  try {
    await updateDoc(doc(db, "gate_passes", id), { status });
  } catch (err) {
    console.warn("Firestore updateGatePassStatus skipped, saved locally.", err);
  }
}

// -------------------------------------------------------------
// 4. MAINTENANCE & COMPLAINTS
// -------------------------------------------------------------
export function subscribeToMaintenance(callback: (tickets: MaintenanceRecord[]) => void) {
  if (typeof window === "undefined") return () => {};

  let isFirestoreWorking = false;
  let unsubscribeFirestore = () => {};

  try {
    const colRef = collection(db, "maintenance");
    unsubscribeFirestore = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          isFirestoreWorking = true;
          const list: MaintenanceRecord[] = [];
          snapshot.forEach((doc) => list.push({ ...(doc.data() as MaintenanceRecord), id: doc.id }));
          callback(list);
          setLocal("maintenance", list);
        } else {
          callback(getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE));
        }
      },
      () => {
        callback(getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE));
      }
    );
  } catch {
    callback(getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE));
  }

  const handleLocal = () => {
    if (!isFirestoreWorking) {
      callback(getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE));
    }
  };
  window.addEventListener("egh_event_maintenance", handleLocal);
  window.addEventListener("storage", handleLocal);

  callback(getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE));

  return () => {
    unsubscribeFirestore();
    window.removeEventListener("egh_event_maintenance", handleLocal);
    window.removeEventListener("storage", handleLocal);
  };
}

export async function createMaintenanceTicket(ticket: Omit<MaintenanceRecord, "id">): Promise<string> {
  const newId = `TKT-${Math.floor(300 + Math.random() * 600)}`;
  const record: MaintenanceRecord = { ...ticket, id: newId };

  const existing = getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE);
  setLocal("maintenance", [record, ...existing]);

  try {
    await setDoc(doc(db, "maintenance", newId), record);
  } catch (err) {
    console.warn("Firestore createMaintenanceTicket skipped, saved locally.", err);
  }

  return newId;
}

export async function updateMaintenanceStatus(
  id: string,
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED"
): Promise<void> {
  const existing = getLocal<MaintenanceRecord[]>("maintenance", INITIAL_MAINTENANCE);
  const updated = existing.map((t) => (t.id === id ? { ...t, status } : t));
  setLocal("maintenance", updated);

  try {
    await updateDoc(doc(db, "maintenance", id), { status });
  } catch (err) {
    console.warn("Firestore updateMaintenanceStatus skipped, saved locally.", err);
  }
}

// -------------------------------------------------------------
// 5. MESS / DINING MENU
// -------------------------------------------------------------
export function subscribeToMessMenu(callback: (menu: MessMenuDay[]) => void) {
  if (typeof window === "undefined") return () => {};

  let isFirestoreWorking = false;
  let unsubscribeFirestore = () => {};

  try {
    const colRef = collection(db, "mess_menu");
    unsubscribeFirestore = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          isFirestoreWorking = true;
          const list: MessMenuDay[] = [];
          snapshot.forEach((doc) => list.push({ ...(doc.data() as MessMenuDay), id: doc.id }));
          callback(list);
          setLocal("mess_menu", list);
        } else {
          callback(getLocal<MessMenuDay[]>("mess_menu", INITIAL_MESS_MENU));
        }
      },
      () => {
        callback(getLocal<MessMenuDay[]>("mess_menu", INITIAL_MESS_MENU));
      }
    );
  } catch {
    callback(getLocal<MessMenuDay[]>("mess_menu", INITIAL_MESS_MENU));
  }

  const handleLocal = () => {
    if (!isFirestoreWorking) {
      callback(getLocal<MessMenuDay[]>("mess_menu", INITIAL_MESS_MENU));
    }
  };
  window.addEventListener("egh_event_mess_menu", handleLocal);
  window.addEventListener("storage", handleLocal);

  callback(getLocal<MessMenuDay[]>("mess_menu", INITIAL_MESS_MENU));

  return () => {
    unsubscribeFirestore();
    window.removeEventListener("egh_event_mess_menu", handleLocal);
    window.removeEventListener("storage", handleLocal);
  };
}

export async function updateMessMenuDay(dayId: string, updates: Partial<MessMenuDay>): Promise<void> {
  const existing = getLocal<MessMenuDay[]>("mess_menu", INITIAL_MESS_MENU);
  const updated = existing.map((m) => (m.id === dayId ? { ...m, ...updates } : m));
  setLocal("mess_menu", updated);

  try {
    await updateDoc(doc(db, "mess_menu", dayId), updates);
  } catch (err) {
    console.warn("Firestore updateMessMenuDay skipped, saved locally.", err);
  }
}

// -------------------------------------------------------------
// 6. RESIDENTS DIRECTORY
// -------------------------------------------------------------
export function subscribeToResidents(callback: (residents: ResidentRecord[]) => void) {
  if (typeof window === "undefined") return () => {};

  let isFirestoreWorking = false;
  let unsubscribeFirestore = () => {};

  try {
    const colRef = collection(db, "residents");
    unsubscribeFirestore = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          isFirestoreWorking = true;
          const list: ResidentRecord[] = [];
          snapshot.forEach((doc) => list.push({ ...(doc.data() as ResidentRecord), id: doc.id }));
          callback(list);
          setLocal("residents", list);
        } else {
          callback(getLocal<ResidentRecord[]>("residents", INITIAL_RESIDENTS));
        }
      },
      () => {
        callback(getLocal<ResidentRecord[]>("residents", INITIAL_RESIDENTS));
      }
    );
  } catch {
    callback(getLocal<ResidentRecord[]>("residents", INITIAL_RESIDENTS));
  }

  const handleLocal = () => {
    if (!isFirestoreWorking) {
      callback(getLocal<ResidentRecord[]>("residents", INITIAL_RESIDENTS));
    }
  };
  window.addEventListener("egh_event_residents", handleLocal);
  window.addEventListener("storage", handleLocal);

  callback(getLocal<ResidentRecord[]>("residents", INITIAL_RESIDENTS));

  return () => {
    unsubscribeFirestore();
    window.removeEventListener("egh_event_residents", handleLocal);
    window.removeEventListener("storage", handleLocal);
  };
}
