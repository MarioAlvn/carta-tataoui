// The 14 allergens the EU requires food businesses to disclose. These exact
// strings are the contract with the data source (Google Sheet column
// "allergens"): parsing matches them case/accent-insensitively, but the
// canonical value stored on a Dish is always one of these.
export type Allergen =
  | "Gluten"
  | "Crustáceos"
  | "Huevos"
  | "Pescado"
  | "Cacahuetes"
  | "Soja"
  | "Lácteos"
  | "Frutos de cáscara"
  | "Apio"
  | "Mostaza"
  | "Granos de sésamo"
  | "Dióxido de azufre y sulfitos"
  | "Moluscos"
  | "Altramuces"

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
