import HowToConnect from '@/components/how-to-connect';
import Image from 'next/image';
import ServiceImages from '@/components/ServiceImages';
import { getMasters } from '../data/services';
import BreadCrumbs from '@/components/breadcrums';

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
                <div className="search flex text-center items-center justify-center mb-[30px]">
                    <div className="relative">
                        <Image
                            width={20}
                            height={20}
                            src="/img/search.svg"
                            alt="search"
                            className="absolute left-2.5 top-[13px]"
                        />
                        <input
                            type="text"
                            id="search"
                            className="py-2.5 ps-[30px] pe-2.5 rounded-4xl text-lightgreen border bg-white outline-lightgreen"
                        />
                    </div>
                </div>
                <ServiceImages items={data} alt="master-class" />
            </div>
            <HowToConnect />
        </main>
    );
}
