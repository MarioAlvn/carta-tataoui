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
      <div
        role="tablist"
        aria-label="Categorías"
        className="-mx-4 touch-pan-x overflow-x-auto overscroll-x-contain px-4 py-1.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max flex-nowrap gap-2">
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
                  "h-9 shrink-0 rounded-full border px-4 text-sm font-semibold leading-none transition-colors",
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
    </div>
  )
}
