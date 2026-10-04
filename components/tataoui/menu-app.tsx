"use client"

import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import type { Allergen, Dish } from "@/lib/tataoui/types"
import type { MenuData, PromoBannerData } from "@/lib/tataoui/menu-data"
import { Header } from "./header"
import { PromoBanner } from "./promo-banner"
import { SearchAndFilters } from "./search-and-filters"
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
  return [...new Set(values.filter(Boolean))]
}

const REFRESH_INTERVAL_MS = 3 * 60 * 1000 // Re-fetch the sheet every 3 minutes.

async function fetchJson(url: string): Promise<MenuData> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}

export function MenuApp({
  dishes: initialDishes,
  banners: initialBanners,
}: { dishes: Dish[]; banners: PromoBannerData[] }) {
  const { data } = useSWR<MenuData>("/api/tataoui/menu", fetchJson, {
    fallbackData: { dishes: initialDishes, banners: initialBanners },
    refreshInterval: REFRESH_INTERVAL_MS,
    revalidateOnFocus: true,
  })
  const dishes = data?.dishes ?? initialDishes
  const banners = data?.banners ?? initialBanners

  const [search, setSearch] = useState("")
  const [activeMenuType, setActiveMenuType] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const [activeFilters, setActiveFilters] = useState<Allergen[]>([])

  // AÑADIDO: Tipo explícito (dish: Dish)
  const menuTypes = useMemo(() => uniqueInOrder(dishes.flatMap((dish: Dish) => dish.menuTypes)), [dishes])

  useEffect(() => {
    if (menuTypes.length === 0) return
    if (!activeMenuType || !menuTypes.includes(activeMenuType)) {
      setActiveMenuType(menuTypes[0])
    }
  }, [menuTypes, activeMenuType])

  // AÑADIDO: Tipo explícito (dish: Dish)
  const dishesForMenuType = useMemo(
    () => (activeMenuType ? dishes.filter((dish: Dish) => dish.menuTypes.includes(activeMenuType)) : dishes),
    [dishes, activeMenuType],
  )

  const categories = useMemo(() => {
    // AÑADIDO: Tipo explícito (dish: Dish)
    const dynamicCategories = uniqueInOrder(dishesForMenuType.map((dish: Dish) => dish.category))
    return [ALL_CATEGORY, ...dynamicCategories]
  }, [dishesForMenuType])

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(ALL_CATEGORY)
    }
  }, [categories, activeCategory])

  const filteredDishes = useMemo(() => {
    const query = normalize(search.trim())

    // AÑADIDO: Tipo explícito (dish: Dish)
    return dishesForMenuType.filter((dish: Dish) => {
      if (activeCategory !== ALL_CATEGORY && dish.category !== activeCategory) return false

      if (query) {
        const haystack = normalize(`${dish.name} ${dish.description}`)
        if (!haystack.includes(query)) return false
      }

      // AÑADIDO: Tipo explícito para allergen
      if (activeFilters.some((allergen: Allergen) => dish.allergens.includes(allergen))) return false

      return true
    })
  }, [dishesForMenuType, search, activeCategory, activeFilters])

  function toggleFilter(filter: Allergen) {
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