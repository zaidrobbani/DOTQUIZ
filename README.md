# DotQuiz

Aplikasi kuis trivia berbasis [Open Trivia DB](https://opentdb.com/), dibangun dengan Next.js 16 (App Router) sebagai proyek magang.

## Fitur

- **Login tersimulasi** — cukup nama panggilan, sesi disimpan sebagai JWT (`jose`) di cookie httpOnly dengan masa berlaku 2 jam. Dilindungi dua lapis: `proxy.ts` untuk redirect optimis dan DAL (`verifySession`) untuk pengecekan di server.
- **Setup kuis penuh** — pilih kategori (`api_category.php`), lihat estimasi jumlah soal per kesulitan (`api_count.php`), pilih tingkat kesulitan, tipe soal, jumlah soal (5–50), dan durasi pengerjaan (1–30 menit). Soal diambil lewat session token (`api_token.php`) supaya tidak ada soal yang berulang.
- **Satu soal per layar** — begitu jawaban dipilih, otomatis pindah ke soal berikutnya.
- **Timer global** — satu hitung mundur untuk seluruh kuis. Saat waktu habis, kuis otomatis ditutup dan menampilkan hasil.
- **Resume otomatis** — progres kuis (soal, jawaban, sisa waktu) disimpan di localStorage lewat Zustand. Menutup dan membuka kembali browser akan melanjutkan tepat dari titik terakhir, dengan waktu yang tetap akurat.
- **Hasil & review jawaban** — ringkasan skor (benar/salah/tidak dijawab/waktu terpakai) plus review tiap soal beserta jawaban yang dipilih vs jawaban benar.
- **Riwayat & statistik** — semua percobaan kuis tersimpan per pengguna, lengkap dengan rata-rata skor dan skor terbaik.

## Tech Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4
- Ant Design v6 (+ `@ant-design/nextjs-registry`)
- TanStack Query (fetching & mutasi ke Open Trivia DB)
- Zustand (state sesi kuis & riwayat, dipersist ke localStorage)
- Zod (validasi login & setup kuis)
- GSAP (animasi transisi halaman & hasil)
- Axios

## Arsitektur

Feature-based architecture:

```
src/
├── app/            # Routing saja — tiap page.tsx tipis, merender satu container
├── feature/        # Per fitur: components/ container/ section/ util/
├── repository/     # Per domain: dto.ts, query.ts / action.ts, (server-actions.ts untuk auth)
├── shared/         # Komponen & util yang dipakai lintas fitur
├── lib/            # axios instance, helper generik (cn, decode base64, dll)
├── store/          # Zustand store (auth, sesi kuis, riwayat kuis)
└── layout/         # Provider aplikasi (AntD + TanStack Query)
```

## Menjalankan Proyek

```bash
bun install
cp .env.example .env.local   # isi SESSION_SECRET, mis. hasil dari `openssl rand -base64 32`
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> Gunakan `localhost`, bukan `127.0.0.1`, agar Server Action login tidak diblokir oleh proteksi origin dev server Next.js.
