import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto my-4 max-w-[1200px] p-6 md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="inline-block border-b-8 border-black px-2 text-4xl font-extrabold md:text-5xl">
          Kontak
        </h1>
      </div>

      <div className="mb-4 flex items-start border-b-4 border-black p-4">
        <MapPin className="mr-4 h-6 w-6 text-black" />
        <div>
          <p className="text-lg font-bold">Alamat Sekolah</p>
          <p>Jalan Ahmad Marzuki No 105</p>
          <p>Kelurahan Air Rambai - Kecamatan</p>
          <p>Curup</p>
          <p>Kabupaten Rejang Lebong</p>
          <p>Bengkulu - Indonesia</p>
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-4 flex items-start border-b-4 border-black p-4">
        <Phone className="mr-4 h-6 w-6 text-black" />
        <div>
          <p className="text-lg font-bold">No Telp</p>
          <p>+62732 21258</p>
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-4 flex items-start border-b-4 border-black p-4">
        <Mail className="mr-4 h-6 w-6 text-black" />
        <div>
          <p className="text-lg font-bold">Email</p>
          <p>mail@smkn1rl.sch.id</p>
        </div>
      </div>

      {/* Office Hours */}
      <div className="mb-4 flex items-start border-b-4 border-black p-4">
        <Clock className="mr-4 h-6 w-6 text-black" />
        <div>
          <p className="text-lg font-bold">Jam Sekolah</p>
          <p>Senin - Jumat: 7:00 AM - 2:00 PM</p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-8">
        <h2 className="mb-4 inline-block border-b-4 border-black pb-1 text-xl font-bold">
          Peta Lokasi
        </h2>
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-none border-4 border-black">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.4784694796654!2d102.52561257501705!3d-3.4759321419400346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e31398ac84d0839%3A0x7d802d8f5e45b940!2sSMK%20NEGERI%201%20REJANG%20LEBONG!5e0!3m2!1sen!2sid!4v1730273311528!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
