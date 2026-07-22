import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

/**
 * Fonte única de verdade das cores base do design system Finder/macOS.
 * Os HEX vivem SOMENTE aqui; o resto do app fala por token semântico.
 */
export const FINDER_BASE = {
  window: '#1e1e1e',
  sidebar: '#252526',
  sidebarTranslucent: 'rgba(37, 37, 38, 0.82)',
  header: '#262627',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#3e3e3e',
  search: 'rgba(255, 255, 255, 0.1)',
  icon: '#9a9a9f',
  folder: '#2196f3',
  controlClose: '#ff5f57',
  controlMinimize: '#febc2e',
  controlMaximize: '#28c840',
} as const

/**
 * Temas de accent com paleta oficial do macOS (9 cores).
 * accentContrast determinado por contraste WCAG AA.
 */
export const FINDER_THEMES = {
  blue: { accent: '#73D7FF', accentContrast: '#000000', hover: 'rgba(115, 215, 255, 0.1)' },
  green: { accent: '#72E2AD', accentContrast: '#000000', hover: 'rgba(114, 226, 173, 0.1)' },
  'green-lime': { accent: '#7CF08E', accentContrast: '#000000', hover: 'rgba(124, 240, 142, 0.1)' },
  yellow: { accent: '#FCDB65', accentContrast: '#000000', hover: 'rgba(252, 219, 101, 0.1)' },
  orange: { accent: '#FBBC66', accentContrast: '#000000', hover: 'rgba(251, 188, 102, 0.1)' },
  red: { accent: '#FF685F', accentContrast: '#000000', hover: 'rgba(255, 104, 95, 0.1)' },
  purple: { accent: '#CA81E4', accentContrast: '#000000', hover: 'rgba(202, 129, 228, 0.1)' },
  gray: { accent: '#C6C6C6', accentContrast: '#000000', hover: 'rgba(198, 198, 198, 0.1)' },
  black: { accent: '#575757', accentContrast: '#ffffff', hover: 'rgba(87, 87, 87, 0.1)' },
} as const

const themeEntries = Object.entries(FINDER_THEMES)

