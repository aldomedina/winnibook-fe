import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';

import GET_ALL_CATEGORIES from '../../../apollo/queries/admin/categories/allCategories.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import { ColorContext } from '../../../components/Theme';

const Categories = () => {
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
            <h2 className="text-2xl font-bold">New category</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => {}}
            />

          </div>

        </div>
        
        <div class="flex-grow flex border rounded-3xl py-4">
          


        </div>

      </div>

    </div>
  );
};

export default Categories;
