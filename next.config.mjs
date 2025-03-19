/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "books.google.com" }, { hostname: "storage.googleapis.com" }],
  },
  eslint: { dirs: ["src/app", "src/libs"] },
};

export default nextConfig;
