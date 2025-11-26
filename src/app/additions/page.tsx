import HowToConnect from '@/components/how-to-connect';
import Image from 'next/image';
import { getAdditions } from '../data/services';
import ServiceImages from '@/components/ServiceImages';
import BreadCrumbs from '@/components/breadcrums';

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
                <ServiceImages items={data} alt="дополнения" path="additions" />
            </div>
            <HowToConnect />
        </main>
    );
}
