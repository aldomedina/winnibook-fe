import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import ADD_LOCAL from '../../../apollo/mutations/local/insert.gql';
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

const NewLocal = () => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [newLocalName, setNewLocalName] = useState('');
  const [newLocalShortDescription, setNewLocalShortDescription] = useState('');
  const [newLocalDescription, setNewLocalDescription] = useState('');
  const [newLocalTheme, setNewLocalTheme] = useState('base');
  const [newLocalCategories, setNewLocalCategories] = useState([]);
  const [newLocalTags, setNewLocalTags] = useState([]);
  const [newLocalLinks, setNewLocalLinks] = useState([]);
  const [newLocalContacts, setNewLocalContacts] = useState([]);
  const [newLocalIsActive, setNewLocalIsActive] = useState(false);
  const [newLocalAddress, setNewLocalAddress] = useState({
    street_line_1: '',
    street_line_2: '',
    postcode: '',
    region: '',
    city: '',
    latitude: '',
    longitude: ''
  });

  const [showCategoriesSelector, setShowCategoriesSelector] = useState(true);
  const [showTagsSelector, setShowTagsSelector] = useState(true);
  const [allCities, setAllCities] = useState([]);

  const [addLocalMutation, { data }] = useMutation(ADD_LOCAL);
  const {data: allCitiesResults, loading, refetch} = useQuery(GET_ALL_CITIES);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  useEffect(() => {
    setAllCities(allCitiesResults?.winnibook_cities.reduce((obj, item) => [...obj, { value: item.id, name: item.name }], []));
    
    if (allCitiesResults?.winnibook_cities[0]) {
      setNewLocalAddress({...newLocalAddress, city: allCitiesResults?.winnibook_cities[0].id});
    }
  }, [allCitiesResults]);

  useEffect(() => {
    geocode()
  }, [newLocalAddress.street_line_1, newLocalAddress.street_line_2, newLocalAddress.postcode, newLocalAddress.city]);

  const addLocal = async () => {

    let variables = {
      name: newLocalName,
      short_description: newLocalShortDescription,
      description: newLocalDescription,
      is_active: newLocalIsActive,
      street_line_1: newLocalAddress.street_line_1,
      street_line_2: newLocalAddress.street_line_2,
      region: newLocalAddress.region,
      postcode: newLocalAddress.postcode,
      latitude: newLocalAddress.latitude.toString(),
      longitude: newLocalAddress.longitude.toString(),
      city_id: newLocalAddress.city,
      main_category_id: newLocalCategories.filter((item) => !item.parent_category_id || item.parent_category_id === '')[0]?.id,
      categories_ids: newLocalCategories.filter((item) => item.parent_category_id && item.parent_category_id !== '').reduce((obj, item) => [...obj, {categories_id: item.id}], []),
      tags_ids: newLocalTags.reduce((obj, item) => [...obj, {tags_id: item.id}], []),
      links: newLocalLinks.reduce((obj, item) => [...obj, {link: { data: { name: item.name, url: item.url } }}], []),
      contacts: newLocalContacts.reduce((obj, item) => [...obj, {contact: { data: { name: item.name, type: item.type, value: item.value, is_public: item.is_public } }}], []),
    }

    console.log(variables);

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
    return !newLocalCategories?.filter((item) => !item.parent_category_id || item.parent_category_id === '').length > 0;
  }

  const selectCategory = (category) => {
    if (!newLocalCategories?.filter((item) => item.id === category.id).length) {

      if (!category.parent_category_id || category.parent_category_id === '') {
        setNewLocalCategories([category, ...newLocalCategories]);
      } else {
        setNewLocalCategories([...newLocalCategories, category]);
      }
    }
    setShowCategoriesSelector(false);
  }

  const selectTag = (tag) => {
    if (!newLocalTags?.filter((item) => item.id === tag.id).length) {

        setNewLocalTags([...newLocalTags, tag]);
    }
    setShowTagsSelector(false);
  }

  const geocode = async () => {
    const { street_line_1, street_line_2, postcode, city } = newLocalAddress;
    const address = `${street_line_1} ${street_line_2 ? street_line_2 : ''} ${postcode}, ${city.name}, Canada`;
    try {
      const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: process.env.GOOGLE_MAPS_KEY
        }
      });

      setNewLocalAddress({
        ...newLocalAddress,
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng
      });

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
            <h2 className="text-2xl font-bold">New local</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => addLocal()}
            />

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
              value={newLocalName}
              placeholder="Local name"
              onChange={(value) => setNewLocalName(value)}
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
              value={newLocalIsActive}
              onChange={(value) => setNewLocalIsActive(value)}
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
                value={newLocalShortDescription}
                onChange={(e) => setNewLocalShortDescription(e.target.value)}
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
                value={newLocalDescription}
                onChange={(e) => setNewLocalDescription(e.target.value)}
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
                value={newLocalAddress.street_line_1}
                placeholder="Address line 1"
                onChange={(value) => setNewLocalAddress({...newLocalAddress, street_line_1: value})}
              />
              <Input
                customClasses="min-h-40p mb-4"
                value={newLocalAddress.street_line_2}
                placeholder="Address line 2"
                onChange={(value) => setNewLocalAddress({...newLocalAddress, street_line_2: value})}
              />
              <Input
                customClasses="min-h-40p mb-4"
                value={newLocalAddress.postcode}
                placeholder="Postcode"
                onChange={(value) => setNewLocalAddress({...newLocalAddress, postcode: value})}
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
                value={newLocalAddress.region}
                placeholder="Region"
                onChange={(value) => setNewLocalAddress({...newLocalAddress, region: value})}
              />
              <CustomSelect
                options={allCities}
                placeholder="City"
                value={newLocalAddress.city}
                onChange={(value) => setNewLocalAddress({...newLocalAddress, city: value})}
              />
            </div>

            <div className="px-4 w-1/3 h-30vh">
              <Map
                location={
                  {
                    latitude: newLocalAddress.latitude,
                    longitude: newLocalAddress.longitude,
                  }
                }
                theme={newLocalTheme}
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
                onChange={(value) => setNewLocalTheme(value)}
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
                (!showCategoriesSelector && newLocalCategories?.length > 0) &&
                <div className="w-full flex flex-wrap mb-4">
                  {
                    newLocalCategories.map((item, index) => (

                      <div
                        onClick={() => setNewLocalCategories(newLocalCategories.filter((cat) => cat.id !== item.id))}
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
                (showCategoriesSelector || newLocalCategories?.length <= 0) &&
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
                (!showTagsSelector && newLocalTags?.length > 0) &&
                <div className="w-full flex flex-wrap mb-4">
                  {
                    newLocalTags.map((item, index) => (

                      <div
                        onClick={() => setNewLocalTags(newLocalTags.filter((cat) => cat.id !== item.id))}
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
                (showTagsSelector || newLocalTags?.length <= 0) &&
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
                onLinksChange={(value) => setNewLocalLinks(value)}
              />
            </div>

            <div className="px-4 w-2/3">
              <h4
                className="mb-2 px-4"
              >
                Contacts
              </h4>
              <ContactsEditor
                initialLinks={[]}
                onContactsChange={(value) => setNewLocalContacts(value)}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default withPageAuthRequired(NewLocal);
