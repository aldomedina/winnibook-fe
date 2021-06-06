import { useContext, useEffect, useRef, useState } from 'react';
import { client } from '../../apollo/client';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';

import GET_TERMS_AND_CONDITIONS from '../../apollo/queries/misc/getTermsAndConditions.gql';

import TopNav from '../../components/TopNav';

import { ColorContext } from '../../components/Theme';

const Terms = ({termsAndConditions}) => {
  const router = useRouter();

  const { colorTheme, setColorTheme } = useContext(ColorContext);
  const headerRef = useRef(null);
  
  return (
    <div className="bg-white h-full">

      <TopNav
        reference={headerRef} 
        hasBG
        showSearch
      />

      <div className="px-3 md:px-5 pt-5">

        <p className="leading-normal">
          <pre>
            {termsAndConditions?.content}
          </pre>
        </p>

      </div>
      
    </div>
  );
};

export async function getServerSideProps(context) {

  const { data } = await client.query({
    query: GET_TERMS_AND_CONDITIONS,
  });

  console.log(data);

  return {
    props: {
      termsAndConditions: data.winnibook_misc[0]
    }
  };
}

export default Terms;
