# Product Requirement Document (PRD): Platform Creator-Promoter

**Versi:** 0.2
**Tanggal:** 15 Juni 2025

### 1. Ringkasan & Tujuan

Platform ini bertujuan untuk menjadi jembatan antara **Konten Kreator** dan **Promotor** melalui model imbalan berbasis performa.

*   **Visi:** Membangun ekosistem promosi kreator yang paling efektif, terpercaya, dan scalable di Indonesia.
*   **Masalah:** Kreator kesulitan mengukur ROI promosi; promotor kesulitan mencari peluang monetisasi yang fleksibel.
*   **Solusi:** Platform dengan arsitektur multi-subdomain yang terukur, tracking akurat, dan sistem pembayaran yang aman.

### 2. Arsitektur Teknis (Multi-Subdomain Monorepo)

Kita akan menggunakan arsitektur **Monorepo** untuk mengelola beberapa aplikasi Next.js dalam satu basis kode. Ini memberikan pemisahan yang jelas antar layanan sambil memungkinkan berbagi kode (komponen UI, utilitas) untuk konsistensi.

*   **Struktur:** Monorepo dengan `npm workspaces`.
*   **Aplikasi (Subdomain):**
    *   `monetizr.com`: Aplikasi **Landing Page** (`apps/landing`).
    *   `auth.monetizr.com`: Aplikasi **Otentikasi** (`apps/auth`).
    *   `dashboard.monetizr.com`: **Dashboard** untuk Kreator & Promotor (`apps/dashboard`).
    *   `admin.monetizr.com`: **Panel Admin** (`apps/admin`).
*   **Kode Bersama:**
    *   `packages/ui`: Komponen React, diinisialisasi dengan **shadcn/ui**.
    *   `packages/config`: Konfigurasi bersama (ESLint, TypeScript).
    *   `packages/db`: Skema dan klien database.
*   **Teknologi Inti:**
    *   **Framework:** **Next.js** (App Router)
    *   **Deployment:** **Cloudflare Pages**
    *   **Backend Logic:** **Cloudflare Workers**
    *   **Database:** **Cloudflare D1**
    *   **Penyimpanan File:** **Cloudflare R2**
    *   **Otentikasi:** **BetterAuth**
    *   **Pembayaran:** **Midtrans**

#### Diagram Arsitektur Baru
```mermaid
graph TD
    subgraph "Aplikasi (Subdomains)"
        A[landing-page.com]
        B[auth.monetizr.com]
        C[dashboard.monetizr.com]
        D[admin.monetizr.com]
    end

    subgraph "Monorepo Packages"
        UI[Shared UI]
        CONFIG[Shared Config]
        DB_CLIENT[DB Client]
    end

    subgraph "Backend (Cloudflare)"
        W[API @ Workers]
        D1[Database @ D1]
        R2[Storage @ R2]
    end

    subgraph "Layanan Eksternal"
        AUTH[BetterAuth]
        PAY[Midtrans]
    end

    A --> W; B --> W; C --> W; D --> W;
    A -.-> UI; B -.-> UI; C -.-> UI; D -.-> UI;
    W -- CRUD --> D1
    W -- File Ops --> R2
    W -- Auth Flow --> AUTH
    W -- Payment Flow --> PAY
```

### 3. Rincian Fitur & Checklist MVP

---
**✅ Modul 1: Akun & Otentikasi (`auth.monetizr.com`)**
- [x] `[MVP]` Halaman Login & Pendaftaran (UI Selesai).
- [x] `[MVP]` Alur lupa kata sandi (UI Selesai).
- [x] `[MVP]` Pengalihan pengguna ke dashboard setelah login berhasil.
- [x] `[MVP]` Implementasi JWT-based authentication dengan database.
- [x] `[MVP]` API registrasi dan login dengan validasi lengkap.
- [x] `[MVP]` Role-based access control (creator, promoter, admin).

---
**✅ Modul 2: Dashboard Pengguna (`dashboard.monetizr.com`)**
- **Umum:**
    - [x] `[MVP]` Manajemen profil dasar (nama, bio) dengan database integration.
    - [x] `[MVP]` API profil pengguna dengan autentikasi JWT.
    - [ ] `[MVP]` Promotor: Input rekening bank untuk penarikan dana.
- **Untuk Kreator:**
    - [x] `[MVP]` Formulir pembuatan kampanye (PPC) dengan validasi lengkap.
    - [x] `[MVP]` API kampanye dengan role-based access control.
    - [x] `[MVP]` Dashboard kampanye (listing dan pembuatan).
    - [ ] `[MVP]` Upload materi kampanye ke Cloudflare R2.
    - [ ] `[MVP]` Integrasi Midtrans Snap untuk deposit dana.
    - [ ] `[MVP]` Dashboard kampanye lanjutan (budget tracking, analytics).
    - [ ] `[Post-MVP]` Model imbalan lain (PPA, PPV).
- **Untuk Promotor:**
    - [ ] `[MVP]` Halaman eksplorasi untuk mencari kampanye.
    - [ ] `[MVP]` Halaman detail kampanye.
    - [ ] `[MVP]` Fungsi untuk bergabung & mendapatkan link tracking unik.
    - [ ] `[MVP]` Dashboard penghasilan (total klik, estimasi pendapatan).
    - [ ] `[MVP]` Fungsi untuk mengajukan penarikan dana.

