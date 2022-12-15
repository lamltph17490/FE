/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {

    remotePatterns: [
      {
        // protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // protocol: '',
        hostname: 'taxreform.dof.gov.ph',
      },
     
    ],
  },
}

module.exports = nextConfig
