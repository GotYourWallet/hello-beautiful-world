// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", //enables smaller docker images, however it requires additional configuration in package.json
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;