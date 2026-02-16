"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { IoAirplaneOutline, IoBedOutline, IoCarOutline } from "react-icons/io5";
import { PiTaxi } from "react-icons/pi";

const navLinks = [
  { title: "Stays", link: "/", icon: IoBedOutline },
  { title: "Flights", link: "/flights", icon: IoAirplaneOutline },

  { title: "Car rentals", link: "/cars", icon: IoCarOutline },
  { title: "Airport taxis", link: "/airport-taxis", icon: PiTaxi },
];

const mobileMenuLinks = [
  { title: "About Us", link: "/about" },
  { title: "Contact", link: "/contact" },
  { title: "Register", link: "/register" },
  { title: "Sign in", link: "/signin" },
];

export default function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky md:relative top-0 z-40 bg-primary text-white pt-4  shadow-sm">
      <div className="container flex items-center justify-between gap-5 pb-3">
        <Link href="/">
          <div className="text-xl font-bold select-none">Staying.com</div>
        </Link>

        <div className="hidden flex-wrap items-center gap-2 md:flex">
          <button className="rounded-xs border border-transparent px-3 py-2 text-white">
            List your property
          </button>
          <button className="rounded-xs border border-white px-3 py-2 text-white">
            Contact
          </button>
          <button className="rounded-xs bg-white px-3 py-2 font-semibold text-primary">
            Book Now
          </button>
        </div>

        <button
          className="flex p-1 items-center justify-center rounded-md border border-white/30 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          type="button"
        >
          <BiMenu size={24} />
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="container flex min-w-max gap-2 pb-3">
          {navLinks.map((item) => (
            <Link href={item.link} key={item.link}>
              <div
                className={`rounded-full border flex gap-3 whitespace-nowrap  items-center px-4 py-2 text-sm text-white ${
                  pathname === item.link ||
                  (item.link === "/" && pathname === "/")
                    ? "border-white"
                    : "border-transparent"
                }`}
              >
                <item.icon size={20} />
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/35"
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[80%] max-w-[320px] border-l border-white/15 bg-gradient-to-b from-[#0b4aa8] to-[#01285f] p-4 text-white shadow-xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-md border border-white/30 p-2"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="grid gap-2 border-t border-white/10 pt-4">
            {mobileMenuLinks.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-white/25 px-3 py-2 text-left text-sm text-white"
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/cars"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-primary"
            >
              Book Now
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
