/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/attractions",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["www.taiwan.net.tw"],
  },
};
