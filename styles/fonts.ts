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
});

export const cormorant_infant = Cormorant_Infant({
    subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
    display: 'swap',
    variable: '--font-cormorant-infant',
});

export const tenor_sans = Tenor_Sans({
    subsets: ['cyrillic'],
    display: 'swap',
    weight: "400",
    variable: '--font-tenor-sans',
});