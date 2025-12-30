import { getServiceById } from "@/app/data/services";
import BreadCrumbs from "@/components/breadcrums";
import HowToConnect from "@/components/how-to-connect";
import ServiceItem from "@/components/service-item";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(
    props: PageProps<"/masters/[id]">,
): Promise<Metadata> {
    const { id } = await props.params;
    const service = await getServiceById(id);

    if (!service) {
        return {
            title: "Мастер-класс не найден",
        };
    }

    return {
        title: service.title,
        description:
            service.description.slice(0, 155) ||
            `${service.title} - мастер-класс для детей в Находке. Цена: ${service.price} руб.`,
        openGraph: {
            title: `${service.title} - Мастер-классы`,
            description: service.description.slice(0, 200),
            images: [service.mainPicture],
        },
    };
}

export default async function MasterClassPage(
    props: PageProps<"/masters/[id]">,
) {
    const { id } = await props.params;
    const service = await getServiceById(id);

    if (!service) {
        return notFound();
    }

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs
                pageTitle="Мастер-классы"
                pagePath="masters"
                isLink={true}
            />
            <ServiceItem service={service} />
            <HowToConnect />
        </main>
    );
}
