import Link from 'next/link';

export interface NavigationProps {
    isMobile: boolean;
}

export function Navigation({ isMobile }: NavigationProps) {
    const classes = isMobile
        ? 'flex flex-col lg:hidden  gap-y-3'
        : 'hidden lg:flex flex-row flex-wrap gap-x-[34px]';

    return (
        <ul
            className={`${classes} text-green justify-start items-center text-lg`}
        >
            <li>
                <Link className="hover:underline" href="/">
                    Главная
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/menu">
                    Меню
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/masters">
                    Мастер-классы
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/heroes">
                    Герои и программы
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/show">
                    Шоу
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/additions">
                    Дополнения
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/video">
                    Видео
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/new-year">
                    Новый год🎄
                </Link>
            </li>
            <li>
                <Link className="hover:underline" href="/razvivalochkanhk">
                    Развивалочкаnhk
                </Link>
            </li>
        </ul>
    );
}
