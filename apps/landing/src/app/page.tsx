import Link from "next/link"
import Image from "next/image"
import { Button, Input } from "@monetizr/ui"
import { CheckCircle, DollarSign, Lightbulb, Video, Share2, TrendingUp, Handshake } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">PromotePro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#fitur" className="text-sm font-medium hover:underline underline-offset-4">
            Fitur
          </Link>
          <Link href="#kreator" className="text-sm font-medium hover:underline underline-offset-4">
            Untuk Kreator
          </Link>
          <Link href="#promotor" className="text-sm font-medium hover:underline underline-offset-4">
            Untuk Promotor
          </Link>
          <Link href="#cta" className="text-sm font-medium hover:underline underline-offset-4">
            Mulai
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Kembangkan Akun Anda, Dapatkan Penghasilan Lebih.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Platform revolusioner yang menghubungkan konten kreator dengan promotor bersemangat. Bayar per
                    tampilan, saksikan engagement Anda meroket!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/auth/register?role=creator"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Mulai sebagai Kreator
                  </Link>
                  <Link
                    href="/auth/register?role=promoter"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Daftar sebagai Promotor
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Fitur Unggulan
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Bagaimana PromotePro Bekerja</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kami menyederhanakan proses promosi konten, memastikan keuntungan bagi kreator dan promotor.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-1 bg-white p-6 rounded-lg shadow-sm">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold">Pembayaran Berbasis Tampilan</h3>
                <p className="text-sm text-muted-foreground">
                  Konten kreator membayar promotor berdasarkan jumlah tampilan atau engagement yang dihasilkan di
                  platform sosial media.
                </p>
              </div>
              <div className="grid gap-1 bg-white p-6 rounded-lg shadow-sm">
                <Video className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold">Sumber Konten Fleksibel</h3>
                <p className="text-sm text-muted-foreground">
                  Kreator dapat menyediakan materi dari Google Drive, YouTube, atau platform sosial media lainnya yang
                  dapat diunduh.
                </p>
              </div>
              <div className="grid gap-1 bg-white p-6 rounded-lg shadow-sm">
                <Lightbulb className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold">Persyaratan Kustom</h3>
                <p className="text-sm text-muted-foreground">
                  Konten kreator dapat menetapkan persyaratan spesifik untuk promosi mereka, memastikan kualitas dan
                  relevansi.
                </p>
              </div>
              <div className="grid gap-1 bg-white p-6 rounded-lg shadow-sm">
                <Share2 className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold">Promosi Kreatif</h3>
                <p className="text-sm text-muted-foreground">
                  Promotor tidak hanya menyalin, tetapi juga dapat mengedit video untuk daya tarik maksimal.
                </p>
              </div>
              <div className="grid gap-1 bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold">Pelacakan Otomatis</h3>
                <p className="text-sm text-muted-foreground">
                  Sistem kami secara otomatis membaca jumlah tampilan dari TikTok atau Instagram untuk pembayaran yang
                  transparan.
                </p>
              </div>
              <div className="grid gap-1 bg-white p-6 rounded-lg shadow-sm">
                <Handshake className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold">Win-Win Solution</h3>
                <p className="text-sm text-muted-foreground">
                  Kreator mendapatkan engagement, promotor mendapatkan penghasilan. Semua pihak diuntungkan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Creators Section */}
        <section id="kreator" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                src="/placeholder.svg?height=310&width=550"
                width="550"
                height="310"
                alt="For Creators"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                    Untuk Konten Kreator
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Raih Audiens Lebih Luas, Kontrol Penuh
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Fokus pada kreasi, biarkan kami mengurus promosinya. Dapatkan engagement nyata dengan budget yang
                    Anda tentukan.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Tentukan budget dan bayar per tampilan (misal: Rp 150/tampilan).
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Berikan persyaratan promosi yang spesifik untuk hasil optimal.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Sediakan materi dari Google Drive, YouTube, atau media sosial Anda.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                    Dapatkan laporan engagement yang transparan dan otomatis.
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/auth/register?role=creator"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Daftar sebagai Kreator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Promoters Section */}
        <section id="promotor" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4 lg:order-last">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    Untuk Promotor
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ubah Waktu Anda Menjadi Uang</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Bergabunglah dengan jaringan promotor kami dan mulai hasilkan uang dengan mempromosikan konten yang
                    Anda sukai.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-blue-500" />
                    Dapatkan bayaran untuk setiap tampilan atau engagement yang Anda hasilkan.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-blue-500" />
                    Akses materi konten dari berbagai kreator dan platform.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-blue-500" />
                    Gunakan kreativitas Anda untuk mengedit video agar lebih menarik.
                  </li>
                  <li>
                    <CheckCircle className="mr-2 inline-block h-4 w-4 text-blue-500" />
                    Promosikan di TikTok, Instagram, atau platform sosial media lainnya.
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/auth/register?role=promoter"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Daftar sebagai Promotor
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=310&width=550"
                width="550"
                height="310"
                alt="For Promoters"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Siap untuk Berkembang Bersama Kami?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Bergabunglah dengan PromotePro hari ini dan mulai perjalanan Anda menuju engagement yang lebih baik atau
                penghasilan tambahan.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Masukkan email Anda" className="max-w-lg flex-1" />
                <Button type="submit">Daftar Sekarang</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Dengan mendaftar, Anda menyetujui{" "}
                <Link href="#" className="underline underline-offset-2">
                  Syarat & Ketentuan
                </Link>{" "}
                kami.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PromotePro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Syarat Layanan
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privasi
          </Link>
        </nav>
      </footer>
    </div>
  )
}
