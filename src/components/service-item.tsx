import { Service } from "@/app/data/services";
import { SliderImage } from "@/app/data/gallery";
import Image from "next/image";
import GoBackBtn from "./GoBackBtn";
import ServiceCartButton from "./cart/ServiceCartButton";

export default function ServiceItem({
    service,
    images = []
}: {
    service: Service;
    images?: SliderImage[];
}) {
    return (
        <section className="lg:p-0">
            <h1 className="title mb-5">{service.title}</h1>
            <p className="whitespace-pre-line text-balance text max-w-[830px] text-left mx-auto mb-10">
                {service.description}
            </p>
            <h4 className="subtitle2 mb-2">
                Длительность: {service.duration} мин.
            </h4>

            {service.discountPrice === 0 ? (
                <h3 className="subtitle2">
                    Стоимость услуги: {service.price} руб.
                </h3>
            ) : (
                <h3 className="subtitle2">
                    Стоимость услуги: <s>{service.price}</s>{" "}
                    {service.discountPrice} руб.
                </h3>
            )}

            {service.materialPrice > 0 ? (
                <p className="subtitle text-center mb-10">
                    Стоимость расходных материалов на 1 участника:{" "}
                    {service.materialPrice} руб.
                </p>
            ) : (
                <p className="mb-10"></p>
            )}

            <div className="centered-buttons">
                <GoBackBtn />
                <ServiceCartButton
                    service={service}
                    isFixed={true}
                    className="md:hidden bg-brown text-white py-2.5 px-5 rounded-3xl font-cormorant text-[20px] fixed right-5 bottom-12.5"
                />
                <ServiceCartButton service={service} />
            </div>

            {images && images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10 px-4 md:px-0">
                    {images.map((image, index) => (
                        <div key={image.id} className="w-full">
                            <Image
                                width={406}
                                height={350}
                                src={`/${image.filename}`}
                                alt={`${service.title} - фото услуги для детского праздника в Находке - фото ${index + 1}`}
                                className="rounded-2xl w-full h-auto object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="gallery-images">
                    <div className="image-wrapper">
                        <Image
                            width={406}
                            height={350}
                            src={`/${service.mainPicture}`}
                            alt={`${service.title} - услуга для детского праздника в Находке, ${service.duration} минут, цена ${service.discountPrice || service.price} руб.`}
                            className="rounded-[40px]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 406px"
                            loading="lazy"
                        />
                    </div>
                </div>
            )}

            <div className="centered-buttons">
                <ServiceCartButton service={service} />
            </div>
        </section>
    );
}
