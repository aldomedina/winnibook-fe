import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import ADD_CITY from '../../../apollo/mutations/city/insert.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import { ColorContext } from '../../../components/Theme';

const NewTag = () => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newCityValues, setNewCityValues] = useState({});

  const [addCityMutation, { data }] = useMutation(ADD_CITY);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  const addCity = async () => {

    if (
      (newCityValues.name && newCityValues.name !== "")
    ) {
      await addCityMutation(
        { 
          variables: { 
            name: newCityValues.name
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
            <h2 className="text-2xl font-bold">New city</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => addCity()}
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

export default withPageAuthRequired(NewTag);
