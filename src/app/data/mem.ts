import { baseUrl } from "./apiBaseUrl";

let memStr = '';

const fetchMem = async () => {
    const response = await fetch(`${baseUrl}pages?page=mem`);
    const text = await response.text();
    return text;
};

export async function getMem() {
    if (memStr.length) {
        return memStr;
    }
    const text = await fetchMem();
    if (text) {
        memStr = text;
    }
    return memStr;
}