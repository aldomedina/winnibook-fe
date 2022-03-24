import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import NProgress from 'nprogress';
import Head from 'next/head';

// GOOGLE ANALYTICS
import * as ga from '../lib/ga';

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

// Loader between page transitions
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const { events, pathname } = useRouter();

  const showSearch = pagesWithSearch.indexOf(pathname) >= 0 ? true : false;
  const topNavBG = pagesWithNavBG.indexOf(pathname) >= 0 ? true : false;

  const [apolloClient, setAppoloClient] = useState(client);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [events]);

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
