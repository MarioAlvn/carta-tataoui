import { MenuApp } from "@/components/tataoui/menu-app"
import { fetchMenuData } from "@/lib/tataoui/menu-data"

export default async function Page() {
  const { dishes, banners } = await fetchMenuData()

  return <MenuApp dishes={dishes} banners={banners} />
}
