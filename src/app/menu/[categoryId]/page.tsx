import {
    getCategories,
    getCategoryById,
    getItemsByCategory,
} from "@/app/data/menu";
import CartButton from "@/components/cart/CartButton";
import CategoryChanger from "@/components/CategoryChanger";
import MakeOrderSimple from "@/components/make-order-simple";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export async function generateMetadata(
    props: PageProps<"/menu/[categoryId]">,
): Promise<Metadata> {
    const { categoryId } = await props.params;
    const category = await getCategoryById(+categoryId);

    if (!category) {
        return {
            title: "Категория не найдена",
        };
    }

    return {
        title: category.title,
        description: `Заказать ${category.title.toLowerCase()} для детского праздника в Находке. Доставка кейтеринга в студии Давай поиграем и Характер.`,
        alternates: {
            canonical: `https://igra-em.ru/menu/${categoryId}`,
        },
        openGraph: {
            title: `${category.title} - Меню`,
            description: `Заказать ${category.title.toLowerCase()} для детского праздника в Находке`,
            images: [category.imageUrl],
        },
    };
}

export default async function CategoryPage(
    props: PageProps<"/menu/[categoryId]">,
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
            <BreadcrumbSchema
                items={[
                    {
                        name: "Главная",
                        url: "https://igra-em.ru/",
                    },
                    {
                        name: "Меню",
                        url: "https://igra-em.ru/menu",
                    },
                    {
                        name: category.title,
                        url: `https://igra-em.ru/menu/${categoryId}`,
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
                            <div className="category-item-card">
                                <Link href={`/menu/${categoryId}/${item.id}`}>
                                    <Image
                                        width={406}
                                        height={350}
                                        src={
                                            item.imageJpg.includes("selcdn")
                                                ? item.imageJpg
                                                : `/${item.imageJpg}`
                                        }
                                        alt={`${item.title} - ${category.title} для детского праздника с доставкой в Находке`}
                                        className="rounded-tr-[50px] rounded-bl-[50px] cursor-pointer"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 20vw"
                                        loading="lazy"
                                    />
                                </Link>

                                <h5 className="menu-item-title text-center text-green flex-1 cursor-pointer">
                                    {item.title}
                                </h5>

                                <p className="text-center font-avenir font-normal text-lg text-green cursor-pointer">
                                    Цена: {item.price} руб.
                                </p>

                                <CartButton
                                    item={{
                                        id: item.id,
                                        title: item.title,
                                        price: item.price,
                                        imageJpg: item.imageJpg,
                                        minOrder: item.minOrder,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            <MakeOrderSimple />
        </main>
    );
}
