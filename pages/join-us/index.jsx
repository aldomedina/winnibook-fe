import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import axios from 'axios';

import ADD_LOCAL from '../../apollo/mutations/local/insert.gql';
import GET_ALL_CITIES from '../../apollo/queries/address/getAllCities.gql';

import TopNav from '../../components/TopNav';
import Button from '../../components/Button';
import Tag from '../../components/Tag';
import CategoryFinder from '../../components/CategoryFinder';
import Input from '../../components/Input';
import CustomSelect from '../../components/CustomSelect';
import TagsFinder from '../../components/TagsFinder';
import Map from '../../components/Map';

import { ColorContext } from '../../components/Theme';
import LinksEditor from '../../components/LinksEditor';
import ContactsEditor from '../../components/ContactsEditor';

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

const JoinUs = () => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [termsAgree, setTermsAgree] = useState(false);
  const [newLocalName, setNewLocalName] = useState('');
  const [newLocalShortDescription, setNewLocalShortDescription] = useState('');
  const [newLocalDescription, setNewLocalDescription] = useState('');
  const [newLocalTheme, setNewLocalTheme] = useState('base');
  const [newLocalCategories, setNewLocalCategories] = useState([]);
  const [newLocalTags, setNewLocalTags] = useState([]);
  const [newLocalLinks, setNewLocalLinks] = useState([]);
  const [newLocalContacts, setNewLocalContacts] = useState([]);
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
  const [localAdded, setLocalAdded] = useState(false);

  const [errors, setErrors] = useState({})

  const [addLocalMutation, { data }] = useMutation(ADD_LOCAL);
  const {data: allCitiesResults, loading, refetch} = useQuery(GET_ALL_CITIES);

  useEffect(() => {
    setColorTheme('base');
  }, []);

  useEffect(() => {
    setAllCities(allCitiesResults?.winnibook_cities.reduce((obj, item) => [...obj, { value: item.id, name: item.name }], []));
  }, [allCitiesResults]);

  useEffect(() => {
    geocode()
  }, [newLocalAddress.street_line_1, newLocalAddress.street_line_2, newLocalAddress.postcode, newLocalAddress.city]);

  const addLocal = async () => {
    let tempErrors = {};

    if (!newLocalName || newLocalName === '' || newLocalName.length < 3) {
      tempErrors.name = true;
    }

    if (!newLocalAddress.street_line_1 || newLocalAddress.street_line_1 === '' || newLocalAddress.street_line_1.length < 3) {
      tempErrors.street_line_1 = true;
    }

    if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(newLocalAddress.postcode)) {
      tempErrors.postcode = true;
    }

    if (!termsAgree) {
      tempErrors.termsAgree = true
    }

    setErrors(tempErrors);

    if (!Object.keys(tempErrors).length === 0) {
      console.log(tempErrors);
      return;
    }

    let variables = {
      name: newLocalName,
      short_description: newLocalShortDescription,
      description: newLocalDescription,
      street_line_1: newLocalAddress.street_line_1,
      street_line_2: newLocalAddress.street_line_2,
      region: newLocalAddress.region,
      postcode: newLocalAddress.postcode,
      latitude: newLocalAddress.latitude.toString(),
      longitude: newLocalAddress.longitude.toString(),
      city_id: newLocalAddress.city,
      main_category_id: newLocalCategories.filter((item) => !item.parent_category_id || item.parent_category_id === '')[0].id,
      categories_ids: newLocalCategories.filter((item) => item.parent_category_id && item.parent_category_id !== '').reduce((obj, item) => [...obj, {categories_id: item.id}], []),
      tags_ids: newLocalTags.reduce((obj, item) => [...obj, {tags_id: item.id}], []),
      links: newLocalLinks.reduce((obj, item) => [...obj, {link: { data: { name: item.name, url: item.url } }}], []),
      contacts: newLocalContacts.reduce((obj, item) => [...obj, {contact: { data: { name: item.name, type: item.type, value: item.value, is_public: item.is_public } }}], []),
    }

    console.log(newLocalAddress);

    if (
      (variables.name && variables.name !== "") &&
      (variables.main_category_id && variables.main_category_id !== "") &&
      (variables.street_line_1 && variables.street_line_1 !== "") &&
      (variables.postcode && variables.postcode !== "") &&
      (variables.city_id && variables.city_id !== "") &&
      (variables.latitude && variables.latitude !== "") &&
      (variables.longitude && variables.longitude !== "")
    ) {

      const res = await axios.post('/api/join', {
        params: variables
      });
      
      if (res.status === 200) {
        setLocalAdded(true);
      }

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
    const address = `${street_line_1} ${street_line_2 ? address2 : ''} ${postcode}, ${city.name}, Canada`;
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

      <TopNav
        hasBG
        showSearch
      />

      <div className="flex flex-col max-w-100vw md:w-70vw mx-auto p-4">

        {
          !localAdded ?
          <>
            <div className="w-full flex p-4 justify-between">

              <div>
                <h2 className="text-5xl font-bold mb-4">Join us</h2>
                <p className="mb-4">
                  <span className="text-xl">Wanna join our community of amazing places?</span> 
                  <span className="text-2xl"> It's simple!</span>
                </p>
                <p>
                  - Fill the form below with your business information.<br/>
                  - Once we confirm your information your business will be live!
                </p>
              </div>

              </div>

              <div className="flex-grow flex flex-wrap py-4 border-b">

              <h2 className="w-full px-4 mt-4 mb-8 text-xl font-bold">Basic information</h2>

              {/* 
                -
                NAME
                -
                -
              */}
              <div
                className="px-4 mb-4 w-full"
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
                  error={errors.name}
                />
                {
                  errors.name &&
                  <span className="text-red-500">Name is mandatory and must be longer than 3 characters</span>
                }
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
                    rounded-2xl 
                    transition-colors 
                    focus-within:bg-opacity-10  
                    overflow-hidden 
                    p-4
                  "
                >
                  <textarea 
                    className="w-full h-full border-0 bg-transparent" 
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
                    rounded-2xl 
                    transition-colors 
                    focus-within:bg-opacity-10  
                    overflow-hidden 
                    p-4
                  "
                >
                  <textarea 
                    className="w-full h-full border-0 bg-transparent" 
                    type="text" 
                    placeholder="Description"
                    value={newLocalDescription}
                    onChange={(e) => setNewLocalDescription(e.target.value)}
                  />
                </div>
              </div>

              </div>

              <div className="flex-grow flex flex-wrap py-4 border-b">

              <h2 className="w-full px-4 mt-4 mb-8 text-xl font-bold">Address</h2>

              {/* 
                -
                ADDRESS
                -
                -
              */}
              <div className="py-8 w-full flex-grow flex flex-wrap">
                <div className="px-4 w-full md:w-1/2 pb-8 md:pb-0">
                  <div className="mb-4">
                    <Input
                      customClasses="min-h-40p"
                      value={newLocalAddress.street_line_1}
                      placeholder="Address line 1"
                      onChange={(value) => setNewLocalAddress({...newLocalAddress, street_line_1: value})}
                      error={errors.street_line_1}
                    />
                    {
                      errors.street_line_1 &&
                      <span className="text-red-500 mt-4">Address line 1 is mandatory</span>
                    }
                  </div>

                  <Input
                    customClasses="min-h-40p mb-4"
                    value={newLocalAddress.street_line_2}
                    placeholder="Address line 2"
                    onChange={(value) => setNewLocalAddress({...newLocalAddress, street_line_2: value})}
                    error={errors.street_line_2}
                  />
                  {
                    errors.street_line_2 &&
                    <span className="text-red-500 mb-4">Address line 2 is mandatory</span>
                  }

                  <div className="mb-16">
                    <Input
                      customClasses="min-h-40p"
                      value={newLocalAddress.postcode}
                      placeholder="Postcode"
                      onChange={(value) => setNewLocalAddress({...newLocalAddress, postcode: value})}
                      error={errors.postcode}
                    />
                    {
                      errors.postcode &&
                      <span className="text-red-500 mt-4">Postcode is invalid</span>
                    }
                  </div>

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

                <div className="px-4 w-full md:w-1/2 h-30vh">
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

              </div>

              <div className="flex-grow flex flex-wrap py-4 border-b">

              <h2 className="w-full px-4 mt-4 mb-8 text-xl font-bold">Other info</h2>

              <div className="md:py-8 flex-grow flex flex-wrap">
                
                {/* 
                  -
                  CATEGEORIES
                  -
                  -
                */}
                <div className="px-4 md:w-1/2">

                  <h4
                    className="mb-2 px-4"
                  >
                    Categories
                  </h4>

                  {
                    errors.categories &&
                    <span className="text-red-500 mb-2">Please select at least 1 category</span>
                  }
                  
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
                <div className="px-4 md:w-1/2">

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

              </div>

              <div className="flex-grow flex flex-wrap py-4 border-b">

              <h2 className="w-full px-4 mt-4 mb-8 text-xl font-bold">Contact</h2>

              <div className="md:px-4 flex-grow flex flex-wrap">
                <div className="px-4 w-full md:w-1/2">
                  <h4
                    className="mb-2 md:px-4"
                  >
                    Links
                  </h4>
                  <LinksEditor
                    onLinksChange={(value) => setNewLocalLinks(value)}
                  />
                </div>

                <div className="px-4 w-full md:w-1/2">
                  <h4
                    className="mb-2 md:px-4"
                  >
                    Contacts
                  </h4>
                  <ContactsEditor
                    onContactsChange={(value) => setNewLocalContacts(value)}
                    noPrivate={true}
                  />
                </div>
              </div>

              </div>

              <div className="w-full flex flex-wrap justify-end px-4 py-8">

              <div className="w-full md:w-1/3 mb-8 flex flex-wrap justify-end">
                <p className="w-full mb-4">
                  Please review our <a className="underline" href="/terms-of-use" target="_blank">Terms of Use</a> before proceeding.
                </p>

                <div 
                  className={`w-full p-4 border rounded-2xl ${errors.termsAgree ? 'bg-red-200' : ''}`}
                >
                  <input type="checkbox" name="terms" id="terms" value={termsAgree} onChange={() => setTermsAgree(!termsAgree)} />
                  <label className="ml-2" htmlFor="terms">I have read and agree with the <a className="underline" href="/terms-of-use" target="_blank">Terms of Use</a></label>
                </div>
              </div>

              <div className="w-full flex justify-end actions">

                <Button 
                  title="Submit your place"
                  onClick={() => addLocal()}
                />

              </div>

              </div>
          </>
          :
          <>
            <div className="w-full flex p-4 justify-between">

              <div>
                <h2 className="text-5xl font-bold mb-4">Thank you for joinning!</h2>
                <p className="mb-4">
                  <span className="text-xl">Your business if under review and will be live soon!</span> 
                </p>
              </div>

            </div>
          </>
        }

      </div>

    </div>
  );
};

export default JoinUs;
