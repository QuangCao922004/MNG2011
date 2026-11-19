const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/MNG2011" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

