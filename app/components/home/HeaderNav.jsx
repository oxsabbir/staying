"use client";

import { useState } from "react";
import { BiMenu } from "react-icons/bi";

export default function HeaderNav({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky md:relative top-0 z-40 bg-primary text-white pt-4  shadow-sm">
      <div className="container flex items-center justify-between gap-5 pb-3">
        <div className="text-xl font-bold">Booking.com</div>

        <div className="hidden flex-wrap items-center gap-2 md:flex">
          <button className="rounded-xs border border-transparent px-3 py-2 text-white">
            List your property
          </button>
          <button className="rounded-xs border border-white px-3 py-2 text-white">
            Register
          </button>
          <button className="rounded-xs bg-white px-3 py-2 font-semibold text-primary">
            Sign in
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

      <div className="container hidden flex-wrap gap-2 pb-3 md:flex">
        {navLinks.map((item) => (
          <button
            key={item}
            className="rounded-full border border-white/30 px-3 py-2 text-sm text-white"
          >
            {item}
          </button>
        ))}
      </div>

      {menuOpen ? (
        <div className="container pb-3 md:hidden">
          <div className="rounded-lg border border-white/15 bg-primary-2 p-3 shadow-lg">
            <div className="grid gap-2">
              {navLinks.map((item) => (
                <button
                  key={item}
                  className="w-full rounded-md border border-white/20 px-3 py-2 text-left text-sm text-white"
                >
                  {item}
                </button>
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
