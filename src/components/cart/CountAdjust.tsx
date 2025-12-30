"use client";

import { memo } from "react";
import { useCart } from "@/providers/CartProvider";

interface CountAdjustProps {
    id: number;
    count: number;
    className?: string;
}

function CountAdjust({ id, count, className = "" }: CountAdjustProps) {
    const { increase, decrease } = useCart();

    return (
        <div
            className={`border border-[rgba(109,94,60,0.45)] flex gap-1 rounded-[40px] w-full justify-between ${className}`}
        >
            <span
                className="count-adjust-button"
                onClick={(e) => {
                    e.stopPropagation();
                    decrease(id);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                    />
                </svg>
            </span>
            <span className="py-[5px] md:py-[18px] select-none text-green">
                {count}
            </span>
            <span
                className="count-adjust-button"
                onClick={(e) => {
                    e.stopPropagation();
                    increase(id);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </span>
        </div>
    );
}

export default memo(CountAdjust);
