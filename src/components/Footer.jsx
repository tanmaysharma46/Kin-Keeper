import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#2D5B4A] text-white">

      <div className="mx-auto max-w-4xl px-6 py-16 text-center">

        <h2 className="text-5xl font-bold">KeenKeeper</h2>

        <p className="mt-4 text-sm text-white/80">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mt-6">
          <p className="text-sm text-white/80">Social Links</p>

          <div className="mt-3 flex justify-center gap-3">
            <a
              href="#"
              className="rounded-full bg-white/90 p-3 text-black transition hover:bg-white"
            >
              <FaInstagram size={14} />
            </a>

            <a
              href="#"
              className="rounded-full bg-white/90 p-3 text-black transition hover:bg-white"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="#"
              className="rounded-full bg-white/90 p-3 text-black transition hover:bg-white"
            >
              <FiX size={14} />
            </a>
          </div>
        </div>
      </div>
      

      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs text-white/70 sm:flex-row">
        <p>© 2026 KeenKeeper. All rights reserved.</p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}