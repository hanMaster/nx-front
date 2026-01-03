"use client";

import { useCart } from "@/providers/CartProvider";
import Link from "next/link";
import Image from "next/image";

export default function ShowTab() {
    const { order, removeServiceFromCart, setActiveTab, anketaInvalid } =
        useCart();

    return (
        <div className="p-[30px] bg-[rgba(255,255,255,0.45)] md:rounded-b-[40px]">
            <div className="p-4 text-center flex flex-col items-center md:flex-row gap-1">
                <Link
                    href="/masters"
                    className="custom__btn border border-brown"
                >
                    Мастер-класс
                </Link>
                <Link
                    href="/heroes"
                    className="custom__btn border border-brown"
                >
                    Герои
                </Link>
                <Link href="/show" className="custom__btn border border-brown">
                    Шоу
                </Link>
                <Link
                    href="/additions"
                    className="custom__btn border border-brown"
                >
                    Дополнения
                </Link>
            </div>
            {order.show.length > 0 && (
                <div>
                    {order.show.map((i) => (
                        <div
                            key={i.id}
                            className="border-b border-[rgba(92,112,78,0.25)] flex gap-3.5 md:gap-6 py-5 mb-6 md:px-5 md:py-[30px]"
                        >
                            <Image
                                src={`/${i.mainPicture}` || ""}
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
                                    onClick={() => removeServiceFromCart(i.id)}
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
                                    <p className="font-[750] text-sm md:text-xl font-avenir">
                                        {i.duration} мин
                                    </p>
                                    <p className="font-[750] text-sm md:text-xl font-avenir">
                                        {i.price} руб.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-nav-buttons">
                <button
                    className="btn-prev border border-brown disabled:border-0 disabled:bg-transparent"
                    onClick={() => setActiveTab(2)}
                >
                    Назад
                </button>
                <button
                    className="btn-next border border-brown disabled:border-0 disabled:bg-transparent"
                    onClick={() => setActiveTab(4)}
                    disabled={anketaInvalid()}
                >
                    Далее
                </button>
            </div>
        </div>
    );
}
