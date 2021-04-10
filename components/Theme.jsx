import { ThemeProvider } from "styled-components";

const theme = {
  colors: {},
  fonts: {
    primary: "Lexend",
    secondary: "piazzolla",
  },
  fontSizes: {
    xs: ".75em",
    s: "1em",
    m: "1.25em",
    l: "1.5em",
    xl: "2em",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
