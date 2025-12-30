import BreadCrumbs from '@/components/breadcrums';
import HowToConnect from '@/components/how-to-connect';
import Image from 'next/image';
import { getClubImages } from '../data/gallery';
import ChooseHall from '@/components/ChooseHall';

export default async function DavaiPoigraemPage() {
    const images = await getClubImages();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Давай поиграем" />

            <section className="py-5 lg:py-[30px] px-2.5 text-green">
                <h2 className="subtitle2 mb-4">
                    Резерв клуба &quot;Давай поиграем&quot;
                </h2>
                <p>
                    Проведение мероприятия в моем клубе обойдется в 7000 руб/час
                </p>
                <p>в стоимость включено использование:</p>
                <p>
                    ✅ музыкального и светового оборудования
                    <br />
                    ✅ посуда, услуги организации приема пищи, уборка
                    <br />
                    ✅ игрушки, домики и лазалки
                    <br />
                    ✅ сенсорная песочница из риса
                    <br />
                    ✅ проектор (караоке, Джаст дэнс, ваши видео и фото)
                    <br />
                    ✅ качели, гамаки, поролоновые пуфы, батут
                    <br />
                    ✅ поролоновая яма
                    <br />
                    ✅ чистый теплый мЯгкий пол, ЧИСТЫЙ сан узел
                    <br />
                    ✅ бытовые приборы (чайник, поттер, духовка, микроволновка,
                    холодильник)
                    <br />
                    ✅ баннерные футажи ( для фото без декора)
                    <br />
                    ✅ Гарантированная дезинфекция всех поверхностей, сан узла,
                    воздуха перед КАЖДЫМ Визитом гостей
                    <br />✅ Работа сопровождающего, который встретит, будет с
                    вами на протяжении всего мероприятия, поможет в решении
                    ЛЮБОГО ВОПРОСА, рассчитает и проводит Вас и ваших гостей.
                </p>
                <br />
                <p>
                    Вместимость зала с максимальной рассадкой - 14 детей. <br />
                    За каждого следующего гостя (ребенка младше 14 лет) сверх
                    заявленных 14 детей оплата - 500 руб. <br />
                    Вы можете зарезервировать любое количество времени: 2 или
                    2,5 или 3 часа в рамках отведенных промежутков. При
                    необходимости час делится по 15 минут.
                    <br />✅ А так же зарезервировать можно оба зала
                    одновременно
                </p>
                <br />

                <h2 className="subtitle2 mb-4">
                    Для резерва зала доступны три интервала времени:
                    <br />
                    <br />
                    Утро с 9 до 13:30
                    <br />
                    Обед с 14:00 до 17:00
                    <br />
                    Вечер с 17:30 до 21:30
                </h2>
                <p className="text-sm text-center mb-5">
                    В перерывах производится уборка в зале
                </p>
                <ChooseHall hallId={1} />
            </section>

            <section className="lg:p-0">
                <h2 className="subtitle2 mb-4">
                    Фото клуба &quot;Давай поиграем&quot;
                </h2>
                <div className="gallery-images">
                    {images.map((i, index) => (
                        <div key={i.id}>
                            <Image
                                key={i.filename}
                                width={406}
                                height={350}
                                src={`/${i.filename}`}
                                alt={`Интерьер детского клуба Давай поиграем в Находке - игровая зона для детских праздников, фото ${index + 1}`}
                                className="rounded-2xl"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <HowToConnect />
        </main>
    );
}
