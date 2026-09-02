import { wixRedirects } from "./redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three / drei ship untranspiled ESM helpers; let Next transpile them.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Old Wix URL → new path (301). See redirects.mjs. Inert until DNS cutover.
  async redirects() {
    return wixRedirects;
  },
};

export default nextConfig;
