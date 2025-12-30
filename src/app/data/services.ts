import { baseUrl } from "./apiBaseUrl";

const MASTERS = 1;
const HEROES = 2;
const SHOW = 3;
const ADDITIONS = 4;

export interface Service {
    id: number;
    title: string;
    description: string;
    price: number;
    galleryId: number;
    published: boolean;
    showType: number;
    age: number;
    ageWithParents: number;
    mainPicture: string;
    order: number;
    duration: number;
    materialPrice: number;
    discountPrice: number;
}

let services: Service[] | null = null;
let fetchPromise: Promise<void> | null = null; // Предотвращаем race condition

async function fetchServices() {
    // Если уже загружается, возвращаем существующий Promise
    if (fetchPromise) return fetchPromise;

    // Если уже загружено, ничего не делаем
    if (services) return;

    fetchPromise = (async () => {
        const response = await fetch(`${baseUrl}services`, {
            next: {
                revalidate: 1800, // Кэш на 30 минут
                tags: ["services"],
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch services: ${response.status}`);
        }

        services = await response.json();
    })()
        .then(() => {
            fetchPromise = null;
        })
        .catch((error) => {
            fetchPromise = null;
            console.error("[services] error:", error);
            throw error;
        });

    return fetchPromise;
}

export async function getHeroes() {
    if (!services) {
        await fetchServices();
    }
    return services!.filter((s) => s.showType === HEROES);
}

export async function getMasters() {
    if (!services) {
        await fetchServices();
    }
    return services!.filter((s) => s.showType === MASTERS);
}

export async function getShow() {
    if (!services) {
        await fetchServices();
    }
    return services!.filter((s) => s.showType === SHOW);
}

export async function getAdditions() {
    if (!services) {
        await fetchServices();
    }
    return services!.filter((s) => s.showType === ADDITIONS);
}

export async function getServiceById(id: string) {
    if (!services) {
        await fetchServices();
    }
    return services!.find((s) => s.id === Number(id));
}