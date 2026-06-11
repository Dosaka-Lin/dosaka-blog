import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
