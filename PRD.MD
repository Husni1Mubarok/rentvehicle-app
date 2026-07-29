# Product Requirements Document (PRD)

# RentVehicle
### Sistem Penyewaan Kendaraan Berbasis Website dengan Booking Online

| Metadata | Detail |
|----------|--------|
| Nama Produk | RentVehicle |
| Jenis Produk | Website Rental Kendaraan |
| Versi Dokumen | 2.0 |
| Status | Draft MVP |
| Disusun Oleh | Husni |
| Tanggal | Juli 2026 |

---

# 1. Executive Summary

RentVehicle merupakan platform penyewaan kendaraan berbasis website yang dirancang untuk memudahkan pelanggan dalam mencari, membandingkan, memesan, dan membayar kendaraan secara online tanpa harus datang langsung ke tempat rental.

Website ini menghubungkan pelanggan dengan penyedia jasa rental melalui sistem booking yang cepat, transparan, dan mudah digunakan. Seluruh proses mulai dari pencarian kendaraan, pengecekan ketersediaan, booking, pembayaran, verifikasi dokumen, hingga pengembalian kendaraan dilakukan dalam satu sistem yang terintegrasi.

Selain memberikan kemudahan bagi pelanggan, RentVehicle juga membantu pemilik usaha rental mengelola armada, transaksi, pembayaran, laporan bisnis, dan status kendaraan secara real-time melalui dashboard admin.

Target utama pengembangan adalah menciptakan pengalaman booking kendaraan yang modern dan sederhana seperti proses pembelian tiket bioskop atau pemesanan hotel, sehingga pengguna dapat menyelesaikan proses penyewaan hanya dalam beberapa langkah.

---

# 2. Latar Belakang

Sebagian besar usaha rental kendaraan di Indonesia masih menjalankan proses bisnis secara manual melalui telepon, WhatsApp, atau pencatatan menggunakan buku.

Proses tersebut sering menimbulkan berbagai permasalahan, seperti:

- Double booking kendaraan.
- Pelanggan tidak mengetahui kendaraan yang masih tersedia.
- Proses konfirmasi membutuhkan waktu lama.
- Pembayaran dilakukan di luar sistem.
- Data pelanggan tidak tersimpan dengan baik.
- Sulit membuat laporan pendapatan.
- Sulit mengetahui kendaraan yang sedang disewa maupun yang sedang dalam perawatan.

Di sisi pelanggan, proses penyewaan juga terasa kurang praktis karena harus bertanya satu per satu mengenai harga, jenis kendaraan, serta jadwal yang tersedia.

Oleh karena itu dibutuhkan sebuah sistem yang mampu mengotomatisasi seluruh proses penyewaan kendaraan sehingga lebih cepat, akurat, transparan, dan efisien.

---

# 3. Problem Statement

Permasalahan utama yang ingin diselesaikan oleh RentVehicle adalah:

- Tidak adanya sistem booking kendaraan secara online.
- Tingginya risiko double booking.
- Sulit mengetahui ketersediaan kendaraan secara real-time.
- Proses administrasi masih dilakukan secara manual.
- Pembayaran belum terintegrasi.
- Pelanggan tidak memiliki riwayat transaksi.
- Admin kesulitan membuat laporan operasional.
- Tidak tersedia dashboard monitoring armada.

---

# 4. Tujuan Produk

## Tujuan Bisnis

- Meningkatkan jumlah transaksi online.
- Mengurangi proses booking manual.
- Mengurangi risiko double booking hingga 0%.
- Mempermudah pengelolaan armada.
- Menyediakan laporan bisnis secara otomatis.

## Tujuan Pengguna

- Memesan kendaraan kapan saja.
- Mengetahui harga secara transparan.
- Melihat kendaraan yang benar-benar tersedia.
- Melakukan pembayaran secara online.
- Melihat status booking secara real-time.
- Menyimpan riwayat penyewaan.

---

# 5. Target Pengguna

## 1. Pelanggan

Pengguna yang ingin menyewa kendaraan untuk kebutuhan pribadi, wisata maupun bisnis.

Karakteristik:

- Usia 18–55 tahun
- Memiliki smartphone
- Terbiasa menggunakan website atau aplikasi

Kebutuhan:

- Booking cepat
- Harga jelas
- Kendaraan tersedia
- Pembayaran online

---

## 2. Admin Rental

Pemilik usaha atau karyawan rental.

Kebutuhan:

- Mengelola kendaraan
- Memverifikasi booking
- Mengelola pembayaran
- Membuat laporan
- Mengelola pelanggan

---

## 3. Super Admin

Mengelola seluruh sistem apabila nantinya RentVehicle berkembang menjadi platform multi-rental.

---

# 6. User Persona

## Persona 1

Nama : Dina

Umur : 28 Tahun

Pekerjaan : Karyawan Swasta

Tujuan

Menyewa mobil untuk liburan keluarga.

Pain Point

- Tidak tahu kendaraan masih tersedia atau tidak.
- Harus chat admin terlebih dahulu.
- Takut kendaraan sudah dipesan orang lain.

Harapan

Booking cukup melalui website.

---

## Persona 2

Nama : Pak Rudi

Umur : 46 Tahun

Pekerjaan : Pemilik Rental

Pain Point

- Booking melalui WhatsApp.
- Sulit mencatat transaksi.
- Sulit mengetahui armada yang tersedia.

Harapan

Semua proses dilakukan melalui dashboard.

---

# 7. Value Proposition

