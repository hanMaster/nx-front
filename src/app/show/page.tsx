import BreadCrumbs from '@/components/breadcrums';
import HowToConnect from '@/components/how-to-connect';
import { getShow } from '../data/services';
import ServicePageClient from '@/components/ServicePageClient';

export default async function ShowPage() {
    const data = await getShow();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Шоу" />
            <p className="text-green text-center mb-10 px-2">
                Шоу может быть самостоятельным элементом мероприятия или
                дополнять абсолютно любую программу! Состав вашего праздника
                определяете Вы исходя из предпочтений и бюджета. Обратите
                внимание, что некоторые виды шоу рекомендованы к заказу с
                определенного возраста, например Слайм-шоу. Примерная
                длительность всех видов шоу от 30 минут до одного часа.
            </p>

            <ServicePageClient services={data} alt="show" path="show" />
            <HowToConnect />
        </main>
    );
}
