import { Tenor_Sans, Cormorant_Infant } from 'next/font/google';
import localFont from "next/font/local";

// Локальные шрифты
export const avenir = localFont({
    src: [
        {
            path: './fonts/AvenirNextCyr-Regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/AvenirNextCyr-Medium.woff',
            weight: '500',
            style: 'normal',
        },
    ],
    variable: '--font-avenir',
    preload: true, // Preload main body font for better performance
    display: 'swap',
});

export const manege = localFont({
    src: [
        {
            path: './fonts/ManegeDemo-Light.woff',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-manege-demo',
    display: 'swap',
});

export const cormorant_infant = Cormorant_Infant({
    subsets: ['cyrillic'], // Only load cyrillic subset for Russian content
    display: 'swap',
    weight: ['400', '600', '700'], // Only load needed weights to reduce bundle size
    variable: '--font-cormorant-infant',
    preload: true, // Preload as it's used in many visible UI elements
});

export const tenor_sans = Tenor_Sans({
    subsets: ['cyrillic'],
    display: 'swap',
    weight: "400",
    variable: '--font-tenor-sans',
});