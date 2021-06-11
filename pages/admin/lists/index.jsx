import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';

import GET_ALL_LISTS from '../../../apollo/queries/admin/lists/allLists.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import { ColorContext } from '../../../components/Theme';

const Categories = ({ lists }) => {
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
            <h2 className="text-2xl font-bold">All lists</h2>
          </div>

          <div className="actions">

            {/* <Button 
              title="New list"
              onClick={() => router.push("/admin/new-list")}
            /> */}

          </div>

        </div>
        
        <div class="flex-grow flex border rounded-3xl py-4">
          <table class="table-auto flex-grow h-fit">
            <thead>
              <tr className="border-b">
                <th className="pb-4 px-4 max-w-1/4 text-left">ID</th>
                <th className="pb-4 px-4 text-left">Text</th>
                <th className="pb-4 px-4 text-left">Description</th>
                <th className="pb-4 px-4 text-left">N. of locals</th>
              </tr>
            </thead>

            <tbody>
              {
                lists && lists.map((item) => (
                  <tr className="border-b">
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{item.text}</td>
                    <td className="p-4">{item.description}</td>
                    <td className="p-4">{item.locals_aggregate?.aggregate?.count}</td>
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_LISTS
  });

  // const { colorTheme, setColorTheme } = useContext(ColorContext);
  // setColorTheme(data.winnibook_categories[0].main_category.theme);

  return {
    props: {
      lists: data.winnibook_locals_lists
    }
  };
}

export default Categories;
