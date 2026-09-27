import Papa from "papaparse"
import type { Allergen, Dish } from "./types"

// Public Google Sheets CSV export used to load the live menu.
// Expected columns: id, menu_type, category, name, description, price, allergens, vegetarian, available
// (allergens is a comma or pipe separated list, e.g. "gluten|lactosa")
// menu_type groups dishes into a moment of consumption, e.g. "Desayunos y
// Meriendas", "Almuerzos y Cenas", "Copas".
export const MENU_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSphyehkgvMdGJjty-IqyH8iloFdcPeYB1QA8xt33FwiJ6h2U_r9o7VbXAvQG3QVaoGFB6mrngQcCOW/pub?output=csv"

// Real dishes from tataoui's menu, used whenever the Google Sheet is not
// configured or the fetch fails, so the demo always looks great.
export const FALLBACK_MENU: Dish[] = [
  {
    id: 1,
    menuTypes: ["Almuerzo/Cena"],
    category: "Entrantes",
    name: "Ensaladilla de atún",
    description: "Clásica y casera",
    price: 7.5,
    allergens: ["pescado", "huevo"],
    vegetarian: false,
  },
  {
    id: 2,
    menuTypes: ["Almuerzo/Cena"],
    category: "Para Compartir",
    name: "Bravas muy bravas",
    description: "Nuestra salsa especial picante",
    price: 7.9,
    allergens: ["gluten"],
    vegetarian: true,
  },
  {
    id: 3,
    menuTypes: ["Almuerzo/Cena"],
    category: "Para Compartir",
    name: "Crujientes queso y puerro",
    description: "Fritos a la perfección",
    price: 6.9,
    allergens: ["lactosa", "gluten"],
    vegetarian: true,
  },
  {
    id: 4,
    menuTypes: ["Desayuno/Meriendas"],
    category: "De panes maneras",
    name: "Serranito tataoui",
    description: "Pollo/lomo, cheddar, pimiento rojo, jamón",
    price: 7.8,
    allergens: ["gluten", "lactosa"],
    vegetarian: false,
  },
  {
    id: 5,
    menuTypes: ["Desayuno/Meriendas"],
    category: "De panes maneras",
    name: "Burguer tataoui",
    description: "Black Angus 200gr, pan y queso, 3 toppings",
    price: 12.9,
    allergens: ["gluten", "lactosa"],
    vegetarian: false,
  },
  {
    id: 6,
    menuTypes: ["Almuerzo/Cena"],
    category: "Guisoteo",
    name: "Menudo de ternera",
    description: "Guiso tradicional",
    price: 6.5,
    allergens: [],
    vegetarian: false,
  },
  {
    id: 7,
    menuTypes: ["Almuerzo/Cena"],
    category: "Toda la vida",
    name: "Solomillo al whisky",
    description: "El clásico sevillano",
    price: 6.9,
    allergens: ["sulfitos"],
    vegetarian: false,
  },
  {
    id: 8,
    menuTypes: ["Almuerzo/Cena"],
    category: "Final feliz",
    name: "Porción de tarta",
    description: "Preguntar por fuera de carta",
    price: 4.8,
    allergens: ["gluten", "lactosa", "huevo"],
    vegetarian: true,
  },
  {
    id: 9,
    menuTypes: ["Copas"],
    category: "Cócteles",
    name: "Gin tonic tataoui",
    description: "Ginebra premium, botánicos de la casa",
    price: 8.5,
    allergens: [],
    vegetarian: true,
  },
]

const KNOWN_ALLERGENS: Allergen[] = ["gluten", "lactosa", "huevo", "pescado", "sulfitos", "frutos-secos", "marisco"]

function parseAllergens(raw: string | undefined): Allergen[] {
  if (!raw) return []
  return raw
    .split(/[|,;]/)
    .map((a) => a.trim().toLowerCase())
    .filter((a): a is Allergen => KNOWN_ALLERGENS.includes(a as Allergen))
}

