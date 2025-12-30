import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    const securityHeaders = {
        // Content Security Policy
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js требует unsafe-eval и unsafe-inline
            "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data: fonts.gstatic.com",
            "connect-src 'self' http://localhost:5001 https://102922.selcdn.ru",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self' https://t.me",
        ].join("; "),

        // Prevent clickjacking
        "X-Frame-Options": "DENY",

        // Prevent MIME type sniffing
        "X-Content-Type-Options": "nosniff",

        // XSS Protection (legacy, но всё ещё полезно для старых браузеров)
        "X-XSS-Protection": "1; mode=block",

        // Referrer Policy
        "Referrer-Policy": "strict-origin-when-cross-origin",

        // Permissions Policy (ограничиваем доступ к API браузера)
        "Permissions-Policy":
            "camera=(), microphone=(), geolocation=(), interest-cohort=()",

        // HTTPS Strict Transport Security (для production)
        ...(process.env.NODE_ENV === "production" && {
            "Strict-Transport-Security":
                "max-age=31536000; includeSubDomains; preload",
        }),
    };

    // Применяем все security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
        if (value) {
            response.headers.set(key, value);
        }
    });

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
