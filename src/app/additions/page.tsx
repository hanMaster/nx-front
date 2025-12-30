import HowToConnect from '@/components/how-to-connect';
import { getAdditions } from '../data/services';
import BreadCrumbs from '@/components/breadcrums';
import ServicePageClient from '@/components/ServicePageClient';

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
