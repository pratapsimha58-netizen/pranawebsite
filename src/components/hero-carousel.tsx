"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroSlides } from "@/lib/content";
import { cn } from "@/lib/utils";

const HOLD_MS = 4800;
const STILL_MS = 900;
const FADE_MS = 1300;

/**
 * Full-bleed atmospheric carousel with soft move → hold → still → move rhythm.
 * Autoplay pauses on hover/focus and when the visitor presses stop.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  /** While true, the active slide holds still before the next fade. */
  const [isStill, setIsStill] = useState(false);
  const cancelledRef = useRef(false);

  const paused = hoverPaused || userPaused;
  const kenBurns = !paused && !isStill;

  const goTo = useCallback((next: number) => {
    setIsStill(false);
    setIndex(((next % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    cancelledRef.current = false;
    if (paused) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Hold with gentle ken-burns, then a still beat, then fade to the next slide.
    timers.push(
      setTimeout(() => {
        if (cancelledRef.current) return;
        setIsStill(true);
        timers.push(
          setTimeout(() => {
            if (cancelledRef.current) return;
            setIsStill(false);
            setIndex((current) => (current + 1) % heroSlides.length);
          }, STILL_MS),
        );
      }, HOLD_MS),
    );

    return () => {
      cancelledRef.current = true;
      for (const timer of timers) clearTimeout(timer);
    };
  }, [index, paused]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHoverPaused(false);
        }
      }}
    >
      {heroSlides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]",
              active ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            aria-hidden={!active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover will-change-transform",
                active && kenBurns ? "animate-kenburns" : undefined,
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24302a]/75 via-[#24302a]/30 to-[#24302a]/25" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,#24302a66_100%)]" />
          </div>
        );
      })}

      <div className="absolute right-4 bottom-6 left-4 z-10 flex items-end justify-between gap-4 sm:right-8 sm:bottom-8 sm:left-8">
        <p
          key={heroSlides[index]?.id}
          className="animate-fade-up max-w-md font-display text-lg text-[#f7f3ed]/90 sm:text-xl"
        >
          {heroSlides[index]?.caption}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" role="tablist" aria-label="Carousel slides">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-sm transition-all duration-700",
                  i === index
                    ? "w-8 bg-[#f7f3ed]"
                    : "w-1.5 bg-[#f7f3ed]/40 hover:bg-[#f7f3ed]/70",
                )}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-[#f7f3ed]/25 bg-[#24302a]/35 text-[#f7f3ed] backdrop-blur-sm transition hover:bg-[#24302a]/55"
            aria-label={userPaused ? "Play carousel" : "Pause carousel"}
            onClick={() => setUserPaused((value) => !value)}
          >
            {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {userPaused ? "Carousel paused." : `Showing: ${heroSlides[index]?.caption}`}
      </span>
    </div>
  );
}
