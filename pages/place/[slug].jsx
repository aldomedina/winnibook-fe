import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'

import TopNav from '../../components/TopNav';
import PlaceRow from '../../components/PlaceRow';
import { ColorContext } from '../../components/Theme';
import getPlaceDetails from '../../mock/place';

const Place = ({ placeData }) => {
  const router = useRouter();

  const { setColorTheme } = useContext(ColorContext);

  const headerRef = useRef(null);

  useEffect(() => {
    placeData?.theme && setColorTheme(placeData.theme);
  }, []);
  return (
    <div className="bg-white h-full">

      <TopNav
        reference={headerRef} 
        hasBG
      />

      {
        placeData ?
        <div
          className={`
            scrollbar-hide 
            overflow-y-hidden
          `}
        >
          <PlaceRow
            place={placeData}
            openPlace={true}
            setOpenPlace={() => {}}
            isSingle={true}
          />
        </div>
        : ""
      }
      
    </div>
  );
};

export async function getStaticPaths() {
  // 🚨  MOCK ALERT 🚨
  // TODO: create method to fetch all places slugs
  const paths = [
    
  ];
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }) {
  // 🚨  MOCK ALERT 🚨
  // TODO: create method to fetch story by slug
  console.log(slug);
  const placeData = getPlaceDetails(slug);
  return {
    props: {
      placeData
    }
  };
}

export default Place;
