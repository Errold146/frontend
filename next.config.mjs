/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [320, 420, 768, 1024, 1200], // Esto es válido
    },
};

export default nextConfig;