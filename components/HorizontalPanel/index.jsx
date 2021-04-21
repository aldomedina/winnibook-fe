import { useState, useRef, createContext } from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';

import FeaturedPlaces from './FeaturedPlaces';
import JoinUs from './JoinUs';
import Stories from './Stories';
import Places from './Places';
import Winnimap from './Winnimap';
import BottomNav from '../BottomNav';
import bottomNavItems from './BottomNavItems';
import useWindowSize from '../Hooks/useWindowSize';
import SectionWrapper from './SectionWrapper';

const Panel = styled(animated.div)`
  height: ${({ $panelHeight }) => `${$panelHeight - 100}px`};
  @media (max-width: 768px) {
    height: ${({ $panelHeight }) => `${$panelHeight - 60}px`};
  }
`;

export const SectionContext = createContext();

const HorizontalPanel = ({ panelRef }) => {
  const [activeSection, setActiveSection] = useState(0);
  const { height } = useWindowSize();
  const panelHeight = height;
  const selectActiveSection = i => setActiveSection(i);
  // Scroll to section
  const dummyRef = useRef(null);
  const featuredRef = useRef(null);
  const latestRef = useRef(null);
  const topRef = useRef(null);
  const mapRef = useRef(null);
  const joinUsRef = useRef(null);
  const handleBottomNav = (i, name) => {
    setActiveSection(i);
    const goTo = ref =>
      ref === 'search'
        ? panelRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        : ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const allRef = ref =>
      ({
        search: 'search',
        featured: featuredRef,
        latest: latestRef,
        top: topRef,
        map: mapRef,
        joinUs: joinUsRef
      }[ref]);

    goTo(allRef(name));
  };

  return (
    <SectionContext.Provider value={{ selectActiveSection, activeSection }}>
      <div className="flex">
        <SectionWrapper
          sectionThreshold={0.3}
          i={0}
          reference={dummyRef}
          customClasses="min-w-10vw h-50vh  select-none"
        />
        <Panel
          $panelHeight={panelHeight}
          className="relative flex bg-white min-w-max rounded-b-20p md:rounded-b-50p ml-75vw md:ml-40vw shadow-xl"
        >
          <FeaturedPlaces reference={featuredRef} />
          <Stories reference={latestRef} />
          <Places reference={topRef} />
          <Winnimap reference={mapRef} />
          <JoinUs reference={joinUsRef} />
        </Panel>
        <div className="min-w-50vw h-50vh select-none"></div>
      </div>
      <BottomNav
        active={activeSection}
        items={bottomNavItems}
        setActiveSection={handleBottomNav}
        onClick={handleBottomNav}
      />
    </SectionContext.Provider>
  );
};

export default HorizontalPanel;
