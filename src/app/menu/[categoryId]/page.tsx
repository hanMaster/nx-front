import {
    getCategories,
    getCategoryById,
    getItemsByCategory,
} from '@/app/data/menu';
import CartButton from '@/components/cart/CartButton';
import CategoryChanger from '@/components/CategoryChanger';
import MakeOrderSimple from '@/components/make-order-simple';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CategoryPage(
    props: PageProps<'/menu/[categoryId]'>
) {
    const { categoryId } = await props.params;
    const category = await getCategoryById(+categoryId);
    const categories = await getCategories();

    const items = await getItemsByCategory(+categoryId);

    if (!category) {
        return notFound();
    }

    return (
        <main className="md:container md:m-auto pt-[85px]">
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
                            <span className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/']">
                                {category.title}
                            </span>
                        </li>
                    </ol>
                </section>
            </div>

            <CategoryChanger
                categories={categories}
                activeCategoryId={+categoryId}
            />

            <div className="flex flex-wrap">
                {items &&
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="block w-full md:w-1/2 lg:w-1/3 2xl:w-1/5 py-3 px-2 md:p-3"
                        >
                            <Link
                                href={`/menu/${categoryId}/${item.id}`}
                                className="category-item-card"
                            >
                                <Image
                                    width={406}
                                    height={350}
                                    src={item.imageJpg}
                                    alt={item.title}
                                    className="rounded-tr-[50px] rounded-bl-[50px]"
                                />

                                <h5 className="menu-item-title text-center text-green flex-1">
                                    {item.title}
                                </h5>

                                <p className="inline-block text-center font-['AvenirNextCyr'] font-normal text-lg text-green">
                                    Цена: {item.price} руб.
                                </p>
                                <div className="flex items-center gap-[30px]">
                                    <CartButton />
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>

            <MakeOrderSimple />
        </main>
    );
}
