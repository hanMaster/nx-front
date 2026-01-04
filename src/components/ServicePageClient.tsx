'use client';

import { useState } from 'react';
import Image from 'next/image';
import ServiceImages from './ServiceImages';
import { Service } from '@/app/data/services';

interface ServicePageClientProps {
    services: Service[];
    alt: string;
    path: string;
}

export default function ServicePageClient({ services, alt, path }: ServicePageClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="search flex text-center items-center justify-center mb-[30px]">
                <div className="relative">
                    <Image
                        width={20}
                        height={20}
                        src="/img/search.svg"
                        alt="Поиск услуг для детского праздника"
                        className="absolute left-2.5 top-[13px]"
                    />
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск..."
                        className="py-2.5 ps-[30px] pe-2.5 rounded-4xl text-lightgreen border bg-white outline-lightgreen"
                    />
                </div>
            </div>
            <ServiceImages items={filteredServices} alt={alt} path={path} />
        </div>
    );
}
