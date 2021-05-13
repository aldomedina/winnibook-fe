import { useContext } from 'react';
import { filters } from '../../mock/search'; // 🚨  MOCK ALERT 🚨
import Select from '../Select';
import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';

const WinnibookInfo = ({ formDetails, setFormDetails, errors, setErrors, active }) => {
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  return (
    <div className="h-full">
      <h1 className="px-4 lg:px-none lg:hidden uppercase mb-3 text-lg">Winnibook Details</h1>
      <div className="h-full px-4 py-5 lg:px-none overflow-y-auto styled-scrollbar">
        <div className="mb-5">
          <label htmlFor="contact_type_1" className="text-xs font-medium leading-10">
            Main Category*
          </label>
          <Select
            options={filters.categories}
            getOptionLabel={el => el.name}
            getOptionValue={el => el.id}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, main_category: value });
              setColorTheme(value.theme);
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Main category"
            name="Main category"
            theme={theme => ({
              ...theme,
              colors: {
                neutral0: themeConfig.colors[colorTheme].bg
              }
            })}
          />
          <span className="error-msg mt-2">{errors.main_category}</span>
        </div>
        {formDetails.main_category && (
          <div className="mb-5">
            <label htmlFor="contact_type_1" className="text-xs font-medium leading-10">
              Sub Category
            </label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={formDetails.main_category.subcategories}
              getOptionLabel={el => el.name}
              getOptionValue={el => el.id}
              onChange={value => {
                setErrors({});
                setFormDetails({ ...formDetails, subcategories: value });
              }}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Main category"
              name="Main category"
              theme={theme => ({
                ...theme,
                colors: {
                  neutral0: themeConfig.colors[colorTheme].bg
                }
              })}
            />
            <span className="error-msg mt-2">{errors.subcategories}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnibookInfo;
