import Link from 'next/link';

export default function BreadCrumbs({ pageTitle }: { pageTitle: string }) {
    return (
        <section className="py-5 lg:py-[30px] bg-grey-light">
            <ol className="flex flex-wrap text-xs leading-4 text-green md:text-lg lg:text-xl lg:leading-5">
                <li>
                    <Link className="opacity-[0.75]" href="/">
                        Главная
                    </Link>
                </li>
                <li>
                    <span className="opacity-[0.75] before:mx-3 before:inline-block before:content-['/']">
                        {pageTitle}
                    </span>
                </li>
            </ol>
        </section>
    );
}
