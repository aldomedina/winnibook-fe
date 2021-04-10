import "../styles/globals.css";
import "../styles/fonts.css";
import Theme from "../components/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
