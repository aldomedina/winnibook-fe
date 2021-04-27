// GRAPHQL RELATED
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import { useRouter } from 'next/router';

// STYLE RELATED
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/fonts.css';
import Theme from '../components/Theme';
import ColorProvider from '../components/Theme/ColorProvider';

// COMPONENTS
import TopNav from '../components/TopNav';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const showSearch = pathname === '/' ? true : false;
  const topNavBG = pathname === '/places' ? true : false;
  return (
    <Theme>
      <ColorProvider>
        <ApolloProvider client={client}>
          <TopNav showSearch={showSearch} hasBG={topNavBG} />
          <Component {...pageProps} />
        </ApolloProvider>
      </ColorProvider>
    </Theme>
  );
}

export default MyApp;
