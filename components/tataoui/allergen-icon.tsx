import { Egg, Fish, Milk, Nut, Shell, Wheat, Wine } from "lucide-react"
import type { Allergen } from "@/lib/tataoui/types"

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: "Gluten",
  lactosa: "Lactosa",
  huevo: "Huevo",
  pescado: "Pescado",
  sulfitos: "Sulfitos",
  "frutos-secos": "Frutos secos",
  marisco: "Marisco",
}

const ALLERGEN_ICONS: Record<Allergen, typeof Wheat> = {
  gluten: Wheat,
  lactosa: Milk,
  huevo: Egg,
  pescado: Fish,
  sulfitos: Wine,
  "frutos-secos": Nut,
  marisco: Shell,
}

export function AllergenIcon({ allergen, className }: { allergen: Allergen; className?: string }) {
  const Icon = ALLERGEN_ICONS[allergen]
  if (!Icon) return null
  return <Icon className={className} aria-hidden="true" />
}
