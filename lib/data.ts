import { XMLParser } from "fast-xml-parser"

const XML_URL = process.env.NEXT_PUBLIC_XML_URL || ""

export async function getProducts() {
  if (!XML_URL) {
    throw new Error("XML_URL is not configured")
  }

  try {
    const res = await fetch(XML_URL, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch XML: ${res.status}`)
    }

    const xmlData = await res.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    })

    const jsonObj = parser.parse(xmlData)

    const rawItems = jsonObj?.catalog?.products?.product || []

    const itemsArray = Array.isArray(rawItems) ? rawItems : [rawItems]

    const products = itemsArray
      .filter((item) => item && item.id)
      .map((item) => ({
        id: String(item.id),
        name: item.name || "Товар без назви",
        price: parseFloat(item.price) || 0,
        category: item.category_name || "Інші",
        image: item.picture_url || "/placeholder.png",
        description: item.description || "",
        vendor: item.vendor || "",
      }))

    return products
  } catch (error) {
    console.error("Error fetching/parsing XML:", error)
    throw error
  }
}

export async function getCategories(products) {
  const uniqueCategories = [...new Set(products.map((p) => p.category))].filter(Boolean)
  return uniqueCategories
}

export async function getProductById(id) {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getProductsByCategory(category) {
  const products = await getProducts()
  return products.filter((p) => p.category === category)
}