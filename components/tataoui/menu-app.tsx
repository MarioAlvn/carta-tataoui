"use client"

import { useEffect, useMemo, useState } from "react"
import type { Dish } from "@/lib/tataoui/types"
import type { PromoBannerData } from "@/lib/tataoui/menu-data"
import { Header } from "./header"
import { PromoBanner } from "./promo-banner"
import { SearchAndFilters, type DietFilterKey } from "./search-and-filters"
import { MenuTypeSelector } from "./menu-type-selector"
import { CategoryTabs } from "./category-tabs"
import { DishList } from "./dish-list"
import { LeafPattern } from "./leaf-pattern"

const ALL_CATEGORY = "Todos"

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function uniqueInOrder(values: string[]) {
  const seen = new Set<string>()
  const found: string[] = []
  for (const value of values) {
    if (value && !seen.has(value)) {
      seen.add(value)
      found.push(value)
    }
  }
  return found
}

// The CSV wording for the "lunch/dinner" moment can vary (e.g. "Almuerzo/Cena"
// vs "Almuerzos y Cenas"), so the default tab is matched by meaning rather
// than an exact string.
function isLunchDinnerMenuType(menuType: string) {
  const normalized = normalize(menuType)
  return normalized.includes("almuerzo") || normalized.includes("cena")
}

export function MenuApp({ dishes, banners }: { dishes: Dish[]; banners: PromoBannerData[] }) {
  const [search, setSearch] = useState("")
  const [activeMenuType, setActiveMenuType] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const [activeFilters, setActiveFilters] = useState<DietFilterKey[]>([])

  // Top-level segmented filter: the unique "menu_type" values from the CSV.
  // A dish can list more than one (comma/pipe separated), so all of them are
  // flattened before deduplicating.
  const menuTypes = useMemo(() => uniqueInOrder(dishes.flatMap((dish) => dish.menuTypes)), [dishes])

  useEffect(() => {
    if (menuTypes.length === 0) return
    if (!activeMenuType || !menuTypes.includes(activeMenuType)) {
      setActiveMenuType(menuTypes.find(isLunchDinnerMenuType) ?? menuTypes[0])
    }
  }, [menuTypes, activeMenuType])

  const dishesForMenuType = useMemo(
    () => (activeMenuType ? dishes.filter((dish) => dish.menuTypes.includes(activeMenuType)) : dishes),
    [dishes, activeMenuType],
  )

  // Category tabs are recalculated dynamically: only categories that belong
  // to dishes within the currently selected menu type are shown.
  const categories = useMemo(() => {
    const dynamicCategories = uniqueInOrder(dishesForMenuType.map((dish) => dish.category))
    return [ALL_CATEGORY, ...dynamicCategories]
  }, [dishesForMenuType])

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(ALL_CATEGORY)
    }
  }, [categories, activeCategory])

  const filteredDishes = useMemo(() => {
    const query = normalize(search.trim())

    return dishesForMenuType.filter((dish) => {
      if (activeCategory !== ALL_CATEGORY && dish.category !== activeCategory) return false

      if (query) {
        const haystack = normalize(`${dish.name} ${dish.description}`)
        if (!haystack.includes(query)) return false
      }

      if (activeFilters.includes("sin-gluten") && dish.allergens.includes("gluten")) return false
      if (activeFilters.includes("sin-lactosa") && dish.allergens.includes("lactosa")) return false
      if (activeFilters.includes("vegetariano") && !dish.vegetarian) return false

      return true
    })
  }, [dishesForMenuType, search, activeCategory, activeFilters])

  function toggleFilter(filter: DietFilterKey) {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    )
  }

  function handleMenuTypeChange(menuType: string) {
    setActiveMenuType(menuType)
    setActiveCategory(ALL_CATEGORY)
  }

  return (
    <div className="relative min-h-screen bg-background">
      <LeafPattern />
      <Header />
      {banners.length > 0 && <PromoBanner banners={banners} />}
      <main className="pb-10">
        <MenuTypeSelector
          menuTypes={menuTypes}
          activeMenuType={activeMenuType ?? ""}
          onMenuTypeChange={handleMenuTypeChange}
        />
        <SearchAndFilters
          search={search}
          onSearchChange={setSearch}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />
        <CategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <DishList dishes={filteredDishes} />
      </main>
    </div>
  )
}