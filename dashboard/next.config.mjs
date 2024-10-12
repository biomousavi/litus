/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverRuntimeConfig: {
    // Will only be available on the server side
    URI: 'http://service:4000'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    URI: 'http://localhost:4000'
  }
};

export default nextConfig;
