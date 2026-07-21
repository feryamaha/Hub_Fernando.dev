import type { NextConfig } from 'next'

// O basePath só é necessário no GitHub Pages, onde o site é servido sob o nome
// do repositório (/Hub_Fernando.dev). Na Vercel (process.env.VERCEL=1) e em
// desenvolvimento o site fica na raiz, então o basePath fica vazio.
const isProd = process.env.NODE_ENV === 'production'
const isVercel = !!process.env.VERCEL
const basePath = isProd && !isVercel ? '/Hub_Fernando.dev' : ''

const nextConfig: NextConfig = {
  // TypeScript 7 removeu a API JS interna que o Next usava para checar tipos.
  // Esta flag instrui o Next a invocar o tsc local diretamente.
  experimental: {
    useTypeScriptCli: true,
  },
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
