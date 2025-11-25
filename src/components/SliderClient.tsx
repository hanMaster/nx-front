'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { SliderImage } from '@/app/data/gallery';
import Image from 'next/image';

export default function SliderClient({ images }: { images: SliderImage[] }) {
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
            {images.map((i) => (
                <SwiperSlide key={i.id}>
                    <Image
                        key={i.filename}
                        width={406}
                        height={350}
                        src={`/${i.filename}`}
                        alt={i.filename}
                        className="rounded-2xl"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
