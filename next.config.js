/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {

    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    };
    
    return config;
  },
};

module.exports = nextConfig
