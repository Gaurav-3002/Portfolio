/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon/**',
      },
      {
        protocol: 'https', 
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Allow cross-origin requests for preview domains
  allowedDevOrigins: [
    'f93fa47a-0c8f-41fb-90c4-0713d46d8a1c.preview.emergentagent.com',
    'preview.emergentagent.com'
  ],
}

module.exports = nextConfig