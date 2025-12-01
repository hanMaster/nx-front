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
}

let categories: Category[] = [];
let items: MenuItem[] = [];

export const fetchMenu = async () => {
    await fetchMenuItems();
    await fetchCategories();
};

const fetchMenuItems = async () => {
    try {
        const response = await fetch(`${baseUrl}menu-items`);
        const data = await response.json();
        items = data.map((item: MenuItem) => {
            const minOrder = item.parentId === 9 ? 10 : 1;
            return { ...item, minOrder };
        });
    } catch (error) {
        console.error('[menuStore] error:', error);
    }
};
const fetchCategories = async () => {
    try {
        const response = await fetch(`${baseUrl}categories`);
        categories = await response.json();
    } catch (error) {
        console.error('[menuStore] error:', error);
    }
};

export const getItemsByCategory = async (id: number) => {
    if (items.length === 0) {
        await fetchMenu();
    }
    return items.filter((i) => i.parentId === +id).sort((a, b) => a.ord - b.ord);
};

export const getItemById = async (id: number) => {
    if (items.length === 0) {
        await fetchMenu();
    }
    return items.find((i) => i.id === +id) as MenuItem;
};

export const getCategories = async () => {
    if (categories.length === 0) {
        await fetchMenu();
    }
    return categories;
};

export const getCategoryById = async (id: number) => {
    if (categories.length === 0) {
        await fetchMenu();
    }
    return categories.find((i) => i.id === +id);
};

export const getParentById = (id: number) => {
    const item = items.find((i) => i.id === +id);
    return item ? item.parentId : '';
};