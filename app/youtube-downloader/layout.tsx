'use client'

import NavbarComponent from "../components/Navbar"

export default function YoutubeDownloaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavbarComponent />
      <main className="flex-1 container mx-auto max-w-4xl p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="text-danger"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <h1 className="text-2xl font-bold">Download Video Youtube</h1>
          </div>
          
          <div className="bg-default-50 rounded-xl p-4 shadow-lg border border-divider">
            <div className="space-y-2 mb-4">
              <h2 className="text-lg font-semibold">Cara Penggunaan:</h2>
              <ol className="list-decimal list-inside space-y-1 text-foreground/80">
                <li>Salin URL video Youtube yang ingin diunduh</li>
                <li>Tempel URL di kolom input di bawah</li>
                <li>Pilih format dan kualitas video yang diinginkan</li>
                <li>Klik tombol Download</li>
              </ol>
            </div>

            <div className="bg-danger/10 rounded-lg p-3 text-sm text-danger">
              <p className="font-medium">Catatan Penting:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Pastikan video tidak dilindungi hak cipta</li>
                <li>Gunakan fitur ini dengan bijak dan sesuai ketentuan yang berlaku</li>
                <li>Kami tidak menyimpan video yang diunduh</li>
              </ul>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  )
} 