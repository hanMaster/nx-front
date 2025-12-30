import { getMainSliderImages } from '@/app/data/gallery';
import SliderClient from './SliderClient';

export default async function SliderHome() {
    const images = await getMainSliderImages();

    if (images && images?.length) {
        return (
            <SliderClient
                images={images}
                altPrefix="Фото детских праздников и дней рождения"
            />
        );
    }
}
