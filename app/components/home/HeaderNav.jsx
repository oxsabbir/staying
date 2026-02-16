"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiEdit, BiMenu } from "react-icons/bi";

import {
  FaCar,
  FaHotel,
  FaMapMarkedAlt,
  FaPlane,
  FaSuitcaseRolling,
  FaTaxi,
} from "react-icons/fa";
import { IoAirplaneOutline, IoBedOutline, IoCarOutline } from "react-icons/io5";
import { PiTaxi } from "react-icons/pi";

const navLinks = [
  { title: "Stays", link: "/", icon: IoBedOutline },
  { title: "Flights", link: "/flights", icon: IoAirplaneOutline },

  { title: "Car rentals", link: "/cars", icon: IoCarOutline },
  { title: "Airport taxis", link: "/airport-taxis", icon: PiTaxi },
];

export default function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

      <div className="container hidden  flex-wrap gap-2 pb-3 md:flex">
        {navLinks.map((item) => (
          <Link
            href={item.link}
            key={item.link}
            className={`rounded-full border flex gap-3  items-center px-4 py-2 text-sm text-white ${
              pathname === item.link ||
              (item.link === "/stays" && pathname === "/")
                ? "border-white"
                : "border-transparent"
            }`}
          >
            <item.icon size={20} />
            {item.title}
          </Link>
        ))}
      </div>

      {menuOpen ? (
        <div className="container pb-3 md:hidden">
          <div className="rounded-lg border border-white/15 bg-primary-2 p-3 shadow-lg">
            <div className="grid gap-2">
              {navLinks.map((item) => (
                <Link
                  href={item.link}
                  key={item.link}
                  className={`w-full rounded-md border flex items-center gap-3 px-3 py-2 text-left text-sm text-white ${
                    pathname === item.link ||
                    (item.link === "/stays" && pathname === "/")
                      ? "border-white"
                      : "border-transparent"
                  }`}
                >
                  <item.icon size={20} />
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-2 border-t border-white/10 pt-3">
              <button className="rounded-md border border-white/20 px-3 py-2 text-left text-sm text-white">
                BDT
              </button>
              <button className="rounded-md border border-white/20 px-3 py-2 text-left text-sm text-white">
                English
              </button>
              <button className="rounded-md border border-white/20 px-3 py-2 text-left text-sm text-white">
                List your property
              </button>
              <button className="rounded-md border border-white/40 px-3 py-2 text-left text-sm text-white">
                Register
              </button>
              <button className="rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-primary">
                Sign in
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
