import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { initializeClient } from '../../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_ALL_LOCALS_FOR_REVIEW from '../../../../apollo/queries/admin/locals/getAllLocalsForReview.gql';

import AdminHeader from '../../../../components/AdminHeader';
import Button from '../../../../components/Button';
import Tag from '../../../../components/Tag';

import { ColorContext } from '../../../../components/Theme';

const Locals = ({ locals }) => {
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
            <h2 className="text-2xl font-bold">Review locals</h2>
          </div>

        </div>
        
        <div className="flex-grow flex border rounded-3xl py-4">
          <table className="table-auto flex-grow h-fit">
            <thead>
              <tr className="border-b">
                <th className="pb-4 px-4 text-left">Name</th>
                <th className="pb-4 px-4 text-left">Main Category</th>
                <th className="pb-4 px-4 text-left">Categories</th>
                <th className="pb-4 px-4 text-left">Tags</th>
              </tr>
            </thead>

            <tbody>
              {
                locals && locals.map((item) => (
                  <tr 
                    className="border-b cursor-pointer hover:bg-white hover:bg-opacity-25"
                    onClick={() => router.push("/admin/local/" + item.id)}
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap">
                        <Tag key={item?.main_category.id} name={item?.main_category.name} theme={item?.main_category.theme} tagInfo={item.main_category} small />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap">
                        {
                          item.categories.map((itemCategories) => (
                            <Tag key={itemCategories.category?.id} name={itemCategories.category?.name} theme={itemCategories.category?.theme} tagInfo={itemCategories.category} small />
                          ))
                        }
                      </div>
                    </td>
                    <td className="p-4">
                      {
                        item.tags.map((itemTags) => (
                          <Tag key={itemTags.tag?.id} name={itemTags.tag?.name} filterTag small />
                        ))
                      }
                    </td>
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
  const client = await initializeClient(req, res);

  const { data } = await client.query({
    query: GET_ALL_LOCALS_FOR_REVIEW
  });

  // const { colorTheme, setColorTheme } = useContext(ColorContext);
  // setColorTheme(data.winnibook_locals[0].main_category.theme);

  return {
    props: {
      locals: data.winnibook_locals
    }
  };
}

export default withPageAuthRequired(Locals);
