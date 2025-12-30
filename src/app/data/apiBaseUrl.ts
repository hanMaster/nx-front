// Use localhost for both development and build time
// In production runtime, this will be proxied/rewritten by the web server
const host = typeof window === 'undefined'
  ? 'http://localhost:5001'  // Server-side (including build time)
  : '';  // Client-side (browser)
export const baseUrl = `${host}/api/v1/`;
