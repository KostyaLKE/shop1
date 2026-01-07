import Papa from "papaparse"
import fs from "fs"
import path from "path"

const CSV_FILE_NAME = "ncaseua-2.csv"

// Логика розрахунку роздрібної ціни
function calculateRetailPrice(originalPrice: number): number {
  if (originalPrice === 0) return 0;
  
  if (originalPrice < 100) {
    return originalPrice * 2;
  }
  if (originalPrice <= 500) {
    return originalPrice * 1.6;
  }
  return originalPrice * 1.4;
}

// Функція для визначення категорії
function normalizeCategory(row: any): string | null {
  const name = (row["Найменування"] || "").toLowerCase();
  const type = (row["Тип"] || "").toLowerCase();
  const caseType = (row["Вид чохла"] || "").toLowerCase();
  const glassType = (row["Тип скла"] || "").toLowerCase();
  const productType = (row["Тип товару"] || "").toLowerCase();

  // 1. Виключення
  if (name.includes("плоттер") || type.includes("плоттер") || name.includes("плівка для різання")) return null;
  if (name.includes("самокат") || name.includes("гіроборд") || type.includes("самокат")) return null;

  // 2. Пріоритет за спеціальними колонками
  if (productType === "скло" || glassType !== "" || name.includes("захисне скло") || name.includes("glass")) {
    return "Захисне скло";
  }

  if (caseType !== "" || name.includes("чохол") || name.includes("case") || name.includes("накладка") || name.includes("книжка")) {
    return "Чохли";
  }

  // 3. Аналіз назви та типу
  if (name.includes("кабель") || name.includes("cable") || name.includes("дата") || name.includes("перехідник")) {
    return "Кабелі та перехідники";
  }

  if (type.includes("заряд") || name.includes("зарядний") || name.includes("charger") || name.includes("адаптер") || name.includes("adapter") || name.includes("сзу") || name.includes("азу")) {
    return "Зарядні пристрої";
  }

  if (name.includes("power bank") || name.includes("powerbank") || name.includes("зовнішній акумулятор") || name.includes("батарея")) {
    return "Power Bank";
  }

  if (name.includes("навушники") || name.includes("headset") || name.includes("airpods") || name.includes("tws") || name.includes("гарнітура") || name.includes("колонка") || name.includes("акустика") || name.includes("speaker")) {
    return "Аудіо";
  }

  if (type.includes("тримач") || name.includes("тримач") || name.includes("holder") || name.includes("підставка") || name.includes("автотримач") || name.includes("fm-модулятор")) {
    return "Автотовари та тримачі";
  }

  if (name.includes("ремінець") || name.includes("strap") || name.includes("браслет")) {
    return "Ремінці для годинників";
  }

  if (name.includes("годинник") || name.includes("watch") || name.includes("smart watch")) {
    return "Смарт-годинники та гаджети";
  }

  if (name.includes("ліхтарик") || name.includes("лампа") || name.includes("нічник") || type.includes("лампа")) {
    return "Лампи та освітлення";
  }

  if (name.includes("плівка")) {
    return "Захисні плівки";
  }

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
        const finalCategory = normalizeCategory(row);

        if (!finalCategory) return null;

        let vendor = row["Бренд"] || "";
        if (vendor.toUpperCase() === "PRC") {
           vendor = "";
        }

        const rawPrice = parseFloat(String(row["Ціна"] || "0").replace(",", ".")) || 0;
        const finalPrice = parseFloat(calculateRetailPrice(rawPrice).toFixed(2));

        const rawImages = row["Фото"] || "/placeholder.png";
        const images = rawImages.split(',').map((img: string) => img.trim()).filter(Boolean);

        let description = row["Опис"] || "";
        description = description
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/?[^>]+(>|$)/g, "")
            .trim();

        const color = row["Дизайн"] || ""; 
        const deviceBrand = row["Марка пристрою"] || "";
        const deviceModel = row["Модель пристрою"] || "";
        
        const compat = [deviceBrand, deviceModel].filter(Boolean).join(" ");

        return {
            id: row["Артикул"] || row["Код виробника"] || String(Math.random()),
            name: row["Найменування"] || "Без назви",
            price: finalPrice,
            category: finalCategory,
            images: images.length > 0 ? images : ["/placeholder.png"],
            image: images[0] || "/placeholder.png",
            description: description,
            vendor: vendor,
            compat: compat,
            material: row["Матеріал"] || "",
            color: color,
            model: deviceModel,
            deviceBrand: deviceBrand
        }
    })
    // ВИПРАВЛЕННЯ: Додаємо явний type guard (Boolean)
    .filter((p): p is NonNullable<typeof p> => p !== null && p.price > 0)

    return products
  } catch (error) {
    console.error("💥 Помилка читання CSV:", error)
    return []
  }
}

export async function getCategories(products: any[]) {
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category))).sort();
  return uniqueCategories as string[]
}

export async function getProductById(id: string) {
  const products = await getProducts()
  // ВИПРАВЛЕННЯ: додано опціональний ланцюжок p?.id, хоча фільтр вище вже гарантує, що p не null
  return products.find((p) => p?.id === id)
}

export async function getProductsByCategory(category: string) {
  const products = await getProducts()
  return products.filter((p) => p?.category === category)
}