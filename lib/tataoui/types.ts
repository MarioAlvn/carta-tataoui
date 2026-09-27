export type Allergen = "gluten" | "lactosa" | "huevo" | "pescado" | "sulfitos" | "frutos-secos" | "marisco"

export type MenuCategory =
  | "Entrantes"
  | "Para Compartir"
  | "De panes maneras"
  | "Guisoteo"
  | "Toda la vida"
  | "Final feliz"

export interface Dish {
  id: number
  // The moment(s) of day a dish belongs to (e.g. "Almuerzo/Cena"). A dish can
  // appear in more than one, since the source CSV allows a comma/pipe
  // separated list in a single "menu_type" cell.
  menuTypes: string[]
  category: MenuCategory | string
  name: string
  description: string
  price: number
  allergens: Allergen[]
  vegetarian?: boolean
}