RentVehicle memberikan pengalaman penyewaan kendaraan yang cepat, mudah, aman, dan transparan melalui sistem booking online yang dapat diakses kapan saja.

Keunggulan utama:

- Booking online 24 jam.
- Cek ketersediaan kendaraan secara real-time.
- Pembayaran online.
- Dashboard admin lengkap.
- Riwayat transaksi otomatis.
- Notifikasi otomatis.
- Mengurangi double booking.

---

# 8. Kompetitor

| Kompetitor | Kelebihan | Kekurangan |
|------------|-----------|------------|
| Traveloka Car Rental | Booking mudah | Pilihan rental terbatas |
| Tiket.com Rental | Terintegrasi | Tidak semua UMKM menggunakan |
| Rental Manual | Murah | Booking manual dan rawan kesalahan |

### Positioning RentVehicle

RentVehicle difokuskan sebagai website rental kendaraan modern yang mudah digunakan oleh pelanggan maupun pemilik usaha rental skala kecil hingga menengah.

---

# 9. Scope MVP

## Fitur Pelanggan

- Landing Page
- Login
- Registrasi
- Cari Kendaraan
- Detail Kendaraan
- Booking Online
- Upload KTP
- Upload SIM
- Pembayaran
- Riwayat Booking
- Review Kendaraan

---

## Fitur Admin

- Dashboard
- Kelola Kendaraan
- Kelola Booking
- Kelola Pembayaran
- Kelola Pelanggan
- Kelola Review
- Laporan
- Pengaturan

---

# 10. Out of Scope

Fitur berikut belum termasuk pada versi MVP.

- Aplikasi Android
- Aplikasi iOS
- Multi Cabang
- GPS Tracking
- Driver Tracking
- Dynamic Pricing
- Program Loyalty
- Referral Program
- AI Recommendation

---

# 11. Sitemap Website

HOME
│
├── Beranda
├── Kendaraan
│ ├── Detail Kendaraan
│ └── Booking
├── Promo
├── Tentang Kami
├── Bantuan
├── Login
├── Registrasi
│
└── Dashboard Pelanggan
├── Dashboard
├── Booking Saya
├── Riwayat
├── Profil
└── Ulasan

Dashboard Admin

Dashboard
│
├── Kendaraan
├── Booking
├── Pembayaran
├── Pelanggan
├── Laporan
├── Review
├── Pengaturan
└── Logout

---

# 12. Konsep UI/UX

RentVehicle mengusung konsep desain modern, minimalis, responsif, dan mudah dipahami oleh semua kalangan.

Inspirasi antarmuka diambil dari:

- Traveloka
- Tiket.com
- XXI
- TIX ID
- Tokopedia

Prinsip utama desain:

- Kendaraan langsung tampil pada halaman utama.
- Pengguna tidak wajib login untuk melihat kendaraan.
- Booking maksimal 5 langkah.
- Harga selalu terlihat.
- Status kendaraan menggunakan indikator warna.
- Website mobile-friendly.
- Navigasi sederhana.
- Tombol aksi mudah ditemukan.

---

# 13. Konsep Booking

Konsep booking dibuat menyerupai proses pembelian tiket bioskop agar pengguna lebih familiar.

Alur booking:

1. Pilih kendaraan.
2. Lihat detail kendaraan.
3. Pilih tanggal sewa melalui kalender.
4. Sistem mengecek ketersediaan.
5. Login atau Registrasi.
6. Upload dokumen.
7. Checkout.
8. Pembayaran.
9. Verifikasi admin.
10. Booking berhasil.

Selama proses booking, sistem akan mengunci jadwal kendaraan sementara (booking lock) untuk mencegah terjadinya double booking.


---

# 14. Information Architecture

RentVehicle dirancang agar pengguna dapat menemukan kendaraan dan melakukan booking dengan langkah sesingkat mungkin. Informasi disusun secara bertahap sehingga pengguna tidak merasa bingung selama menggunakan website.

## Customer Information Architecture

```
Home
│
├── Hero Banner
├── Search Booking
├── Vehicle Categories
├── Popular Vehicles
├── Promo
├── Why Choose Us
├── Customer Reviews
└── Footer
```

```
Vehicle List
│
├── Search
├── Filter
│   ├── Lokasi
│   ├── Jenis Kendaraan
│   ├── Harga
│   ├── Transmisi
│   └── Kapasitas
│
└── Vehicle Card
```

```
Vehicle Detail
│
├── Gallery
├── Vehicle Information
├── Facilities
├── Rental Terms
├── Customer Reviews
└── Booking Button
```

```
Dashboard Customer
│
├── Dashboard
├── My Booking
├── Booking History
├── Profile
├── Notifications
└── Reviews
```

---

# 15. User Journey

## Sebelum Menggunakan RentVehicle

Pelanggan harus:

- Menghubungi admin melalui WhatsApp.
- Menanyakan kendaraan yang tersedia.
- Menunggu balasan admin.
- Menanyakan harga.
- Mengirim KTP.
- Mengirim bukti pembayaran.
- Menunggu konfirmasi.

Total proses cukup panjang dan sering menimbulkan ketidakpastian.

---

## Setelah Menggunakan RentVehicle

Pelanggan cukup:

1. Membuka website.
2. Memilih kendaraan.
3. Memilih tanggal.
4. Booking.
5. Bayar.
6. Menunggu verifikasi.

Proses jauh lebih cepat dan seluruh informasi tersedia secara transparan.

