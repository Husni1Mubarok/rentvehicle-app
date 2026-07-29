// ==========================================================
// data.js — Data mock & helper localStorage
// Sistem Informasi Booking Rental Kendaraan
// ==========================================================

const SEED_KENDARAAN = [
  {
    id: "K001",
    nama: "Toyota Avanza",
    tipe: "MPV",
    plat: "L 1234 XX",
    transmisi: "Manual",
    kapasitas: 7,
    hargaHarian: 400000,
    status: "Tersedia",
    img: "🚐",
  },
  {
    id: "K002",
    nama: "Honda Brio",
    tipe: "Hatchback",
    plat: "L 5678 YY",
    transmisi: "Otomatis",
    kapasitas: 5,
    hargaHarian: 300000,
    status: "Tersedia",
    img: "🚗",
  },
  {
    id: "K003",
    nama: "Daihatsu Xenia",
    tipe: "MPV",
    plat: "L 2468 ZZ",
    transmisi: "Manual",
    kapasitas: 7,
    hargaHarian: 350000,
    status: "Disewa",
    img: "🚐",
  },
  {
    id: "K004",
    nama: "Mitsubishi Pajero Sport",
    tipe: "SUV",
    plat: "L 9911 AB",
    transmisi: "Otomatis",
    kapasitas: 7,
    hargaHarian: 750000,
    status: "Tersedia",
    img: "🚙",
  },
  {
    id: "K005",
    nama: "Yamaha NMAX",
    tipe: "Motor",
    plat: "L 3355 CD",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 120000,
    status: "Tersedia",
    img: "Gambar/N MAX.png",
  },
  {
    id: "K006",
    nama: "Toyota Hiace",
    tipe: "Van",
    plat: "L 7788 EF",
    transmisi: "Manual",
    kapasitas: 15,
    hargaHarian: 1000000,
    status: "Maintenance",
    img: "🚌",
  },
  {
    id: "K007",
    nama: "Honda HRV",
    tipe: "SUV",
    plat: "L 1289 AA",
    transmisi: "Otomatis",
    kapasitas: 5,
    hargaHarian: 500000,
    status: "Tersedia",
    img: "🚙",
  },
  {
    id: "K008",
    nama: "Suzuki Ertiga",
    tipe: "MPV",
    plat: "L 1945 ID",
    transmisi: "Manual",
    kapasitas: 7,
    hargaHarian: 380000,
    status: "Tersedia",
    img: "🚐",
  },
  {
    id: "K009",
    nama: "Toyota Yaris",
    tipe: "Hatchback",
    plat: "L 4412 RT",
    transmisi: "Otomatis",
    kapasitas: 5,
    hargaHarian: 350000,
    status: "Tersedia",
    img: "🚗",
  },
  {
    id: "K010",
    nama: "Honda Beat",
    tipe: "Motor",
    plat: "L 9021 SQ",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 80000,
    status: "Tersedia",
    img: "Gambar/Beat.png",
  },
  {
    id: "K011",
    nama: "Hyundai Palisade",
    tipe: "SUV",
    plat: "L 8888 VIP",
    transmisi: "Otomatis",
    kapasitas: 7,
    hargaHarian: 1200000,
    status: "Tersedia",
    img: "🚙",
  },
  {
    id: "K012",
    nama: "Isuzu Elf",
    tipe: "Van",
    plat: "L 7070 GH",
    transmisi: "Manual",
    kapasitas: 19,
    hargaHarian: 1100000,
    status: "Tersedia",
    img: "🚌",
  },
  {
    id: "K013",
    nama: "Honda Jazz",
    tipe: "Hatchback",
    plat: "L 3110 TR",
    transmisi: "Otomatis",
    kapasitas: 5,
    hargaHarian: 320000,
    status: "Disewa",
    img: "🚗",
  },
  {
    id: "K014",
    nama: "Vespa Primavera",
    tipe: "Motor",
    plat: "L 6789 VS",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 150000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K015",
    nama: "Toyota Innova Zenix",
    tipe: "MPV",
    plat: "L 2026 ZX",
    transmisi: "Otomatis",
    kapasitas: 7,
    hargaHarian: 650000,
    status: "Tersedia",
    img: "🚐",
  },
  {
    id: "K016",
    nama: "Honda PCX",
    tipe: "Motor",
    plat: "L 4567 PX",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 130000,
    status: "Maintenance",
    img: "🛵",
  },
  {
    id: "K017",
    nama: "Mitsubishi Xpander",
    tipe: "MPV",
    plat: "L 8901 XP",
    transmisi: "Manual",
    kapasitas: 7,
    hargaHarian: 420000,
    status: "Tersedia",
    img: "🚐",
  },
  {
    id: "K018",
    nama: "Suzuki Ignis",
    tipe: "Hatchback",
    plat: "L 2345 IG",
    transmisi: "Manual",
    kapasitas: 5,
    hargaHarian: 280000,
    status: "Tersedia",
    img: "🚗",
  },
  {
    id: "K019",
    nama: "Daihatsu Terios",
    tipe: "SUV",
    plat: "L 3456 TE",
    transmisi: "Manual",
    kapasitas: 7,
    hargaHarian: 450000,
    status: "Tersedia",
    img: "🚙",
  },
  {
    id: "K020",
    nama: "Toyota Alphard",
    tipe: "MPV",
    plat: "L 1000 AL",
    transmisi: "Otomatis",
    kapasitas: 7,
    hargaHarian: 1800000,
    status: "Tersedia",
    img: "🚐",
  },
  {
    id: "K021",
    nama: "Yamaha Aerox",
    tipe: "Motor",
    plat: "L 5566 AR",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 130000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K022",
    nama: "Honda Vario 160",
    tipe: "Motor",
    plat: "L 7812 VA",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 110000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K023",
    nama: "Kawasaki Ninja ZX-25R",
    tipe: "Motor",
    plat: "L 2500 NJ",
    transmisi: "Manual",
    kapasitas: 2,
    hargaHarian: 350000,
    status: "Tersedia",
    img: "🏍️",
  },
  {
    id: "K024",
    nama: "Honda Scoopy",
    tipe: "Motor",
    plat: "L 4433 SC",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 90000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K025",
    nama: "Yamaha Lexi",
    tipe: "Motor",
    plat: "L 8910 LX",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 100000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K026",
    nama: "Suzuki Satria F150",
    tipe: "Motor",
    plat: "L 1500 SF",
    transmisi: "Manual",
    kapasitas: 2,
    hargaHarian: 110000,
    status: "Disewa",
    img: "🏍️",
  },
  {
    id: "K027",
    nama: "Yamaha R15",
    tipe: "Motor",
    plat: "L 1515 YR",
    transmisi: "Manual",
    kapasitas: 2,
    hargaHarian: 180000,
    status: "Tersedia",
    img: "🏍️",
  },
  {
    id: "K028",
    nama: "Honda CRF150L",
    tipe: "Motor",
    plat: "L 5567 CR",
    transmisi: "Manual",
    kapasitas: 2,
    hargaHarian: 200000,
    status: "Tersedia",
    img: "🏍️",
  },
  {
    id: "K029",
    nama: "Vespa GTS 300",
    tipe: "Motor",
    plat: "L 3000 GT",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 400000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K030",
    nama: "Yamaha Mio M3",
    tipe: "Motor",
    plat: "L 3311 MI",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 70000,
    status: "Tersedia",
    img: "Gambar/MIO M3.png",
  },
  {
    id: "K031",
    nama: "Honda ADV 160",
    tipe: "Motor",
    plat: "L 1600 AD",
    transmisi: "Otomatis",
    kapasitas: 2,
    hargaHarian: 140000,
    status: "Tersedia",
    img: "🛵",
  },
  {
    id: "K032",
    nama: "Kawasaki W175",
    tipe: "Motor",
    plat: "L 1750 KW",
    transmisi: "Manual",
    kapasitas: 2,
    hargaHarian: 160000,
    status: "Tersedia",
    img: "🏍️",
  },
];