// A single "menu_type" cell can list more than one moment of day
// (e.g. "Almuerzo/Cena, Desayuno/Meriendas"), so it's parsed the same way as
// allergens: split into a clean, deduplicated list of values.
function parseMenuTypes(raw: string | undefined): string[] {
  if (!raw) return []
  const seen = new Set<string>()
  const values: string[] = []
  for (const part of raw.split(/[|,;]/)) {
    const value = part.trim()
    if (value && !seen.has(value)) {
      seen.add(value)
      values.push(value)
    }
  }
  return values
}

function parseVegetarian(raw: string | undefined): boolean {
  if (!raw) return false
  const value = raw.trim().toLowerCase()
  return value === "true" || value === "si" || value === "sí" || value === "1" || value === "yes"
}

// Dishes are available by default. Only an explicit "FALSE" (any case) in the
// "available" column hides a dish from the menu.
function parseAvailable(raw: string | undefined): boolean {
  if (!raw) return true
  return raw.trim().toLowerCase() !== "false"
}

// A row whose "category" is "Banner" is marketing content, not a dish: it's
// intercepted before rendering and turned into a promotional banner instead
// of a menu item. It follows the same "available" rules as dishes, so
// setting it to FALSE in the sheet makes the banner disappear.
const BANNER_CATEGORY = "banner"

function isBannerRow(row: Record<string, string>) {
  return row.category?.trim().toLowerCase() === BANNER_CATEGORY
}

function rowsToDishes(rows: Record<string, string>[]): Dish[] {
  return rows
    .filter((row) => !isBannerRow(row))
    .filter((row) => row.name && row.name.trim().length > 0)
    .filter((row) => parseAvailable(row.available))
    .map((row, index) => ({
      id: Number(row.id) || index + 1,
      menuTypes: parseMenuTypes(row.menu_type),
      category: row.category?.trim() ?? "",
      name: row.name.trim(),
      description: row.description?.trim() ?? "",
      price: Number.parseFloat(row.price?.replace(",", ".") ?? "0") || 0,
      allergens: parseAllergens(row.allergens),
      vegetarian: parseVegetarian(row.vegetarian),
    }))
}

// Picks the active promotional banner, if any. Only rows marked available
// (TRUE) are considered; an unavailable banner row hides the banner
// entirely. Its "description" cell (if present) is shown as a subtitle.
function rowsToBanner(rows: Record<string, string>[]): PromoBannerData | null {
  const bannerRow = rows.find((row) => isBannerRow(row) && parseAvailable(row.available) && row.name?.trim())
  if (!bannerRow) return null
  return {
    message: bannerRow.name.trim(),
    description: bannerRow.description?.trim() || null,
  }
}

export interface PromoBannerData {
  message: string
  description: string | null
}

export interface MenuData {
  dishes: Dish[]
  banner: PromoBannerData | null
}

/**
 * Loads the menu from a public Google Sheets CSV export. Falls back to the
 * hardcoded tataoui menu if no URL is configured or the request fails, so
 * the UI always has data to render.
 */
export async function fetchMenuData(csvUrl: string = MENU_CSV_URL): Promise<MenuData> {
  if (!csvUrl) {
    return { dishes: FALLBACK_MENU, banner: null }
  }

  try {
    const response = await fetch(csvUrl, { cache: "no-store" })
    if (!response.ok) throw new Error(`CSV request failed with status ${response.status}`)

    const csvText = await response.text()
    const { data, errors } = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (errors.length > 0 && data.length === 0) {
      throw new Error("CSV parse produced no rows")
    }

    const dishes = rowsToDishes(data)
    const banner = rowsToBanner(data)
    return dishes.length > 0 ? { dishes, banner } : { dishes: FALLBACK_MENU, banner: null }
  } catch (error) {
    console.error("[tataoui] Failed to load menu from Google Sheets, using fallback menu:", error)
    return { dishes: FALLBACK_MENU, banner: null }
  }
}
