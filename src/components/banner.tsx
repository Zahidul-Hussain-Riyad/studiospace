"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { Autoplay, Keyboard, A11y } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

/* ---------------------------------- Data ---------------------------------- */

type BannerSlide = {
    category: string;
    headline: string;
    description: string;
    image: string;
    alt: string;
};

const slides: BannerSlide[] = [
    {
        category: "Photography Studio",
        headline: "Create Without Limits",
        description: "Discover inspiring photography spaces and bring your creative vision to life.",
        image: "/images/banner-photography.jpg",
        alt: "Photography studio with softbox lights and a white backdrop",
    },
    {
        category: "Podcast Studio",
        headline: "Your Voice Deserves a Studio",
        description: "Find professional podcast spaces equipped to make your voice stand out.",
        image: "/images/banner-podcast.jpg",
        alt: "Professional podcast microphone mounted on a boom arm",
    },
    {
        category: "Music Recording Studio",
        headline: "Turn Your Passion Into Sound",
        description: "Explore creative music studios and make your next masterpiece.",
        image: "/images/banner-music.jpg",
        alt: "Music studio with a mixing console, guitars on the wall and studio monitors",
    },
];

const primaryCta = { label: "Explore Studios", href: "/studios" };
const secondaryCta = { label: "Host Your Space", href: "/signup" };

/* ------------------------------- Sub-sections ------------------------------ */

function SlideContent({ slide }: { slide: BannerSlide }) {
    return (
        <div className="absolute inset-0 flex items-end lg:items-center">
            <div className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-8 lg:pb-0">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                    {slide.category}
                </p>
                <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl">
                    {slide.headline}
                </h2>
                <p className="mt-4 max-w-xl text-base text-zinc-300 sm:text-lg">
                    {slide.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Primary CTA — amber pill, matching the Navbar/Footer buttons */}
                    <Link
                        href={primaryCta.href}
                        className="inline-flex items-center justify-center rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                    >
                        {primaryCta.label}
                    </Link>
                    {/* Secondary CTA — ghost pill, matching the Navbar "Login" style */}
                    <Link
                        href={secondaryCta.href}
                        className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                    >
                        {secondaryCta.label}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* --------------------------------- Banner ---------------------------------- */

export default function Banner() {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative w-full bg-zinc-950" aria-label="Featured studios">
            <Swiper
                modules={[Autoplay, Keyboard, A11y]}
                loop
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                keyboard={{ enabled: true }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-[560px] w-full sm:h-[600px] lg:h-[660px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.image}>
                        <div className="relative h-full w-full overflow-hidden">
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                fill
                                preload={index === 0}
                                sizes="100vw"
                                className="object-cover"
                            />

                            {/* Dark gradients so text stays readable over photos */}
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/55 to-zinc-950/20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/30" />

                            <SlideContent slide={slide} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation arrows (hidden on small screens, swipe there instead) */}
            <button
                type="button"
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-4 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/50 text-white backdrop-blur transition-colors hover:border-amber-500 hover:bg-amber-500 hover:text-zinc-950 md:flex lg:left-8"
            >
                <ChevronLeft className="size-5" />
            </button>
            <button
                type="button"
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-4 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/50 text-white backdrop-blur transition-colors hover:border-amber-500 hover:bg-amber-500 hover:text-zinc-950 md:flex lg:right-8"
            >
                <ChevronRight className="size-5" />
            </button>

            {/* Pagination dots */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
                {slides.map((slide, index) => (
                    <button
                        key={slide.image}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={activeIndex === index}
                        onClick={() => swiperRef.current?.slideToLoop(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            activeIndex === index
                                ? "w-8 bg-amber-500"
                                : "w-2.5 bg-white/40 hover:bg-white/70"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
