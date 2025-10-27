
# BRUTAL NEWS: Portal Berita Bergaya Brutalis

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![News API](https://img.shields.io/badge/News_API-000000?style=for-the-badge&logo=newsapi&logoColor=white)


**Oleh:** Febrian Valentino Nugroho  
**NIM:** 123140034
**kelas:**

---

## 📖 Tentang Proyek

**BRUTAL NEWS** adalah aplikasi web frontend yang dibangun menggunakan **React** dan **Vite** untuk menampilkan berita terkini dari berbagai sumber melalui **NewsAPI**. Proyek ini menonjolkan desain bergaya **"brutalis"** yang ditandai dengan border tebal, shadow yang tegas, dan kontras warna hitam-putih yang kuat, menciptakan pengalaman visual yang unik dan berani.

Aplikasi ini dirancang untuk memberikan informasi secara langsung dan cepat, sesuai dengan tagline "No filters, just raw information."

## ✨ Fitur-Fitur Utama

-   **📰 Tampilan Berita:** Menampilkan daftar artikel berita dari berbagai sumber dengan kartu artikel (`ArticleCard`) yang menarik dan informatif.
-   **🗂️ Navigasi Kategori:** Navigasi intuitif berdasarkan kategori berita populer seperti Teknologi, Bisnis, dan Olahraga. Klik logo **NEWS** untuk melihat semua berita.
-   **🔍 Pencarian Lanjutan:** Temukan artikel spesifik dengan fitur pencarian berdasarkan kata kunci melalui modal pencarian.
-   **📅 Filter Tanggal:** Saring berita berdasarkan rentang tanggal (dari - hingga) untuk menemukan artikel dari periode tertentu.
-   **📄 Navigasi Halaman (Pagination):** Jelajahi hasil berita dengan mudah melalui kontrol pagination yang user-friendly.
-   **📱 Desain Responsif:** Tampilan yang optimal dan konsisten di berbagai ukuran layar, dari desktop hingga perangkat mobile.
-   **🎨 Desain Brutalis:** Estetika visual yang unik dengan border tebal (6px), shadow besar, dan palet warna hitam-putih yang mencolok.

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun dengan menggunakan teknologi-teknologi modern dan populer:

-   **React 18:** Library JavaScript untuk membangun antarmuka pengguna (UI) yang interaktif.
-   **Vite:** Build tool yang cepat dan modern untuk pengembangan web, menyediakan Hot Module Replacement (HMR) yang instan.
-   **Styled-Components:** Library CSS-in-JS untuk menulis kode CSS yang terenkapsulasi dalam komponen React.
-   **NewsAPI:** Sumber data eksternal untuk mengambil artikel berita terkini.

## 🚀 Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:

-   **Node.js** (versi 18 atau lebih baru) - [Unduh di sini](https://nodejs.org/)
-   **npm** (biasanya sudah termasuk saat menginstal Node.js) atau **yarn**

### Langkah 1: Kloning Repositori

Clone repositori proyek ini ke komputer lokal Anda menggunakan Git:

```bash
git clone []
```

### Langkah 2: Masuk ke Direktori Proyek

Pindah ke direktori proyek yang telah di-clone:

```bash
cd news-portal
```

### Langkah 3: Instalasi Dependensi

Instal semua dependensi yang diperlukan oleh proyek:

```bash
npm install
```

### Langkah 4: Konfigurasi Kunci API

Proyek ini menggunakan **NewsAPI** untuk mengambil data berita. Kunci API saat ini disimpan secara statis di dalam file `src/App.jsx`.

> **Penting:** Untuk pengembangan lebih lanjut atau produksi, sangat disarankan untuk memindahkan kunci API ini ke environment variable (`.env`) untuk keamanan.

Anda bisa mendapatkan kunci API gratis dengan mendaftar di [NewsAPI.org](https://newsapi.org/).

### Langkah 5: Menjalankan Server Development

Jalankan server development untuk memulai proyek:

```bash
npm run dev
```

### Langkah 6: Membuka Aplikasi

Buka browser Anda dan navigasikan ke alamat yang ditampilkan di terminal, biasanya:

```
http://localhost:5173
```

Aplikasi akan secara otomatis melakukan reload jika Anda melakukan perubahan pada kode.

## 📁 Struktur Proyek

Berikut adalah ringkasan struktur folder dan file utama dalam proyek ini:

```
news-portal/
├── public/                 # Aset statis (gambar, ikon) dan file index.html
├── src/                    # Kode sumber aplikasi React
│   ├── components/         # Komponen UI yang dapat digunakan kembali
│   │   ├── ArticleCard.jsx
│   │   ├── ArticleList.jsx
│   │   ├── DateFilter.jsx
│   │   ├── FilterModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   ├── Pagination.jsx
│   │   └── SearchModal.jsx
│   ├── App.css             # Styling khusus untuk App.jsx
│   ├── App.jsx             # Komponen utama aplikasi (logika fetching, state)
│   ├── index.css           # Styling global
│   └── main.jsx            # Entry point aplikasi React
├── docs/                   # Dokumentasi tambahan
│   └── annotated/          # Salinan kode dengan anotasi per baris
├── .eslintrc.cjs           # Konfigurasi ESLint
├── index.html              # File HTML utama untuk Vite
├── package.json            # Informasi proyek dan daftar dependensi
├── README.md               # File dokumentasi ini
└── vite.config.js          # Konfigurasi Vite
```

## 📚 Dokumentasi Kode

Untuk pemahaman yang lebih mendalam, proyek ini dilengkapi dengan dokumentasi kode yang dianotasi secara rinci. Anda dapat menemukan salinan file-file sumber lengkap dengan penjelasan per baris dalam Bahasa Indonesia di dalam folder `docs/annotated/`. Ini sangat berguna untuk pembelajaran dan analisis cara kerja aplikasi.

 