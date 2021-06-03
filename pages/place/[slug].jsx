import { useContext, useEffect, useRef, useState } from 'react';
import { client } from '../../apollo/client';

import GET_LOCAL from '../../apollo/queries/local/localByIdForLocalPage.gql';
import INCREMENT_VISIT from '../../apollo/queries/local/incrementVisit.gql';

import TopNav from '../../components/TopNav';
import PlaceRow from '../../components/PlaceRow';
import { ColorContext } from '../../components/Theme';

const Place = ({ local }) => {
  const headerRef = useRef(null);

  const { colorTheme, setColorTheme } = useContext(ColorContext);

  useEffect(async () => {
    
    setTimeout(() => {
      if (local.main_category) {
        setColorTheme(local.main_category.theme);
      }
    }, 200)

  }, [local]);
  
  return (
    <div className="h-screen">

      <TopNav
        reference={headerRef} 
        hasBG
        showSearch
      />

      {
        local ?
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

export async function getServerSideProps({ params: { slug } }) {
  const { data } = await client.query({
    query: GET_LOCAL,
    variables: {
      localId: slug
    }
  });

  const { dataInc } = await client.mutate({
    mutation: INCREMENT_VISIT,
    variables: {
      localId: slug
    }
  });

  // const { colorTheme, setColorTheme } = useContext(ColorContext);
  // setColorTheme(data.winnibook_locals[0].main_category.theme);

  return {
    props: {
      local: data.winnibook_locals[0]
    }
  };
}

export default Place;
