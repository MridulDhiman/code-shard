/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /lzma_worker\.js$/,
        use: ["worker-loader"],
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
