"use client"

import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="mx-auto max-w-lg px-4 pt-4">
      <div role="tablist" aria-label="Categorías" className="grid auto-rows-fr grid-cols-3 gap-2 py-1.5">
        {categories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "flex min-h-9 w-full min-w-0 items-center justify-center rounded-full border px-2 py-1.5 text-center text-[13px] font-semibold leading-tight text-balance break-words transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40",
              )}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}
