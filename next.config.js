/** @type {import('next').NextConfig} */

const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!apiUrl) {
  throw new Error("❌ Missing NEXT_PUBLIC_WORDPRESS_API_URL in your environment.");
}

const { hostname, protocol } = new URL(apiUrl);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(":", ""),
        hostname,
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
