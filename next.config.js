/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    console.log(options.webpack.version); // Should be webpack v5 now
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
};

module.exports = nextConfig
