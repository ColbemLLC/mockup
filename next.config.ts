import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.8.26"],
  reactCompiler: true,
};

export default nextConfig;