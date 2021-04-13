import { ThemeProvider, css } from 'styled-components';

export const themeConfig = {
  colors: {
    base: {
      'bg-primary': '#FFFFFF',
      'bg-secondary': '#F7F7F7',
      primary: '#103B40'
    },
    beige: {
      'bg-primary': '#FBF4E1',
      'bg-secondary': '#FBF4E1',
      primary: '#F86900'
    },
    'dark-green': {
      'bg-primary': '#103B40',
      'bg-secondary': '#103B40',
      primary: '#BDDEDF'
    }
  },
  fonts: {
    primary: 'Lexend',
    secondary: 'piazzolla'
  },
  fontSize: {
    xs: '.75em',
    sm: '1em',
    md: '1.25em',
    lg: '1.5em',
    xl: '2em'
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  }
};

export const mediaQueries = (key, bigger) => {
  return style =>
    `@media (${bigger ? 'min-width' : 'max-width'}: ${
      themeConfig.breakpoints[key]
    }px) { ${style} }`;
};

const Theme = ({ children }) => <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>;

export default Theme;
