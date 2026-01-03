import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    images: {
        remotePatterns: [new URL("https://102922.selcdn.ru/ecomm/harakter/**")],
    },
    headers: async () => [
        {
            source: "/:path*",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value: [
                        "default-src 'self'",
                        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru",
                        "frame-src 'self' https://rutube.ru",
                        "connect-src 'self' https://mc.yandex.ru",
                        "img-src 'self' data: https://mc.yandex.ru",
                    ].join("; "),
                },
            ],
        },
    ],
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
