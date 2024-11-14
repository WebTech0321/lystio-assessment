const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Existing SVG configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    disableStaticImages: false,
    remotePatterns: [
      // your existing patterns...
      {
        protocol: "https",
        hostname: "cdn.lystio.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
