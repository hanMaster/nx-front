"use client";

import { useCart } from "@/providers/CartProvider";
import CountAdjust from "../CountAdjust";
import Link from "next/link";
import Image from "next/image";

export default function FoodTab() {
    const { order, removeFromCart, setActiveTab, anketaInvalid } = useCart();

    const total = order.food.reduce(
        (acc, item) => acc + item.price * item.count,
        0,
    );

    return (
        <div className="p-[30px] bg-[rgba(255,255,255,0.45)] md:rounded-b-[40px]">
            {order.food.length > 0 && (
                <div>
                    {order.food.map((i) => (
                        <div
                            key={i.id}
                            className="border-b border-[rgba(92,112,78,0.25)] flex gap-3.5 md:gap-6 py-5 md:px-5 md:py-[30px]"
                        >
                            <Image
                                src={
                                    i.imageJpg.includes("selcdn")
                                        ? i.imageJpg
                                        : `/${i.imageJpg}`
                                }
                                alt={i.title}
                                width={163}
                                height={172}
                                className="flex-1 w-[89px] h-[82px] md:w-[163px] md:h-[172px] rounded-[20px] md:rounded-none md:rounded-tr-[40px] md:rounded-bl-[40px] object-cover"
                            />
                            <div className="flex flex-col justify-evenly w-full relative">
                                <svg
                                    width="18"
                                    height="17"
                                    viewBox="0 0 18 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="#5C704E"
                                    className="absolute top-1 right-1 cursor-pointer hover:stroke-red-500"
                                    onClick={() => removeFromCart(i)}
                                >
                                    <line
                                        x1="1.35355"
                                        y1="0.646447"
                                        x2="17.0944"
                                        y2="16.3873"
                                    />
                                    <line
                                        x1="0.646447"
                                        y1="16.6464"
                                        x2="16.3873"
                                        y2="0.905635"
                                    />
                                </svg>

                                <h2 className="font-manege text-lg font-light md:text-4xl">
                                    {i.title}
                                </h2>
                                <div className="flex gap-1 md:gap-[60px] items-center">
                                    <CountAdjust
                                        count={i.count}
                                        id={i.id}
                                        className="max-w-[100px] md:max-w-[200px]"
                                    />
                                    <p className="font-[750] text-sm md:text-xl font-avenir">
                                        {i.price * i.count} руб.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <br />
            {total > 0 && (
                <h2 className="font-manege text-lg font-light md:text-4xl text-center">
                    Итого за еду: {total} руб.
                </h2>
            )}
            <div className="centered-buttons mt-6">
                <Link href="/menu" className="custom__btn border border-brown">
                    В меню
                </Link>
            </div>
            <div className="cart-nav-buttons">
                <button
                    className="btn-prev border border-brown disabled:border-0 disabled:bg-transparent"
                    onClick={() => setActiveTab(3)}
                >
                    Назад
                </button>
                <button
                    className="btn-next border border-brown disabled:border-0 disabled:bg-transparent"
                    onClick={() => setActiveTab(5)}
                    disabled={anketaInvalid()}
                >
                    Далее
                </button>
            </div>
        </div>
    );
}
