import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';

import GET_LOCAL from '../../apollo/queries/local/localByIdForLocalPage.gql';

import TopNav from '../../components/TopNav';
import PlaceRow from '../../components/PlaceRow';
import { ColorContext } from '../../components/Theme';
import getPlaceDetails from '../../mock/place';

const Place = ({ placeData }) => {
  const router = useRouter();

  const { colorTheme, setColorTheme } = useContext(ColorContext);
  const headerRef = useRef(null);

  const [local, setLocal] = useState({});
  const {data: localQueryResponse, loading} = useQuery(GET_LOCAL, {
    variables: {
      localId: router.query.slug
    }
  });

  useEffect(() => {
    if (localQueryResponse) {
      setLocal(localQueryResponse.winnibook_locals[0]);
    }
  }, [localQueryResponse]);

  useEffect(async () => {
    
    if (placeData) {
      // setColorTheme(placeData.theme);
      console.log(placeData.theme, colorTheme);
    }

  }, [placeData]);
  
  return (
    <div className="bg-white h-full">

      <TopNav
        reference={headerRef} 
        hasBG
        showSearch
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
            place={local}
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
  const paths = [];
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
