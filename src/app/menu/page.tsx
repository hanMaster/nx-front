import BreadCrumbs from '@/components/breadcrums';
import MakeOrderSimple from '@/components/make-order-simple';
import { getCategories } from '../data/menu';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Меню',
    description: 'Кейтеринг для детских праздников в Находке - доставка готовых блюд в студии Давай поиграем и Характер. Закуски, горячие блюда, десерты, напитки. Заказ еды для детского дня рождения.',
    alternates: {
        canonical: 'https://igra-em.ru/menu',
    },
    openGraph: {
        title: 'Меню кейтеринга для детских праздников в Находке',
        description: 'Разнообразное меню для детских мероприятий. Закуски, горячее, десерты, напитки с доставкой.',
        url: 'https://igra-em.ru/menu',
    },
};

export default async function MenuPage() {
    const categories = await getCategories();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Меню" />

            <div className="flex flex-wrap">
                {categories &&
                    categories.map((c) => (
                        <Link
                            href={`/menu/${c.id}`}
                            key={c.id}
                            className="block w-full md:w-1/2 lg:w-1/3 2xl:w-1/5 py-3 px-2 md:p-3"
                        >
                            <div className="rounded-[40px] p-[30px] bg-white border border-[rgba(92,112,78,0.25)] hover:shadow-lg h-full flex flex-col cursor-pointer">
                                <Image
                                    width={406}
                                    height={350}
                                    src={`/${c.imageUrl}`}
                                    alt={`${c.title} - меню для детского праздника с доставкой в Находке`}
                                    className="rounded-tr-[100px] md:rounded-tr-[50%] rounded-bl-[100px] md:rounded-bl-[50%] w-full flex-1"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 20vw"
                                    loading="lazy"
                                />

                                <div className="mt-5 md:mt-[30px]">
                                    <h5 className="subtitle2 text-center">
                                        {c.title}
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>

            <MakeOrderSimple />
        </main>
    );
}
