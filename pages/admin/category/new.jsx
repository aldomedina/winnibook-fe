import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import ADD_CATEGORY from '../../../apollo/mutations/category/insert.gql';

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

const NewCategory = () => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newCategoryValues, setNewCategoryValues] = useState({});
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);

  const [addCategoryMutation, { data }] = useMutation(ADD_CATEGORY);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  const selectCategory = category => {
    setIsSearchCategoryOpen(false);
    
    setNewCategoryValues({
      ...newCategoryValues,
      parent_category: category
    });

  };

  const addCategory = async () => {

    if (
      (newCategoryValues.name && newCategoryValues.name !== "") &&
      (newCategoryValues.theme && newCategoryValues.theme !== "")
    ) {
      await addCategoryMutation(
        { 
          variables: { 
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
            <h2 className="text-2xl font-bold">New category</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => addCategory()}
            />

          </div>

        </div>
        
        <div className="flex-grow flex border rounded-3xl p-4">

          <div
            className="px-4 w-1/3"
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
            className="px-4 w-1/3"
          >
            <h4
              className="mb-2 px-4"
            >
              Category theme
            </h4>
            <CustomSelect
              options={availableThemes}
              placeholder="Category theme"
              onChange={(value) => setNewCategoryValues({...newCategoryValues, theme: value})}
            />
          </div>
          
          <div className="px-4 w-1/3">

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

export default NewCategory;
