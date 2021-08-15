import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { initializeClient } from '../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_MISC_BY_ID from '../../../apollo/queries/misc/getMiscById.gql';
import UPDATE_MISC from '../../../apollo/mutations/misc/update.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { ColorContext } from '../../../components/Theme';

const EditMisc = ({ misc }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newMiscValues, setNewMiscValues] = useState({});

  const [updateMiscMutation, { data }] = useMutation(UPDATE_MISC);

  useEffect(() => {
    setColorTheme('dark');

    setNewMiscValues(misc);

    console.log(misc);
  }, []);

  const updateMisc = async () => {

    if (
      (newMiscValues.name && newMiscValues.name !== "")
    ) {
      await updateMiscMutation(
        { 
          variables: { 
            id: newMiscValues.id,
            name: newMiscValues.name,
            content: newMiscValues.content,
          } 
        }
      ); 

      router.push("/admin/miscs");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">Edit {newMiscValues.name}</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => updateMisc()}
            />

          </div>

        </div>
        
        <div className="flex-grow flex flex-wrap border rounded-3xl p-4">

          <div
            className="px-4 mb-4 w-1/2"
          >
            <h4
              className="mb-2 px-4"
            >
              Name
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newMiscValues.name}
              placeholder="Name"
              onChange={(value) => setNewMiscValues({...newMiscValues, name: value})}
            />
          </div>

          <div
            className="px-4 mb-4 w-full"
          >
            <h4
              className="mb-2 px-4"
            >
              Content
            </h4>
            <div 
              className="
                w-full 
                rounded-xl 
                bg-black 
                bg-opacity-5 
                transition-colors 
                focus-within:bg-opacity-10  
                overflow-hidden 
                p-4
              "
            >
              <textarea 
                className="
                  w-full 
                  min-h-50vh
                  border-0 
                  bg-transparent 
                  text-white
                " 
                type="text" 
                placeholder="Content"
                value={newMiscValues.content}
                onChange={(e) => setNewMiscValues({...newMiscValues, content: e.target.value})}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export async function getServerSideProps({ req, res, params: { id }  }) {
  try {
    const client = await initializeClient(req, res);
  
    const { data } = await client.query({
      query: GET_MISC_BY_ID,
      variables: {
        id: id
      }
    });
  
    return {
      props: {
        misc: data.winnibook_misc[0]
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
}

export default withPageAuthRequired(EditMisc);
