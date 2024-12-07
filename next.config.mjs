/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "books.google.com" }, { hostname: "storage.googleapis.com" }],
  },
};

export default nextConfig;
