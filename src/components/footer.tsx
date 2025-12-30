import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-[rgba(92,112,78,0.25)] bg-grey py-10 px-2">
            <div className="container m-auto flex flex-col gap-5 md:flex-row md:justify-between max-w-[1272px]">
                <div>
                    <ul className="flex flex-col gap-3 text-center md:text-left">
                        <li>
                            <h3 className="subtitle md:text-left">Телефон</h3>
                        </li>
                        <li className="list__item">
                            <a href="tel:603-888">603-888</a>
                        </li>
                        <li className="list__item">
                            <a href="tel:+7(914)709-38-88">+7(914)709-38-88</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-col gap-3 text-center">
                        <li>
                            <h3 className="subtitle text-center">Адрес</h3>
                        </li>
                        <li className="list__item">Находка, Ленинская 20</li>
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-col gap-3 text-center items-center">
                        <li>
                            <h3 className="subtitle">Инстаграм</h3>
                        </li>
                        <li className="list__item">
                            <a
                                href="https://www.instagram.com/kharakter_nhk/"
                                className="flex items-center justify-center gap-2.5 underline md:justify-end lg:justify-end"
                            >
                                <Image
                                    src="/img/icon-3.png"
                                    alt="Instagram"
                                    width={20}
                                    height={20}
                                    loading="lazy"
                                />
                                @kharakter_nhk
                            </a>
                        </li>
                        <li className="list__item">
                            <a
                                href="https://www.instagram.com/davaypoigraem_nhk/"
                                className="flex items-center justify-center gap-2.5 underline md:justify-start"
                            >
                                <Image
                                    src="/img/icon-3.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    loading="lazy"
                                />{" "}
                                @davaypoigraem_nhk
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-col gap-3 text-center md:text-right lg:text-right">
                        <li className="list__item">
                            <a
                                href="/offer"
                                className="flex items-center justify-center gap-2.5 underline md:justify-end"
                            >
                                Оферта
                            </a>
                        </li>
                        <li className="list__item">
                            <a
                                href="/policy"
                                className="flex items-center justify-center gap-2.5 underline md:justify-end"
                            >
                                Политика конфиденциальности
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
