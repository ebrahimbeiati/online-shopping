/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images-na.ssl-images-amazon.com',
      'media.very.co.uk',
      'storage.beko.co.uk',
      'res.cloudinary.com',
      's3.infra.brandquad.io'
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
