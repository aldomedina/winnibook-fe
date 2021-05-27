// GRAPHQL RELATED
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import { useRouter } from 'next/router';

// STYLE RELATED
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/fonts.css';
import Theme from '../components/Theme';

// COMPONENTS
// import TopNav from '../components/TopNav';

const pagesWithSearch = ['/', '/stories/[slug]', '/places/[slug]'];
const pagesWithNavBG = ['/places', '/stories', '/stories/[slug]', '/join-us'];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const showSearch = pagesWithSearch.indexOf(pathname) >= 0 ? true : false;
  const topNavBG = pagesWithNavBG.indexOf(pathname) >= 0 ? true : false;

  return (
    <Theme>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Theme>
  );
}

export default MyApp;
