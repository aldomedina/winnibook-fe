import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// GRAPHQL RELATED
import { ApolloProvider } from '@apollo/client';
import { client, initializeClient } from '../apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';

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

  const [apolloClient, setAppoloClient] = useState(client); 

  useEffect(async () => {
    try {
      const res = await axios.get('/api/accessToken');

      console.log(res);

      const newAppoloClient = await initializeClient(false, false, res.data);
      setAppoloClient(newAppoloClient);
    } catch (error) {
      console.log(error.status, error.message);
    }
  }, []);

  return (
    <Theme>
      <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
      </UserProvider>
    </Theme>
  );
}

export default MyApp;
