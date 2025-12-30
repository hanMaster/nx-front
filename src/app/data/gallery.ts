import { baseUrl } from "./apiBaseUrl";

const SLIDER_GALLEY_ID = process.env.NODE_ENV === 'development' ? 6 : 125;
const SLIDER_RAZVIVALOCHKA = process.env.NODE_ENV === 'development' ? 12 : 177;

export interface SliderImage {
    id: number;
    filename: string;
    order: number;
}

let sliderImages: SliderImage[] | null = null;
let razvivalochkaImages: SliderImage[] | null = null;
let club: SliderImage[] | null = null;
let studio: SliderImage[] | null = null;

// Promise locking для предотвращения race conditions
let galleryPromise: Promise<void> | null = null;
let mainSliderPromise: Promise<void> | null = null;
let razvivalochkaPromise: Promise<void> | null = null;

const fetchGallery = async () => {
    if (galleryPromise) return galleryPromise;
    if (club && studio) return;

    galleryPromise = (async () => {
        const response = await fetch(`${baseUrl}gallery-images`, {
            next: {
                revalidate: 7200, // Кэш на 2 часа
                tags: ["gallery"],
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch gallery: ${response.status}`);
        }

        const data = await response.json();
        club = data.club;
        studio = data.studio;
    })()
        .then(() => {
            galleryPromise = null;
        })
        .catch((error) => {
            galleryPromise = null;
            console.error("[galleryStore] error:", error);
            throw error;
        });

    return galleryPromise;
};

export const getClubImages = async () => {
    if (!club) {
        await fetchGallery();
    }
    return club!;
};

export const getStudioImages = async () => {
    if (!studio) {
        await fetchGallery();
    }
    return studio!;
};

export const getMainSliderImages = async () => {
    if (mainSliderPromise) return mainSliderPromise.then(() => sliderImages!);
    if (sliderImages) return sliderImages;

    mainSliderPromise = (async () => {
        const response = await fetch(`${baseUrl}images/${SLIDER_GALLEY_ID}`, {
            next: {
                revalidate: 3600,
                tags: ["main-slider"],
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch main slider: ${response.status}`,
            );
        }

        sliderImages = await response.json();
    })()
        .then(() => {
            mainSliderPromise = null;
        })
        .catch((error) => {
            mainSliderPromise = null;
            console.error("[galleryStore] error:", error);
            throw error;
        });

    await mainSliderPromise;
    return sliderImages!;
};

export const getRazvivalochkaImages = async () => {
    if (razvivalochkaPromise)
        return razvivalochkaPromise.then(() => razvivalochkaImages!);
    if (razvivalochkaImages) return razvivalochkaImages;

    razvivalochkaPromise = (async () => {
        const response = await fetch(
            `${baseUrl}images/${SLIDER_RAZVIVALOCHKA}`,
            {
                next: {
                    revalidate: 3600,
                    tags: ["razvivalochka-slider"],
                },
            },
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch razvivalochka slider: ${response.status}`,
            );
        }

        razvivalochkaImages = await response.json();
    })()
        .then(() => {
            razvivalochkaPromise = null;
        })
        .catch((error) => {
            razvivalochkaPromise = null;
            console.error("[galleryStore] error:", error);
            throw error;
        });

    await razvivalochkaPromise;
    return razvivalochkaImages!;
};