import Papa from "papaparse"
import fs from "fs"
import path from "path"

const CSV_FILE_NAME = "ncaseua-2.csv"

// Функция для объединения категорий
function normalizeCategory(rawCategory: string, name: string): string | null {
  const cat = rawCategory.toLowerCase();
  const n = name.toLowerCase();

  // 1. Исключения (то, что не нужно)
  if (cat.includes("плоттер") || n.includes("плоттер") || cat.includes("плівка для різання")) return null;
  if (cat.includes("самокат") || n.includes("самокат") || cat.includes("гіроборд")) return null;

  // 2. Группировка
  if (cat.includes("чохол") || cat.includes("case") || cat.includes("накладка") || cat.includes("книжка")) return "Чохли";
  if (cat.includes("скло") || cat.includes("glass") || cat.includes("плівка")) return "Захисне скло";
  if (cat.includes("кабель") || cat.includes("cable") || cat.includes("дата")) return "Кабелі";
  if (cat.includes("заряд") || cat.includes("adapter") || cat.includes("block")) return "Зарядні пристрої";
  if (cat.includes("power bank") || cat.includes("акумулятор")) return "Power Bank";
  if (cat.includes("навушники") || cat.includes("headset") || cat.includes("airpods")) return "Аудіо";
  if (cat.includes("тримач") || cat.includes("holder") || cat.includes("авто")) return "Автотовари";
  if (cat.includes("ремінець") || cat.includes("strap")) return "Ремінці для годинників";

  // Если не попало никуда, оставляем "Інше" или оригинальное название, если оно короткое
  return "Інші аксесуари";
}

export async function getProducts() {
  try {
    const filePath = path.join(process.cwd(), "public", CSV_FILE_NAME)
    const fileContent = fs.readFileSync(filePath, "utf8")

    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      delimiter: ";", 
    })

    const products = data.map((row: any) => {
        // Берем категорию из "Вид чохла" или "Тип"
        const rawCat = row["Вид чохла"] || row["Тип"] || "";
        const name = row["Найменування"] || "";
        const finalCategory = normalizeCategory(rawCat, name);

        // Если категория вернула null (исключение), то и товар не нужен
        if (!finalCategory) return null;

        return {
            id: row["Артикул"] || row["Код виробника"] || String(Math.random()),
            name: name || "Без назви",
            price: parseFloat(String(row["Ціна"] || "0").replace(",", ".")) || 0,
            category: finalCategory,
            image: row["Фото"] || "/placeholder.png", // Убедись, что файл placeholder.png есть в public
            description: row["Опис"] || "",
            vendor: row["Бренд"] || "",
            // Доп. поля для страницы товара
            compat: row["Марка пристрою"] || "",
            material: row["Матеріал"] || "",
            model: row["Модель"] || ""
        }
    })
    .filter((p: any) => p !== null && p.price > 0) // Убираем пустые и исключенные

    return products
  } catch (error) {
    console.error("💥 Ошибка чтения CSV:", error)
    return []
  }
}

export async function getCategories(products: any[]) {
  const uniqueCategories = [...new Set(products.map((p) => p.category))].sort();
  return uniqueCategories as string[]
}

// Получение одного товара для страницы товара
export async function getProductById(id: string) {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getProductsByCategory(category: string) {
  const products = await getProducts()
  return products.filter((p) => p.category === category)
}