/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: "./",
    },
    serverActions: {
      bodySizeLimit: "5mb", // Aumente conforme sua necessidade
    },
  },
};

export default nextConfig;
