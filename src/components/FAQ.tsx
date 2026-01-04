'use client';

import { useState } from 'react';
import { FAQSchema } from './StructuredData';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

export default function FAQ({ items, title = "Часто задаваемые вопросы" }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <FAQSchema items={items} />

            <section className="px-4 md:px-8 mb-16 max-w-[1000px] mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-green mb-10">
                    {title}
                </h2>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border border-brown rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full px-6 py-4 text-left bg-lightbrown hover:bg-grey transition-colors flex justify-between items-center"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-green pr-4">
                                    {item.question}
                                </h3>
                                <span
                                    className="text-2xl text-brown transform transition-transform flex-shrink-0"
                                    style={{
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}
                                >
                                    ▼
                                </span>
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'py-4 max-h-[1000px]' : 'max-h-0 py-0'
                                }`}
                            >
                                <p className="text-green text-base md:text-lg whitespace-pre-line">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
