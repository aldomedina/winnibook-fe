import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import ADD_TAG from '../../../apollo/mutations/tag/insert.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { ColorContext } from '../../../components/Theme';

const NewTag = () => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newTagValues, setNewTagValues] = useState({});

  const [addTagMutation, { data }] = useMutation(ADD_TAG);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  const addTag = async () => {

    if (
      (newTagValues.name && newTagValues.name !== "")
    ) {
      await addTagMutation(
        { 
          variables: { 
            name: newTagValues.name
          } 
        }
      ); 

      router.push("/admin/tags");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">New tag</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => addTag()}
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
              Tag name
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newTagValues.name}
              placeholder="Tag name"
              onChange={(value) => setNewTagValues({...newTagValues, name: value})}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default NewTag;
