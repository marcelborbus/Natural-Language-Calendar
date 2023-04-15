/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: { OPENAI_API_KEY: process.env.OPENAI_AI_KEY },

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
