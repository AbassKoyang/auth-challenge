/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
    domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
    config.experiments = {
    ...config.experiments,
    topLevelAwait: true,
    }
    return config
    }
    }
    
    module.exports = nextConfig;