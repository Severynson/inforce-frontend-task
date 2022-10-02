/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "freesvg.org",
      "upload.wikimedia.org",
      "m.media-amazon.com",
      "res.cloudinary.com",
    ],
  },
  env: {
    DB_HOST: "http://localhost:3001",
    API_HOST: "http://localhost:3000/api",
  },
};

module.exports = nextConfig;
