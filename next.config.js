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
};

module.exports = nextConfig;
