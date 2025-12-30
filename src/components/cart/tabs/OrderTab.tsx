"use client";

import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import Link from "next/link";

export default function OrderTab() {
    const [showOrderBtn, setShowOrderBtn] = useState(true);
    const [memConfirmed, setMemConfirmed] = useState(false);

    const { sendOrder, order, hallsInvalid, orderText, setActiveTab } =
        useCart();

    const handleMakeOrder = () => {
        setShowOrderBtn(false);
        setMemConfirmed(false);
        sendOrder();
        setTimeout(() => {
            setShowOrderBtn(true);
        }, 120000);
    };

    const lines = orderText();

    return (
        <div className="total py-5 md:py-[60px] md:px-[30px] md:rounded-b-[40px] text-2xl bg-[rgba(255,255,255,0.45)]">
            <div className="flex flex-col items-center gap-5 md:gap-[105px] justify-end">
                <div className="text-center">
                    {lines.map((line, index) => {
                        if (line.length > 2) {
                            return (
                                <p
                                    key={index}
                                    className="font-['AvenirNextCyr'] font-[750] text-xl text-left"
                                >
                                    {line}
                                </p>
                            );
                        } else {
                            return <br key={index} />;
                        }
                    })}
                </div>
                <button
                    className="custom__btn border border-brown disabled:border-0 disabled:bg-transparent disabled:opacity-60"
                    onClick={() => setActiveTab(4)}
                >
                    Назад
                </button>
            </div>
            {showOrderBtn ? (
                <div className="text-center">
                    <p className="mt-6 text-center">
                        <input
                            type="checkbox"
                            checked={memConfirmed}
                            onChange={(e) => setMemConfirmed(e.target.checked)}
                        />
                        &nbsp;Устанавливая галочку, <br />
                        Вы подтверждаете,
                        <br />
                        что ознакомились с нашими <br />
                        <Link
                            href="/mem"
                            className="custom__btn border border-brown"
                        >
                            <span className="mem"> Правилами </span>
                        </Link>
                    </p>
                    <br />
                    <br />
                    <button
                        className="custom__btn border border-brown bg-brown disabled:bg-grey disabled:border-grey disabled:text-gray-200"
                        onClick={handleMakeOrder}
                        disabled={hallsInvalid() || !memConfirmed}
                    >
                        Сформировать заказ
                    </button>
                </div>
            ) : (
                <p className="mt-6 text-center">
                    <a
                        href={`https://t.me/oxana_a_18?text=${encodeURIComponent(`Заявка: ${order.code}\n${orderText().join("\n")}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="custom__btn border border-brown"
                    >
                        Отправить заказ
                    </a>
                </p>
            )}
        </div>
    );
}
