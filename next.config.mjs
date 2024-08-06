/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'd3tzq0axgoep76.cloudfront.net',
          port: '',
          pathname: '/**'
        }]
    },
};

export default nextConfig;
