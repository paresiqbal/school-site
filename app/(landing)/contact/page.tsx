import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function contact() {
  return (
    <div className="container mx-auto mt-4 flex max-w-[1200px] flex-col pt-6 md:pt-12">
      <div className="space-y-2 pb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold md:mb-6 md:text-5xl">Kontak</h1>
      </div>

      <div className="mb-4 flex items-center">
        <MapPin className="mr-3 h-6 w-6 text-blue-600" />
        <div>
          <p className="font-semibold">School Address</p>
          <p>123 Main Street</p>
          <p>City, State, ZIP Code</p>
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-4 flex items-center">
        <Phone className="mr-3 h-6 w-6 text-blue-600" />
        <div>
          <p className="font-semibold">Phone Number</p>
          <p>(123) 456-7890</p>
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-4 flex items-center">
        <Mail className="mr-3 h-6 w-6 text-blue-600" />
        <div>
          <p className="font-semibold">Email</p>
          <p>info@schoolname.edu</p>
        </div>
      </div>

      {/* Office Hours */}
      <div className="mb-4 flex items-center">
        <Clock className="mr-3 h-6 w-6 text-blue-600" />
        <div>
          <p className="font-semibold">Office Hours</p>
          <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-6">
        <h2 className="mb-2 text-xl font-semibold">Location Map</h2>
        <div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-300">
          <p className="text-gray-700">Map Placeholder</p>
        </div>
      </div>
    </div>
  );
}
