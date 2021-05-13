import { useContext } from 'react';
import InputText from '../Inputs/InputText';
import Select from '../Select';
import { ColorContext } from '../Theme';
import themeConfig from '../Theme/colors';

const typeOptions = [
  { name: 'email', id: 'email' },
  { name: 'phone', id: 'phone' }
];
const ContactDetails = ({ formDetails, setFormDetails, errors, setErrors, active }) => {
  const { colorTheme } = useContext(ColorContext);
  return (
    <div className="">
      <h1 className="px-4 lg:px-none lg:hidden uppercase mb-3 text-lg">Public Contact</h1>
      <div className="flex-1 px-4 py-5 lg:px-none overflow-y-auto styled-scrollbar">
        <div className=" pb-8 mb-5">
          <InputText
            error={errors.facebook ?? false}
            label="Facebook link"
            id="facebook"
            placeholder="Facebook Link"
            value={formDetails.facebook}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, facebook: value });
            }}
          />
          <InputText
            label="@ Instagram "
            id="instagram"
            placeholder="@instragram-user"
            value={formDetails.instagram}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, instagram: value });
            }}
          />
          <InputText
            label="@ Twitter"
            id="twitter"
            placeholder="@twitter-user-name"
            value={formDetails.twitter}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, twitter: value });
            }}
          />
        </div>
        <div className="pb-8 mb-5">
          <h3 className="mb-3">Contact 1</h3>
          <div className="mb-5">
            <label htmlFor="contact_type_1" className="text-xs font-medium leading-10">
              Contact type
            </label>
            <Select
              options={typeOptions}
              getOptionLabel={el => el.name}
              getOptionValue={el => el.id}
              onChange={value => {
                setErrors({});
                setFormDetails({ ...formDetails, contact_type_1: value });
              }}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="contact type"
              name="contact_type_1"
              theme={theme => ({
                ...theme,
                colors: {
                  neutral0: themeConfig.colors[colorTheme].bg
                }
              })}
            />
            <span className="error-msg mt-2">{errors.contact_type}</span>
          </div>
          <InputText
            label="Contact"
            id="contact_value_1"
            placeholder="contact"
            value={formDetails.contact_value_1}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, contact_value_1: value });
            }}
          />
        </div>
        <div className="pb-8 mb-5">
          <h3 className="mb-3">Contact 2</h3>
          <div className="mb-5">
            <label htmlFor="contact_type_2" className="text-xs font-medium leading-10">
              Contact type
            </label>
            <Select
              options={typeOptions}
              getOptionLabel={el => el.name}
              getOptionValue={el => el.id}
              onChange={value => {
                setErrors({});
                setFormDetails({ ...formDetails, contact_type_2: value });
              }}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="contact type"
              name="contact_type_2"
              theme={theme => ({
                ...theme,
                colors: {
                  neutral0: themeConfig.colors[colorTheme].bg
                }
              })}
            />
            <span className="error-msg mt-2">{errors.contact_type}</span>
          </div>
          <InputText
            label="Contact"
            id="contact_value_2"
            placeholder="contact"
            value={formDetails.contact_value_2}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, contact_value_2: value });
            }}
          />
        </div>
        <div className="pb-8 mb-5">
          <h3 className="mb-3">Contact 3</h3>
          <div className="mb-5">
            <label htmlFor="contact_type_3" className="text-xs font-medium leading-10">
              Contact type
            </label>
            <Select
              options={typeOptions}
              getOptionLabel={el => el.name}
              getOptionValue={el => el.id}
              onChange={value => {
                setErrors({});
                setFormDetails({ ...formDetails, contact_type_3: value });
              }}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="contact type"
              name="contact_type_3"
              theme={theme => ({
                ...theme,
                colors: {
                  neutral0: themeConfig.colors[colorTheme].bg
                }
              })}
            />
            <span className="error-msg mt-2">{errors.contact_type}</span>
          </div>
          <InputText
            label="Contact"
            id="contact_value_3"
            placeholder="contact"
            value={formDetails.contact_value_3}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, contact_value_3: value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
