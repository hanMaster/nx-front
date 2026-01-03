import HowToConnect from "@/components/how-to-connect";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getMem } from "../data/mem";
import BreadCrumbs from "@/components/breadcrums";

export default async function MemPage() {
    const markdown = await getMem();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Памятка" />

            <section className="flex flex-col gap-3 mt-5 lg:mt-[60px] px-8">
                <h2 className="subtitle2">
                    Памятка визита в Давай поиграем и Характер
                </h2>
                <div className="prose px-2 prose-headings:mt-8 max-w-[1440px] prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-p:text-lg">
                    <MDXRemote source={markdown} />
                </div>
                <Link
                    className="custom__btn border border-brown m-auto no-underline"
                    href="/cart"
                >
                    Вернуться к заказу
                </Link>
            </section>
            <HowToConnect />
        </main>
    );
}