---

# 16. User Flow

## Flow Utama Customer

```
Landing Page
      │
      ▼
Cari Kendaraan
      │
      ▼
Pilih Kendaraan
      │
      ▼
Detail Kendaraan
      │
      ▼
Pilih Tanggal
      │
      ▼
Cek Ketersediaan
      │
      ▼
Login / Register
      │
      ▼
Upload Dokumen
      │
      ▼
Checkout
      │
      ▼
Pembayaran
      │
      ▼
Verifikasi Admin
      │
      ▼
Booking Berhasil
      │
      ▼
Riwayat Booking
```

---

# 17. Landing Page

Landing page merupakan halaman pertama yang dilihat pengguna.

Tujuan utama halaman ini adalah membuat pengguna langsung mencari kendaraan tanpa harus login.

## Komponen Landing Page

### Navbar

- Logo RentVehicle
- Beranda
- Kendaraan
- Promo
- Tentang Kami
- Bantuan
- Login

---

### Hero Section

Background berupa foto kendaraan premium.

Headline

> Temukan Kendaraan Terbaik untuk Perjalanan Anda

Subheadline

> Booking kendaraan menjadi lebih mudah, cepat, dan aman hanya melalui RentVehicle.

CTA

- Cari Kendaraan
- Lihat Promo

---

### Search Booking

Komponen ini menjadi fokus utama halaman.

```
Lokasi
▼ Surabaya

Tanggal Ambil
📅

Tanggal Kembali
📅

Jenis Kendaraan
▼

[ Cari Kendaraan ]
```

---

### Kategori Kendaraan

Kategori ditampilkan menggunakan icon.

🚗 Mobil

🏍 Motor

🚙 SUV

🚐 MPV

🚚 Pick Up

---

### Daftar Kendaraan

Vehicle ditampilkan dalam bentuk card.

```
-------------------------------------

📷 FOTO

Toyota Avanza

⭐⭐⭐⭐⭐ 4.9

Manual

7 Penumpang

Rp350.000 / hari

Status
🟢 Tersedia

[Lihat Detail]

-------------------------------------
```

Hover Card

- Card sedikit membesar.
- Shadow muncul.
- Tombol berubah warna.

---

### Why Choose RentVehicle

Berisi keunggulan.

✔ Booking Online

✔ Harga Transparan

✔ Kendaraan Berkualitas

✔ Customer Support

---

### Customer Review

Menampilkan testimoni pelanggan.

---

### Footer

- Tentang Kami
- FAQ
- Kontak
- Kebijakan Privasi
- Sosial Media

---

# 18. Halaman Detail Kendaraan

Halaman ini memberikan informasi lengkap mengenai kendaraan.

## Layout

```
+----------------------+--------------------+
|                      |                    |
|      Gallery         | Informasi          |
|                      | Kendaraan          |
|                      |                    |
+----------------------+--------------------+
```

---

## Gallery

- Foto utama
- Thumbnail
- Zoom Image

---

## Informasi Kendaraan

Ditampilkan:

Nama

Merk

Jenis

Transmisi

Kapasitas

Tahun

Harga per Hari

Status

Lokasi

---

## Fasilitas

Contoh

- AC
- Audio
- Charger
- Airbag
- Bluetooth
- Kamera Mundur

---

## Persyaratan

- Minimal usia 21 tahun.
- Memiliki SIM aktif.
- Upload KTP.
- Mengikuti syarat rental.

---

## CTA

Tombol utama

```
[Sewa Sekarang]
```

Selalu terlihat (sticky button) saat pengguna melakukan scroll pada perangkat mobile.

---

# 19. Flow Booking

Flow booking dibuat menyerupai aplikasi XXI agar lebih mudah dipahami.

---

## Step 1

Klik

```
Sewa Sekarang
```

---

## Step 2

Pilih tanggal melalui kalender.

```
Sen Sel Rab Kam Jum Sab Min

      1 2 3

4 5 6 7 8 9 10

11 12 13 14 15 16 17
```

Keterangan warna

🟢 Tersedia

🔴 Sudah Dibooking

⚪ Tidak Bisa Dipilih

🟡 Tanggal Dipilih

---

## Step 3

Ringkasan Booking

```
Toyota Avanza

12 Juli 2026

↓

15 Juli 2026

4 Hari

Rp350.000 × 4

Total

Rp1.400.000

[Lanjut Booking]
```

---

## Step 4

Login atau Registrasi.

Jika belum login, pengguna diarahkan ke halaman autentikasi.

---

## Step 5

Lengkapi Data

Field

Nama

Email

No HP

Alamat

Upload KTP

Upload SIM

---

## Step 6

Checkout

Ringkasan

```
Kendaraan

Tanggal

Durasi

Harga

Biaya Tambahan

Total

Voucher

Promo

Grand Total
```

---

## Step 7

Pembayaran

Metode

- QRIS
- Virtual Account
- Transfer Bank
- E-Wallet
- Kartu Debit

---

## Step 8

Booking Berhasil

```
Booking ID

RV240001

Status

Menunggu Verifikasi

✔ Bukti Pembayaran Diterima
```

Pengguna dapat mengunduh invoice dan melihat status booking.

---

# 20. Dashboard Customer

Menu

- Dashboard
- Booking Saya
- Riwayat
- Profil
- Notifikasi
- Ulasan

---

## Dashboard

Menampilkan

Booking Aktif

Booking Selesai

Booking Menunggu

Promo

