import { baseUrl } from "./apiBaseUrl";

export interface VideoItem {
    id: number;
    videoId: string;
    ord: number;
}

export async function getVideo(): Promise<VideoItem[]> {
    const response = await fetch(`${baseUrl}video`);
    const list: VideoItem[] = await response.json();
    return list;
}