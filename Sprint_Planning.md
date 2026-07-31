# Sprint Planning — RentVehicle (MVP) v2

## Perubahan Utama dari Versi Sebelumnya
- **Browse tanpa login**: user bisa lihat-lihat kendaraan (list, filter, detail) tanpa perlu daftar/login sama sekali — mirip flow web rental mobil Astra.
- **Login baru muncul saat booking**: begitu user klik "Sewa Sekarang", sistem cek status login. Kalau belum login → diarahkan ke Login/Register dulu, setelah berhasil baru lanjut ke form booking.
- **Navigasi disederhanakan jadi 4 menu**: Beranda, Kendaraan, Tentang Kami, dan Profil (kalau sudah login) / Login (kalau belum).
- **Urutan sprint diubah** supaya sesuai urutan yang dialami user: lihat-lihat dulu → baru autentikasi → baru booking → baru bayar.

## Metode Pengembangan
- **Framework:** Scrum
- **Durasi Sprint:** 2 minggu
- **Total Sprint:** 7 Sprint (±14 minggu)

---

# Sprint 0 — Persiapan Lingkungan Pengembangan ✅

## Tujuan
Menyiapkan seluruh kebutuhan pengembangan agar tim dapat mulai membangun aplikasi.

## Backlog

### Project Setup
- [x] Membuat repository GitHub
- [x] Inisialisasi Next.js + TypeScript
- [x] Konfigurasi Tailwind CSS
- [x] Konfigurasi ESLint & Prettier
- [x] Menyusun struktur folder project

### Database
- [x] Membuat project Supabase
- [x] Membuat tabel database
- [x] Konfigurasi Storage
- [x] Konfigurasi Row Level Security (RLS)

### Authentication Helper
- [x] Middleware session
- [x] Helper getCurrentUser()

### Landing Page
- [x] Hero Section
- [x] Navbar
- [x] Footer

## Acceptance Criteria
- [x] Project berhasil dijalankan
- [x] Database berhasil terkoneksi
- [x] Landing Page tampil dengan baik

---

# Sprint 1 — Landing Page, Navigasi & Browse Kendaraan (Tanpa Login)

## Tujuan
Memungkinkan siapa saja (belum login) mencari dan melihat detail kendaraan, dengan navigasi utama yang final.

## Backlog

### Navigasi Utama (Navbar)
- [x] Menu **Beranda**
- [x] Menu **Kendaraan**
- [x] Menu **Tentang Kami**
- [x] Menu **Profil** (jika sudah login) / **Login** (jika belum login) — kondisional berdasarkan status session
- [x] Navbar responsive (mobile menu)

### Landing Page (Beranda)
- [x] Hero + Search Booking (input tanggal & lokasi, tanpa perlu login)
- [x] Kategori Kendaraan
- [x] Kendaraan Populer
- [x] Responsive

### Halaman Kendaraan (List)
- [x] Daftar Kendaraan
- [x] Search
- [x] Filter (kategori, harga, transmisi, dll)
- [x] Sorting
- [x] Pagination
- [x] Empty State (kendaraan tidak tersedia)

### Detail Kendaraan
- [x] Gallery Foto
- [x] Informasi Kendaraan
- [x] Harga
- [x] Status Kendaraan (tersedia / tidak)
- [x] Tombol **"Sewa Sekarang"** (belum memicu login di sprint ini — cek auth dilakukan di Sprint 3)

### Halaman Tentang Kami
- [x] Konten profil perusahaan
- [x] Kontak / lokasi

## Testing
- [x] Semua halaman di atas bisa diakses tanpa login
- [x] Search berjalan
- [x] Filter berjalan
- [x] Sorting berjalan
- [x] Detail kendaraan tampil
- [x] Navbar menampilkan menu yang benar sesuai status login

## Acceptance Criteria
- Pengunjung (belum login) dapat browsing, mencari, dan melihat detail kendaraan sepenuhnya
- Navbar hanya berisi 4 menu sesuai ketentuan
- Tidak ada fitur di sprint ini yang mewajibkan login

---

# Sprint 2 — Authentication & Role Management

## Tujuan
Membangun sistem autentikasi dan hak akses pengguna, sebagai prasyarat sebelum booking (Sprint 3).

## Backlog

