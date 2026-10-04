"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Allergen } from "@/lib/tataoui/types"
import { ALLERGEN_ICONS, ALLERGEN_LABELS } from "./allergen-icon"

interface SearchAndFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  activeFilters: Allergen[]
  onToggleFilter: (filter: Allergen) => void
  availableAllergens: Allergen[] // Recibimos la lista dinámica aquí
}

export function SearchAndFilters({ search, onSearchChange, activeFilters, onToggleFilter, availableAllergens }: SearchAndFiltersProps) {
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

      {/* Solo mostramos la barra de alérgenos si hay alérgenos en esta pestaña */}
      {availableAllergens.length > 0 && (
        <div className="-mx-4 flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain px-4 py-1.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {availableAllergens.map((allergen) => {
            const Icon = ALLERGEN_ICONS[allergen]
            const isActive = activeFilters.includes(allergen)
            return (
              <button
                key={allergen}
                type="button"
                onClick={() => onToggleFilter(allergen)}
                aria-pressed={isActive}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent/40",
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {`Sin ${ALLERGEN_LABELS[allergen]}`}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}