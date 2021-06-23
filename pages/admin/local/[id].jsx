import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { initializeClient } from '../../../apollo/client';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import GET_LOCAL_BY_ID from '../../../apollo/queries/local/getLocalById.gql';
import UPDATE_LOCAL from '../../../apollo/mutations/local/update.gql';
import GET_ALL_CITIES from '../../../apollo/queries/address/getAllCities.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import CategoryFinder from '../../../components/CategoryFinder';
import Input from '../../../components/Input';
import CustomSelect from '../../../components/CustomSelect';
import TagsFinder from '../../../components/TagsFinder';
import Map from '../../../components/Map';

import { ColorContext } from '../../../components/Theme';
import LinksEditor from '../../../components/LinksEditor';
import ContactsEditor from '../../../components/ContactsEditor';

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
];

const dropdownOptions = [
  {
    name: "Active",
    value: true
  },
  {
    name: "Inactive",
    value: false
  }
];

const UpdateLocal = ({ local }) => {

  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [localName, setLocalName] = useState('');
  const [localShortDescription, setLocalShortDescription] = useState('');
  const [localDescription, setLocalDescription] = useState('');
  const [localTheme, setLocalTheme] = useState('base');
  const [localCategories, setLocalCategories] = useState([]);
  const [localTags, setLocalTags] = useState([]);
  const [localLinks, setLocalLinks] = useState([]);
  const [localContacts, setLocalContacts] = useState([]);
  const [localIsActive, setLocalIsActive] = useState(false);

  const [localStreetLine1, setLocalStreetLine1] = useState("");
  const [localStreetLine2, setLocalStreetLine2] = useState("");
  const [localPostcode, setLocalPostcode] = useState("");
  const [localRegion, setLocalRegion] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localLatitude, setLocalLatitude] = useState("");
  const [localLongitude, setLocalLongitude] = useState("");

  const [showCategoriesSelector, setShowCategoriesSelector] = useState(false);
  const [showTagsSelector, setShowTagsSelector] = useState(false);
  const [allCities, setAllCities] = useState([]);

  const [addLocalMutation, { data }] = useMutation(UPDATE_LOCAL);
  const {data: allCitiesResults, loading, refetch} = useQuery(GET_ALL_CITIES);

  useEffect(() => {
    setColorTheme('dark');

    let tempCategories = [];
    tempCategories = [...tempCategories, local.main_category];
    tempCategories = tempCategories.concat(local.categories.reduce((obj, item) => [...obj, item.category], []));

    setLocalName(local.name);
    setLocalShortDescription(local.short_description);
    setLocalDescription(local.description);
    setLocalTheme(local.main_category.theme);
    setLocalCategories(tempCategories);
    setLocalTags(local.tags.reduce((obj, item) => [...obj, item.tag], []));
    setLocalLinks(local.links.reduce((obj, item) => [...obj, item.link], []));
    setLocalContacts(local.contacts.reduce((obj, item) => [...obj, item.contact], []));
    setLocalIsActive(local.is_active);

    setLocalStreetLine1(local.address?.street_line_1)
    setLocalStreetLine2(local.address?.street_line_2)
    setLocalPostcode(local.address?.postcode)
    setLocalRegion(local.address?.region)
    setLocalCity(local.address?.city.id)
    setLocalLatitude(local.address?.latitude)
    setLocalLongitude(local.address?.longitude)
  }, []);

  useEffect(() => {
    setAllCities(allCitiesResults?.winnibook_cities.reduce((obj, item) => [...obj, { value: item.id, name: item.name }], []));
  }, [allCitiesResults]);

  useEffect(() => {
    geocode()
  }, [localStreetLine1, localStreetLine2, localPostcode, localCity]);

  const updateLocal = async (shouldConfirm) => {

    let variables = {
      id: local.id,
      name: localName,
      short_description: localShortDescription,
      description: localDescription,
      is_active: localIsActive,
      is_confirmed: shouldConfirm ? true : local.is_confirmed,
      street_line_1: localStreetLine1,
      street_line_2: localStreetLine2,
      region: localRegion,
      postcode: localPostcode,
      latitude: localLatitude.toString(),
      longitude: localLongitude.toString(),
      city_id: localCity,
      main_category_id: localCategories.filter((item) => !item.parent_category_id || item.parent_category_id === '')[0].id,
      categories: localCategories.filter((item) => item.parent_category_id && item.parent_category_id !== '').reduce((obj, item) => [...obj, {categories_id: item.id, locals_id: local.id}], []),
      tags: localTags.reduce((obj, item) => [...obj, {tags_id: item.id, locals_id: local.id}], []),
      links: localLinks.reduce((obj, item) => [...obj, {
        name: item.name, 
        url: item.url,
        locals: {
          data: {
            locals_id: local.id
          }
        }
      }], []),
      contacts: localContacts.reduce((obj, item) => [...obj, {
        name: item.name, 
        type: item.type, 
        value: item.value, 
        is_public: item.is_public,
        locals: {
          data: {
            locals_id: local.id
          }
        }
      }], []),
    }

    if (
      (variables.name && variables.name !== "") &&
      (variables.main_category_id && variables.main_category_id !== "") &&
      (variables.street_line_1 && variables.street_line_1 !== "") &&
      (variables.postcode && variables.postcode !== "") &&
      (variables.city_id && variables.city_id !== "") &&
      (variables.latitude && variables.latitude !== "") &&
      (variables.longitude && variables.longitude !== "")
    ) {
      await addLocalMutation(
        { 
          variables: variables 
        }
      ); 

      router.push("/admin/locals");
    }
  }

  const checkHasParentCategory = () => {
    return !localCategories?.filter((item) => !item.parent_category_id || item.parent_category_id === '').length > 0;
  }

  const selectCategory = (category) => {
    if (!localCategories?.filter((item) => item.id === category.id).length) {

      if (!category.parent_category_id || category.parent_category_id === '') {
        setLocalCategories([category, ...localCategories]);
      } else {
        setLocalCategories([...localCategories, category]);
      }
    }
    setShowCategoriesSelector(false);
  }

  const selectTag = (tag) => {
    if (!localTags?.filter((item) => item.id === tag.id).length) {

        setLocalTags([...localTags, tag]);
    }
    setShowTagsSelector(false);
  }

  const geocode = async () => {
    const address = `${localStreetLine1} ${localStreetLine2 ? localStreetLine2 : ''} ${localPostcode}, ${allCities?.find((item) => item.id === localCity)}, Canada`;
    try {
      const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: process.env.GOOGLE_MAPS_KEY
        }
      });

      setLocalLatitude(data.results[0].geometry.location.lat);
      setLocalLongitude(data.results[0].geometry.location.lng);

      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">Edit local</h2>
          </div>

          <div className="actions">

            {
              !local.is_confirmed ?
              <Button 
                title="Confirm and save"
                onClick={() => updateLocal(true)}
              />
              :
              <Button 
                title="Save"
                onClick={() => updateLocal()}
              /> 
            }

          </div>

        </div>
        
        <div className="flex-grow flex flex-wrap border rounded-3xl p-4">

          {/* 
            -
            NAME
            -
            -
          */}
          <div
            className="px-4 mb-4 w-2/3"
          >
            <h4
              className="mb-2 px-4"
            >
              Name
            </h4>
            <Input
              customClasses="min-h-40p"
              value={localName}
              placeholder="Local name"
              onChange={(value) => setLocalName(value)}
            />
          </div>

          {/* 
            -
            IS ACTIVE
            -
            -
          */}
          <div className="px-4 w-1/3">
            <h4
              className="mb-2 px-4"
            >
              Status
            </h4>
            <CustomSelect
              options={dropdownOptions}
              placeholder="Active local"
              value={localIsActive}
              onChange={(value) => setLocalIsActive(value)}
            />
          </div>

          {/* 
            -
            SHORT DESCRIPTION
            -
            -
          */}
          <div
            className="px-4 mb-4 w-full"
          >
            <h4
              className="mb-2 px-4"
            >
              Short Description
            </h4>
            <div 
              className="
                w-full 
                h-24 
                rounded-xl 
                bg-black 
                bg-opacity-5 
                rounded-full 
                transition-colors 
                focus-within:bg-opacity-10  
                overflow-hidden 
                p-4
              "
            >
              <textarea 
                className="w-full h-full border-0 bg-transparent text-white" 
                type="text" 
                placeholder="Short description"
                value={localShortDescription}
                onChange={(e) => setLocalShortDescription(e.target.value)}
              />
            </div>
          </div>

          {/* 
            -
            DESCRIPTION
            -
            -
          */}
          <div
            className="px-4 mb-16 w-full"
          >
            <h4
              className="mb-2 px-4"
            >
              Description
            </h4>
            <div 
              className="
                w-full 
                h-32 
                rounded-xl 
                bg-black 
                bg-opacity-5 
                rounded-full 
                transition-colors 
                focus-within:bg-opacity-10  
                overflow-hidden 
                p-4
              "
            >
              <textarea 
                className="w-full h-full border-0 bg-transparent text-white" 
                type="text" 
                placeholder="Description"
                value={localDescription}
                onChange={(e) => setLocalDescription(e.target.value)}
              />
            </div>
          </div>

          {/* 
            -
            ADDRESS
            -
            -
          */}
          <div className="py-8 w-full flex-grow flex">
            <div className="px-4 w-1/3">
              <h4
                className="mb-2 px-4"
              >
                Street address
              </h4>
              <Input
                customClasses="min-h-40p mb-4"
                value={localStreetLine1}
                placeholder="Address line 1"
                onChange={(value) => setLocalStreetLine1(value)}
              />
              <Input
                customClasses="min-h-40p mb-4"
                value={localStreetLine2}
                placeholder="Address line 2"
                onChange={(value) => setLocalStreetLine2(value)}
              />
              <Input
                customClasses="min-h-40p mb-4"
                value={localPostcode}
                placeholder="Postcode"
                onChange={(value) => setLocalPostcode(value)}
              />
            </div>

            <div className="px-4 w-1/3">
              <h4
                className="mb-2 px-4"
              >
                Region/City
              </h4>
              <Input
                customClasses="min-h-40p mb-4"
                value={localRegion}
                placeholder="Region"
                onChange={(value) => setLocalRegion(value)}
              />
              {
                allCities && allCities.length &&
                <CustomSelect
                  options={allCities}
                  placeholder="City"
                  value={localCity}
                  onChange={(value) => setLocalCity(value)}
                />
              }
            </div>

            <div className="px-4 w-1/3 h-30vh">
              <Map
                location={
                  {
                    latitude: localLatitude,
                    longitude: localLongitude,
                  }
                }
                theme={localTheme}
              />
            </div>
          </div>
          
          <div className="py-8 flex-grow flex">
            {/* 
              -
              THEME
              -
              -
            */}
            <div
              className="px-4 w-1/3"
            >
              <h4
                className="mb-2 px-4"
              >
                Theme
              </h4>
              <CustomSelect
                options={availableThemes}
                placeholder="Category theme"
                value={localTheme}
                onChange={(value) => setLocalTheme(value)}
              />
            </div>
            
            {/* 
              -
              CATEGEORIES
              -
              -
            */}
            <div className="px-4 w-1/3">

              <h4
                className="mb-2 px-4"
              >
                Categories
              </h4>
              
              {
                (!showCategoriesSelector && localCategories?.length > 0) &&
                <div className="w-full flex flex-wrap mb-4">
                  {
                    localCategories.map((item, index) => (

                      <div
                        onClick={() => setLocalCategories(localCategories.filter((cat) => cat.id !== item.id))}
                      >
                        <Tag
                          name={item?.name}
                          tagInfo={item}
                          theme={item?.theme}
                          big
                        />
                      </div>

                    ))
                  }

                  <div
                    onClick={() => setShowCategoriesSelector(true)}
                  >
                    <Tag
                      name="Add more"
                      filterTag
                      big
                    />
                  </div>
                </div>
              }

              {
                (showCategoriesSelector || localCategories?.length <= 0) &&
                <CategoryFinder
                  hasParent={checkHasParentCategory()}
                  onSelectCategory={selectCategory}
                />
              }

            </div>

            {/* 
              -
              TAGS
              -
              -
            */}
            <div className="px-4 w-1/3">

              <h4
                className="mb-2 px-4"
              >
                Tags
              </h4>

              {
                (!showTagsSelector && localTags?.length > 0) &&
                <div className="w-full flex flex-wrap mb-4">
                  {
                    localTags.map((item, index) => (

                      <div
                        onClick={() => setLocalTags(localTags.filter((cat) => cat.id !== item.id))}
                      >
                        <Tag
                          name={item?.name}
                          tagInfo={item}
                          filterTag
                          big
                        />
                      </div>

                    ))
                  }

                  <div
                    onClick={() => setShowTagsSelector(true)}
                  >
                    <Tag
                      name="Add more"
                      filterTag
                      big
                    />
                  </div>
                </div>
              }

              {
                (showTagsSelector || localTags?.length <= 0) &&
                <TagsFinder
                  onSelectTag={selectTag}
                />
              }

            </div>
          </div>

          <div className="py-8 flex-grow flex">
            <div className="px-4 w-1/3">
              <h4
                className="mb-2 px-4"
              >
                Links
              </h4>
              <LinksEditor
                initialLinks={() => localLinks}
                onLinksChange={(value) => setLocalLinks(value)}
              />
            </div>

            <div className="px-4 w-2/3">
              <h4
                className="mb-2 px-4"
              >
                Contacts
              </h4>
              <ContactsEditor
                initialContacts={() => localContacts}
                onContactsChange={(value) => setLocalContacts(value)}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export async function getServerSideProps({ req, res, params: { id } }) {

  try {
    const client = await initializeClient(req, res);

    const { data } = await client.query({
      query: GET_LOCAL_BY_ID,
      variables: {
        localId: id
      },
      fetchPolicy: "no-cache"
    });

    return {
      props: {
        local: data.winnibook_locals[0] ? data.winnibook_locals[0] : {}
      }
    };
  } catch (error) {
    return {
      props: {}
    }
  }

  
}

export default withPageAuthRequired(UpdateLocal);
