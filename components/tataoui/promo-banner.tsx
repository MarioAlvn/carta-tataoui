import { Megaphone, Star } from "lucide-react"

export function PromoBanner({ message, description }: { message: string; description?: string | null }) {
  return (
    <div
      role="status"
      className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-md"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 px-4 py-2.5 text-center sm:gap-3">
        <Megaphone
          className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse self-start text-amber-950"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-950 sm:text-base">{message}</p>
          {description && <p className="text-xs font-medium text-amber-900/90 sm:text-sm">{description}</p>}
        </div>
        <Star
          className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse self-start fill-amber-950 text-amber-950"
          aria-hidden="true"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  )
}
