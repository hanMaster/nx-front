export default function AnketaTab() {
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
                    v-model="anketa.answer1"
                    placeholder="Укажите Ваше Имя"
                />
            </div>
            <div className="form-group w-full">
                <label htmlFor="q2">Имя именинницы(ка)</label>
                <input
                    type="text"
                    id="q2"
                    v-model="anketa.answer2"
                    placeholder="Укажите Имя именинницы(ка)"
                />
            </div>
            <div className="form-group w-full">
                <label htmlFor="q3">Сколько лет исполняется ребенку</label>
                <input
                    type="number"
                    id="q3"
                    v-model="anketa.answer3"
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
                    v-model="anketa.answer4"
                    placeholder="Укажите количество приглашенных детей"
                />
            </div>
            <div className="form-group w-full">
                <label htmlFor="q5">Количество приглашенных взрослых</label>
                <input
                    type="number"
                    min="1"
                    id="q5"
                    v-model="anketa.answer5"
                    placeholder="Укажите количество приглашенных взрослых"
                />
            </div>
            <div className="cart-nav-buttons">
                <button className="btn-prev border border-brown disabled:border-0 disabled:bg-transparent">
                    Назад
                </button>
                <button className="btn-next border border-brown disabled:border-0 disabled:bg-transparent">
                    Далее
                </button>
            </div>
        </div>
    );
}
