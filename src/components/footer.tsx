"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

/* ---------------------------------- Data ---------------------------------- */

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Studios", href: "/studios" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
];

const studioCategories = [
    { label: "Photography Studios", href: "/studios?category=photography" },
    { label: "Music Studios", href: "/studios?category=music" },
    { label: "Dance Studios", href: "/studios?category=dance" },
    { label: "Podcast Studios", href: "/studios?category=podcast" },
];

/** Brand icons are not shipped by this lucide-react version, so they are
 *  rendered as minimal inline SVGs (including the new X logo). */
type Social = {
    label: string;
    href: string;
    icon: React.ReactNode
};

const socials: Social[] = [
    {
        label: "Facebook",
        href: "https://facebook.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        label: "X (Twitter)",
        href: "https://x.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
        ),
    },
];

/* ------------------------------- Sub-sections ------------------------------ */

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <ul className="mt-5 flex flex-col gap-4">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-[15px] transition-colors duration-200 hover:text-amber-400">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* --------------------------------- Footer ---------------------------------- */

export default function Footer() {
    const [email, setEmail] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        setYear(String(new Date().getFullYear()));
    }, []);

    const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmed = email.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);

        if (!isValid) {
            toast.error("Please enter a valid email address.");
            return;
        }

        toast.success("You're subscribed! Welcome to the StudioSpace newsletter.");
        setEmail("");
    };

    return (
        <footer className="bg-zinc-950 text-zinc-400">
            <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
                {/* Newsletter */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                            Subscribe Newsletter
                        </h2>
                        <p className="mt-3 text-[15px] leading-relaxed">
                            Stay inspired with creative tips, studio news, and updates.
                        </p>
                    </div>

                    <form onSubmit={handleSubscribe} noValidate className="flex w-full items-center gap-2 rounded-2xl bg-white p-2 lg:max-w-lg">
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Add email" aria-label="Email address"
                            className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-zinc-900 placeholder:text-zinc-500 focus:outline-none"
                        />
                        <Button type="submit" size="lg" className="h-12 shrink-0 rounded-xl bg-amber-500 px-6 text-[15px] font-semibold text-zinc-950 hover:bg-amber-400">
                            Subscribe
                        </Button>
                    </form>
                </div>

                <hr className="my-10 border-zinc-800 lg:my-12" />

                {/* Main columns */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.9fr] lg:gap-12">
                    {/* Brand + mission */}
                    <div>
                        <Link href="/" className="flex w-fit items-center gap-1.5">
                            <Camera className="size-7 text-amber-500" strokeWidth={1.75} aria-hidden="true" />
                            <span className="text-2xl font-bold tracking-tight text-white">StudioSpace</span>
                        </Link>
                        <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
                            A creative studio space built for inspiring ideas, meaningful projects, and memorable
                            visual stories together.
                        </p>
                    </div>

                    <LinkColumn title="Quick Links" links={quickLinks} />
                    <LinkColumn title="Studio Categories" links={studioCategories} />

                    {/* Social media */}
                    <div>
                        <h3 className="text-xl font-semibold text-white">Social Media</h3>
                        <ul className="mt-5 flex flex-col gap-4">
                            {socials.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2.5 text-[15px] transition-colors duration-200 hover:text-amber-400"
                                    >
                                        <span className="[&>svg]:size-4 transition-colors duration-200 group-hover:text-amber-400">
                                            {social.icon}
                                        </span>
                                        {social.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="my-10 border-zinc-800 lg:my-12" />

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p>{year} Copyright © StudioSpace</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy-policy" className="transition-colors duration-200 hover:text-amber-400">
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-and-conditions"
                            className="transition-colors duration-200 hover:text-amber-400"
                        >
                            Terms &amp; Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
