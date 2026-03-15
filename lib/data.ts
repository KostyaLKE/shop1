import { XMLParser } from "fast-xml-parser"

const XML_URL = process.env.NEXT_PUBLIC_XML_URL || ""

// In-memory cache
let cache: { products: Product[]; categories: Record<string, string>; timestamp: number } | null = null
const CACHE_TTL = 60 * 60 * 1000 // 1 година

export interface Product {
  id: string
  name: string
  price: number
  wholesalePrice: number
  category: string
  images: string[]
  image: string
  description: string
  vendor: string
  compat: string
  material: string
  color: string
  model: string
  deviceBrand: string
  available: boolean
}

// Маппінг категорій постачальника → наші категорії
function normalizeCategory(categoryName: string, productName: string): string | null {
  const name = productName.toLowerCase()
  const cat = categoryName.toLowerCase()

  // Виключення
  if (name.includes("плоттер") || name.includes("плівка для різання")) return null
  if (name.includes("самокат") || name.includes("гіроборд")) return null

  if (cat.includes("скло") || name.includes("захисне скло") || name.includes("glass")) {
    return "Захисне скло"
  }
  if (cat.includes("чохол") || cat.includes("чохли") || name.includes("чохол") || name.includes("накладка") || name.includes("книжка")) {
    return "Чохли"
  }
  if (cat.includes("кабел") || name.includes("кабель") || name.includes("cable") || name.includes("перехідник")) {
    return "Кабелі та перехідники"
  }
  if (cat.includes("зарядн") || name.includes("зарядний") || name.includes("charger") || name.includes("адаптер") || name.includes("сзу") || name.includes("азу")) {
    return "Зарядні пристрої"
  }
  if (cat.includes("power bank") || name.includes("power bank") || name.includes("powerbank") || name.includes("зовнішній акумулятор")) {
    return "Power Bank"
  }
  if (cat.includes("навушник") || cat.includes("аудіо") || name.includes("навушники") || name.includes("airpods") || name.includes("tws") || name.includes("колонка") || name.includes("speaker")) {
    return "Аудіо"
  }
  if (cat.includes("тримач") || cat.includes("авто") || name.includes("тримач") || name.includes("holder") || name.includes("fm-модулятор")) {
    return "Автотовари та тримачі"
  }
  if (cat.includes("ремінець") || name.includes("ремінець") || name.includes("strap") || name.includes("браслет")) {
    return "Ремінці для годинників"
  }
  if (cat.includes("годинник") || cat.includes("watch") || name.includes("годинник") || name.includes("smart watch")) {
    return "Смарт-годинники та гаджети"
  }
  if (cat.includes("лампа") || cat.includes("освітлен") || name.includes("лампа") || name.includes("ліхтарик") || name.includes("нічник")) {
    return "Лампи та освітлення"
  }
  if (name.includes("плівка")) {
    return "Захисні плівки"
  }

  return "Інші аксесуари"
}

async function fetchAndParse(): Promise<{ products: Product[]; categories: Record<string, string> }> {
  const response = await fetch(XML_URL, { next: { revalidate: 3600 } })
  if (!response.ok) throw new Error(`XML fetch failed: ${response.status}`)
  const xml = await response.text()

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name) => name === "picture" || name === "param" || name === "offer" || name === "category",
  })

  const parsed = parser.parse(xml)
  const shop = parsed?.yml_catalog?.shop

  // Будуємо map категорій: id → назва
  const rawCategories: Array<{ "@_id": string; "#text": string }> = shop?.categories?.category || []
  const categoriesMap: Record<string, string> = {}
  for (const cat of rawCategories) {
    if (cat["@_id"] && cat["#text"]) {
      categoriesMap[cat["@_id"]] = cat["#text"]
    }
  }

  const offers: any[] = shop?.offers?.offer || []

  const products: Product[] = offers
    .map((offer: any): Product | null => {
      const name = String(offer.name || "Без назви")
      const categoryId = String(offer.categoryId || "")
      const categoryName = categoriesMap[categoryId] || ""
      const category = normalizeCategory(categoryName, name)

      if (!category) return null

      // Роздрібна ціна (price_rrc) і оптова (price)
      const rawPrice = parseFloat(String(offer.price_rrc || offer.price || "0").replace(",", ".")) || 0
      const rawWholesale = parseFloat(String(offer.price || "0").replace(",", ".")) || 0
      if (rawPrice <= 0) return null

      const pictures: string[] = Array.isArray(offer.picture)
        ? offer.picture.map(String).filter(Boolean)
        : offer.picture
        ? [String(offer.picture)]
        : ["/placeholder.png"]

      const images = pictures.length > 0 ? pictures : ["/placeholder.png"]

      let description = String(offer.description || "")
      description = description
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim()

      // Параметри (param: [{ "@_name": "...", "#text": "..." }])
      const params: Array<{ "@_name": string; "#text": string }> = Array.isArray(offer.param) ? offer.param : []
      const getParam = (key: string) =>
        params.find((p) => p["@_name"]?.toLowerCase().includes(key.toLowerCase()))?.["#text"] || ""

      const color = getParam("колір") || getParam("дизайн") || ""
      const material = getParam("матеріал") || ""
      const compat = getParam("сумісність") || getParam("модель") || ""
      const deviceBrand = getParam("бренд") || getParam("марка") || ""

      return {
        id: String(offer.vendorCode || offer["@_id"]),
        name,
        price: parseFloat(rawPrice.toFixed(2)),
        wholesalePrice: parseFloat(rawWholesale.toFixed(2)),
        category,
        images,
        image: images[0],
        description,
        vendor: String(offer.vendor || ""),
        compat,
        material,
        color,
        model: compat,
        deviceBrand,
        available: offer["@_available"] !== "false",
      }
    })
    .filter((p): p is Product => p !== null)

  return { products, categories: categoriesMap }
}

async function getData() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache
  }
  const data = await fetchAndParse()
  cache = { ...data, timestamp: Date.now() }
  return cache
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { products } = await getData()
    return products
  } catch (error) {
    console.error("💥 Помилка завантаження XML:", error)
    return []
  }
}

export async function getCategories(products: Product[]): Promise<string[]> {
  const unique = Array.from(new Set(products.map((p) => p.category))).sort()
  return unique
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((p) => p.category === category)
}
