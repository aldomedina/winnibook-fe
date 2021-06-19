import { useContext } from 'react';
import InputText from '../Inputs/InputText';
import InputTextarea from '../Inputs/InputTextarea';
import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';
import Select from '../Select';
import { filters as mock } from '../../mock/search';
import { animated } from '@react-spring/web';

const GeneralDetails = ({ formDetails, setFormDetails, errors, setErrors, active }) => {
  const { colorTheme } = useContext(ColorContext);

  const { locations } = mock; // 🚨  MOCK ALERT 🚨
  return (
    <div className="flex flex-col">
      <h1 className="px-4 lg:px-none lg:hidden uppercase mb-3 text-lg">Business Details</h1>
      <div className="flex-1 px-4 py-5 lg:px-none overflow-y-auto styled-scrollbar">
        <InputText
          error={errors.name ?? false}
          label="Name*"
          id="name"
          placeholder="Name"
          value={formDetails.name}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, name: value });
          }}
          maxLength="50"
        />
        <InputTextarea
          error={errors.short_description ?? false}
          label="Short description"
          id="short-description"
          placeholder="Short description"
          value={formDetails.short_description}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, short_description: value });
          }}
          maxLength="400"
        />
        <InputTextarea
          error={errors.description ?? false}
          label="Description"
          id="description"
          placeholder="Description"
          value={formDetails.description}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, description: value });
          }}
          maxLength="900"
        />
        <div className="mb-5">
          <label htmlFor="city" className="text-xs font-medium leading-10">
            City*
          </label>
          <Select
            options={locations}
            getOptionLabel={el => el.name}
            getOptionValue={el => el.id}
            onChange={city => {
              setErrors({});
              setFormDetails({ ...formDetails, city });
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="City"
            name="city"
            theme={theme => ({
              ...theme,
              colors: {
                neutral0: themeConfig.colors[colorTheme].bg
              }
            })}
          />
          <span className="error-msg mt-2">{errors.city}</span>
        </div>
        <InputText
          error={errors.address1 ?? false}
          label="Address line 1*"
          id="address1"
          placeholder="Address line 1"
          value={formDetails.streetLine1}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, address1: value });
          }}
        />
        <InputText
          error={errors.address2 ?? false}
          label="Address line 2"
          id="address2"
          placeholder="Address line 2"
          value={formDetails.streetLine2}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, address2: value });
          }}
        />
        <InputText
          error={errors.postcode ?? false}
          label="Postcode*"
          id="postcode"
          placeholder="Postcode"
          value={formDetails.postcode}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, postcode: value });
          }}
        />
      </div>
    </div>
  );
};

export default GeneralDetails;
