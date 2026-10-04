import {
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

/** Short label used on compact mobile badges; the full legal name is kept as the `title` tooltip. */
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
  /** Tailwind classes for the badge's border, background tint, and icon/text color. */
  className: string
}

const ALLERGEN_META: Record<Allergen, AllergenMeta> = {
  Gluten: { icon: Wheat, className: "border-orange-400/30 bg-orange-100/80 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  Crustáceos: { icon: Shrimp, className: "border-sky-600/30 bg-sky-500 text-white dark:bg-sky-600" },
  Huevos: { icon: Egg, className: "border-amber-600/30 bg-amber-500 text-white dark:bg-amber-600" },
  Pescado: { icon: Fish, className: "border-indigo-900/30 bg-indigo-950 text-white dark:bg-indigo-900" },
  Cacahuetes: { icon: Nut, className: "border-amber-700/30 bg-amber-200 text-amber-900 dark:bg-amber-800/60 dark:text-amber-100" },
  Soja: { icon: Sprout, className: "border-green-600/30 bg-green-600 text-white dark:bg-green-700" },
  Lácteos: { icon: Milk, className: "border-amber-900/30 bg-[#6b4226] text-white dark:bg-[#5a3620]" },
  "Frutos de cáscara": {
    icon: TreeDeciduous,
    className: "border-rose-400/30 bg-rose-400 text-white dark:bg-rose-500",
  },
  Apio: { icon: Salad, className: "border-lime-600/30 bg-lime-500 text-white dark:bg-lime-600" },
  Mostaza: {
    icon: FlaskConical,
    className: "border-yellow-700/30 bg-[#9c8427] text-white dark:bg-[#7d6a1f]",
  },
  "Granos de sésamo": {
    icon: Flower2,
    className: "border-stone-500/30 bg-stone-400 text-white dark:bg-stone-500",
  },
  "Dióxido de azufre y sulfitos": {
    icon: Wine,
    className: "border-fuchsia-900/30 bg-[#7a1e4f] text-white dark:bg-[#5e1740]",
  },
  Moluscos: { icon: Shell, className: "border-cyan-400/30 bg-cyan-300 text-cyan-950 dark:bg-cyan-500 dark:text-cyan-950" },
  Altramuces: { icon: Flower, className: "border-yellow-300/30 bg-yellow-300 text-yellow-950 dark:bg-yellow-400" },
}

/** Icon per allergen, reused by both the dish badges and the "Sin X" filter buttons. */
export const ALLERGEN_ICONS: Record<Allergen, LucideIcon> = Object.fromEntries(
  (Object.keys(ALLERGEN_META) as Allergen[]).map((allergen) => [allergen, ALLERGEN_META[allergen].icon]),
) as Record<Allergen, LucideIcon>

/** Compact, color-coded badge for a single allergen: icon + short label, full name as tooltip. */
export function AllergenBadge({ allergen, className }: { allergen: Allergen; className?: string }) {
  const meta = ALLERGEN_META[allergen]
  if (!meta) return null
  const Icon = meta.icon
  return (
    <span
      title={allergen}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium leading-none",
        meta.className,
        className,
      )}
    >
      <Icon className="size-3 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">{ALLERGEN_LABELS[allergen]}</span>
    </span>
  )
}
