// GRAPHQL RELATED
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
// import { UserProvider } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

// STYLE RELATED
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../styles/fonts.css';
import Theme from '../components/Theme';

// COMPONENTS
// import TopNav from '../components/TopNav';

const pagesWithSearch = ['/', '/story/[slug]', '/place/[slug]'];
const pagesWithNavBG = ['/places', '/stories', '/story/[slug]', '/join-us'];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const showSearch = pagesWithSearch.indexOf(pathname) >= 0 ? true : false;
  const topNavBG = pagesWithNavBG.indexOf(pathname) >= 0 ? true : false;

  return (
    <Theme>
      {/* <UserProvider> */}
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      {/* </UserProvider> */}
    </Theme>
  );
}

export default MyApp;