const SEED_USERS = [
  { username: "admin", password: "admin123", role: "admin", nama: "Admin Rental" },
  { username: "budi", password: "budi123", role: "user", nama: "Budi Santoso" },
  { username: "ani", password: "ani123", role: "user", nama: "Ani Wijaya" },
  { username: "citra", password: "citra123", role: "user", nama: "Citra Lestari" },
];

const SEED_BOOKINGS = [
  {
    id: "BK001",
    kendaraanId: "K003",
    username: "budi",
    tglMulai: "2026-07-08",
    tglSelesai: "2026-07-10",
    tujuan: "Perjalanan keluarga ke Malang",
    status: "Disetujui",
    totalHarga: 700000,
    dibuatPada: "2026-07-05T10:00:00",
  },
  {
    id: "BK002",
    kendaraanId: "K001",
    username: "ani",
    tglMulai: "2026-07-12",
    tglSelesai: "2026-07-14",
    tujuan: "Dinas luar kota ke Surabaya",
    status: "Menunggu",
    totalHarga: 800000,
    dibuatPada: "2026-07-08T09:30:00",
  },
  {
    id: "BK003",
    kendaraanId: "K005",
    username: "citra",
    tglMulai: "2026-07-09",
    tglSelesai: "2026-07-09",
    tujuan: "Kuliah dan jalan-jalan sore",
    status: "Selesai",
    totalHarga: 120000,
    dibuatAt: "2026-07-09T08:00:00",
  },
];

