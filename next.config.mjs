/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone", // Permite ejecutar Next.js correctamente en Vercel
    experimental: {
        appDir: true,
    },
};

export default nextConfig;