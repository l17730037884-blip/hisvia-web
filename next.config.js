/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v2/en",
        permanent: false,
      },
      // Slug aliases: the batch-migration names must never 404.
      {
        source: "/v2/:locale/solutions/pneumatic",
        destination: "/v2/:locale/solutions/automation",
        permanent: true,
      },
      {
        source: "/v2/:locale/solutions/mechanical",
        destination: "/v2/:locale/solutions/mechanical-transmission",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
