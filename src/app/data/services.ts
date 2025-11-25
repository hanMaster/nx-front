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

let services: Service[];

async function fetchServices() {
    try {
        const response = await fetch(`${baseUrl}services`);
        return response.json();
    } catch (error) {
        console.error('[services] error:', error);
    }
}

export async function getHeroes() {
    if (!services) {
        services = await fetchServices();
    }
    return services.filter(s => s.showType === HEROES);
}

export async function getMasters() {
    if (!services) {
        services = await fetchServices();
    }
    return services.filter(s => s.showType === MASTERS);
}

export async function getShow() {
    if (!services) {
        services = await fetchServices();
    }
    return services.filter(s => s.showType === SHOW);
}

export async function getAdditions() {
    if (!services) {
        services = await fetchServices();
    }
    return services.filter(s => s.showType === ADDITIONS);
}