---

## Booking Saya

Card Booking

```
Toyota Avanza

12 Jul - 15 Jul

Status

🟢 Dikonfirmasi

[Lihat Detail]
```

---

## Riwayat

Menampilkan seluruh transaksi.

Filter

- Semua
- Berjalan
- Selesai
- Dibatalkan

---

# 21. Status Booking

| Status | Warna |
|----------|---------|
| Menunggu Pembayaran | Kuning |
| Menunggu Verifikasi | Oranye |
| Dikonfirmasi | Hijau |
| Sedang Disewa | Biru |
| Selesai | Abu-abu |
| Dibatalkan | Merah |

---

# 22. Empty State

Jika kendaraan tidak ditemukan.

```
🚗

Maaf

Kendaraan tidak tersedia

Silakan ubah tanggal atau filter pencarian.
```

---

# 23. Error State

Jika pembayaran gagal.

```
❌

Pembayaran gagal.

Silakan coba kembali atau gunakan metode pembayaran lain.
```

---

# 24. Success State

```
🎉

Booking Berhasil

Terima kasih telah menggunakan RentVehicle.

Admin akan segera memverifikasi pesanan Anda.
```

---

# 25. Functional Requirements

Functional Requirements menjelaskan seluruh fungsi yang harus tersedia pada sistem RentVehicle.

Prioritas menggunakan metode **MoSCoW**:

- **Must** : Wajib ada pada MVP.
- **Should** : Sebaiknya ada.
- **Could** : Nilai tambah.
- **Won't** : Tidak termasuk pada versi MVP.

---

# 25.1 Modul Landing Page

| ID | Requirement | Priority |
|----|-------------|----------|
| F-001 | Sistem menampilkan halaman utama saat website dibuka. | Must |
| F-002 | Sistem menampilkan hero banner. | Must |
| F-003 | Sistem menampilkan form pencarian kendaraan. | Must |
| F-004 | Sistem menampilkan daftar kendaraan populer. | Must |
| F-005 | Sistem menampilkan promo terbaru. | Should |
| F-006 | Sistem menampilkan kategori kendaraan. | Must |
| F-007 | Sistem menampilkan review pelanggan. | Could |
| F-008 | Sistem responsive pada desktop, tablet, dan mobile. | Must |

---

# 25.2 Modul Registrasi & Login

| ID | Requirement | Priority |
|----|-------------|----------|
| F-009 | Pengguna dapat melakukan registrasi akun. | Must |
| F-010 | Registrasi menggunakan email. | Must |
| F-011 | Registrasi menggunakan nomor HP. | Should |
| F-012 | Login menggunakan email dan password. | Must |
| F-013 | Login menggunakan Google. | Should |
| F-014 | Logout akun. | Must |
| F-015 | Reset password melalui email. | Must |
| F-016 | Validasi email saat registrasi. | Must |

---

# 25.3 Modul Profil Pengguna

| ID | Requirement | Priority |
|----|-------------|----------|
| F-017 | Melihat profil. | Must |
| F-018 | Mengubah data profil. | Must |
| F-019 | Mengubah password. | Must |
| F-020 | Upload foto profil. | Could |
| F-021 | Upload KTP. | Must |
| F-022 | Upload SIM. | Must |
| F-023 | Melihat status verifikasi dokumen. | Must |

---

# 25.4 Modul Pencarian Kendaraan

| ID | Requirement | Priority |
|----|-------------|----------|
| F-024 | Mencari kendaraan berdasarkan lokasi. | Must |
| F-025 | Mencari berdasarkan tanggal. | Must |
| F-026 | Filter berdasarkan jenis kendaraan. | Must |
| F-027 | Filter berdasarkan transmisi. | Should |
| F-028 | Filter berdasarkan kapasitas penumpang. | Should |
| F-029 | Filter berdasarkan harga. | Must |
| F-030 | Sorting harga termurah. | Must |
| F-031 | Sorting harga tertinggi. | Should |
| F-032 | Sorting rating tertinggi. | Should |

---

# 25.5 Modul Detail Kendaraan

| ID | Requirement | Priority |
|----|-------------|----------|
| F-033 | Menampilkan foto kendaraan. | Must |
| F-034 | Menampilkan spesifikasi kendaraan. | Must |
| F-035 | Menampilkan fasilitas kendaraan. | Must |
| F-036 | Menampilkan harga per hari. | Must |
| F-037 | Menampilkan status kendaraan. | Must |
| F-038 | Menampilkan ulasan pelanggan. | Should |
| F-039 | Menampilkan lokasi rental. | Should |
| F-040 | Tombol "Sewa Sekarang". | Must |

---

# 25.6 Modul Booking

| ID | Requirement | Priority |
|----|-------------|----------|
| F-041 | Memilih tanggal mulai sewa. | Must |
| F-042 | Memilih tanggal selesai sewa. | Must |
| F-043 | Mengecek ketersediaan kendaraan secara real-time. | Must |
| F-044 | Menghitung durasi sewa otomatis. | Must |
| F-045 | Menghitung total biaya otomatis. | Must |
| F-046 | Mencegah double booking. | Must |
| F-047 | Menyimpan booking sementara selama checkout. | Must |
| F-048 | Booking otomatis dibatalkan jika pembayaran melewati batas waktu. | Should |

---

# 25.7 Modul Checkout

