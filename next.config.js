/** @type {import('next').NextConfig} */

// Safely parse hostname + protocol from your WordPress API URL
const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!apiUrl) {
  throw new Error("❌ Missing NEXT_PUBLIC_WORDPRESS_API_URL in your environment.");
}

const { hostname, protocol } = new URL(apiUrl); // extract from full URL

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol.replace(":", ""), // "http:" → "http"
        hostname,                            // e.g. "commercial-example-site.local"
        port: "",
        pathname: "/**",                     // allow all image paths
      },
    ],
  },
};

module.exports = nextConfig;
