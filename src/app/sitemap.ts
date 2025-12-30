import { MetadataRoute } from "next";
import { getCategories } from "@/app/data/menu";
import {
    getHeroes,
    getMasters,
    getShow,
    getAdditions,
} from "@/app/data/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://kharakter.ru";

    // Статические страницы
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/menu`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/heroes`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/masters`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/show`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/additions`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/booking`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/cart`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/davai-poigraem`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/kharacter`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    // Динамические страницы - категории меню
    const categories = await getCategories();
    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}/menu/${cat.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Динамические страницы - услуги
    const [heroes, masters, show, additions] = await Promise.all([
        getHeroes(),
        getMasters(),
        getShow(),
        getAdditions(),
    ]);

    const heroPages: MetadataRoute.Sitemap = heroes.map((hero) => ({
        url: `${baseUrl}/heroes/${hero.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const masterPages: MetadataRoute.Sitemap = masters.map((master) => ({
        url: `${baseUrl}/masters/${master.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const showPages: MetadataRoute.Sitemap = show.map((s) => ({
        url: `${baseUrl}/show/${s.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    const additionPages: MetadataRoute.Sitemap = additions.map((addition) => ({
        url: `${baseUrl}/additions/${addition.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        ...staticPages,
        ...categoryPages,
        ...heroPages,
        ...masterPages,
        ...showPages,
        ...additionPages,
    ];
}
