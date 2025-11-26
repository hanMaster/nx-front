import HowToConnect from '@/components/how-to-connect';
import Image from 'next/image';
import { getHeroes } from '../data/services';
import ServiceImages from '@/components/ServiceImages';
import BreadCrumbs from '@/components/breadcrums';

export default async function HeroesPage() {
    const data = await getHeroes();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Герои и программы" />

            <div>
                <h2 className="subtitle2">Аниматоры/Ведущие и Программы</h2>

                <p className="px-4 md:px-20 text-xs md:text-lg lg:text-xl text-center text-green text mb-10">
                    в чем разница?
                    <br />
                </p>
                <p className="px-4 md:px-20 text-xs md:text-lg lg:text-xl text-green text mb-10">
                    <strong>1. Программа</strong> – это полный комплект услуг,
                    который подобран максимально гармонично и интересно для всех
                    гостей мероприятия, вы выбираете зал, продолжительность и
                    тему, а мы делаем абсолютно ВСЕ остальное! Заказ программ
                    возможен ТОЛЬКО в Давай поиграем и Характере. На выезд
                    стоимость программы умножайте на х2 и только после
                    предварительного согласования локации. Стоимость программы
                    НЕ включает в себя резерв.
                    <br />
                    <br />
                    <strong>2. Ведущий</strong> - предлагает игры на любую
                    тематику, работает без костюма персонажа, в паре с диджеем и
                    комплектом аппаратуры, стоимость оговаривается отдельно от
                    10000 руб.
                    <br />
                    <br />
                    <span>
                        <strong>3. Аниматор</strong> - придерживается сценария,
                        соответствующего его образу.
                    </span>
                    <br />
                    <br />
                    10 детей - стандарт на одного аниматора (каждый следующий
                    ребёнок +600 руб) <br />
                    С 14 го ребенка необходимо заказывать 2 аниматора.
                    <br />
                    <br />
                    <strong>Cтоимость работы аниматоров и ведущих:</strong>
                    <br />
                    6000 руб/человек/час + 1000 руб работа в другой локации
                    кроме Ленинской 20, после согласования такой возможности +
                    транспортные расходы в зависимости от удаленности (по тарифу
                    такси туда и обратно до Ленинской 20).
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
                <ServiceImages items={data} alt="hero" path="heroes" />
            </div>
            <HowToConnect />
        </main>
    );
}
