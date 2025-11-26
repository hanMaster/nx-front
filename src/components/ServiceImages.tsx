import Image from 'next/image';
import { Service } from '@/app/data/services';
import Link from 'next/link';

export default function ServiceImages({
    items,
    alt,
    path,
}: {
    items: Service[];
    alt: string;
    path: string;
}) {
    return (
        <div className="gallery-images">
            {items &&
                items.map((item) => (
                    <Link
                        href={`/${path}/${item.id}`}
                        key={item.id}
                        className="show relative cursor-pointer image-wrapper"
                    >
                        <Image
                            width={406}
                            height={350}
                            src={`/${item.mainPicture}`}
                            alt={alt}
                            className="rounded-[40px]"
                        />

                        <div className="absolute bottom-5 left-5 right-5 text-center feast">
                            {item.discountPrice === 0 && (
                                <span>{`${item.title} ${item.price}руб.`}</span>
                            )}

                            {item.discountPrice !== 0 && (
                                <span>
                                    {item.title} <s>{item.price}</s>{' '}
                                    {`${item.discountPrice}руб.`}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
        </div>
    );
}
