"use client";

import Link from "next/link";

export default function ShowError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="md:container md:mx-auto pt-[85px] text-center p-8">
            <h2 className="title mb-6">Ошибка загрузки шоу</h2>
            <p className="text mb-4">
                Не удалось загрузить список шоу программ. Попробуйте обновить
                страницу.
            </p>
            {process.env.NODE_ENV === "development" && (
                <details className="text-left bg-grey p-4 rounded-lg mb-4">
                    <summary className="cursor-pointer font-bold mb-2">
                        Детали ошибки
                    </summary>
                    <pre className="text-sm overflow-auto">
                        {error.message}
                    </pre>
                </details>
            )}
            <div className="flex gap-4 justify-center flex-wrap">
                <button
                    onClick={reset}
                    className="custom__btn border border-brown bg-brown text-white"
                >
                    Попробовать снова
                </button>
                <Link href="/" className="custom__btn border border-brown">
                    На главную
                </Link>
            </div>
        </main>
    );
}
