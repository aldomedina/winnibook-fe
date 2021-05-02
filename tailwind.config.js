module.exports = {
  purge: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  important: true,
  theme: {
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      serif: ['piazzolla', 'ui-serif', 'Georgia']
    },
    container: {
      center: true,
      padding: '1rem'
    },
    borderColor: theme => ({
      DEFAULT: theme('currentColor')
    }),
    extend: {
      spacing: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '35vh': '35vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '55vh': '55vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '85vh': '85vh',
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
        '1p': '1px',
        32: '8rem',
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '45vw': '45vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '90vw': '90vw',
        '100vw': '100vw'
      },
      minHeight: {
        '1p': '1px',
        16: '4rem',
        32: '8rem',
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '45vh': '45vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh'
      },
      maxHeight: {
        '1p': '1px',
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '45vh': '45vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh'
      },
      maxWidth: {
        '1p': '1px',
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '45vw': '45vw',
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
      },
      fontSize: {
        xxs: '.5rem'
      },
      boxShadow: {
        reverse: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)'
      },
      colors: {
        base: '#103b40'
      }
    }
  },
  variants: {
    extend: {
      zIndex: ['hover']
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar-hide')],
  corePlugins: {
    borderColor: false
  }
};
