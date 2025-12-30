import { baseUrl } from "./apiBaseUrl";

export interface Category {
    id: number;
    ord: number;
    title: string;
    imageUrl: string;
}

export interface MenuItem {
    id: number;
    parentId: number;
    ord: number;
    title: string;
    price: number;
    description: string;
    imageJpg: string;
    imageWebp: string;
    portionWeightGrams: number;
    energy: number;
    proteins: number;
    fats: number;
    carbs: number;
    minOrder: number;
}

let categories: Category[] | null = null;
let items: MenuItem[] | null = null;
let fetchPromise: Promise<void> | null = null; // Предотвращаем race condition

export const fetchMenu = async () => {
    // Если уже загружается, возвращаем существующий Promise
    if (fetchPromise) return fetchPromise;

    // Если уже загружено, ничего не делаем
    if (categories && items) return;

    // Создаем новый Promise для параллельной загрузки
    fetchPromise = Promise.all([fetchMenuItems(), fetchCategories()])
        .then(() => {
            fetchPromise = null;
        })
        .catch((error) => {
            fetchPromise = null;
            console.error("[menuStore] fetchMenu error:", error);
            throw error; // Пробрасываем для обработки в error.tsx
        });

    return fetchPromise;
};

const fetchMenuItems = async () => {
    const response = await fetch(`${baseUrl}menu-items`, {
        next: {
            revalidate: 3600, // Кэш на 1 час
            tags: ["menu-items"],
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch menu items: ${response.status}`);
    }

    const data = await response.json();
    items = data.map((item: MenuItem) => {
        const minOrder = item.parentId === 9 ? 10 : 1;
        return { ...item, minOrder };
    });
};

const fetchCategories = async () => {
    const response = await fetch(`${baseUrl}categories`, {
        next: {
            revalidate: 3600, // Кэш на 1 час
            tags: ["categories"],
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    categories = await response.json();
};

export const getItemsByCategory = async (id: number) => {
    if (!items) {
        await fetchMenu();
    }
    return items!.filter((i) => i.parentId === +id).sort((a, b) => a.ord - b.ord);
};

export const getItemById = async (id: number) => {
    if (!items) {
        await fetchMenu();
    }
    return items!.find((i) => i.id === +id) as MenuItem;
};

export const getCategories = async () => {
    if (!categories) {
        await fetchMenu();
    }
    return categories!;
};

export const getCategoryById = async (id: number) => {
    if (!categories) {
        await fetchMenu();
    }
    return categories!.find((i) => i.id === +id);
};

export const getParentById = (id: number): number | null => {
    const item = items?.find((i) => i.id === +id);
    return item ? item.parentId : null;
};