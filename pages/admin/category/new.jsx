import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';

import GET_CATEGORY_BY_ID from '../../../apollo/queries/categories/getCategoryById.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import TagsSearch from '../../../components/TagsSearch';

import { ColorContext } from '../../../components/Theme';
import Input from '../../../components/Input';

const Categories = () => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newCategoryValues, setNewCategoryValues] = useState({});
  const [searchCategoriesValue, setSearchCategoriesValue] = useState('');
  const [categories, setCategories] = useState([]);

  const [searchCategory, {data: categoriesQueryResults, loading, refetch}] = useLazyQuery(GET_CATEGORY_BY_ID);

  let searchTimeout;

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  useEffect(() => {
    setCategories(categoriesQueryResults?.winnibook_categories ? categoriesQueryResults.winnibook_categories : []);
  }, [categoriesQueryResults])

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchCategory({
        variables: {
          name: "%" + searchCategoriesValue + "%"
        }
      });
    }, 300)
  }, [searchCategoriesValue])

  const selectCategory = category => {
    
    setNewCategoryValues({
      ...newCategoryValues,
      parent_category_id: category.id
    });

  };

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

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
        
        <div class="flex-grow flex border rounded-3xl p-4">

          <div
            className="px-4 w-1/3"
          >
            <Input
              value={newCategoryValues.name}
              placeholder="Category name"
              onChange={(value) => setNewCategoryValues({...newCategoryValues, name: value})}
            />
          </div>

          <div
            className="px-4 w-1/3"
          >
            <Input
              value={newCategoryValues.name}
              placeholder="Category name"
              onChange={(value) => setNewCategoryValues({...newCategoryValues, name: value})}
            />
          </div>
          
          <div className="px-4 w-1/3">
            <TagsSearch
              items={categories}
              searchPlaceholder="FIND CATEGORY"
              onSearchChange={setSearchCategoriesValue}
              onTagClick={selectCategory}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Categories;
