import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';

import GET_ALL_LOCALS from '../../../apollo/queries/admin/locals/getAllLocals.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import { ColorContext } from '../../../components/Theme';

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
            <h2 className="text-2xl font-bold">All locals</h2>
          </div>

          <div className="actions">

            <Button 
              title="New local"
              onClick={() => router.push("/admin/local/new")}
            />

          </div>

        </div>

        <div className="w-full flex justify-between items-center border-4 rounded-3xl p-4 mb-4 bg-white bg-opacity-25">

          <div>
            <h2 className="font-bold">1 review pending</h2>
          </div>

          <div className="actions">

            <Button 
              title="Review locals"
              onClick={() => router.push("/admin/local/new")}
            />

          </div>

        </div>
        
        <div class="flex-grow flex border rounded-3xl py-4">
          <table class="table-auto flex-grow h-fit">
            <thead>
              <tr className="border-b">
                <th className="pb-4 px-4 max-w-1/4 text-left">ID</th>
                <th className="pb-4 px-4 text-left">Name</th>
                <th className="pb-4 px-4 text-left">Main Category</th>
                <th className="pb-4 px-4 text-left">Categories</th>
                <th className="pb-4 px-4 text-left">Tags</th>
                <th className="pb-4 px-4 text-left">Active</th>
                <th className="pb-4 px-4 text-left">Confirmed</th>
                <th className="pb-4 px-4 text-left">Visits</th>
              </tr>
            </thead>

            <tbody>
              {
                locals && locals.map((item) => (
                  <tr className="border-b cursor-pointer hover:bg-white hover:bg-opacity-25">
                    <td className="p-4">{item.id}</td>
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
                    <td className="p-4">{item.is_active ? "Yes" : "No"}</td>
                    <td className="p-4">{item.is_confirmed ? "Yes" : "No"}</td>
                    <td className="p-4">{item.visits}</td>
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
    query: GET_ALL_LOCALS
  });

  // const { colorTheme, setColorTheme } = useContext(ColorContext);
  // setColorTheme(data.winnibook_locals[0].main_category.theme);

  return {
    props: {
      locals: data.winnibook_locals
    }
  };
}

export default Locals;
