/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "books.google.com" },
      { hostname: "storage.googleapis.com" },
      { hostname: "covers.openlibrary.org" },
    ],
    minimumCacheTTL: 5184000,
    qualities: [20],
  },
};

export default nextConfig;
