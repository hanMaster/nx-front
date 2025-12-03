import Link from 'next/link';

export default function HallTab() {
    return (
        <div className="p-[30px] bg-[rgba(255,255,255,0.45)] md:rounded-b-[40px]">
            <div v-if="items.length" className="mb-6">
                <div v-for="i in items">
                    <div className="flex gap-3.5 md:gap-6 py-5 md:px-5 md:py-[30px]">
                        {/* <img
                  
                  className="flex-1 w-[89px] h-[82px] md:w-[163px] md:h-[172px] rounded-[20px] md:rounded-none md:rounded-tr-[40px] md:rounded-bl-[40px] object-cover"
               /> */}
                        <div className="flex flex-col justify-evenly w-full relative">
                            <svg
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#5C704E"
                                className="absolute top-1 right-1 cursor-pointer hover:stroke-red-500"
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
                                name
                            </h2>
                            <div className="flex gap-1 md:gap-[60px] items-center">
                                <p className="font-[750] text-sm md:text-xl font-['AvenirNextCyr']">
                                    100 руб.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-12 border-b border-[rgba(92,112,78,0.25)]">
                        <div className="form-group w-full">
                            <label htmlFor="q1">
                                Желаемая ДАТА и ВРЕМЯ начала
                            </label>
                            <input
                                type="datetime-local"
                                id="q1"
                                v-model="i.dateTime"
                            />
                        </div>
                        <div className="form-group w-full">
                            <label>Длительность мероприятия</label>
                            {/* <duration-adjust  /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="centered-buttons">
                <Link
                    href="/booking"
                    className="custom__btn border border-brown"
                >
                    Резерв студии
                </Link>
                <button className="custom__btn border border-brown disabled:border-0 disabled:bg-transparent">
                    Далее
                </button>
            </div>
        </div>
    );
}
