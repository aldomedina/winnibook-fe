module.exports = {
  purge: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  important: false,
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
        13: '3.25rem',
        22: '5.5rem',
        152: '38rem',
        136: '34rem',
        '10vh': '10vh',
        '15vh': '15vh',
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
        '5vw': '5vw',
        '10vw': '10vw',
        '15vw': '15vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '85vw': '85vw',
        '90vw': '90vw',
        '100vw': '100vw'
      },
      minWidth: {
        '1p': '1px',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        44: '11rem',
        '1/2': '50%',
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
      height: {
        fit: 'fit-content'
      },
      minHeight: {
        '1p': '1px',
        '40p': '40px',
        14: '3.5rem',
        16: '4rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        44: '11rem',
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
        28: '7rem',
        44: '11rem',
        136: '34rem',
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
        28: '7rem',
        40: '10rem',
        45: '12rem',
        136: '34rem',
        152: '38rem',
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
        '100vw': '100vw',
        '1/4': '25%',
        '1/3': '33.3%',
        '1/2': '50%'
      },
      zIndex: {
        '-10': '-10'
      },
      borderRadius: {
        '50p': '50px',
        '20p': '20px'
      },
      fontSize: {
        '2xs': '.6rem',
        '3xs': '.5rem',
        '10xl': '10rem'
      },
      boxShadow: {
        reverse: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)'
      },
      colors: {
        base: '#103b40'
      },
      gridTemplateColumns: {
        filters: 'max-content auto max-content',
        'filters-small': 'auto 40px'
      },
      gridTemplateRows: {
        filters: 'max-content auto'
      },
      gridAutoRows: {
        stories: 'minmax(250px, max-content)'
      }
    }
  },
  variants: {
    extend: {
      zIndex: ['hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms')
  ],
  corePlugins: {
    borderColor: false
  }
};
