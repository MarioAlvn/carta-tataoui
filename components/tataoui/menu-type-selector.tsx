"use client"

import { cn } from "@/lib/utils"

interface MenuTypeSelectorProps {
  menuTypes: string[]
  activeMenuType: string
  onMenuTypeChange: (menuType: string) => void
}

export function MenuTypeSelector({ menuTypes, activeMenuType, onMenuTypeChange }: MenuTypeSelectorProps) {
  if (menuTypes.length <= 1) return null

  return (
    <div className="mx-auto max-w-lg px-4 pt-4">
      <div className="-mx-4 touch-pan-x overflow-x-auto overscroll-x-contain px-4 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Momento del día"
          className="flex w-max flex-nowrap gap-1 rounded-full border border-border bg-card p-1 shadow-sm"
        >
          {menuTypes.map((menuType) => {
            const isActive = menuType === activeMenuType
            return (
              <button
                key={menuType}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onMenuTypeChange(menuType)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-center text-sm font-semibold leading-tight transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {menuType}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
