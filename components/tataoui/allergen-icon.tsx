import {
  Bean,
  Egg,
  Fish,
  FlaskConical,
  Flower,
  Flower2,
  Milk,
  Nut,
  Salad,
  Shell,
  Shrimp,
  Sprout,
  TreeDeciduous,
  Wheat,
  Wine,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Allergen } from "@/lib/tataoui/types"

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  Gluten: "Gluten",
  Crustáceos: "Crustáceos",
  Huevos: "Huevos",
  Pescado: "Pescado",
  Cacahuetes: "Cacahuetes",
  Soja: "Soja",
  Lácteos: "Lácteos",
  "Frutos de cáscara": "Frutos secos",
  Apio: "Apio",
  Mostaza: "Mostaza",
  "Granos de sésamo": "Sésamo",
  "Dióxido de azufre y sulfitos": "Sulfitos",
  Moluscos: "Moluscos",
  Altramuces: "Altramuces",
}

interface AllergenMeta {
  icon: LucideIcon
  className: string
}

// Colores fieles a la leyenda de la carta física original
const ALLERGEN_META: Record<Allergen, AllergenMeta> = {
  Gluten: { icon: Wheat, className: "border-transparent bg-orange-500 text-white" },
  Crustáceos: { icon: Shrimp, className: "border-transparent bg-red-600 text-white" },
  Huevos: { icon: Egg, className: "border-transparent bg-yellow-400 text-yellow-950" },
  Pescado: { icon: Fish, className: "border-transparent bg-blue-900 text-white" },
  Cacahuetes: { icon: Bean, className: "border-transparent bg-amber-800 text-white" },
  Soja: { icon: Sprout, className: "border-transparent bg-green-600 text-white" },
  Lácteos: { icon: Milk, className: "border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" },
  "Frutos de cáscara": { icon: Nut, className: "border-transparent bg-pink-600 text-white" },
  Apio: { icon: Salad, className: "border-transparent bg-lime-500 text-white" },
  Mostaza: { icon: FlaskConical, className: "border-transparent bg-yellow-600 text-white" },
  "Granos de sésamo": { icon: Flower2, className: "border-transparent bg-stone-400 text-white" },
  "Dióxido de azufre y sulfitos": { icon: Wine, className: "border-transparent bg-fuchsia-900 text-white" },
  Moluscos: { icon: Shell, className: "border-transparent bg-cyan-500 text-cyan-950" },
  Altramuces: { icon: Flower, className: "border-transparent bg-yellow-300 text-yellow-950" },
}

export const ALLERGEN_ICONS: Record<Allergen, LucideIcon> = Object.fromEntries(
  (Object.keys(ALLERGEN_META) as Allergen[]).map((allergen) => [allergen, ALLERGEN_META[allergen].icon]),
) as Record<Allergen, LucideIcon>

// showLabel=false elimina el texto invasivo por defecto para comportarse como la carta física
export function AllergenBadge({ allergen, showLabel = false, className }: { allergen: Allergen; showLabel?: boolean; className?: string }) {
  const meta = ALLERGEN_META[allergen]
  if (!meta) return null
  const Icon = meta.icon
  
  return (
    <span
      title={ALLERGEN_LABELS[allergen]}
      className={cn(
        "inline-flex items-center justify-center rounded-full border shadow-sm",
        showLabel ? "px-2 py-0.5 gap-1" : "p-1 size-5", 
        meta.className,
        className,
      )}
    >
      <Icon className={cn("shrink-0", showLabel ? "size-3" : "size-3")} aria-hidden="true" />
      {showLabel && <span className="whitespace-nowrap text-[10.5px] font-medium leading-none">{ALLERGEN_LABELS[allergen]}</span>}
    </span>
  )
}
