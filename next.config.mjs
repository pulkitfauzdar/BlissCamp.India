/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve photos straight from Unsplash's CDN (already sized via ?w=).
    // Next's own optimizer crashes on Render's free instance (502s).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
