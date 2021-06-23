import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { initializeClient } from '../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_CATEGORY_BY_ID from '../../../apollo/queries/categories/getCategoryById.gql';
import UPDATE_CATEGORY from '../../../apollo/mutations/category/update.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import CategoryFinder from '../../../components/CategoryFinder';
import Input from '../../../components/Input';
import CustomSelect from '../../../components/CustomSelect';

import { ColorContext } from '../../../components/Theme';

const availableThemes = [
  {
    name: "Base",
    value: "base"
  },
  {
    name: "Cream",
    value: "cream"
  },
  {
    name: "Dark green",
    value: "darkgreen"
  },
  {
    name: "Light orange",
    value: "lightorange"
  },
  {
    name: "Yellow",
    value: "yellow"
  },
  {
    name: "Light green",
    value: "lightgreen"
  },
  {
    name: "Light blue",
    value: "lightblue"
  },
  {
    name: "Dark",
    value: "dark"
  },
]

const EditCategory = ({ category }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newCategoryValues, setNewCategoryValues] = useState({});
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);

  const [updateCategoryMutation, { data }] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    setColorTheme('dark');

    setNewCategoryValues(category);
  }, []);

  const selectCategory = category => {
    setIsSearchCategoryOpen(false);
    
    setNewCategoryValues({
      ...newCategoryValues,
      parent_category: category
    });

  };

  const updateCategory = async () => {

    if (
      (newCategoryValues.name && newCategoryValues.name !== "") &&
      (newCategoryValues.theme && newCategoryValues.theme !== "")
    ) {
      await updateCategoryMutation(
        { 
          variables: { 
            id: newCategoryValues.id,
            name: newCategoryValues.name,
            theme: newCategoryValues.theme,
            parent_category_id: newCategoryValues.parent_category ? newCategoryValues.parent_category.id : null
          } 
        }
      ); 

      router.push("/admin/categories");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">Edit category</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => updateCategory()}
            />

          </div>

        </div>
        
        <div className="flex-grow flex border rounded-3xl p-4">

          <div
            className="px-4 w-1/4"
          >
            <h4
              className="mb-2 px-4"
            >
              Category ID
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newCategoryValues.id}
              placeholder="Category id"
              disabled
            />
          </div>

          <div
            className="px-4 w-1/4"
          >
            <h4
              className="mb-2 px-4"
            >
              Category name
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newCategoryValues.name}
              placeholder="Category name"
              onChange={(value) => setNewCategoryValues({...newCategoryValues, name: value})}
            />
          </div>

          <div
            className="px-4 w-1/4"
          >
            <h4
              className="mb-2 px-4"
            >
              Category theme
            </h4>
            <CustomSelect
              options={availableThemes}
              placeholder="Category theme"
              value={newCategoryValues.theme}
              onChange={(value) => setNewCategoryValues({...newCategoryValues, theme: value})}
            />
          </div>
          
          <div className="px-4 w-1/4">

            <h4
              className="mb-2 px-4"
            >
              Parent category (optional)
            </h4>
            
            <div 
              className="cursor-pointer" 
              onClick={() => {setIsSearchCategoryOpen(true); setNewCategoryValues({...newCategoryValues, parent_category: undefined})}}
            >
              {
                newCategoryValues.parent_category ?
                <Tag
                  name={newCategoryValues.parent_category?.name}
                  tagInfo={newCategoryValues.parent_category}
                  theme={newCategoryValues.parent_category?.theme}
                  big
                />
                :
                
                  <Tag
                    name="SELECT PARENT CATEGORY"
                    filterTag
                    big
                  />
              }
            </div>
            
            {
              isSearchCategoryOpen &&
              <div className="mt-8">
                <CategoryFinder
                  hasParent={true}
                  onSelectCategory={selectCategory}
                />
              </div>
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export async function getServerSideProps({ req, res, params: { id } }) {
  const client = await initializeClient(req, res);

  const { data } = await client.query({
    query: GET_CATEGORY_BY_ID,
    variables: {
      id: id
    }
  });

  return {
    props: {
      category: data.winnibook_categories[0]
    }
  };
}

export default withPageAuthRequired(EditCategory);
