import type { Metadata } from "next";
import { Toaster } from "sonner";
import { avenir, cormorant_infant, manege, tenor_sans } from "@/fonts";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import CartProvider from "@/providers/CartProvider";
import { LocalBusinessSchema } from "@/components/StructuredData";
import YandexMetrika from "@/components/YandexMetrika";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        template: "%s | Детские студии Характер и Давай поиграем",
        default:
            "Детские студии в Находке - Давай поиграем и Характер",
    },
    description:
        "Организация детских праздников, дней рождения, мастер-классов и шоу программ в студиях Давай поиграем и Характер. Кейтеринг, аренда залов, герои и аниматоры в Находке.",
    keywords: [
        "детский праздник Находка",
        "день рождения ребенка",
        "студия Давай поиграем",
        "студия Характер",
        "аниматоры Находка",
        "кейтеринг для детей",
        "мастер-класс для детей",
        "шоу программа",
        "аренда зала для праздника",
    ],
    openGraph: {
        title: "Детские студии Давай поиграем и Характер",
        description:
            "Организация незабываемых детских праздников и дней рождения в Находке",
        url: "https://kharakter.ru",
        siteName: "Характер",
        locale: "ru_RU",
        type: "website",
    },
    alternates: {
        canonical: "https://kharakter.ru",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Добавьте ваши verification коды после регистрации в консолях
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${avenir.variable} ${manege.variable} ${cormorant_infant.variable} ${tenor_sans.variable} antialiased bg-lightbrown`}
                suppressHydrationWarning
            >
                <LocalBusinessSchema
                    name="Детские студии Давай поиграем и Характер"
                    description="Организация детских праздников, дней рождения, мастер-классов и шоу программ в Находке"
                    url="https://kharakter.ru"
                    telephone="+7 (xxx) xxx-xx-xx"
                    address={{
                        streetAddress: "ул. Примерная, д. 1",
                        addressLocality: "Находка",
                        addressRegion: "Приморский край",
                        postalCode: "692900",
                        addressCountry: "RU",
                    }}
                    openingHours={[
                        "Mo-Su 10:00-20:00",
                    ]}
                    priceRange="$$"
                />
                <CartProvider>
                    <Header />
                    <Toaster position="top-center" />
                    {children}
                    <Footer />
                </CartProvider>
                <YandexMetrika yandexId={process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || ''} />
            </body>
        </html>
    );
}
