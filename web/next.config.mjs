/** @type {import('next').NextConfig} */
const nextConfig = {
  // All routes are statically generated at build time (see generateStaticParams),
  // so the daily reports in ../reports are read during the build and baked into
  // the HTML. No runtime file access is needed.
};

export default nextConfig;
