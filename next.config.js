/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  /*webpack(config, options) {
    config.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new options.webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );*/

    //config.resolve.fallback = { fs: false };

    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    };
    
    return config;
  },
};

module.exports = nextConfig
