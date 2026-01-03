import { getServiceById, getImagesByGalleryId } from "@/app/data/services";
import BreadCrumbs from "@/components/breadcrums";
import HowToConnect from "@/components/how-to-connect";
import ServiceItem from "@/components/service-item";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceSchema } from "@/components/StructuredData";

export async function generateMetadata(
    props: PageProps<"/heroes/[id]">,
): Promise<Metadata> {
    const { id } = await props.params;
    const service = await getServiceById(id);

    if (!service) {
        return {
            title: "Услуга не найдена",
        };
    }

    return {
        title: service.title,
        description:
            service.description.slice(0, 155) ||
            `${service.title} - герои и аниматоры для детского праздника в Находке. Цена: ${service.price} руб.`,
        alternates: {
            canonical: `https://igra-em.ru/heroes/${id}`,
        },
        openGraph: {
            title: `${service.title} - Герои и программы`,
            description: service.description.slice(0, 200),
            images: [service.mainPicture],
        },
    };
}

export default async function HeroesPage(props: PageProps<"/heroes/[id]">) {
    const { id } = await props.params;
    const service = await getServiceById(id);
    const images = await getImagesByGalleryId(service?.galleryId || 0);

    if (!service) {
        return notFound();
    }

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs
                pageTitle="Герои и программы"
                pagePath="heroes"
                isLink={true}
                currentItemTitle={service.title}
                currentItemPath={`/heroes/${id}`}
            />
            <ServiceItem service={service} images={images} />
            <HowToConnect />
            <ServiceSchema
                name={service.title}
                description={service.description}
                provider="Детские студии Давай поиграем и Характер"
                areaServed="Находка"
                priceRange={`${service.discountPrice || service.price} руб.`}
                image={`https://igra-em.ru/${service.mainPicture}`}
            />
        </main>
    );
}
