"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="mx-auto max-w-lg px-4 pt-4">
      <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as string)}>
        <div className="-mx-4 touch-pan-x overflow-x-auto overscroll-x-contain px-4 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList
            variant="line"
            className="h-auto w-max flex-nowrap gap-2 bg-transparent p-0"
          >
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="h-9 shrink-0 rounded-full border border-border bg-card px-4 text-sm font-semibold text-muted-foreground after:hidden data-active:border-primary data-active:!bg-primary data-active:!text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}
