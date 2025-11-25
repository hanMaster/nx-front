import BreadCrumbs from '@/components/breadcrums';
import HowToConnect from '@/components/how-to-connect';
import ServiceImages from '@/components/ServiceImages';
import Image from 'next/image';
import { getShow } from '../data/services';

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

            <div>
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
                <ServiceImages items={data} alt="show" />
            </div>
            <HowToConnect />
        </main>
    );
}
