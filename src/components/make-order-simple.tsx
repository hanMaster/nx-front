import Image from "next/image";
import Link from "next/link";

export default function MakeOrderSimple() {
    return (
        <section>
            <div className="flex flex-col items-center gap-5 text-center text-green px-8">
                <div className="md:flex md:w-full md:gap-6">
                    <div className="flex flex-col items-center gap-5 text-center text-green md:bg-grey md:w-[50%] md:items-center md:overflow-hidden md:rounded-bl-[169px] md:rounded-tr-[169px] md:px-6 md:pb-[30px] md:pt-[60px] lg:items-start lg:rounded-bl-[269px] lg:rounded-tr-[269px] lg:px-11">
                        <h2 className="title hidden md:block xl:text-start">
                            Студия “Давай поиграем!” <br />
                            <span className="subtitle2 not-italic">
                                и студия вкуса “Характер”
                            </span>
                        </h2>
                        <p>Работаем только по предварительной записи!</p>
                        <p className="lg:text-left">
                            Мы на связи Telegram: <br />
                            <a
                                href="https://t.me/oxana_a_18"
                                className="flex items-center"
                            >
                                <Image
                                    width="48"
                                    height="48"
                                    src="/Telegram_Logo.svg"
                                    alt="Telegram"
                                />
                                &nbsp;&nbsp;+7(914)709-38-88
                            </a>
                        </p>
                        <p className="lg:text-start">
                            Наш адрес: <br />
                            Находка, Ленинская 20
                        </p>
                        <a
                            href="https://t.me/davaypoigraemnhk"
                            className="custom__btn border border-brown"
                        >
                            Вступить в группу Telegram
                        </a>
                        <div className="flex lg:ml-12 xl:ml-0 xl:mr-[30px] xl:w-full xl:justify-end">
                            <Link href="/cart" className="custom__block">
                                Заказать праздник
                            </Link>
                        </div>
                    </div>
                    <div className="hidden overflow-hidden md:block md:w-[50%] right-round">
                        <Image
                            width={624}
                            height={539}
                            src="/img/img-19.avif"
                            alt="Организация детских праздников и банкетов в студиях Давай поиграем и Характер в Находке"
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 0vw, 50vw"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