| ID | Requirement | Priority |
|----|-------------|----------|
| F-049 | Menampilkan ringkasan booking. | Must |
| F-050 | Menampilkan rincian biaya. | Must |
| F-051 | Menggunakan voucher promo. | Could |
| F-052 | Menampilkan total pembayaran. | Must |
| F-053 | Memilih metode pembayaran. | Must |

---

# 25.8 Modul Pembayaran

| ID | Requirement | Priority |
|----|-------------|----------|
| F-054 | Pembayaran melalui QRIS. | Must |
| F-055 | Pembayaran melalui Virtual Account. | Must |
| F-056 | Pembayaran melalui Transfer Bank. | Must |
| F-057 | Pembayaran melalui E-Wallet. | Should |
| F-058 | Upload bukti pembayaran manual (opsional). | Should |
| F-059 | Menampilkan status pembayaran. | Must |

---

# 25.9 Modul Riwayat Booking

| ID | Requirement | Priority |
|----|-------------|----------|
| F-060 | Melihat booking aktif. | Must |
| F-061 | Melihat booking selesai. | Must |
| F-062 | Melihat booking dibatalkan. | Must |
| F-063 | Download invoice. | Should |
| F-064 | Melihat detail transaksi. | Must |

---

# 25.10 Modul Review

| ID | Requirement | Priority |
|----|-------------|----------|
| F-065 | Memberikan rating. | Should |
| F-066 | Memberikan ulasan. | Should |
| F-067 | Mengedit ulasan sebelum dipublikasikan. | Could |

---

# 26. Functional Requirements Admin

---

# 26.1 Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| A-001 | Melihat total booking. | Must |
| A-002 | Melihat pendapatan. | Must |
| A-003 | Melihat kendaraan tersedia. | Must |
| A-004 | Melihat kendaraan disewa. | Must |
| A-005 | Grafik pendapatan bulanan. | Should |

---

# 26.2 Kelola Kendaraan

| ID | Requirement | Priority |
|----|-------------|----------|
| A-006 | Menambah kendaraan. | Must |
| A-007 | Mengubah kendaraan. | Must |
| A-008 | Menghapus kendaraan. | Must |
| A-009 | Upload foto kendaraan. | Must |
| A-010 | Mengubah harga sewa. | Must |
| A-011 | Mengubah status kendaraan. | Must |
| A-012 | Menandai kendaraan maintenance. | Must |

---

# 26.3 Kelola Booking

| ID | Requirement | Priority |
|----|-------------|----------|
| A-013 | Melihat daftar booking. | Must |
| A-014 | Verifikasi booking. | Must |
| A-015 | Menolak booking. | Must |
| A-016 | Mengubah status booking. | Must |
| A-017 | Melihat detail pelanggan. | Must |

---

# 26.4 Kelola Pembayaran

| ID | Requirement | Priority |
|----|-------------|----------|
| A-018 | Verifikasi pembayaran. | Must |
| A-019 | Mengubah status pembayaran. | Must |
| A-020 | Melihat riwayat pembayaran. | Must |

---

# 26.5 Kelola Pelanggan

| ID | Requirement | Priority |
|----|-------------|----------|
| A-021 | Melihat data pelanggan. | Must |
| A-022 | Melihat dokumen pelanggan. | Must |
| A-023 | Memverifikasi KTP dan SIM. | Must |
| A-024 | Menonaktifkan akun pelanggan. | Should |

---

# 26.6 Kelola Laporan

| ID | Requirement | Priority |
|----|-------------|----------|
| A-025 | Laporan harian. | Must |
| A-026 | Laporan bulanan. | Must |
| A-027 | Laporan tahunan. | Should |
| A-028 | Export PDF. | Must |
| A-029 | Export Excel. | Must |

---

# 27. Modul Notifikasi

| ID | Requirement | Priority |
|----|-------------|----------|
| N-001 | Notifikasi booking berhasil. | Must |
| N-002 | Notifikasi pembayaran berhasil. | Must |
| N-003 | Notifikasi booking ditolak. | Must |
| N-004 | Pengingat H-1 pengambilan kendaraan. | Should |
| N-005 | Pengingat pengembalian kendaraan. | Should |
| N-006 | Notifikasi booking baru ke admin. | Must |

---

# 28. Acceptance Criteria

## Booking Kendaraan

**Given**

Pelanggan memilih kendaraan.

**When**

Pelanggan memilih tanggal yang tersedia dan melakukan checkout.

**Then**

Sistem harus menyimpan booking dan mengubah status menjadi **Menunggu Pembayaran**.

---

## Pembayaran

**Given**

Pelanggan telah melakukan pembayaran.

**When**

Admin melakukan verifikasi.

**Then**

Status booking berubah menjadi **Dikonfirmasi**.

---

## Double Booking

**Given**

Kendaraan telah dibooking pada tanggal tertentu.

**When**

Pengguna lain memilih tanggal yang sama.

**Then**

Sistem tidak mengizinkan booking dan menampilkan informasi bahwa kendaraan tidak tersedia.

---

## Pengembalian Kendaraan

**Given**

Masa sewa telah selesai.

**When**

Admin menyelesaikan proses pengembalian.

**Then**

Status booking berubah menjadi **Selesai** dan kendaraan kembali berstatus **Tersedia**.    


---

# 29. Non-Functional Requirements

Selain memenuhi kebutuhan fungsional, sistem RentVehicle harus memenuhi kebutuhan non-fungsional berikut agar memiliki performa, keamanan, dan keandalan yang baik.

## 29.1 Performance

