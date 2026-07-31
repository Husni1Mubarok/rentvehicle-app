import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Tentang Kami | RentVehicle',
  description: 'Profil perusahaan dan informasi kontak RentVehicle.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Tentang <span className="text-blue-600">RentVehicle</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mitra perjalanan terpercaya Anda yang menyediakan berbagai pilihan kendaraan premium untuk kebutuhan mobilitas harian, perjalanan dinas, maupun liburan keluarga.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">👁️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi penyedia layanan transportasi terdepan di Indonesia yang mengutamakan kenyamanan, keamanan, dan kepuasan pelanggan melalui inovasi teknologi dan pelayanan sepenuh hati.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>Menyediakan armada kendaraan yang selalu dalam kondisi prima.</li>
              <li>Memberikan kemudahan proses pemesanan yang cepat dan transparan.</li>
              <li>Menghadirkan layanan pelanggan 24/7 yang responsif dan solutif.</li>
              <li>Membangun ekosistem transportasi yang aman dan nyaman.</li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black">15k+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Pelanggan Puas</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black">500+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Armada</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black">20+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Kota</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black">24/7</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Dukungan</div>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-1/2 space-y-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900">Hubungi Kami</h2>
            <p className="text-gray-600">
              Tim kami siap membantu Anda merencanakan perjalanan terbaik. Jangan ragu untuk menghubungi kami melalui kontak di bawah ini.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">📍</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Alamat Kantor</div>
                  <div className="text-sm text-gray-600">Jl. Sudirman No. 123, Jakarta Selatan</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">📞</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Telepon / WhatsApp</div>
                  <div className="text-sm text-gray-600">+62 812-3456-7890</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">✉️</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">hello@rentvehicle.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 md:w-1/2 min-h-[300px] relative">
            <Image 
              src="/login-bg.jpg" 
              alt="Office Location" 
              fill 
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8">
          <Link 
            href="/vehicles" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-1"
          >
            Mulai Perjalanan Anda 🚗
          </Link>
        </div>
      </div>
    </div>
  );
}
