/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "dlcustomguitars.com" }],
        destination: "https://dlcustomguitars.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "frame-src https://dlguitars.prismic.io https://dlgutars.prismic.io https://www.googletagmanager.com; " +
              "script-src 'self' https://static.cdn.prismic.io https://www.googletagmanager.com 'unsafe-inline' 'unsafe-eval'; " +
              "connect-src 'self' https://dlguitars.prismic.io https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com; " +
              "img-src 'self' https://images.prismic.io https://www.googletagmanager.com https://www.google-analytics.com; " +
              "style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
