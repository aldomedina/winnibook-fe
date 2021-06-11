import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import GET_CATEGORY_BY_NAME from '../../apollo/queries/categories/getCategoryByName.gql';

import TagsSearch from '../TagsSearch';

const Categories = ({onSelectCategory}) => {

  const [searchCategoriesValue, setSearchCategoriesValue] = useState('');
  const [categories, setCategories] = useState([]);

  const [searchCategory, {data: categoriesQueryResults, loading, refetch}] = useLazyQuery(GET_CATEGORY_BY_NAME);

  let searchTimeout;

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

  return (
    <TagsSearch
      items={categories}
      searchPlaceholder="FIND CATEGORY"
      onSearchChange={setSearchCategoriesValue}
      onTagClick={onSelectCategory}
    />
  );
};

export default Categories;
