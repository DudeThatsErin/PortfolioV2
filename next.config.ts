import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/reactauthstatedemo',
        destination: '/reactauthstatedemo/index.html',
      },
      {
        source: '/reactauthstatedemo/',
        destination: '/reactauthstatedemo/index.html',
      },
    ];
  },
};

module.exports = {
  allowedDevOrigins: ['127.0.0.1'],
}

export default nextConfig;
