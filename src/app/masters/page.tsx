import HowToConnect from '@/components/how-to-connect';
import { getMasters } from '../data/services';
import BreadCrumbs from '@/components/breadcrums';
import ServicePageClient from '@/components/ServicePageClient';

export default async function MastersPage() {
    const data = await getMasters();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Мастер-классы" />

            <div>
                <p className="px-4 md:px-20 text-xs md:text-lg lg:text-xl text-center text-green text mb-10">
                    Итоговая стоимость зависит от количества участников и
                    приготовленных изделий
                </p>
                <ServicePageClient services={data} alt="master-class" path="masters" />
            </div>
            <HowToConnect />
        </main>
    );
}
