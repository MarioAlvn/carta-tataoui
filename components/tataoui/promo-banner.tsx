"use client"

import { useEffect, useState } from "react"
import { Megaphone, Star } from "lucide-react"
import type { PromoBannerData } from "@/lib/tataoui/menu-data"

const ROTATE_INTERVAL_MS = 5000

export function PromoBanner({ banners }: { banners: PromoBannerData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // When there is more than one active banner, cycle through them so every
  // promotion gets seen instead of only the first one.
  useEffect(() => {
    if (banners.length < 2) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [banners.length])

  // Keep the active index valid if the list of banners shrinks (e.g. one
  // gets marked unavailable).
  useEffect(() => {
    if (activeIndex >= banners.length) setActiveIndex(0)
  }, [banners.length, activeIndex])

  const banner = banners[activeIndex]
  if (!banner) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-md"
    >
      <div
        key={activeIndex}
        className="mx-auto flex max-w-2xl animate-in fade-in slide-in-from-bottom-1 items-center justify-center gap-2 px-4 py-2.5 text-center duration-500 sm:gap-3"
      >
        <Megaphone
          className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse self-start text-amber-950"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-950 sm:text-base">{banner.message}</p>
          {banner.description && (
            <p className="text-xs font-medium text-amber-900/90 sm:text-sm">{banner.description}</p>
          )}
        </div>
        <Star
          className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse self-start fill-amber-950 text-amber-950"
          aria-hidden="true"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
      {banners.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 pb-2" role="tablist" aria-label="Promociones">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ver promoción ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-4 bg-amber-950" : "w-1.5 bg-amber-950/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
