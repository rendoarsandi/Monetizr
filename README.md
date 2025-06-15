# Monetizr 🚀

Selamat datang di **Monetizr**, sebuah platform inovatif yang menghubungkan Konten Kreator dengan Promotor melalui sistem imbalan berbasis performa.

## ✨ Visi

Membangun ekosistem promosi kreator yang paling efektif, transparan, dan terukur di Indonesia. Kami memberdayakan kreator untuk memaksimalkan jangkauan konten mereka sambil memberikan peluang monetisasi yang adil bagi para promotor.

---

## 🏛️ Arsitektur: Multi-Subdomain Monorepo

Proyek ini dibangun menggunakan arsitektur **Monorepo** dengan `npm workspaces` untuk mengelola beberapa aplikasi Next.js secara efisien dalam satu basis kode.

### Aplikasi (Subdomains)

| Aplikasi                               | Subdomain                  | Deskripsi                                    |
| -------------------------------------- | -------------------------- | -------------------------------------------- |
| 🏠 **[Landing](./apps/landing/)**      | `monetizr.com`             | Halaman pemasaran utama untuk platform.      |
| 🔐 **[Auth](./apps/auth/)**            | `auth.monetizr.com`        | Mengelola pendaftaran dan login pengguna.    |
| 📊 **[Dashboard](./apps/dashboard/)**  | `dashboard.monetizr.com`   | Dasbor utama untuk Kreator dan Promotor.     |
| ⚙️ **[Admin](./apps/admin/)**          | `admin.monetizr.com`       | Panel administrasi untuk mengelola platform. |

### Paket Bersama (Shared Packages)

| Paket                                          | Deskripsi                                    |
| ---------------------------------------------- | -------------------------------------------- |
| 🎨 **[eslint-config-custom](./packages/config/)** | Konfigurasi ESLint bersama untuk kualitas kode. |
| 📝 **[tsconfig](./packages/tsconfig/)**          | Konfigurasi TypeScript (`tsconfig.json`) bersama. |

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)
*   **Backend Logic:** [Cloudflare Workers](https://workers.cloudflare.com/)
*   **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/)
*   **Penyimpanan File:** [Cloudflare R2](https://developers.cloudflare.com/r2/)
*   **Otentikasi:** [BetterAuth](https://betterauth.dev/)
*   **Pembayaran:** [Midtrans](https://midtrans.com/)
*   **Manajer Paket:** [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

---

## 🚀 Memulai (Getting Started)

### 1. Kloning Repositori
```bash
git clone https://github.com/your-username/monetizr.git
cd monetizr
```

### 2. Instal Dependensi
Proyek ini menggunakan `npm workspaces`. Jalankan perintah berikut dari direktori root untuk menginstal semua dependensi untuk semua aplikasi dan paket:
```bash
npm install
```

### 3. Jalankan Server Pengembangan
Untuk menjalankan semua aplikasi secara bersamaan dalam mode pengembangan:
```bash
npm run dev
```
Server akan berjalan di port yang berbeda untuk setiap aplikasi:
- `landing`: `http://localhost:3000`
- `auth`: `http://localhost:3001`
- `dashboard`: `http://localhost:3002`
- `admin`: `http://localhost:3003`

---

Dibuat dengan ❤️ untuk komunitas kreator Indonesia.