'use client';

import { Category } from '@/app/data/menu';
import Link from 'next/link';
import { useState } from 'react';

export default function CategoryChanger({
    categories,
    activeCategoryId,
}: {
    categories: Category[];
    activeCategoryId: number;
}) {
    const [isOpen, setIsopen] = useState<boolean>(false);

    const activeCategory = categories.find(
        (c) => c.id === activeCategoryId
    ) as Category;

    const categoriesWithoutActive = categories.filter(
        (c) => c.id !== activeCategoryId
    );

    return (
        <>
            <div className="hidden md:flex mb-[30px] flex-wrap gap-6 justify-center">
                {categories &&
                    categories.map((cat) => (
                        <Link
                            href={`/menu/${cat.id}`}
                            key={cat.id}
                            className={
                                cat.id === activeCategoryId
                                    ? 'tag active-tag'
                                    : 'tag'
                            }
                        >
                            {cat.title}
                        </Link>
                    ))}
            </div>

            <div
                className="drop-tags"
                style={{
                    height: isOpen
                        ? `calc(48px * ${categories.length}`
                        : '68px',
                }}
            >
                <span onClick={() => setIsopen(!isOpen)}>
                    {activeCategory.title}
                </span>
                {categoriesWithoutActive &&
                    categoriesWithoutActive.map((cat) => (
                        <Link key={cat.id} href={`/menu/${cat.id}`}>
                            <ol className="mt-3">
                                <li>{cat.title}</li>
                            </ol>
                            <svg
                                width="19"
                                height="10"
                                viewBox="0 0 19 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute right-5 top-7"
                            >
                                <path
                                    d="M9.5 10L18.5933 0.25L0.406734 0.25L9.5 10Z"
                                    fill="#6D5E3C"
                                />
                            </svg>
                        </Link>
                    ))}
            </div>
        </>
    );
}
