import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        navy: 'var(--navy)',
        'navy-deep': 'var(--navy-deep)',
        teal: 'var(--teal)',
        'teal-ink': 'var(--teal-ink)',
        'teal-pale': 'var(--teal-pale)',
        gold: 'var(--gold)',
        line: 'var(--line)',
        'footer-text': 'var(--footer-text)',
        'footer-text-dim': 'var(--footer-text-dim)',
        'footer-link': 'var(--footer-link)',
        'footer-border': 'var(--footer-border)',
        'footer-muted': 'var(--footer-muted)',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],

      },
    },
  },
}