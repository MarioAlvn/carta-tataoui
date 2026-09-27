import { Leaf } from "lucide-react"
import { AllergenIcon, ALLERGEN_LABELS } from "./allergen-icon"
import type { Dish } from "@/lib/tataoui/types"

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
})

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <li className="relative rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-1.5">
          {dish.vegetarian && (
            <Leaf className="mt-0.5 size-3.5 shrink-0 text-accent" aria-label="Plato vegetariano" />
          )}
          <h3 className="font-heading text-base font-bold leading-snug text-foreground">{dish.name}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-sm font-bold text-secondary-foreground">
          {priceFormatter.format(dish.price)}
        </span>
      </div>

      {dish.description && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dish.description}</p>}

      {dish.allergens.length > 0 && (
        <ul className="mt-3 flex flex-wrap items-center gap-2.5" aria-label="Alérgenos">
          {dish.allergens.map((allergen) => (
            <li key={allergen} className="flex items-center gap-1 text-muted-foreground" title={ALLERGEN_LABELS[allergen]}>
              <AllergenIcon allergen={allergen} className="size-3.5" />
              <span className="text-[11px] font-medium">{ALLERGEN_LABELS[allergen]}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
