const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
// Use localhost for both development and build time
// In production runtime, this will be proxied/rewritten by the web server
const host =
    typeof window === "undefined"
        ? API_URL // Server-side (including build time)
        : ""; // Client-side (browser)
export const baseUrl = `${host}/api/v1/`;
