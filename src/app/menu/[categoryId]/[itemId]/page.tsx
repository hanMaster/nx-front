import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryById, getItemById } from '@/app/data/menu';
import MakeOrderSimple from '@/components/make-order-simple';
import CategoryChanger from '@/components/CategoryChanger';
import CartButton from '@/components/cart/CartButton';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';

export async function generateMetadata(
    props: PageProps<'/menu/[categoryId]/[itemId]'>
): Promise<Metadata> {
    const { categoryId, itemId } = await props.params;
    const category = await getCategoryById(+categoryId);
    const item = await getItemById(+itemId);

    if (!category || !item) {
        return {
            title: 'Товар не найден',
        };
    }

    return {
        title: item.title,
        description: item.description || `${item.title} из категории ${category.title} для детского праздника в Находке. Цена: ${item.price} руб.`,
        alternates: {
            canonical: `https://igra-em.ru/menu/${categoryId}/${itemId}`,
        },
        openGraph: {
            title: `${item.title} - ${category.title}`,
            description: item.description || `${item.title} для детского праздника в Находке`,
            images: [item.imageJpg],
        },
    };
}

export default async function ItemPage(
    props: PageProps<'/menu/[categoryId]/[itemId]'>
) {
    const { categoryId, itemId } = await props.params;
    const category = await getCategoryById(+categoryId);
    const categories = await getCategories();
    const item = await getItemById(+itemId);

    if (!category) {
        return notFound();
    }

    return (
        <main className="md:container md:m-auto pt-[85px]">
            <BreadcrumbSchema
                items={[
                    {
                        name: 'Главная',
                        url: 'https://igra-em.ru/',
                    },
                    {
                        name: 'Меню',
                        url: 'https://igra-em.ru/menu',
                    },
                    {
                        name: category.title,
                        url: `https://igra-em.ru/menu/${category.id}`,
                    },
                    {
                        name: item.title,
                        url: `https://igra-em.ru/menu/${categoryId}/${itemId}`,
                    },
                ]}
            />
            <div className="bg-grey sm:bg-inherit">
                <section className="py-5 lg:py-[30px] bg-grey-light m-0">
                    <ol className="flex flex-wrap text-xs leading-4 text-green md:text-lg lg:text-xl lg:leading-5">
                        <li>
                            <Link className="opacity-[0.75]" href="/">
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/']"
                                href="/menu"
                            >
                                Меню
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/menu/${category.id}`}
                                className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/'] cursor-pointer"
                            >
                                {category.title}
                            </Link>
                        </li>
                        <li>
                            <span className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/']">
                                {item.title}
                            </span>
                        </li>
                    </ol>
                </section>

                <CategoryChanger
                    categories={categories}
                    activeCategoryId={+categoryId}
                />

                <section>
                    <div className="item-detailed-card">
                        <div className="flex flex-col md:w-[50%]">
                            <Image
                                width={406}
                                height={350}
                                src={item.imageJpg}
                                alt={`${item.title} - ${category.title} для детского праздника с доставкой в Находке, цена ${item.price} руб.`}
                                className="w-full flex-1 h-auto rounded-tr-[100px] rounded-bl-[100px] object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                            <p className="mb-[30px] mt-[30px] text text-center md:text-left">
                                Вес: {item.portionWeightGrams} г
                            </p>
                            <table className="text">
                                <tbody>
                                    <tr>
                                        <td>Калории: {item.energy}</td>
                                        <td>Белки: {item.proteins}</td>
                                    </tr>
                                    <tr>
                                        <td>Жиры: {item.fats}</td>
                                        <td>Углеводы: {item.carbs}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col md:w-[50%] justify-between text-center md:text-left">
                            <div>
                                <h1 className="text-xl md:text-4xl font-manege mb-5 md:mb-[30px]">
                                    {item.title}
                                </h1>
                                <p className="text-xl mb-[30px] font-bold">
                                    Цена: {item.price} руб.
                                </p>
                                <p className="text-base mb-[30px]">
                                    {item.description
                                        ? item.description
                                        : 'Это очень вкусно! Рекомендуем попробовать!'}
                                </p>
                            </div>
                            <CartButton
                                item={{
                                    id: item.id,
                                    title: item.title,
                                    price: item.price,
                                    imageWebp: item.imageWebp,
                                    minOrder: item.minOrder
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
            <MakeOrderSimple />
            <ProductSchema
                name={item.title}
                description={item.description || `${item.title} из категории ${category.title} для детского праздника в Находке`}
                image={`https://igra-em.ru${item.imageJpg}`}
                price={item.price}
            />
        </main>
    );
}
