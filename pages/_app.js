import '../styles/globals.css';
import '../styles/fonts.css';
import Theme from '../components/Theme';
import ColorProvider from '../components/Theme/ColorProvider';
import TopNav from '../components/TopNav';
function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <ColorProvider>
        <TopNav />
        <Component {...pageProps} />
      </ColorProvider>
    </Theme>
  );
}

export default MyApp;
