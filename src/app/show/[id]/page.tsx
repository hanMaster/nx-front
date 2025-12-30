import { getServiceById } from "@/app/data/services";
import BreadCrumbs from "@/components/breadcrums";
import HowToConnect from "@/components/how-to-connect";
import ServiceItem from "@/components/service-item";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(
    props: PageProps<"/show/[id]">,
): Promise<Metadata> {
    const { id } = await props.params;
    const service = await getServiceById(id);

    if (!service) {
        return {
            title: "Шоу не найдено",
        };
    }

    return {
        title: service.title,
        description:
            service.description.slice(0, 155) ||
            `${service.title} - шоу программа для детского праздника в Находке. Цена: ${service.price} руб.`,
        alternates: {
            canonical: `https://kharakter.ru/show/${id}`,
        },
        openGraph: {
            title: `${service.title} - Шоу программы`,
            description: service.description.slice(0, 200),
            images: [service.mainPicture],
        },
    };
}

export default async function ShowPage(props: PageProps<"/show/[id]">) {
    const { id } = await props.params;
    const service = await getServiceById(id);

    if (!service) {
        return notFound();
    }

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Шоу" pagePath="show" isLink={true} />
            <ServiceItem service={service} />
            <HowToConnect />
        </main>
    );
}
