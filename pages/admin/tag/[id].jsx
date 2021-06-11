import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { client } from '../../../apollo/client';

import GET_TAG_BY_ID from '../../../apollo/queries/tags/getTagById.gql';
import UPDATE_TAG from '../../../apollo/mutations/tag/update.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { ColorContext } from '../../../components/Theme';

const EditTag = ({ tag }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newTagValues, setNewTagValues] = useState({});

  const [updateTagMutation, { data }] = useMutation(UPDATE_TAG);

  useEffect(() => {
    setColorTheme('dark');

    setNewTagValues(tag);
  }, []);

  const updateTag = async () => {

    if (
      (newTagValues.name && newTagValues.name !== "")
    ) {
      await updateTagMutation(
        { 
          variables: { 
            id: newTagValues.id,
            name: newTagValues.name,
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
            <h2 className="text-2xl font-bold">Edit tag</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => updateTag()}
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
              Tag ID
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newTagValues.id}
              placeholder="Tag id"
              disabled
            />
          </div>

          <div
            className="px-4 w-1/4"
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

export async function getServerSideProps({ params: { id } }) {
  const { data } = await client.query({
    query: GET_TAG_BY_ID,
    variables: {
      id: id
    }
  });

  return {
    props: {
      tag: data.winnibook_tags[0]
    }
  };
}

export default EditTag;
