import Link from 'next/link';
import Image from 'next/image';
import HowToConnect from '@/components/how-to-connect';
import SliderHome from '@/components/slider-home';

export default function Home() {
    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <section className="flex flex-col gap-10 sm:flex-row lg:gap-6 mt-5 lg:mt-[60px] items-center justify-center px-8">
                <p className="subtitle2 text-green text-left max-w-[630px] mb-4 mt-6">
                    Привет! <br />
                    <br />
                    Если тебе нужно устроить праздник, то с этого момента можно
                    расслабиться! <br />
                    Ты уже там, где нужно!
                    <br />
                    <br />
                    Меня зовут Авдейчик Оксана!
                    <br />
                    Все твои праздничные хлопоты я возьму на себя!
                    <br />
                    Это сайт моих студий!
                    <br />
                    Они созданы для праздников, равны по площади, оснащению и
                    комфорту, отличаются дизайном, атмосферой и вместимостью.
                    <br />
                    <br />
                    Добро пожаловать!
                </p>

                <Image
                    width={365}
                    height={517}
                    src="/oks_hero.jpg"
                    alt="Оксана Авдейчик - организатор детских праздников в студиях Давай поиграем и Характер в Находке"
                    className="rounded-[40px]"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 365px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
            </section>
            <div className="w-full text-center">
                <Link href="/mem" className="custom__btn border border-brown">
                    Правила моих студий
                </Link>
            </div>
            <section className="flex flex-col gap-10 sm:flex-row lg:gap-6 mt-5 lg:mt-[60px] px-8">
                <div className="sm:w-[48%]">
                    <h1 className="title mb-5 lg:mb-[30px]">
                        Клуб “Давай поиграем!”
                    </h1>
                    <div className="relative mb-5 w-full rounded-t-[50%] lg:mb-[30px]">
                        <Link href="/davai-poigraem">
                            <Image
                                width={707}
                                height={522}
                                src="/img/davai_poigraem.png"
                                alt="Детский клуб Давай поиграем - зал для проведения детских праздников и дней рождения в Находке"
                                className="h-[275px] lg:h-[439px] xl:h-[539px] w-full object-cover first-left-image"
                                style={{ width: 'auto' }}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 50vw"
                                priority
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQklEQVQImWNgQAL/0cH/////MzAwMKBLoovj1YhNM4o4sjxWjSjyODXi1IhLE1aNSBqxakTSiFUjkkasGpE0YtUIAKHYJT9jzMGaAAAAAElFTkSuQmCC"
                            />
                        </Link>
                        <div className="md:flex absolute bottom-3 md:bottom-5 right-3 md:right-5">
                            <Link
                                href="/davai-poigraem"
                                className="custom__block"
                            >
                                Подробнее
                            </Link>
                        </div>
                    </div>
                    <p className="text text-center xl:mx-auto xl:max-w-[397px]">
                        Тематику для праздника выбираете вы, а мы создаем все
                        необходимое!
                    </p>
                </div>
                <div className="sm:w-[48%]">
                    <h2 className="title mb-5 lg:mb-[30px]">
                        Студия вкуса “Характер”
                    </h2>
                    <div className="relative mb-5 w-full rounded-t-[50%] lg:mb-[30px]">
                        <Link href="/kharacter">
                            <Image
                                width={707}
                                height={539}
                                src="/img/kharacter-big.jpeg"
                                className="h-[275px] lg:h-[439px] xl:h-[539px] w-full object-cover first-right-image"
                                alt="Студия вкуса Характер - банкетный зал для детских праздников с кейтерингом в Находке"
                                style={{ width: 'auto' }}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 50vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                        </Link>
                        <div className="md:flex absolute bottom-3 md:bottom-5 right-3 md:left-5">
                            <Link href="/kharacter" className="custom__block">
                                Подробнее
                            </Link>
                        </div>
                    </div>
                    <p className="text text-center xl:mx-auto xl:max-w-[430px]">
                        Закажи банкет или кейтеринг из нашего меню и мы возьмем
                        на себя все заботы, чтобы вы могли отдохнуть с
                        Характером
                    </p>
                </div>
            </section>

            <section className="flex flex-col lg:flex-row gap-5 lg:items-center justify-center lg:gap-6">
                <div className="flex flex-col">
                    <div className="lg:flex lg:items-center lg:gap-[35px] xl:gap-[74px] mb-4">
                        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-around items-center gap-5 text-center text-green lg:mb-[27px] lg:text-lg lg:leading-[22px] xl:text-left">
                            <Link
                                href="/booking"
                                className="custom__btn border border-brown"
                            >
                                Резерв студии
                            </Link>
                            <Link
                                href="/heroes"
                                className="custom__btn border border-brown"
                            >
                                Герои и программы
                            </Link>
                            <Link
                                href="/menu"
                                className="custom__btn border border-brown"
                            >
                                Кейтеринг
                            </Link>
                            <Link
                                href="/masters"
                                className="custom__btn border border-brown"
                            >
                                Мастер-классы
                            </Link>
                            <Link
                                href="/show"
                                className="custom__btn border border-brown"
                            >
                                Шоу
                            </Link>
                            <Link
                                href="/additions"
                                className="custom__btn border border-brown"
                            >
                                Дополнения
                            </Link>
                            <Link
                                href="/new-year"
                                className="custom__btn border border-brown"
                            >
                                Новый год
                            </Link>
                            <Link
                                href="/razvivalochkanhk"
                                className="custom__btn border border-brown"
                            >
                                Развивалочкаnhk
                            </Link>
                        </div>
                    </div>

                    <a href="/cart" className="add-to-cart-food-btn">
                        СДЕЛАТЬ ЗАКАЗ
                    </a>
                </div>
            </section>

            <section>
                <SliderHome />
            </section>
            <HowToConnect />
        </main>
    );
}
