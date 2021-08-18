import { useContext, useEffect, useRef, useState } from 'react';
import { client } from '../../apollo/client';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import GET_TERMS_AND_CONDITIONS from '../../apollo/queries/misc/getTermsAndConditions.gql';

import TopNav from '../../components/TopNav';
import Head from '../../components/Head';

import { ColorContext } from '../../components/Theme';

const Terms = ({ termsAndConditions }) => {
  const router = useRouter();

  const { colorTheme, setColorTheme } = useContext(ColorContext);
  const headerRef = useRef(null);

  return (
    <div className="bg-white h-full">
      <Head title="Terms of use" />
      <TopNav reference={headerRef} hasBG showSearch />

      <div className="px-3 md:px-5 pt-5">
        <h1 className="block mx-auto max-w-max text-3xl my-7 md:my-12 uppercase">Terms of Use</h1>
        <div className="block mx-auto max-w-max pb-12">
          <p className="leading-normal">
            <pre
              className="text-justify whitespace-pre-wrap"
              style={{
                wordWrap: 'break-word'
              }}
            >
              {termsAndConditions?.content}
            </pre>
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GET_TERMS_AND_CONDITIONS
  });

  return {
    props: {
      termsAndConditions: data.winnibook_misc[0]
    }
  };
}

export default Terms;
