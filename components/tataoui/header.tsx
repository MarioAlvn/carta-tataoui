import Image from "next/image"
import { MapPin, Phone } from "lucide-react"

const PHONE_NUMBER = "665556654"
const MAPS_URL = "https://maps.google.com/?q=tataoui"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center">
          <Image
            src="/tataoui/logo-branches.png"
            alt="tataoui"
            width={446}
            height={167}
            priority
            className="h-10 w-auto object-contain object-left"
          />
          <h1 className="sr-only">tataoui</h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="Llamar a tataoui"
            className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
          >
            <Phone className="size-4" />
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cómo llegar a tataoui en Google Maps"
            className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm transition-transform active:scale-95"
          >
            <MapPin className="size-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
