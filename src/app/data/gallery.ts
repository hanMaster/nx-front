import { baseUrl } from "./apiBaseUrl";

const SLIDER_GALLEY_ID = process.env.NODE_ENV === 'development' ? 6 : 125;
const SLIDER_RAZVIVALOCHKA = process.env.NODE_ENV === 'development' ? 12 : 177;

export interface SliderImage {
    id: number;
    filename: string;
    order: number;
}

let sliderImages: SliderImage[] = [];
let razvivalochkaImages: SliderImage[] = [];
let club: SliderImage[] = [];
let studio: SliderImage[] = [];

const fetchGallery = async () => {
    try {
        const response = await fetch(`${baseUrl}gallery-images`);
        const data = await response.json();
        club = data.club;
        studio = data.studio;
    } catch (error) {
        console.error('[galleryStore] error:', error);
    }
};

export const getClubImages = async () => {
    if (club.length > 0) {
        return club;
    }

    await fetchGallery();
    return club;

};

export const getStudioImages = async () => {
    if (studio.length > 0) {
        return studio;
    }

    await fetchGallery();
    return studio;

};

export const getMainSliderImages = async () => {
    if (sliderImages.length > 0) {
        return sliderImages;
    }
    try {
        const response = await fetch(`${baseUrl}images/${SLIDER_GALLEY_ID}`);
        sliderImages = await response.json();
        return sliderImages;
    } catch (error) {
        console.error('[galleryStore] error:', error);
    }
};

export const getRazvivalochkaImages = async () => {
    if (razvivalochkaImages.length > 0) {
        return razvivalochkaImages;
    }
    try {
        const response = await fetch(`${baseUrl}images/${SLIDER_RAZVIVALOCHKA}`);
        razvivalochkaImages = await response.json();
        return razvivalochkaImages;
    } catch (error) {
        console.error('[galleryStore] error:', error);
    }
};