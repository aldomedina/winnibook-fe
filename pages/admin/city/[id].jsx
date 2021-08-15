import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { initializeClient } from '../../../apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_CITY_BY_ID from '../../../apollo/queries/address/getCityById.gql';
import UPDATE_CITY from '../../../apollo/mutations/city/update.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { ColorContext } from '../../../components/Theme';

const EditCity = ({ city }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newCityValues, setNewCityValues] = useState({});

  const [updateCityMutation, { data }] = useMutation(UPDATE_CITY);

  useEffect(() => {
    setColorTheme('dark');

    setNewCityValues(city);
  }, []);

  const updateCity = async () => {

    if (
      (newCityValues.name && newCityValues.name !== "")
    ) {
      await updateCityMutation(
        { 
          variables: { 
            id: newCityValues.id,
            name: newCityValues.name,
          } 
        }
      ); 

      router.push("/admin/cities");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">Edit city</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => updateCity()}
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
              City ID
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newCityValues.id}
              placeholder="City id"
              disabled
            />
          </div>

          <div
            className="px-4 w-1/4"
          >
            <h4
              className="mb-2 px-4"
            >
              City name
            </h4>
            <Input
              customClasses="min-h-40p"
              value={newCityValues.name}
              placeholder="City name"
              onChange={(value) => setNewCityValues({...newCityValues, name: value})}
            />
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
      query: GET_CITY_BY_ID,
      variables: {
        id: id
      }
    });
  
    return {
      props: {
        city: data.winnibook_cities[0]
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
}

export default withPageAuthRequired(EditCity);
