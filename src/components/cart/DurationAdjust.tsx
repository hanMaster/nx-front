'use client';

import { useCart } from '@/providers/CartProvider';
import { Hall } from '@/providers/types';

interface DurationAdjustProps {
    hall: Hall;
}

export default function DurationAdjust({ hall }: DurationAdjustProps) {
    const { increaseDuration, decreaseDuration } = useCart();

    const dur = hall.duration + hall.diff;
    const dh = Math.trunc(dur / 60);
    const dm = dur % 60;

    return (
        <div className="border border-[rgba(109,94,60,0.45)] flex gap-1 rounded-[40px] w-full justify-between">
            <span
                className="count-adjust-button"
                onClick={(e) => {
                    e.stopPropagation();
                    decreaseDuration(hall);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="w-[20px]"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
            </span>
            <span className="py-[5px] md:py-[18px] select-none text-green">
                {`${dh}ч`} {dm > 0 && `${dm}м`}
            </span>
            <span
                className="count-adjust-button"
                onClick={(e) => {
                    e.stopPropagation();
                    increaseDuration(hall);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-[20px]"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </span>
        </div>
    );
}
