'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
        <div className="slider-container">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                loop={images.length > 1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                }}
                className="mySwiper"
            >
                {images.map((i, index) => (
                    <SwiperSlide key={i.id}>
                        <Image
                            width={406}
                            height={350}
                            src={`/${i.filename}`}
                            alt={`${altPrefix} в студиях Давай поиграем и Характер в Находке - фото ${index + 1}`}
                            className="rounded-2xl w-full h-auto object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
