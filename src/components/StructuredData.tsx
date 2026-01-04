import Script from "next/script";

interface LocalBusinessProps {
    name: string;
    description: string;
    url: string;
    telephone?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo?: {
        latitude: number;
        longitude: number;
    };
    openingHours?: string[];
    priceRange?: string;
}

export function LocalBusinessSchema({
    name,
    description,
    url,
    telephone,
    address,
    geo,
    openingHours,
    priceRange = "$$",
}: LocalBusinessProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name,
        description,
        url,
        ...(telephone && { telephone }),
        ...(address && {
            address: {
                "@type": "PostalAddress",
                ...address,
            },
        }),
        ...(geo && {
            geo: {
                "@type": "GeoCoordinates",
                latitude: geo.latitude,
                longitude: geo.longitude,
            },
        }),
        ...(openingHours && { openingHours }),
        priceRange,
        "@id": url,
        image: `${url}/img/logo.png`,
    };

    return (
        <Script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbProps {
    items: Array<{
        name: string;
        url: string;
    }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ProductProps {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    brand?: string;
}

export function ProductSchema({
    name,
    description,
    image,
    price,
    currency = "RUB",
    availability = "InStock",
    brand = "Характер",
}: ProductProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image,
        brand: {
            "@type": "Brand",
            name: brand,
        },
        offers: {
            "@type": "Offer",
            price,
            priceCurrency: currency,
            availability: `https://schema.org/${availability}`,
        },
    };

    return (
        <Script
            id="product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ServiceProps {
    name: string;
    description: string;
    provider: string;
    areaServed: string;
    priceRange?: string;
    image?: string;
}

export function ServiceSchema({
    name,
    description,
    provider,
    areaServed,
    priceRange,
    image,
}: ServiceProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
            "@type": "LocalBusiness",
            name: provider,
        },
        areaServed: {
            "@type": "City",
            name: areaServed,
        },
        ...(priceRange && { priceRange }),
        ...(image && { image }),
    };

    return (
        <Script
            id="service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface EventProps {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: {
        name: string;
        address: string;
    };
    image?: string;
    price?: number;
    currency?: string;
    organizer?: string;
    eventStatus?: "EventScheduled" | "EventCancelled" | "EventPostponed";
    eventAttendanceMode?: "OfflineEventAttendanceMode" | "OnlineEventAttendanceMode" | "MixedEventAttendanceMode";
}

export function EventSchema({
    name,
    description,
    startDate,
    endDate,
    location,
    image,
    price,
    currency = "RUB",
    organizer = "ИП Авдейчик Оксана Николаевна",
    eventStatus = "EventScheduled",
    eventAttendanceMode = "OfflineEventAttendanceMode",
}: EventProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name,
        description,
        startDate,
        ...(endDate && { endDate }),
        eventStatus: `https://schema.org/${eventStatus}`,
        eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`,
        location: {
            "@type": "Place",
            name: location.name,
            address: {
                "@type": "PostalAddress",
                streetAddress: location.address,
                addressLocality: "Находка",
                addressRegion: "Приморский край",
                addressCountry: "RU",
            },
        },
        ...(image && { image }),
        ...(price && {
            offers: {
                "@type": "Offer",
                price,
                priceCurrency: currency,
                availability: "https://schema.org/InStock",
                url: "https://igra-em.ru/new-year",
            },
        }),
        organizer: {
            "@type": "Organization",
            name: organizer,
            url: "https://igra-em.ru",
        },
        performer: {
            "@type": "Organization",
            name: "Детские студии Давай поиграем и Характер",
        },
    };

    return (
        <Script
            id="event-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface VideoObjectProps {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
    duration?: string;
}

export function VideoObjectSchema({
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    embedUrl,
    duration,
}: VideoObjectProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name,
        description,
        thumbnailUrl,
        uploadDate,
        ...(contentUrl && { contentUrl }),
        ...(embedUrl && { embedUrl }),
        ...(duration && { duration }),
    };

    return (
        <Script
            id="video-object-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface VideoListProps {
    videos: Array<{
        name: string;
        description: string;
        thumbnailUrl: string;
        uploadDate: string;
        embedUrl: string;
        duration?: string;
    }>;
}

export function VideoListSchema({ videos }: VideoListProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: videos.map((video, index) => ({
            "@type": "VideoObject",
            position: index + 1,
            name: video.name,
            description: video.description,
            thumbnailUrl: video.thumbnailUrl,
            uploadDate: video.uploadDate,
            embedUrl: video.embedUrl,
            ...(video.duration && { duration: video.duration }),
        })),
    };

    return (
        <Script
            id="video-list-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

export function FAQSchema({ items }: FAQProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