| Kebutuhan | Target |
|-----------|--------|
| Waktu loading halaman utama | ≤ 3 detik |
| Waktu pencarian kendaraan | ≤ 2 detik |
| Waktu checkout | ≤ 5 detik |
| Waktu login | ≤ 3 detik |
| Maksimal upload dokumen | 10 MB |

---

## 29.2 Availability

| Kebutuhan | Target |
|-----------|--------|
| System Uptime | 99.5% |
| Backup Database | Setiap hari |
| Recovery Time | Maksimal 2 jam |

---

## 29.3 Scalability

Sistem harus mampu menangani:

- Minimal 5.000 pengguna terdaftar.
- Minimal 500 kendaraan.
- Minimal 1.000 transaksi per hari.
- Penambahan cabang pada versi berikutnya tanpa perubahan besar pada arsitektur.

---

## 29.4 Compatibility

Website harus dapat digunakan pada:

Desktop

- Chrome
- Edge
- Firefox
- Safari

Mobile

- Chrome Android
- Safari iPhone

Resolusi

- Desktop
- Tablet
- Mobile

---

## 29.5 Security

Sistem harus memenuhi standar keamanan berikut:

- HTTPS (SSL/TLS)
- Password di-hash menggunakan bcrypt
- Session Authentication
- Validasi seluruh input pengguna
- Mencegah SQL Injection
- Mencegah XSS
- Mencegah CSRF
- Pembatasan percobaan login (Rate Limiting)
- Penyimpanan dokumen secara aman
- Enkripsi data sensitif

---

# 30. Role & Permission

## Customer

Hak akses:

- Registrasi
- Login
- Melihat kendaraan
- Booking kendaraan
- Upload KTP
- Upload SIM
- Pembayaran
- Melihat riwayat
- Memberikan review

---

## Admin

Hak akses:

- Login
- Dashboard
- Kelola kendaraan
- Kelola booking
- Verifikasi pembayaran
- Verifikasi dokumen
- Kelola pelanggan
- Kelola laporan

---

## Super Admin

Hak akses:

- Mengelola seluruh admin
- Mengelola seluruh data
- Melihat seluruh laporan
- Mengatur konfigurasi sistem
- Mengelola hak akses

---

# 31. Entity Relationship

## User

```
id
name
email
phone
password
role
photo
created_at
updated_at
```

---

## Vehicle

```
id
brand
name
type
transmission
seat
year
price_per_day
status
description
location
thumbnail
created_at
updated_at
```

---

## Vehicle Image

```
id
vehicle_id
image
```

---

## Booking

```
id
booking_code
user_id
vehicle_id
pickup_date
return_date
total_day
total_price
status
created_at
updated_at
```

---

## Payment

```
id
booking_id
payment_method
payment_status
amount
proof
paid_at
```

---

## Document

```
id
user_id
ktp
sim
verification_status
```

---

## Review

```
id
booking_id
rating
review
created_at
```

---

## Notification

```
id
user_id
title
message
status
created_at
```

---

# 32. Database Relationship

```
User
 │
 ├────< Booking >──── Vehicle
 │          │
 │          │
 │      Payment
 │
 ├────< Review
 │
 ├────< Document
 │
 └────< Notification
```

---

# 33. Status Kendaraan

| Status | Keterangan |
|----------|------------|
| Available | Kendaraan tersedia |
| Booked | Sudah dibooking |
| Rented | Sedang disewa |
| Maintenance | Sedang diperbaiki |
| Inactive | Tidak digunakan |

---

# 34. Status Booking

| Status | Keterangan |
|----------|------------|
| Pending Payment | Menunggu pembayaran |
| Waiting Verification | Menunggu verifikasi admin |
| Confirmed | Booking diterima |
| On Going | Kendaraan sedang disewa |
| Completed | Penyewaan selesai |
| Cancelled | Booking dibatalkan |

---

# 35. Status Pembayaran

| Status | Keterangan |
|----------|------------|
| Unpaid | Belum dibayar |
| Paid | Sudah dibayar |
| Verified | Sudah diverifikasi |
| Failed | Pembayaran gagal |
| Refunded | Dana dikembalikan |

---

# 36. REST API

## Authentication

```
POST /api/register

POST /api/login

POST /api/logout

POST /api/forgot-password
```

---

## Vehicle

```
GET /api/vehicles

GET /api/vehicles/{id}

POST /api/vehicles

PUT /api/vehicles/{id}

DELETE /api/vehicles/{id}
```

---

## Booking

```
GET /api/bookings

POST /api/bookings

GET /api/bookings/{id}

PUT /api/bookings/{id}

DELETE /api/bookings/{id}
```

---

## Payment

```
POST /api/payments

GET /api/payments/{id}

POST /api/payment/callback
```

---

## Review

```
GET /api/reviews

POST /api/reviews

DELETE /api/reviews/{id}
```

---

## Profile

```
GET /api/profile

PUT /api/profile
```

---

# 37. Integrasi Pihak Ketiga

## Payment Gateway

Contoh:

- Midtrans
- Xendit

---

## Email

SMTP

---

## WhatsApp

WhatsApp Business API

---

## Cloud Storage

Contoh:

- AWS S3
- Cloudinary

---

# 38. Arsitektur Sistem

```
             USER

               │

        Website Frontend

               │

          REST API

               │

 ┌─────────────┼─────────────┐

 │             │             │

Database   Payment API   Storage

 │             │             │

MySQL      Midtrans      Cloudinary
```

---

