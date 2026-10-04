import { fetchMenuData } from "@/lib/tataoui/menu-data"

// Always re-fetches the Google Sheet on request; the client polls this route
// so the page can pick up menu/banner changes without a manual reload.
export const dynamic = "force-dynamic"

export async function GET() {
  const data = await fetchMenuData()
  return Response.json(data, {
    headers: { "Cache-Control": "no-store" },
  })
}
