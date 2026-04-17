"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHome, HiOutlineClock, HiOutlineChartBar } from "react-icons/hi2";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const linkClasses = (path) =>
    isActive(path)
      ? "flex items-center gap-1 rounded-md bg-green-800 px-3 py-1.5 text-white"
      : "flex items-center gap-1 text-slate-500 hover:text-slate-900";

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        <Link href={'/'}>
          <div className="flex items-center gap-2 text-slate-800">
            <p className="text-lg font-black cursor-pointer">Keen<span className="text-green-800">Keeper</span></p>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">

          <Link
            href="/"
            className={linkClasses("/")}
          >
            <HiOutlineHome className="text-base" />
            Home
          </Link>

          <Link
            href="/timeline"
            className={linkClasses("/timeline")}
          >
            <HiOutlineClock className="text-base" />
            Timeline
          </Link>

          <Link
            href="/stats"
            className={linkClasses("/stats")}
          >
            <HiOutlineChartBar className="text-base" />
            Stats
          </Link>

        </nav>
      </div>
    </header>
  );
}