### Authentication
- [x] Registrasi akun
- [x] Login
- [x] Logout
- [x] Forgot Password
- [x] Reset Password
- [x] Verifikasi Email

### Role Management
- [x] Customer Role
- [x] Admin Role
- [x] Protected Route (khusus untuk halaman booking & dashboard di sprint berikutnya)
- [x] Session Management

### Profil
- [x] Lihat Profil
- [x] Edit Profil
- [x] Ganti Password

## Testing
- [x] Login berhasil
- [x] Login gagal
- [x] Logout
- [x] Reset Password
- [x] Hak akses sesuai role
- [x] Menu Navbar berubah dari "Login" jadi "Profil" setelah login berhasil

## Acceptance Criteria
- User dapat register & login
- Session berjalan
- Hak akses sesuai role
- Setelah login, navbar menampilkan menu Profil

---

# Sprint 3 — Booking Kendaraan (Wajib Login)

## Tujuan
Membangun proses booking sederhana. Login baru diwajibkan di titik ini — saat user menekan "Sewa Sekarang".

## Backlog

### Alur Redirect ke Login
- [x] Cek status login saat klik "Sewa Sekarang"
- [x] Jika belum login → redirect ke halaman Login/Register, simpan intent kendaraan yang dipilih
- [x] Setelah login sukses → otomatis lanjut ke form booking kendaraan yang tadi dipilih

### Booking
- [x] Pilih tanggal sewa
- [x] Cek ketersediaan kendaraan
- [x] Ringkasan booking
- [x] Upload KTP
- [x] Upload SIM
- [x] Konfirmasi booking

## Testing
- [x] User belum login diarahkan ke login saat booking
- [x] Setelah login, kembali otomatis ke kendaraan yang tadi dipilih
- [x] Booking berhasil
- [x] Double booking ditolak
- [x] Upload dokumen berhasil

## Acceptance Criteria
- Booking hanya bisa dilakukan oleh user yang sudah login
- Booking berhasil dibuat dan data tersimpan

---

# Sprint 4 — Pembayaran (Simulasi)

## Tujuan
Membangun alur pembayaran dan perubahan status booking, tanpa integrasi payment gateway sungguhan. Perhitungan harga tetap berjalan normal, hanya eksekusi pembayarannya yang disimulasikan (auto-success/auto-failed, tidak connect ke bank/e-wallet asli).

## Backlog

### Perhitungan Harga
- [x] Hitung total harga sewa (harga/hari × jumlah hari)
- [x] Tampilkan rincian harga di Ringkasan Booking

### Payment (Simulasi)
- [x] Halaman Pilih Metode Pembayaran (tampilan saja — transfer bank, e-wallet, dll, tidak terhubung ke API pihak ketiga)
- [x] Tombol "Simulasi Bayar Berhasil"
- [x] Tombol "Simulasi Bayar Gagal" (untuk testing skenario gagal)
- [x] Klik simulasi → langsung update status booking di database (tanpa verifikasi/webhook eksternal)
- [x] Halaman sukses
- [x] Halaman gagal

### Booking Status
- [x] Pending
- [x] Paid
- [x] Confirmed
- [x] Cancelled

### Notification
- [x] Notifikasi booking
- [x] Notifikasi pembayaran

## Testing
- [x] Total harga terhitung benar
- [x] Simulasi pembayaran berhasil → status berubah jadi Paid/Confirmed
- [x] Simulasi pembayaran gagal → status berubah jadi Cancelled/Failed
- [x] Status berubah otomatis sesuai hasil simulasi

## Acceptance Criteria
- Total harga tampil dan terhitung dengan benar
- User bisa menyelesaikan alur "pembayaran" lewat simulasi (tanpa payment gateway sungguhan)
- Status booking berubah sesuai hasil simulasi

---

# Sprint 5 — Dashboard Customer & Admin

## Tujuan
Menyediakan dashboard untuk Customer dan Admin, diakses lewat menu Profil.

## Backlog

### Dashboard Customer (di dalam menu Profil)
- [x] Ringkasan Akun
- [x] Booking Saya
- [x] Riwayat Booking
- [x] Edit Profil (terhubung dengan Sprint 2)

### Dashboard Admin
- [ ] Dashboard
- [ ] CRUD Kendaraan
- [ ] Kelola Booking
- [ ] Verifikasi Pembayaran

