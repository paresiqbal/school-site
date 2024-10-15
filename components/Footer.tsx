import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#121417] px-20 py-12 text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#70FFAF]">
              SMK Negeri 1 Rejang Lebong
            </h2>
            <div className="flex space-x-4">
              <Link href="#" className="">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#70FFAF]">
              Operational Hours
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Monday - Friday: 8:00 AM - 4:00 PM</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Saturday: 9:00 AM - 12:00 PM</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Sunday: Closed</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#70FFAF]">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>info@evergreenacademy.edu</span>
              </li>
            </ul>
            <div>
              <h3 className="text-lg font-bold text-[#70FFAF]">Address</h3>
              <address className="mt-2 flex items-start not-italic">
                <MapPin className="mr-2 mt-1 h-5 w-5" />
                <span>
                  123 Learning Lane,
                  <br />
                  Wisdom City, WS 12345,
                  <br />
                  United States
                </span>
              </address>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#70FFAF]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Student Life
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Parents Portal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Career Opportunities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Evergreen Academy. All rights
            reserved.
          </p>
          <div className="mt-4 space-x-4 md:mt-0">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
