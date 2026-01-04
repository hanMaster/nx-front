import BreadCrumbs from '@/components/breadcrums';
import HowToConnect from '@/components/how-to-connect';
import { getShow } from '../data/services';
import ServicePageClient from '@/components/ServicePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Шоу программы',
    description: 'Шоу программы для детских праздников в Находке - слайм-шоу, научное шоу, мыльные пузыри, фокусы. Длительность 30-60 минут. Дополнение к программе или самостоятельное мероприятие.',
    alternates: {
        canonical: 'https://igra-em.ru/show',
    },
    openGraph: {
        title: 'Шоу программы для детских праздников в Находке',
        description: 'Зрелищные шоу программы: научное шоу, слайм-шоу, мыльные пузыри, фокусы. 30-60 минут.',
        url: 'https://igra-em.ru/show',
    },
};

export default async function ShowPage() {
    const data = await getShow();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Шоу" />
            <p className="text-green text-center mb-10 px-2">
                Шоу может быть самостоятельным элементом мероприятия или
                дополнять абсолютно любую программу! Состав вашего праздника
                определяете Вы исходя из предпочтений и бюджета. Обратите
                внимание, что некоторые виды шоу рекомендованы к заказу с
                определенного возраста, например Слайм-шоу. Примерная
                длительность всех видов шоу от 30 минут до одного часа.
            </p>

            <ServicePageClient services={data} alt="show" path="show" />
            <HowToConnect />
        </main>
    );
}
