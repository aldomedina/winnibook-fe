// GRAPHQL RELATED
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';

// STYLE RELATED
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/fonts.css';
import Theme from '../components/Theme';
import ColorProvider from '../components/Theme/ColorProvider';

// COMPONENTS
import TopNav from '../components/TopNav';

function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <ColorProvider>
        <ApolloProvider client={client}>
          <TopNav />
          <Component {...pageProps} />
        </ApolloProvider>
      </ColorProvider>
    </Theme>
  );
}

export default MyApp;
