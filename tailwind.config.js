module.exports = {
  purge: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      serif: ['piazzolla', 'ui-serif', 'Georgia']
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      spacing: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh',
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '90vw': '90vw',
        '100vw': '100vw'
      },
      minWidth: {
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '90vw': '90vw',
        '100vw': '100vw'
      },
      zIndex: {
        '-10': '-10'
      },
      borderRadius: {
        '50p': '50px',
        '20p': '20px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    borderColor: false
  }
};