## Testing
- [ ] CRUD kendaraan
- [ ] Dashboard berjalan
- [ ] Data realtime
- [ ] Customer hanya melihat data booking miliknya sendiri

## Acceptance Criteria
- Customer melihat booking miliknya lewat menu Profil
- Admin mengelola kendaraan dan booking

---

# Sprint 6 — Review, Laporan, Finishing & Deployment

## Tujuan
Melengkapi fitur pendukung, menyelesaikan MVP, dan deployment.

## Backlog

### Review
- [ ] Rating Kendaraan
- [ ] Ulasan

### Laporan
- [ ] Laporan Booking (Admin)
- [ ] Export PDF

### Testing
- [ ] Functional Testing (seluruh alur: browse → login → booking → bayar → dashboard)
- [ ] Integration Testing
- [ ] Bug Fix

### Deployment
- [ ] Deploy Vercel
- [ ] Konfigurasi Environment
- [ ] Verifikasi Production

## Acceptance Criteria
- Seluruh fitur MVP berjalan sesuai alur: browse bebas → login saat booking → bayar → dashboard
- Tidak ada bug kritis
- Aplikasi berhasil di-deploy

---

# Ringkasan Sprint

| Sprint | Fokus | Output |
|--------|-------|--------|
| Sprint 0 | Persiapan Lingkungan | Project siap dikembangkan |
| Sprint 1 | Landing, Navigasi & Browse | Beranda, 4 menu navbar, list & detail kendaraan tanpa login |
| Sprint 2 | Authentication | Login, Register, Role Management, Profil |
| Sprint 3 | Booking | Redirect login saat "Sewa Sekarang", proses booking |
| Sprint 4 | Pembayaran (Simulasi) | Hitung harga, simulasi bayar, Status Booking |
| Sprint 5 | Dashboard | Dashboard Customer (via Profil) & Admin |
| Sprint 6 | Finishing | Review, Laporan, Testing & Deployment |

# Diagram Alur Pengguna (User Flow)

`[Halaman: Beranda]
   Navbar: Beranda | Kendaraan | Tentang Kami | Login (belum login) / Profil (sudah login)
        │
        ├──> klik "Tentang Kami" ──> [Halaman: Tentang Kami] (jalur buntu, sekadar info)
        │
        └──> klik "Kendaraan" (atau search box di Beranda)
                 │
                 ▼
        [Halaman: Daftar Kendaraan]
           - Search
           - Filter (kategori, harga, transmisi, dll)
           - Sorting
           - Pagination
                 │
                 ▼
        [Halaman: Detail Kendaraan]
           - Gallery foto, info, harga, status ketersediaan
           - Tombol "Sewa Sekarang"
                 │
                 ▼
        [Cek status login]
                 │
        ┌────────┴────────┐
     belum login        sudah login
        │                    │
        ▼                    │
[Halaman: Login/Register]     │
   - Login / Daftar akun      │
   - Setelah sukses, sistem   │
     ingat kendaraan tadi     │
        │                    │
        └────────┬───────────┘
                 ▼
        [Halaman: Form Booking]
           - Pilih tanggal mulai & selesai sewa
           - Sistem cek ketersediaan di tanggal tsb
                 │
                 ▼
        [Halaman: Upload Dokumen]
           - Upload KTP
           - Upload SIM
                 │
                 ▼
        [Halaman: Ringkasan Booking]
           - Kendaraan, tanggal, total harga (harga/hari × jumlah hari)
           - Tombol "Lanjut ke Pembayaran"
                 │
                 ▼
        [Halaman: Metode Pembayaran]
           - Pilih metode (tampilan saja)
           - Tombol "Bayar Sekarang"
                 │
                 ▼
        [Halaman: Simulasi Pembayaran]
           - Tombol "Simulasi Berhasil" / "Simulasi Gagal"
                 │
        ┌────────┴────────┐
     Berhasil            Gagal
        │                    │
        ▼                    ▼
[Halaman: Pembayaran      [Halaman: Pembayaran
   Sukses]                   Gagal]
   status: Confirmed         - Tombol "Coba Lagi"
        │                    (balik ke Metode Pembayaran)
        ▼
[Menu: Profil > Booking Saya / Riwayat]
   - Lihat status booking terbaru
   - Beri Rating & Ulasan (setelah selesai sewa)