# 39. Booking Flow

```
Cari Kendaraan

        │

Pilih Kendaraan

        │

Pilih Tanggal

        │

Booking

        │

Lock Kendaraan

        │

Checkout

        │

Pembayaran

        │

Verifikasi

        │

Booking Confirmed

        │

Pengambilan

        │

Pengembalian

        │

Completed
```

---

# 40. Sequence Booking

```
Customer

    │

Cari Kendaraan

    │

Pilih Kendaraan

    │

Booking

    │

Payment Gateway

    │

Admin Verifikasi

    │

Status Confirmed

    │

Serah Terima

    │

Pengembalian

    │

Finish
```

---

# 41. Audit Log

Sistem wajib mencatat aktivitas penting, antara lain:

- Login pengguna
- Logout pengguna
- Registrasi akun
- Booking kendaraan
- Pembayaran
- Verifikasi admin
- Perubahan status kendaraan
- Penghapusan data
- Perubahan harga kendaraan

Setiap log minimal menyimpan:

- User
- Aktivitas
- Waktu
- IP Address
- Perangkat

---

# 42. Backup & Recovery

- Backup database otomatis setiap hari.
- Backup media setiap minggu.
- Restore maksimal 2 jam.
- Penyimpanan backup di lokasi berbeda.
- Log backup disimpan selama 30 hari.

````md
---

# 43. UI/UX Design Guidelines

## 43.1 Design Vision

RentVehicle mengusung konsep **Modern, Clean, Professional, dan User Friendly** dengan dominasi warna **biru dan navy** sebagai identitas utama. Tampilan website dirancang agar pengguna dapat melakukan proses penyewaan kendaraan dengan mudah, cepat, dan nyaman, baik melalui desktop maupun perangkat mobile.

Inspirasi desain diambil dari website dan aplikasi modern seperti:

- Traveloka
- Tiket.com
- TIX ID
- Toyota Rent
- Bluebird

Prinsip utama desain:

- Mudah dipahami oleh pengguna baru.
- Booking kendaraan maksimal 5 langkah.
- Kendaraan langsung terlihat saat membuka website.
- Informasi harga selalu jelas.
- Navigasi sederhana dan konsisten.
- Mobile First Design.
- Responsive di semua ukuran layar.
- Menggunakan ikon dan ilustrasi modern.

---

# 43.2 Branding

## Nama Produk

**RentVehicle**

## Tagline

**Easy Booking, Comfortable Journey**

---

# 43.3 Color Palette

RentVehicle menggunakan kombinasi warna biru dan navy sebagai identitas visual untuk memberikan kesan profesional, terpercaya, modern, dan aman.

| Fungsi | Warna | Hex Code |
|---------|--------|----------|
| Primary | Royal Blue | #2563EB |
| Primary Dark | Navy Blue | #1E3A8A |
| Secondary | Sky Blue | #60A5FA |
| Accent | Cyan | #0EA5E9 |
| Background | Light Gray | #F8FAFC |
| Surface | White | #FFFFFF |
| Text Primary | Dark Slate | #1E293B |
| Text Secondary | Gray | #64748B |
| Border | Light Gray | #CBD5E1 |
| Success | Green | #22C55E |
| Warning | Orange | #F59E0B |
| Danger | Red | #EF4444 |

---

## 43.4 Penggunaan Warna

| Komponen | Warna |
|-----------|--------|
| Navbar | Navy Blue |
| Hero Section | Gradient Navy → Royal Blue |
| Tombol Utama | Royal Blue |
| Hover Button | Navy Blue |
| Footer | Navy Blue |
| Background | Light Gray |
| Card | White |
| Link Aktif | Royal Blue |
| Badge Tersedia | Green |
| Badge Sedang Disewa | Royal Blue |
| Badge Maintenance | Orange |
| Badge Tidak Tersedia | Red |

---

## 43.5 Typography

| Elemen | Font |
|----------|------|
| Heading | Poppins Bold |
| Sub Heading | Poppins SemiBold |
| Body | Inter Regular |
| Button | Poppins Medium |

---

## 43.6 Icon Style

Menggunakan icon modern dengan gaya outline.

Rekomendasi:

- Lucide Icons
- Heroicons

---

## 43.7 Button Style

### Primary Button

- Background Royal Blue
- Text Putih
- Radius 12 px
- Hover Navy Blue

### Secondary Button

- Background Putih
- Border Royal Blue
- Text Royal Blue

### Danger Button

- Background Merah
- Text Putih

---

# 44. Wireframe Konsep Halaman

## 44.1 Landing Page

```
------------------------------------------------------

LOGO

Beranda | Kendaraan | Promo | Tentang | Login

------------------------------------------------------

HERO SECTION

Temukan Kendaraan Terbaik
untuk Perjalanan Anda

[ Cari Kendaraan ]

------------------------------------------------------

FORM PENCARIAN

Lokasi

Tanggal Ambil

Tanggal Kembali

Jenis Kendaraan

[ Cari ]

------------------------------------------------------

Kategori Kendaraan

Mobil

Motor

SUV

MPV

Pick Up

------------------------------------------------------

Daftar Kendaraan

[ Card ]

[ Card ]

[ Card ]

[ Card ]

------------------------------------------------------

Promo

------------------------------------------------------

Review Pelanggan

------------------------------------------------------

Footer
```

---

## 44.2 Detail Kendaraan

