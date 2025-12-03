import BreadCrumbs from '@/components/breadcrums';
import CartComponent from '@/components/cart/CartComponent';
import MakeOrderSimple from '@/components/make-order-simple';
import { SearchParams } from 'next/dist/server/request/search-params';

export default async function CartPage({
    searchParams,
}: {
    searchParams?: Promise<SearchParams>;
}) {
    const sParams = await searchParams;
    const currentTab = Number(sParams?.tab) || 1;
    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <div className="flex justify-between">
                <BreadCrumbs pageTitle="Корзина" />
                <button className="h-15 cursor-pointer">
                    Очистить корзину
                </button>
            </div>
            <CartComponent tabParam={currentTab} />
            <MakeOrderSimple />
        </main>
    );
}
