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
