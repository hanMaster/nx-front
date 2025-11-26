import { getServiceById } from '@/app/data/services';
import BreadCrumbs from '@/components/breadcrums';
import HowToConnect from '@/components/how-to-connect';
import ServiceItem from '@/components/service-item';
import { notFound } from 'next/navigation';

export default async function MasterClassPage(
    props: PageProps<'/masters/[id]'>
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
