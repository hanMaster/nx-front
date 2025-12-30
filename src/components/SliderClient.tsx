'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { SliderImage } from '@/app/data/gallery';
import Image from 'next/image';

export default function SliderClient({
    images,
    altPrefix = "Фото детских праздников"
}: {
    images: SliderImage[];
    altPrefix?: string;
}) {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 3,
                },
            }}
        >
            {images.map((i, index) => (
                <SwiperSlide key={i.id}>
                    <Image
                        key={i.filename}
                        width={406}
                        height={350}
                        src={`/${i.filename}`}
                        alt={`${altPrefix} в студиях Давай поиграем и Характер в Находке - фото ${index + 1}`}
                        className="rounded-2xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
