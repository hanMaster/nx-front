'use client';

import Image from 'next/image';
import { Navigation } from './navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/providers/CartProvider';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { getTotalItemsCount } = useCart();

    const resetMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        resetMenu();
    }, [pathname]);

    return (
        <div className="w-full z-999 fixed top-0">
            <header className="relative border-b border-[rgba(92,112,78,0.25)] px-2 box-border bg-lightbrown">
                <nav className="max-w-[1560px] mx-auto">
                    <div className="flex items-center gap-x-2.5 py-3 justify-between">
                        <button
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="28" height="2" fill="#5C704E" />
                                <rect
                                    y="8"
                                    width="28"
                                    height="2"
                                    fill="#5C704E"
                                />
                                <rect
                                    y="16"
                                    width="28"
                                    height="2"
                                    fill="#5C704E"
                                />
                            </svg>
                        </button>
                        <div className="hidden lg:block"></div>
                        <Link
                            href="/cart"
                            className="text-sm add-to-cart-food-btn max-w-[200px]"
                        >
                            Сделать заказ
                        </Link>
                        <Navigation isMobile={false} />

                        <Link
                            href="/cart"
                            className="flex items-center gap-x-[34px] justify-between"
                        >
                            <button className="relative flex h-12 min-w-12 items-center justify-center rounded-full bg-brown md:mr-[30px] cursor-pointer">
                                <Image
                                    width={18}
                                    height={20}
                                    src="/img/icon-2.png"
                                    alt="Корзина"
                                />
                                <span className="absolute bottom-[-3px] right-[-3px] flex h-[23px] w-[23px] items-center justify-center rounded-[50%] bg-green text-xs font-medium leading-4 text-white">
                                    {getTotalItemsCount()}
                                </span>
                            </button>
                        </Link>
                    </div>
                    {isMenuOpen && <Navigation isMobile={true} />}
                </nav>
            </header>
        </div>
    );
}
