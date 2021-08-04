import { useState, useRef, useEffect, useContext, createContext } from 'react';

import HorizontalScroll from 'react-scroll-horizontal';
import { client } from '../apollo/client';
import { useQuery } from '@apollo/client';

import HOME_QUERY from '../apollo/queries/home/allHomeQueries.gql';
import MOST_VISITED from '../apollo/queries/home/mostVisitedLocals.gql';
import MAP_LOCALS from '../apollo/queries/home/mapLocals.gql';

import useWindowSize from '../components/Hooks/useWindowSize';

import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import HomeBackHero from '../components/HomeBackHero';

import SectionWrapper from '../components/Panel/SectionWrapper';
import FeaturedPlaces from '../components/Panel/FeaturedPlaces';
import JoinUs from '../components/Panel/JoinUs';
import Stories from '../components/Panel/Stories';
import Places from '../components/Panel/Places';
import Winnimap from '../components/Panel/Winnimap';

import bottomNavItems from '../content/homeBottomNav';

import { ColorContext } from '../components/Theme';
import Head from '../components/Head';
export const PanelContext = createContext();

const Home = () => {
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [activeSection, setActiveSection] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);
  const selectActiveSection = i => setActiveSection(i);
  const { isMobile } = useWindowSize();

  const topNavRef = useRef(null);
  const panelRef = useRef(null);
  const dummyRef = useRef(null);
  const featuredRef = useRef(null);
  const latestRef = useRef(null);
  const topRef = useRef(null);
  const mapRef = useRef(null);
  const joinUsRef = useRef(null);

  const { data: homeQueryResults, loading: homeQueryLoading } = useQuery(HOME_QUERY, {
    variables: {
      featuredListId: '4ba99eca-ebb8-4e14-86b4-833772b8f74a'
    }
  });
  const { data: mostVisited, loading: mostVisitedLoading } = useQuery(MOST_VISITED);
  const { data: mapLocals, loading: mapsLocalsLoading } = useQuery(MAP_LOCALS);

  useEffect(() => {
    setColorTheme('base');
  }, []);

  const handleBottomNav = (i, name) => {
    setActiveSection(i);
    const panelNode = panelRef.current.childNodes[0].childNodes[0];

    const goTo = ref => {
      let splitted = panelNode.style.cssText.split('translate3d(');
      const currentPos = splitted[1].split('px')[0];
      isMobile
        ? ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        : setScrollValue(-currentPos - ref.current.offsetLeft);
    };

    const allRef = ref =>
      ({
        search: dummyRef,
        featured: featuredRef,
        latest: latestRef,
        top: topRef,
        map: mapRef,
        joinUs: joinUsRef
      }[ref]);
    goTo(allRef(name));
  };

  const panelHeight = isMobile
    ? topNavRef.current?.clientHeight + 50
    : topNavRef.current?.clientHeight;

  return (
    <PanelContext.Provider value={{ selectActiveSection, activeSection }}>
      <Head />
      <div className="h-full w-screen">
        <TopNav reference={topNavRef} showSearch hasBG />

        <HomeBackHero />

        <div
          ref={panelRef}
          className="w-full"
          style={{
            height: 'calc(100vh - ' + panelHeight + 'px)',
            marginTop: '-' + topNavRef.current?.clientHeight + 'px'
          }}
        >
          <HorizontalScroll animValues={scrollValue} reverseScroll>
            <SectionWrapper
              sectionThreshold={0.9}
              i={0}
              reference={dummyRef}
              customClasses="min-w-100vw md:min-w-50vw h-100vh select-none"
            />
            <div className="flex  h-85hv md:h-90vh bg-white rounded-bl-20p shadow-lg">
              <FeaturedPlaces
                reference={featuredRef}
                list={homeQueryResults?.featuredList[0]}
                isLoading={homeQueryLoading}
              />
              <Stories
                reference={latestRef}
                stories={homeQueryResults ? homeQueryResults.stories : []}
                isLoading={homeQueryLoading}
              />
              {mostVisited && (
                <Places
                  reference={topRef}
                  places={mostVisited ? mostVisited.mostVisitedLocals : []}
                  isLoading={mostVisitedLoading}
                />
              )}
              {mapLocals && (
                <Winnimap
                  reference={mapRef}
                  locals={mapLocals ? mapLocals.mapLocals : []}
                  isLoading={mapsLocalsLoading}
                />
              )}
              <JoinUs reference={joinUsRef} />
            </div>
          </HorizontalScroll>
        </div>

        <BottomNav
          active={activeSection}
          items={bottomNavItems}
          handleBottomNav={handleBottomNav}
          onClick={handleBottomNav}
        />
      </div>
    </PanelContext.Provider>
  );
};

export default Home;
