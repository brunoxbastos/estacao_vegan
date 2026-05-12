/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './src/ts/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        'verde-agua':     '#2D8C72',
        'laranja':        '#F5A05A',
        'off-white':      '#FAFAF2',
        'verde-floresta': '#1A3D2E',
        'verde-menta':    '#E8F5EE',
      },
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        onest:    ['Onest', 'sans-serif'],
        alike:    ['Alike', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'brand': '0 8px 32px rgba(45, 140, 114, 0.15)',
        'laranja': '0 8px 24px rgba(245, 160, 90, 0.35)',
      },
    },
  },
  plugins: [],
}
