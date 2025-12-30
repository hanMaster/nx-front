"use client";

import { useCart } from "@/providers/CartProvider";
import DurationAdjust from "../DurationAdjust";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import dayjs from "dayjs";

export default function HallTab() {
    const {
        order,
        unsetStudio,
        hallsInvalid,
        setActiveTab,
        hallAmount,
        updateHallDateTime,
    } = useCart();

    const amount = (hall: (typeof order.halls)[0]) => {
        return hallAmount(hall).toFixed(2);
    };

    const next = () => {
        for (const hall of order.halls) {
            const ord = dayjs(hall.dateTime);
            const today = dayjs();
            const orderHour = ord.get("hour");
            const orderMin = ord.get("minutes");

            if (
                ord.startOf("day").isSame(today.startOf("day")) ||
                ord.startOf("day").isBefore(today.startOf("day"))
            ) {
                toast("Выберите дату позднее чем сегодня");
                return;
            }
            if (orderHour < 10 || orderHour > 20) {
                toast("Время не ранее 10:00 и не позднее 20:00");
                return;
            }
            if (orderMin !== 0 && orderMin !== 30) {
                toast("Начало мероприятия возможно в 00 или в 30 минут");
                return;
            }
        }
        setActiveTab(2);
    };

    return (
        <div className="p-[30px] bg-[rgba(255,255,255,0.45)] md:rounded-b-[40px]">
            {order.halls.length > 0 && (
                <div className="mb-6">
                    {order.halls.map((i) => (
                        <div key={i.id}>
                            <div className="flex gap-3.5 md:gap-6 py-5 md:px-5 md:py-[30px]">
                                <Image
                                    src={i.img}
                                    alt={i.name}
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
                                        onClick={() => unsetStudio(i.id)}
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

                                    <h2 className="font-['ManegeDemo'] text-lg font-light md:text-4xl">
                                        {i.name}
                                    </h2>
                                    <div className="flex gap-1 md:gap-[60px] items-center">
                                        <p className="font-[750] text-sm md:text-xl font-['AvenirNextCyr']">
                                            {amount(i)} руб.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-12 border-b border-[rgba(92,112,78,0.25)]">
                                <div className="form-group w-full">
                                    <label htmlFor={`q1-${i.id}`}>
                                        Желаемая ДАТА и ВРЕМЯ начала
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id={`q1-${i.id}`}
                                        value={i.dateTime}
                                        onChange={(e) =>
                                            updateHallDateTime(
                                                i.id,
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label>Длительность мероприятия</label>
                                    <DurationAdjust hall={i} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="centered-buttons">
                <Link
                    href="/booking"
                    className="custom__btn border border-brown"
                >
                    Резерв студии
                </Link>
                <button
                    className="custom__btn border border-brown disabled:border-0 disabled:bg-transparent"
                    disabled={hallsInvalid()}
                    onClick={next}
                >
                    Далее
                </button>
            </div>
        </div>
    );
}
