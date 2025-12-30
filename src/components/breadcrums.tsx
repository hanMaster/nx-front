import Link from 'next/link';
import { BreadcrumbSchema } from './StructuredData';

export default function BreadCrumbs({
    pageTitle,
    pagePath,
    isLink = false,
    currentItemTitle,
    currentItemPath,
}: {
    pageTitle: string;
    pagePath?: string;
    isLink?: boolean;
    currentItemTitle?: string;
    currentItemPath?: string;
}) {
    // Build breadcrumb items for structured data
    const breadcrumbItems = [
        {
            name: 'Главная',
            url: 'https://kharakter.ru/',
        },
        {
            name: pageTitle,
            url: isLink && pagePath
                ? `https://kharakter.ru/${pagePath}`
                : `https://kharakter.ru/${pagePath || pageTitle.toLowerCase()}`,
        },
    ];

    // Add third level if currentItemTitle is provided (for detail pages)
    if (currentItemTitle && currentItemPath) {
        breadcrumbItems.push({
            name: currentItemTitle,
            url: `https://kharakter.ru${currentItemPath}`,
        });
    }

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />
            <section className="py-5 lg:py-[30px] bg-grey-light">
                <ol className="flex flex-wrap text-xs leading-4 text-green md:text-lg lg:text-xl lg:leading-5">
                    <li>
                        <Link className="opacity-[0.75]" href="/">
                            Главная
                        </Link>
                    </li>
                    <li>
                        {isLink ? (
                            <Link
                                href={`/${pagePath}`}
                                className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/']"
                            >
                                {pageTitle}
                            </Link>
                        ) : (
                            <span className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/']">
                                {pageTitle}
                            </span>
                        )}
                    </li>
                </ol>
            </section>
        </>
    );
}
