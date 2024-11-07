import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //   i18n: {
  //   locales: ["he", "en"],
  //   defaultLocale: "he",
  // },
};

export default withNextVideo(nextConfig, { folder: 'images' });