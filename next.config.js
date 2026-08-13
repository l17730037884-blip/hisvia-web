/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v2/en",
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
