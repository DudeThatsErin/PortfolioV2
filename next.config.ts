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

export default nextConfig;
