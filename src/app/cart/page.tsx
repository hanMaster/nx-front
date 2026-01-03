"use client";

import { useCart } from "@/providers/CartProvider";
import HallTab from "@/components/cart/tabs/HallTab";
import AnketaTab from "@/components/cart/tabs/AnketaTab";
import ShowTab from "@/components/cart/tabs/ShowTab";
import FoodTab from "@/components/cart/tabs/FoodTab";
import OrderTab from "@/components/cart/tabs/OrderTab";
import Link from "next/link";

export default function CartPage() {
    const { cleanCart, getActiveTab, setActiveTab, tabClick } = useCart();

    const emptyCart = () => {
        cleanCart();
        setActiveTab(1);
    };

    const activeTab = getActiveTab();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <section className="py-5 lg:py-[30px] bg-grey-light m-0 bg-[rgba(255,255,255,0.45)] md:bg-[unset] flex items-center flex-row justify-between text-xs leading-4 text-green md:text-lg lg:text-xl lg:leading-5">
                <ol className="flex">
                    <li>
                        <Link className="opacity-[0.75]" href="/">
                            Главная
                        </Link>
                    </li>
                    <li>
                        <span className="opacity-1 before:mx-3 before:inline-block before:content-['/']">
                            Корзина
                        </span>
                    </li>
                </ol>
                <button onClick={emptyCart}>Очистить корзину</button>
            </section>

            <section className="flex flex-col lg:flex-row md:gap-[25px] items-start text-green">
                <div className="w-full lg:w-2/3 md:rounded-[40px] md:border border-[rgba(92,112,78,0.25)] md:border-t-0">
                    <div className="tab-headers bg-[rgba(255,255,255,0.45)] md:bg-[unset]">
                        <div
                            className={`tab-header rounded-t-[20px] md:rounded-t-[40px] cursor-pointer ${
                                activeTab === 1 ? "active-tab" : ""
                            }`}
                            onClick={() => tabClick(1)}
                        >
                            Зал
                        </div>
                        <div
                            className={`tab-header rounded-t-[20px] md:rounded-t-[40px] cursor-pointer ${
                                activeTab === 2 ? "active-tab" : ""
                            }`}
                            onClick={() => tabClick(2)}
                        >
                            Анкета
                        </div>
                        <div
                            className={`tab-header rounded-t-[20px] md:rounded-t-[40px] cursor-pointer ${
                                activeTab === 3 ? "active-tab" : ""
                            }`}
                            onClick={() => tabClick(3)}
                        >
                            Шоу
                        </div>
                        <div
                            className={`tab-header rounded-t-[20px] md:rounded-t-[40px] cursor-pointer ${
                                activeTab === 4 ? "active-tab" : ""
                            }`}
                            onClick={() => tabClick(4)}
                        >
                            Еда
                        </div>
                    </div>
                    {activeTab === 1 && <HallTab />}
                    {activeTab === 2 && <AnketaTab />}
                    {activeTab === 3 && <ShowTab />}
                    {activeTab === 4 && <FoodTab />}
                    {activeTab === 5 && <OrderTab />}
                </div>
                <div className="w-full lg:w-1/3 bg-[rgba(255,255,255,0.45)] md:rounded-[40px] md:border border-[rgba(92,112,78,0.25)] md:p-[30px] text-center md:text-left py-10 md:py-5">
                    <h4 className="font-cormorant text-2xl">
                        Возникли вопросы?
                    </h4>
                    <div className="flex flex-col items-center justify-center md:items-start font-avenir text-lg mb-[30px]">
                        <span>Пишите нам в</span>

                        <a
                            href="https://t.me/oxana_a_18"
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold flex items-center"
                        >
                            <img
                                width="48"
                                height="48"
                                src="/Telegram_Logo.svg"
                                alt="Telegram"
                            />
                            <span>&nbsp;&nbsp;Telegram</span>
                        </a>
                        <span>Мы с радостью поможем Вам сделать заказ</span>
                    </div>
                    <h4 className="font-cormorant text-2xl">Вкусно</h4>
                    <p className="font-avenir text-lg mb-[30px]">
                        Готовим только из свежих продуктов
                    </p>
                </div>
            </section>
        </main>
    );
}
