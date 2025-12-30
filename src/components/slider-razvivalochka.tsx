import { getRazvivalochkaImages } from '@/app/data/gallery';
import SliderClient from './SliderClient';

export default async function SliderRazvivalochka() {
    const images = await getRazvivalochkaImages();

    if (images && images?.length) {
        return (
            <SliderClient
                images={images}
                altPrefix="Фото развивающих занятий Развивалочкаnhk"
            />
        );
    }
}