/* ---------- Storage bootstrap ---------- */
function initStorage() {
  const existingKendaraan = localStorage.getItem("kendaraan");
  let needUpdate = !existingKendaraan;
  if (existingKendaraan) {
    const list = JSON.parse(existingKendaraan);
    if (list.length < SEED_KENDARAAN.length) {
      needUpdate = true;
    } else {
      const needsImageUpdate = list.some(k =>
        (k.nama === "Yamaha NMAX" && k.img === "🛵") ||
        (k.nama === "Honda Beat" && k.img === "🛵") ||
        (k.nama === "Yamaha Mio M3" && k.img === "🛵")
      );
      if (needsImageUpdate) {
        needUpdate = true;
      }
    }
  }

  if (needUpdate) {
    localStorage.setItem("kendaraan", JSON.stringify(SEED_KENDARAAN));
  }

  const existingUsers = localStorage.getItem("users");
  if (!existingUsers || JSON.parse(existingUsers).length < SEED_USERS.length) {
    localStorage.setItem("users", JSON.stringify(SEED_USERS));
  }

  const existingBookings = localStorage.getItem("bookings");
  if (!existingBookings || JSON.parse(existingBookings).length < SEED_BOOKINGS.length) {
    localStorage.setItem("bookings", JSON.stringify(SEED_BOOKINGS));
  }
}

/* ---------- Generic helpers ---------- */
function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function generateId(prefix, list) {
  const num = list.length + 1;
  return `${prefix}${String(num).padStart(3, "0")}`;
}
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}
function formatTanggal(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/* ---------- Auth session (sederhana, bukan untuk produksi) ---------- */
function getSession() {
  return JSON.parse(sessionStorage.getItem("session") || "null");
}
function setSession(user) {
  sessionStorage.setItem("session", JSON.stringify(user));
}
function clearSession() {
  sessionStorage.removeItem("session");
}
function requireLogin(role) {
  const s = getSession();
  if (!s) {
    window.location.href = "login.html";
    return null;
  }
  if (role && s.role !== role) {
    window.location.href = s.role === "admin" ? "dashboard.html" : "index.html";
    return null;
  }
  return s;
}

// Export utilities for external use
export { initStorage, getData, setData, generateId, formatRupiah, formatTanggal, getSession, setSession, clearSession, requireLogin };

// Transform seed kendaraan objects to match Vehicle type used in UI
function mapKendaraanToVehicle(kendaraan) {
  const statusMap = {
    'Tersedia': 'available',
    'Disewa': 'rented',
    'Maintenance': 'maintenance',
    'Booked': 'booked'
  };
  return {
    id: kendaraan.id,
    name: kendaraan.nama,
    type: kendaraan.tipe,
    location: kendaraan.plat,
    transmission: kendaraan.transmisi,
    capacity: kendaraan.kapasitas,
    price_per_day: kendaraan.hargaHarian,
    rating: 0,
    status: statusMap[kendaraan.status] || 'available',
    description: '',
    images: kendaraan.img ? [{ id: `${kendaraan.id}-img`, vehicle_id: kendaraan.id, image_url: kendaraan.img, is_primary: true }] : []
  };
}

function getVehiclesData() {
  const raw = getData('kendaraan');
  return raw.map(mapKendaraanToVehicle);
}

export { getVehiclesData };

