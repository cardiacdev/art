// This will make sure environment variables are validated at build time
import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

export default nextConfig;
