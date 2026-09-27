import { MenuApp } from "@/components/tataoui/menu-app"
import { fetchMenuData } from "@/lib/tataoui/menu-data"

export default async function Page() {
  const { dishes, banner } = await fetchMenuData()

  return <MenuApp dishes={dishes} banner={banner} />
}
