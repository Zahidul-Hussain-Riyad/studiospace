"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Menu, X } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore studios", href: "/studios" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 lg:h-[72px] lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5"
          onClick={() => setOpen(false)}
        >
          <Camera
            className="size-7 text-amber-500"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="text-2xl font-bold tracking-tight text-zinc-950">
            StudioSpace
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-[15px] transition-colors hover:text-zinc-950",
                    isActive
                      ? "font-medium text-zinc-950"
                      : "text-zinc-500"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-200/80 bg-white px-5 pb-6 pt-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-zinc-100 hover:text-zinc-950",
                      isActive
                        ? "bg-zinc-100 font-medium text-zinc-950"
                        : "text-zinc-600"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200/80 pt-4">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-zinc-300 px-4 py-3 text-center text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="rounded-full bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
