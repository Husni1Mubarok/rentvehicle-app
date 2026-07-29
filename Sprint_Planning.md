# Sprint Planning — RentVehicle (MVP)

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

# Sprint 1 — Authentication & Role Management

## Tujuan
Membangun sistem autentikasi dan hak akses pengguna.

## Backlog

### Authentication
- [ ] Registrasi akun
- [ ] Login
- [ ] Logout
- [ ] Forgot Password
- [ ] Reset Password
- [ ] Verifikasi Email

### Role Management
- [ ] Customer Role
- [ ] Admin Role
- [ ] Protected Route
- [ ] Session Management

### Profil
- [ ] Lihat Profil
- [ ] Edit Profil
- [ ] Ganti Password

## Testing

- [ ] Login berhasil
- [ ] Login gagal
- [ ] Logout
- [ ] Reset Password
- [ ] Hak akses sesuai role

## Acceptance Criteria

- User dapat login
- Session berjalan
- Hak akses sesuai role

---

# Sprint 2 — Pencarian & Detail Kendaraan

## Tujuan
Memungkinkan pengguna mencari dan melihat detail kendaraan tanpa login.

## Backlog

### Landing Page
- [ ] Search Booking
- [ ] Kategori Kendaraan
- [ ] Kendaraan Populer
- [ ] Responsive

### Vehicle List
- [ ] Daftar Kendaraan
- [ ] Search
- [ ] Filter
- [ ] Sorting
- [ ] Pagination

### Vehicle Detail
- [ ] Gallery Foto
- [ ] Informasi Kendaraan
- [ ] Harga
- [ ] Status Kendaraan
- [ ] Tombol "Sewa Sekarang"

### Empty State
- [ ] Kendaraan tidak tersedia

## Testing

- [ ] Search berjalan
- [ ] Filter berjalan
- [ ] Sorting berjalan
- [ ] Detail kendaraan tampil

## Acceptance Criteria

- Pengguna dapat mencari kendaraan
- Pengguna dapat melihat detail kendaraan

---

# Sprint 3 — Booking Kendaraan

## Tujuan
Membangun proses booking yang sederhana seperti pemesanan tiket bioskop.

## Backlog

### Booking
- [ ] Pilih tanggal sewa
- [ ] Cek ketersediaan kendaraan
- [ ] Ringkasan booking
- [ ] Upload KTP
- [ ] Upload SIM
- [ ] Konfirmasi booking

## Testing

- [ ] Booking berhasil
- [ ] Double booking ditolak
- [ ] Upload dokumen berhasil

## Acceptance Criteria

- Booking berhasil dibuat
- Data booking tersimpan

---

# Sprint 4 — Pembayaran

## Tujuan
Mengintegrasikan proses pembayaran dan perubahan status booking.

## Backlog

### Payment
- [ ] Integrasi Midtrans
- [ ] Pilih metode pembayaran
- [ ] Status pembayaran
- [ ] Halaman sukses
- [ ] Halaman gagal

### Booking Status
- [ ] Pending
- [ ] Paid
- [ ] Confirmed
- [ ] Cancelled

### Notification
- [ ] Notifikasi booking
- [ ] Notifikasi pembayaran

## Testing

- [ ] Pembayaran berhasil
- [ ] Pembayaran gagal
- [ ] Status berubah otomatis

## Acceptance Criteria

- User berhasil melakukan pembayaran
- Status booking berubah sesuai pembayaran

---

# Sprint 5 — Dashboard

## Tujuan
Menyediakan dashboard untuk Customer dan Admin.

## Backlog

### Dashboard Customer
- [ ] Dashboard
- [ ] Booking Saya
- [ ] Riwayat Booking
- [ ] Profil

### Dashboard Admin
- [ ] Dashboard
- [ ] CRUD Kendaraan
- [ ] Kelola Booking
- [ ] Verifikasi Pembayaran

## Testing

- [ ] CRUD kendaraan
- [ ] Dashboard berjalan
- [ ] Data realtime

## Acceptance Criteria

- Customer melihat booking miliknya
- Admin mengelola kendaraan dan booking

---

# Sprint 6 — Finishing & Deployment

## Tujuan
Menyelesaikan MVP dan melakukan deployment.

## Backlog

### Review
- [ ] Rating Kendaraan
- [ ] Ulasan

### Laporan
- [ ] Laporan Booking
- [ ] Export PDF

### Testing
- [ ] Functional Testing
- [ ] Integration Testing
- [ ] Bug Fix

### Deployment
- [ ] Deploy Vercel
- [ ] Konfigurasi Environment
- [ ] Verifikasi Production

## Acceptance Criteria

- Seluruh fitur MVP berjalan
- Tidak ada bug kritis
- Aplikasi berhasil di-deploy

---

# Ringkasan Sprint

| Sprint | Fokus | Output |
|--------|-------|--------|
| Sprint 0 | Persiapan Lingkungan | Project siap dikembangkan |
| Sprint 1 | Authentication | Login, Register, Role Management |
| Sprint 2 | Browse Kendaraan | Search, Filter, Detail Kendaraan |
| Sprint 3 | Booking | Booking Kendaraan |
| Sprint 4 | Pembayaran | Payment & Status Booking |
| Sprint 5 | Dashboard | Dashboard Customer & Admin |
| Sprint 6 | Finishing | Review, Testing & Deployment |