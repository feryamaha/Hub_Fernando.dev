import type { NextConfig } from 'next'

// Em produção (build/deploy no GitHub Pages) o site fica sob /Hub_Fernando.dev.
// Em desenvolvimento usamos basePath vazio para que `bun dev` funcione em
// http://localhost:3000/ sem 404.
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/Hub_Fernando.dev' : ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
