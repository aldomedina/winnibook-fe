import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_ALL_CATEGORIES from '../../../apollo/queries/admin/categories/allCategories.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import { ColorContext } from '../../../components/Theme';

const Categories = ({ categories }) => {
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
            <h2 className="text-2xl font-bold">All categories</h2>
          </div>

          <div className="actions">

            <Button 
              title="New category"
              onClick={() => router.push("/admin/category/new")}
            />

          </div>

        </div>
        
        <div className="flex-grow flex border rounded-3xl py-4">
          <table className="table-auto flex-grow h-fit">
            <thead>
              <tr className="border-b">
                <th className="pb-4 px-4 w-1/4 text-left">ID</th>
                <th className="pb-4 px-4 text-left">Name</th>
                <th className="pb-4 px-4 text-left">Parent Category</th>
                <th className="pb-4 px-4 text-left">Theme</th>
              </tr>
            </thead>

            <tbody>
              {
                categories && categories.map((item) => (
                  <tr 
                    className="border-b cursor-pointer hover:bg-white hover:bg-opacity-25"
                    onClick={() => router.push("/admin/category/" + item.id)}
                  >
                    <td className="p-4">{item.id}</td>
                    <td className="p-4 flex">
                      <span className="mr-3">{item.name}</span>
                      {!item.parent_category && <Tag name="Main category" filterTag small />}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap">
                        {
                          item?.parent_category &&
                          <Tag key={item?.parent_category.id} name={item?.parent_category.name} theme={item?.parent_category.theme} tagInfo={item.parent_category} small />
                        }
                      </div>
                    </td>
                    <td className="p-4">{item.theme}</td>
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
  
  try {
    const { data } = await client.query({
      query: GET_ALL_CATEGORIES
    });
  
    return {
      props: {
        categories: data.winnibook_categories
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }

}

export default withPageAuthRequired(Categories);
