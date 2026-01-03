import BreadCrumbs from "@/components/breadcrums";
import HowToConnect from "@/components/how-to-connect";
import { getVideo } from "../data/video";

export default async function VideoPage() {
    const video = await getVideo();

    return (
        <main className="md:container md:mx-auto pt-[85px]">
            <BreadCrumbs pageTitle="Видео" />

            <h2 className="subtitle2">
                Здесь будут выложены видео о клубе и студии
            </h2>
            <section className="flex flex-col gap-10 mt-5 lg:mt-[60px] px-8">
                {video &&
                    video.map((v) => {
                        if (v.videoId.length === 11) {
                            return (
                                <div
                                    key={v.id}
                                    className="relative w-auto pb-5"
                                >
                                    <iframe
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${v.videoId}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={v.id}
                                    style={{ aspectRatio: "16 / 9" }}
                                >
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://rutube.ru/play/embed/${v.videoId}`}
                                        style={{ border: "none" }}
                                        allow="clipboard-write; autoplay"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            );
                        }
                    })}
            </section>

            <HowToConnect />
        </main>
    );
}
