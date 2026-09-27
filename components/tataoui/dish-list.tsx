import { LeafyGreen } from "lucide-react"
import type { Dish } from "@/lib/tataoui/types"
import { DishCard } from "./dish-card"

export function DishList({ dishes }: { dishes: Dish[] }) {
  if (dishes.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-2 px-4 py-16 text-center">
        <LeafyGreen className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm font-medium text-muted-foreground">
          No hemos encontrado ningún plato con esos filtros.
        </p>
      </div>
    )
  }

  return (
    <ul className="mx-auto flex max-w-lg flex-col gap-3 px-4 py-4">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </ul>
  )
}