/** Blocos `.theme-<nome>` gerados a partir de FINDER_THEMES. */
const themeBlocks = Object.fromEntries(
  themeEntries.map(([name, value]) => [
    `.theme-${name}`,
    {
      '--finder-accent': value.accent,
      '--finder-accent-contrast': value.accentContrast,
      '--finder-hover': value.hover,
    },
  ])
)

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'finder-window': 'var(--finder-window)',
        'finder-sidebar': 'var(--finder-sidebar)',
        'finder-header': 'var(--finder-header)',
        'finder-text': 'var(--finder-text)',
        'finder-text-secondary': 'var(--finder-text-secondary)',
        'finder-hover': 'var(--finder-hover)',
        'finder-accent': 'var(--finder-accent)',
        'finder-accent-contrast': 'var(--finder-accent-contrast)',
        'finder-border': 'var(--finder-border)',
        'finder-search': 'var(--finder-search)',
        'finder-icon': 'var(--finder-icon)',
        'finder-folder': 'var(--finder-folder)',
        'finder-control-close': 'var(--finder-control-close)',
        'finder-control-minimize': 'var(--finder-control-minimize)',
        'finder-control-maximize': 'var(--finder-control-maximize)',
      },
      fontFamily: {
        finder: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        sidebar: '155px',
      },
      borderRadius: {
        control: '50%',
      },
      boxShadow: {
        control: '0 0 0 1px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        folder: "url('/icons/icons8-mac-folder-96.png')",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out infinite',
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [
    plugin(({ addBase, addUtilities, theme }) => {
      addBase({
        ':root': {
          '--finder-window': FINDER_BASE.window,
          '--finder-sidebar': FINDER_BASE.sidebar,
          '--finder-sidebar-translucent': FINDER_BASE.sidebarTranslucent,
          '--finder-header': FINDER_BASE.header,
          '--finder-text': FINDER_BASE.text,
          '--finder-text-secondary': FINDER_BASE.textSecondary,
          '--finder-border': FINDER_BASE.border,
          '--finder-search': FINDER_BASE.search,
          '--finder-icon': FINDER_BASE.icon,
          '--finder-folder': FINDER_BASE.folder,
          '--finder-control-close': FINDER_BASE.controlClose,
          '--finder-control-minimize': FINDER_BASE.controlMinimize,
          '--finder-control-maximize': FINDER_BASE.controlMaximize,
          '--finder-accent': FINDER_THEMES.blue.accent,
          '--finder-accent-contrast': FINDER_THEMES.blue.accentContrast,
          '--finder-hover': FINDER_THEMES.blue.hover,
        },
        ...themeBlocks,
        html: {
          'font-family':
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          'background-color': theme('colors.finder-window'),
        },
        body: {
          margin: '0',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'background-color': theme('colors.finder-window'),
          color: theme('colors.finder-text'),
        },
        'code, pre, kbd': {
          'font-family': '"SF Mono", ui-monospace, Menlo, Consolas, monospace',
        },
        button: {
          cursor: 'pointer',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '[data-aos]': {
            opacity: '1 !important',
            transform: 'none !important',
            transition: 'none !important',
            animation: 'none !important',
          },
          '*': {
            'animation-duration': '0.01ms !important',
            'transition-duration': '0.01ms !important',
          },
        },
      })

      addUtilities({
        /* Fonte de identidade (pixel/DOS) usada em destaques pontuais */
        '.font-modern-dos-400': {
          'font-family': '"modern-dos-400", monospace',
        },
        '.font-modern-dos-900': {
          'font-family': '"modern-dos-900", monospace',
        },

        /* Janela estilo macOS reutilizável (cards, seções) */
        '.mac-window': {
          'background-color': theme('colors.finder-sidebar'),
          border: `1px solid ${theme('colors.finder-border')}`,
          'border-radius': '12px',
          'box-shadow':
            '0 18px 40px -16px rgba(0, 0, 0, 0.55), inset 0 0 0 0.5px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
        },
        '.mac-window-titlebar': {
          display: 'flex',
          'align-items': 'center',
          gap: '8px',
          padding: '9px 12px',
          'background-color': theme('colors.finder-header'),
          'border-bottom': `1px solid ${theme('colors.finder-border')}`,
        },
        '.mac-window-title': {
          flex: '1',
          'text-align': 'center',
          'font-size': '12px',
          color: theme('colors.finder-text-secondary'),
          /* compensa a largura dos 3 controles para centralizar de fato */
          'margin-right': '52px',
          'white-space': 'nowrap',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },

        /* Scrollbar fina no tom do Finder */
        '.scrollbar-finder': {
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme('colors.finder-text-secondary')} ${theme('colors.finder-window')}`,
        },
        '.scrollbar-finder::-webkit-scrollbar': {
          width: '8px',
        },
        '.scrollbar-finder::-webkit-scrollbar-track': {
          background: theme('colors.finder-window'),
        },
        '.scrollbar-finder::-webkit-scrollbar-thumb': {
          'background-color': theme('colors.finder-text-secondary'),
          'border-radius': '4px',
        },

        /* Vibrancy da sidebar (translucidez estilo macOS).
           O fallback sólido fica ANINHADO aqui de propósito: precisa viver na
           mesma camada (utilities) e depois da regra translúcida, senão ela
           vence sempre. addUtilities do Tailwind v4 recusa `@supports` como
           chave de topo, então o aninhamento é a única forma correta. */
        '.sidebar-vibrancy': {
          'background-color': 'var(--finder-sidebar-translucent)',
          'backdrop-filter': 'blur(18px) saturate(1.4)',
          '-webkit-backdrop-filter': 'blur(18px) saturate(1.4)',
          '@supports not (backdrop-filter: blur(1px))': {
            'background-color': theme('colors.finder-sidebar'),
          },
        },

        /* Spotlight (busca ⌘K / ⌘F) */
        '.spotlight-overlay': {
          position: 'fixed',
          inset: '0',
          'background-color': 'rgba(0, 0, 0, 0.45)',
          'backdrop-filter': 'blur(2px)',
          '-webkit-backdrop-filter': 'blur(2px)',
          'z-index': '80',
          display: 'flex',
          'align-items': 'flex-start',
          'justify-content': 'center',
          'padding-top': '18vh',
        },
        '.spotlight-panel': {
          width: 'min(560px, 92vw)',
          'background-color': theme('colors.finder-sidebar'),
          border: `1px solid ${theme('colors.finder-border')}`,
          'border-radius': '12px',
          'box-shadow':
            '0 30px 60px -12px rgba(0, 0, 0, 0.7), inset 0 0 0 0.5px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
        },
        '.spotlight-input': {
          width: '100%',
          'background-color': 'transparent',
          border: 'none',
          outline: 'none',
          color: theme('colors.finder-text'),
          'font-size': '15px',
        },
        '.spotlight-input::placeholder': {
          color: theme('colors.finder-text-secondary'),
        },
        '.spotlight-item': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
          color: theme('colors.finder-text'),
          cursor: 'pointer',
          'border-radius': '8px',
        },
        '.spotlight-item.active': {
          background: theme('colors.finder-accent'),
          color: theme('colors.finder-accent-contrast'),
        },

        /* RotatingText */
        '.text-rotate': {
          display: 'flex',
          'flex-wrap': 'wrap',
          'white-space': 'pre-wrap',
          position: 'relative',
        },
        '.text-rotate-sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          border: '0',
        },
        '.text-rotate-word': {
          display: 'inline-flex',
        },
        '.text-rotate-lines': {
          display: 'flex',
          'flex-direction': 'column',
          width: '100%',
        },
        '.text-rotate-element': {
          display: 'inline-block',
        },
        '.text-rotate-space': {
          'white-space': 'pre',
        },

        /* TrueFocus (shared) */
        '.focus-container': {
          position: 'relative',
          display: 'flex',
          gap: '1em',
          'justify-content': 'center',
          'align-items': 'center',
          'flex-wrap': 'wrap',
        },
        '.focus-word': {
          position: 'relative',
          'font-size': '3rem',
          'font-weight': '900',
          cursor: 'pointer',
          transition: 'filter 0.3s ease, color 0.3s ease',
        },
        '.focus-word.active': {
          filter: 'blur(0)',
        },
        '.focus-frame': {
          position: 'absolute',
          top: '0',
          left: '0',
          'pointer-events': 'none',
          'box-sizing': 'content-box',
          border: 'none',
        },
        '.corner': {
          position: 'absolute',
          width: '1rem',
          height: '1rem',
          border: '3px solid var(--border-color, #fff)',
          filter: 'drop-shadow(0px 0px 4px var(--border-color, #fff))',
          'border-radius': '3px',
          transition: 'none',
        },
        '.top-left': {
          top: '-10px',
          left: '-10px',
          'border-right': 'none',
          'border-bottom': 'none',
        },
        '.top-right': {
          top: '-10px',
          right: '-10px',
          'border-left': 'none',
          'border-bottom': 'none',
        },
        '.bottom-left': {
          bottom: '-10px',
          left: '-10px',
          'border-right': 'none',
          'border-top': 'none',
        },
        '.bottom-right': {
          bottom: '-10px',
          right: '-10px',
          'border-left': 'none',
          'border-top': 'none',
        },
      })
    }),
  ],
}

export default config
