'use client';

import { useCart } from '@/providers/CartProvider';

export default function AnketaTab() {
    const { order, anketaInvalid, setActiveTab, updateAnketa } = useCart();
    const anketa = order.anketa;

    return (
        <div className="p-[30px] bg-[rgba(255,255,255,0.45)] md:rounded-b-[40px]">
            <h2 className="text-3xl text-center mb-4">
                Ответьте пожалуйста на вопросы анкеты
            </h2>
            <div className="form-group w-full">
                <label htmlFor="q1">Ваше Имя</label>
                <input
                    type="text"
                    id="q1"
                    value={anketa.answer1}
                    onChange={(e) => updateAnketa('answer1', e.target.value)}
                    placeholder="Укажите Ваше Имя"
                />
            </div>
            <div className="form-group w-full">
                <label htmlFor="q2">Имя именинницы(ка)</label>
                <input
                    type="text"
                    id="q2"
                    value={anketa.answer2}
                    onChange={(e) => updateAnketa('answer2', e.target.value)}
                    placeholder="Укажите Имя именинницы(ка)"
                />
            </div>
            <div className="form-group w-full">
                <label htmlFor="q3">Сколько лет исполняется ребенку</label>
                <input
                    type="number"
                    id="q3"
                    value={anketa.answer3}
                    onChange={(e) => updateAnketa('answer3', e.target.value)}
                    placeholder="Укажите возраст ребенка"
                />
            </div>
            <p className="text-red-400">
                Если количество гостей превысит 20 человек, в счет добавится
                услуга дополнительного администратора
            </p>
            <div className="form-group w-full">
                <label htmlFor="q4">Количество приглашенных детей</label>
                <input
                    type="number"
                    min="1"
                    id="q4"
                    value={anketa.answer4}
                    onChange={(e) => updateAnketa('answer4', e.target.value)}
                    placeholder="Укажите количество приглашенных детей"
                />
            </div>
            <div className="form-group w-full">
                <label htmlFor="q5">Количество приглашенных взрослых</label>
                <input
                    type="number"
                    min="1"
                    id="q5"
                    value={anketa.answer5}
                    onChange={(e) => updateAnketa('answer5', e.target.value)}
                    placeholder="Укажите количество приглашенных взрослых"
                />
            </div>
            <div className="cart-nav-buttons">
                <button
                    className="btn-prev border border-brown disabled:border-0 disabled:bg-transparent"
                    onClick={() => setActiveTab(1)}
                >
                    Назад
                </button>
                <button
                    className="btn-next border border-brown disabled:border-0 disabled:bg-transparent"
                    disabled={anketaInvalid()}
                    onClick={() => setActiveTab(3)}
                >
                    Далее
                </button>
            </div>
        </div>
    );
}