---
**✅ Modul 3: Panel Admin (`admin.monetizr.com`)**
- [ ] `[MVP]` Login khusus untuk admin.
- [ ] `[MVP]` Dashboard utama (statistik platform).
- **Manajemen Pengguna:**
    - [ ] `[MVP]` Melihat daftar semua pengguna (Kreator & Promotor).
    - [ ] `[Post-MVP]` Menangguhkan atau memblokir pengguna.
- **Manajemen Kampanye:**
    - [ ] `[MVP]` Melihat semua kampanye yang sedang berjalan.
    - [ ] `[Post-MVP]` Menghentikan atau meninjau kampanye yang melanggar aturan.
- **Keuangan:**
    - [ ] `[MVP]` Melihat riwayat transaksi (deposit & penarikan).
    - [ ] `[MVP]` Dashboard untuk melacak *platform fee* yang terkumpul.
    - [ ] `[Post-MVP]` Menyetujui atau menolak permintaan penarikan dana secara manual.

---
**✅ Modul 4: Landing Page (`monetizr.com`)**
- [x] `[MVP]` Halaman utama yang menjelaskan fitur dan keuntungan platform (UI Selesai).
- [x] `[MVP]` Tombol ajakan bertindak (CTA) yang mengarah ke halaman pendaftaran (`auth.monetizr.com`) (UI Selesai).
- [ ] `[Post-MVP]` Halaman FAQ dan Blog.

---
**✅ Modul 5: Backend & Inti**
- [x] `[MVP]` Database schema lengkap untuk semua entitas (Users, Campaigns, Promotions, Transactions, Wallets).
- [x] `[MVP]` API untuk operasi CRUD dengan autentikasi dan validasi.
- [x] `[MVP]` User repository dengan password hashing dan JWT.
- [x] `[MVP]` Mock database client (siap untuk Cloudflare D1).
- [ ] `[MVP]` Sistem tracking link unik (via Cloudflare Worker).
- [ ] `[MVP]` Sistem dompet internal untuk setiap pengguna.
- [ ] `[MVP]` Kalkulasi pendapatan promotor dan *platform fee*.
- [ ] `[MVP]` Migrasi ke Cloudflare D1 database.
- [ ] `[Post-MVP]` Sistem anti-fraud dasar.

---
### 4. Rencana Pelaksanaan (Roadmap)

| Fase                      | Durasi (Estimasi) | Fokus Utama                                                              | Checklist                                                                                                     |
| ------------------------- | ----------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Fase 1: Fondasi Monorepo** | 1-2 Minggu        | Setup struktur proyek, aplikasi, dan package bersama.                    | `[x]` Setup npm workspace <br> `[x]` Buat 4 aplikasi Next.js <br> `[x]` Konfigurasi shared `eslint` & `tsconfig` <br> `[x]` Inisialisasi `packages/ui` dengan shadcn/ui <br> `[x]` Implementasi lengkap `packages/db` dengan schema |
| **Fase 2: Otentikasi & User** | 2-3 Minggu        | Mengintegrasikan autentikasi dan profil dasar di `dashboard`.      | `[x]` Implementasi JWT-based authentication <br> `[x]` Halaman login & daftar (UI + Backend) <br> `[x]` Halaman profil pengguna dengan database <br> `[x]` Campaign creation untuk creators     |
| **Fase 3: Alur Inti Kampanye** | 3-4 Minggu        | Membangun alur dari pembuatan kampanye hingga promosi.                   | `[ ]` Buat alur kampanye <br> `[ ]` Implementasi tracking link <br> `[ ]` Dashboard dasar untuk Kreator/Promotor |
| **Fase 4: Monetisasi**      | 2-3 Minggu        | Mengintegrasikan pembayaran dan penarikan dana.                          | `[ ]` Integrasi Midtrans (Deposit & Payout) <br> `[ ]` Sistem dompet & riwayat transaksi                     |
| **Fase 5: Panel Admin**       | 1-2 Minggu        | Membangun fitur dasar untuk `admin.monetizr.com`.                        | `[ ]` Login admin <br> `[ ]` Manajemen user & kampanye <br> `[ ]` Dashboard keuangan admin                  |
| **Fase 6: Uji & Rilis**     | 1-2 Minggu        | Pengujian End-to-End di semua aplikasi dan peluncuran MVP.               | `[ ]` Testing E2E <br> `[ ]` Perbaikan bug <br> `[ ]` Deploy ke Cloudflare                                 |

---
### 📊 Status Update Terkini (19 Juni 2025)

**✅ COMPLETED:**
- **Database Layer**: Schema lengkap, TypeScript interfaces, mock client, user repository
- **Authentication**: JWT-based auth, login/register APIs, role-based access control
- **User Management**: Profile APIs, user creation dengan role (creator/promoter)
- **Campaign Management**: Form creation, API endpoints, dashboard listing
- **Project Structure**: Fixed dependencies, proper TypeScript config, shared utilities

**🔄 IN PROGRESS:**
- **Fase 2**: 80% complete - masih perlu bank account management dan promoter features
- **Development Environment**: Perlu instalasi Node.js/npm untuk mengatasi Next.js SWC issues

**🎯 NEXT PRIORITIES:**
1. Complete bank account management untuk promoters
2. Implement campaign exploration untuk promoters
3. Build tracking link generation system
4. Migrate dari mock database ke Cloudflare D1
5. Add file upload ke Cloudflare R2

**🏗️ ARCHITECTURE ACHIEVEMENTS:**
- Monorepo structure dengan shared packages ✅
- Type safety dengan TypeScript ✅
- Secure authentication ready for production ✅
- Comprehensive database design ✅
- RESTful APIs dengan proper validation ✅