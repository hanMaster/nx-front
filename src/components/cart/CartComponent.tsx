'use client';

import Image from 'next/image';
import AnketaTab from '../tabs/AnketaTab';
import FoodTab from '../tabs/FoodTab';
import HallTab from '../tabs/HallTab';
import OrderTab from '../tabs/OrderTab';
import ShowTab from '../tabs/ShowTab';
import { useState } from 'react';

export default function CartComponent({ tabParam }: { tabParam: number }) {
    const [tab, setTab] = useState<number>(tabParam);
    return (
        <section className="flex flex-col lg:flex-row md:gap-[25px] items-start text-green">
            <div className="w-full lg:w-2/3 md:rounded-[40px] md:border border-[rgba(92,112,78,0.25)] md:border-t-0">
                <div className="flex w-full bg-[rgba(255,255,255,0.45)] md:bg-[unset]">
                    <div
                        className={
                            tab == 1 ? 'tab-header active-tab' : 'tab-header'
                        }
                    >
                        Зал
                    </div>
                    <div
                        className={
                            tab == 2 ? 'tab-header active-tab' : 'tab-header'
                        }
                    >
                        Анкета
                    </div>
                    <div
                        className={
                            tab == 3 ? 'tab-header active-tab' : 'tab-header'
                        }
                    >
                        Шоу
                    </div>
                    <div
                        className={
                            tab == 4 ? 'tab-header active-tab' : 'tab-header'
                        }
                    >
                        Еда
                    </div>
                </div>
                {tab == 1 && <HallTab />}
                {tab == 2 && <AnketaTab />}
                {tab == 3 && <ShowTab />}
                {tab == 4 && <FoodTab />}
                {tab == 5 && <OrderTab />}
            </div>
            <div className="w-full lg:w-1/3 bg-[rgba(255,255,255,0.45)] md:rounded-[40px] md:border border-[rgba(92,112,78,0.25)] md:p-[30px] text-center md:text-left py-[40px] md:py-[20px]">
                <h4 className="font-['Cormorant_Infant'] text-2xl">
                    Возникли вопросы?
                </h4>
                <div className="flex flex-col items-center justify-center md:items-start font-['AvenirNextCyr'] text-lg mb-[30px]">
                    <span>Пишите нам на</span>

                    <a
                        href="https://wa.me/79147093888"
                        target="_blank"
                        rel="noreferrer"
                        className="underline font-bold flex items-center"
                    >
                        <Image
                            width="48"
                            height="48"
                            src="/img/WhatsApp.svg"
                            alt="WhatsApp"
                        />
                        <span>WhatsApp.</span>
                    </a>
                    <span>Мы с радостью поможем Вам сделать заказ</span>
                </div>
                <h4 className="font-['Cormorant_Infant'] text-2xl">Вкусно</h4>
                <p className="font-['AvenirNextCyr'] text-lg mb-[30px]">
                    Готовим только из свежих продуктов
                </p>
            </div>
        </section>
    );
}
