/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