```
----------------------------------------------------

Gallery Foto

----------------------------------------------------

Nama Kendaraan

Rating

Harga

Fasilitas

Spesifikasi

Status

[Sewa Sekarang]

----------------------------------------------------

Review

----------------------------------------------------

Kendaraan Serupa

----------------------------------------------------
```

---

## 44.3 Booking Flow

```
Step 1

Pilih Kendaraan

↓

Step 2

Pilih Tanggal

↓

Step 3

Isi Data

↓

Step 4

Pembayaran

↓

Step 5

Booking Berhasil
```

---

## 44.4 Dashboard Customer

```
Sidebar

Dashboard

Booking Saya

Riwayat

Notifikasi

Profil

--------------------------

Booking Aktif

Booking Terbaru

Promo

Riwayat
```

---

## 44.5 Dashboard Admin

```
Sidebar

Dashboard

Kendaraan

Booking

Pembayaran

Pelanggan

Laporan

Pengaturan

----------------------------

Statistik

Grafik

Booking Terbaru

Pendapatan

Kendaraan Aktif
```

---

# 45. Success Metrics (KPI)

| KPI | Target |
|------|--------|
| Booking Online | ≥ 60% |
| Double Booking | 0 Kasus |
| Konfirmasi Booking | < 15 Menit |
| Lama Booking | < 5 Menit |
| Rating Pelanggan | ≥ 4.5/5 |
| Repeat Booking | ≥ 25% |
| Kepuasan Pengguna | ≥ 90% |

---

# 46. Roadmap Pengembangan

## MVP (Versi 1.0)

Fokus utama:

- Landing Page
- Login & Registrasi
- Booking Online
- Dashboard Customer
- Dashboard Admin
- Pembayaran
- Upload Dokumen
- Riwayat Booking

Estimasi:

3–4 Bulan

---

## Version 2.0

Penambahan fitur:

- Promo
- Voucher
- Live Chat
- WhatsApp Notification
- Multi Cabang
- Kalender Booking Interaktif
- Filter yang lebih lengkap

Estimasi:

2 Bulan setelah MVP

---

## Version 3.0

Pengembangan lanjutan:

- Android App
- iOS App
- Loyalty Program
- Membership
- Dynamic Pricing
- Driver Booking
- GPS Tracking

---

# 47. User Acceptance Testing (UAT)

| No | Skenario | Hasil yang Diharapkan |
|----|-----------------------|------------------------------|
| 1 | Registrasi | Akun berhasil dibuat |
| 2 | Login | Pengguna berhasil masuk |
| 3 | Cari Kendaraan | Data kendaraan tampil sesuai filter |
| 4 | Booking | Booking berhasil dibuat |
| 5 | Pembayaran | Status menjadi Menunggu Verifikasi |
| 6 | Verifikasi Admin | Booking menjadi Dikonfirmasi |
| 7 | Pengembalian Kendaraan | Status menjadi Selesai |

---

# 48. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---------|---------|----------|
| Double Booking | Tinggi | Booking Lock berdasarkan rentang tanggal |
| Server Down | Tinggi | Cloud Hosting dan Monitoring |
| Pembayaran Gagal | Sedang | Retry dan metode pembayaran alternatif |
| Upload Dokumen Gagal | Sedang | Validasi ukuran dan format file |
| Kehilangan Data | Tinggi | Backup database harian |
| Penyalahgunaan Akun | Tinggi | OTP, Enkripsi Password, Rate Limiting |

---

# 49. Future Features

Pengembangan berikutnya yang dapat diterapkan pada RentVehicle:

### AI Recommendation

Memberikan rekomendasi kendaraan berdasarkan:

- Budget
- Jumlah Penumpang
- Riwayat Penyewaan
- Lokasi

---

### Smart Search

Contoh pencarian:

> Saya ingin mobil keluarga di Surabaya tanggal 12 Juli.

---

### Digital Contract

Kontrak penyewaan ditandatangani secara digital.

---

### Driver Booking

Pilihan:

- Lepas Kunci
- Dengan Sopir

---

### Loyalty Program

- Point Reward
- Voucher
- Cashback
- Membership

---

### Push Notification

Notifikasi melalui:

- Email
- WhatsApp
- Browser Notification

---

# 50. Glossary

| Istilah | Penjelasan |
|----------|------------|
| Booking | Proses pemesanan kendaraan |
| Customer | Penyewa kendaraan |
| Admin | Pengelola sistem |
| Vehicle | Kendaraan yang disewakan |
| Dashboard | Halaman utama setelah login |
| Checkout | Konfirmasi sebelum pembayaran |
| Payment Gateway | Layanan pembayaran online |
| UAT | User Acceptance Testing |
| MVP | Minimum Viable Product |

---

# 51. Kesimpulan

RentVehicle merupakan website penyewaan kendaraan berbasis web yang menyediakan proses pencarian, pemesanan, pembayaran, hingga pengelolaan penyewaan kendaraan secara terintegrasi.

Dengan konsep antarmuka modern, dominasi warna biru dan navy, serta alur booking yang sederhana seperti pemesanan tiket bioskop atau hotel, RentVehicle diharapkan mampu memberikan pengalaman pengguna yang cepat, mudah, aman, dan nyaman.

Dokumen Product Requirements Document (PRD) ini menjadi acuan utama bagi seluruh tim pengembang, mulai dari UI/UX Designer, Frontend Developer, Backend Developer, QA Engineer, hingga stakeholder dalam proses perancangan, pengembangan, pengujian, dan implementasi sistem.
````
