import HowToConnect from '@/components/how-to-connect';
import { getAdditions } from '../data/services';
import BreadCrumbs from '@/components/breadcrums';
import ServicePageClient from '@/components/ServicePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Дополнения',
    description: 'Дополнительные услуги для детских праздников в Находке - декор, фотозоны, сладкая вата, попкорн, украшения зала. Создайте незабываемую атмосферу праздника с важными мелочами.',
    alternates: {
        canonical: 'https://igra-em.ru/additions',
    },
    openGraph: {
        title: 'Дополнения к детским праздникам в Находке - декор и услуги',
        description: 'Важные мелочи для праздника: декор, фотозоны, сладкая вата, попкорн, украшения.',
        url: 'https://igra-em.ru/additions',
    },
};

export default async function AdditionsPage() {
    const data = await getAdditions();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Дополнения" />

            <div>
                <p className="text-green text-center mb-10 px-2">
                    Вещи, создающие моменты, которые хочется повторять снова и
                    снова! Этакие ВАЖНЫЕ мелочи!
                </p>

                <ServicePageClient services={data} alt="дополнения" path="additions" />
            </div>
            <HowToConnect />
        </main>
    );
}
