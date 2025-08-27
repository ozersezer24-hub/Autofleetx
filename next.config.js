/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const ContentSecurityPolicy = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.paytr.com *.iyzico.com *.iyzipay.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://.supabase.co https://.paytr.com https://.iyzico.com https://.iyzipay.com",
      "frame-src 'self' https://www.paytr.com https://*.iyzico.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://www.paytr.com https://*.iyzico.com"
    ].join('; ');
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
          { key: "Content-Security-Policy", value: ContentSecurityPolicy }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
