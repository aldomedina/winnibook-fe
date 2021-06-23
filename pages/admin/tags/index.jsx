import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { initializeClient } from '../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_ALL_TAGS from '../../../apollo/queries/admin/tags/allTags.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import { ColorContext } from '../../../components/Theme';

const Tags = ({ tags }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col flex-grow p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">All tags</h2>
          </div>

          <div className="actions">

            <Button 
              title="New tag"
              onClick={() => router.push("/admin/tag/new")}
            />

          </div>

        </div>
        
        <div className="flex-grow flex border rounded-3xl py-4">
          <table className="table-auto flex-grow h-fit">
            <thead>
              <tr className="border-b">
                <th className="pb-4 px-4 w-1/3 text-left">ID</th>
                <th className="pb-4 px-4 text-left">Name</th>
              </tr>
            </thead>

            <tbody>
              {
                tags && tags.map((item) => (
                  <tr 
                    className="border-b cursor-pointer hover:bg-white hover:bg-opacity-25"
                    onClick={() => router.push("/admin/tag/" + item.id)}
                  >
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{item.name}</td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  try {
    const client = await initializeClient(req, res);

    const { data } = await client.query({
      query: GET_ALL_TAGS,
    });
  
    return {
      props: {
        tags: data.winnibook_tags
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
}

export default withPageAuthRequired(Tags);
