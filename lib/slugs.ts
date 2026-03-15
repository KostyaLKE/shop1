// Mapping: category name → URL slug
export const CATEGORY_SLUGS: Record<string, string> = {
  "Чохли":                      "chohly",
  "Захисне скло":               "zahysne-sklo",
  "Кабелі та перехідники":      "kabeli",
  "Зарядні пристрої":           "zaryadni-prystroi",
  "Power Bank":                 "power-bank",
  "Аудіо":                      "audio",
  "Автотовари та тримачі":      "avtotovary",
  "Ремінці для годинників":     "reminsti",
  "Смарт-годинники та гаджети": "smart-hodynnyky",
  "Лампи та освітлення":        "lampy",
  "Захисні плівки":             "zahysni-plivky",
  "Інші аксесуари":             "inshi-aksesuary",
}

// Reverse mapping: slug → category name
export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([cat, slug]) => [slug, cat])
)

export function toSlug(category: string): string {
  return CATEGORY_SLUGS[category] ?? encodeURIComponent(category)
}

export function fromSlug(slug: string): string {
  return SLUG_TO_CATEGORY[slug] ?? decodeURIComponent(slug)
}

export function catalogHref(category: string): string {
  return `/catalog?category=${toSlug(category)}`
}
