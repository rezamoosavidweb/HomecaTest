/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['src'],
    },
    reactStrictMode: true,
    swcMinify: true,

    experimental: {
        scrollRestoration: true,
    },
    images: {
        domains: ['statics.basalam.com'],
    },
    // SVGR
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        typescript: true,
                        icon: true,
                    },
                },
            ],
        });

        return config;
    },
};

module.exports = nextConfig;
