"use client"

import { Leaf, Search, WheatOff, MilkOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type DietFilterKey = "sin-gluten" | "vegetariano" | "sin-lactosa"

const DIET_FILTERS: { key: DietFilterKey; label: string; icon: typeof Leaf }[] = [
  { key: "sin-gluten", label: "Sin Gluten", icon: WheatOff },
  { key: "vegetariano", label: "Vegetariano", icon: Leaf },
  { key: "sin-lactosa", label: "Sin Lactosa", icon: MilkOff },
]

interface SearchAndFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  activeFilters: DietFilterKey[]
  onToggleFilter: (filter: DietFilterKey) => void
}

export function SearchAndFilters({ search, onSearchChange, activeFilters, onToggleFilter }: SearchAndFiltersProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-3 px-4 pt-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar un plato..."
          aria-label="Buscar un plato"
          className="h-11 rounded-full border-border bg-card pl-10 text-sm shadow-sm"
        />
      </div>

      <div className="-mx-4 flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain px-4 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DIET_FILTERS.map(({ key, label, icon: Icon }) => {
          const isActive = activeFilters.includes(key)
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleFilter(key)}
              aria-pressed={isActive}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/40",
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
