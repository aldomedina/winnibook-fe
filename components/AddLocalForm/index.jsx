import { useContext } from 'react';

import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';

import InputText from '../Inputs/InputText';
import InputTextarea from '../Inputs/InputTextarea';
import Select from '../Select';

const AddLocalForm = ({ formDetails, setFormDetails, errors, setErrors }) => {
  const { colorTheme } = useContext(ColorContext);

  return (
    <div className="flex flex-col">

      <h1 
        className="
          px-4 
          lg:px-none 
          lg:hidden 
          uppercase 
          mb-3 
          text-lg
        "
      >
        General Details
      </h1>

      <div className="flex-1 px-4 py-5 lg:px-none overflow-y-auto styled-scrollbar">

        <InputText
          error={errors.name ?? false}
          label="Local name"
          id="local-name"
          placeholder="Cakes & Candies Inc."
          value={formDetails.name}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, name: value });
          }}
          maxLength="50"
        />

        <InputTextarea
          error={errors.description ?? false}
          label="Short Description"
          id="short-description"
          placeholder="Description"
          value={formDetails.short_description}
          onChange={value => {
            setErrors({});
            setFormDetails({ ...formDetails, description: value });
          }}
          maxLength="300"
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
      </div>
    </div>
  );
};

export default AddLocalForm;
