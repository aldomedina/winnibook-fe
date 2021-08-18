import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { initializeClient } from '../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_LIST_BY_ID from '../../../apollo/queries/lists/getListById.gql';
import UPDATE_LIST from '../../../apollo/mutations/list/update.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import PlaceCard from '../../../components/PlaceCard';
import LocalsFinder from '../../../components/LocalsFinder';

import { ColorContext } from '../../../components/Theme';

const EditList = ({ list }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [listValues, setListValues] = useState({});

  const [updateListMutation, { data }] = useMutation(UPDATE_LIST);

  useEffect(() => {
    setColorTheme('dark');

    setListValues(list);
  }, []);

  const updateList = async () => {

    if (
      (listValues.text && listValues.text !== "")
    ) {
      await updateListMutation(
        { 
          variables: { 
            list: listValues.id,
            text: listValues.text,
            locals: listValues.locals.reduce((obj, item) => [...obj, { local: item.localByLocal?.id, locals_list: listValues.id }], [])
          } 
        }
      ); 

      router.push("/admin/lists");
    }
  }

  const selectLocal = (local) => {
    console.log(local);
    
    if (!listValues.locals.filter((item) => item.localByLocal.id === local.id).length) {
      setListValues({
        ...listValues,
        locals: [...listValues.locals, {
          localByLocal: local
        }]
      });
    }

  }

  const removeLocal = (local) => {
    console.log(local);
    setListValues({
      ...listValues,
      locals: listValues.locals.filter((item) => item.localByLocal.id !== local.id)
    });
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">Edit list</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => updateList()}
            />

          </div>

        </div>
        
        <div className="flex-grow flex flex-wrap border rounded-3xl p-4">

          <div
            className="px-4 w-1/3"
          >
            <h4
              className="mb-2 px-4"
            >
              List ID
            </h4>
            <Input
              customClasses="min-h-40p"
              value={listValues.id}
              placeholder="list id"
              disabled
            />
          </div>

          <div
            className="px-4 w-2/3"
          >
            <h4
              className="mb-2 px-4"
            >
              List name
            </h4>
            <Input
              customClasses="min-h-40p"
              value={listValues.text}
              placeholder="list name"
              onChange={(value) => setListValues({...listValues, text: value})}
            />
          </div>

          <div
            className="px-4 mt-12 w-1/4"
          >
            <h4
              className="mb-2 px-4"
            >
              Add locals to list
            </h4>
            
            <div className="p-4 border rounded-3xl">  
              <LocalsFinder
                onSelectLocal={selectLocal}
              />
            </div>

          </div>

          <div
            className="px-4 mt-12 w-3/4"
          >
            <h4
              className="mb-2 px-4"
            >
              List locals
            </h4>
            
            <div className="flex flex-wrap items-stretch">
              {
                listValues.locals?.reduce((obj, item) => [...obj, item.localByLocal], []).map(item => (
                  <div className="p-4 w-1/4">
                    <div className="flex-grow h-full" onClick={() => removeLocal(item)}>
                      <PlaceCard name={item.name} theme={item.main_category.theme} categories={[item.main_category]} />
                    </div>
                  </div>
                ))
              }
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
      query: GET_LIST_BY_ID,
      variables: {
        listId: id
      }
    });

    console.log(data.winnibook_locals_lists[0].locals);
  
    return {
      props: {
        list: data.winnibook_locals_lists[0]
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
}

export default withPageAuthRequired(EditList);
