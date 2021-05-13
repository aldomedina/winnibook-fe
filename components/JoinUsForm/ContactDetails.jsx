import InputText from '../Inputs/InputText';

const ContactDetails = ({ formDetails, setFormDetails, errors, setErrors, active }) => {
  return (
    <div>
      <div></div>
      <h1 className="px-4 lg:px-none lg:hidden uppercase mb-3 text-lg">Internal Contact</h1>

      <div className="flex-1 px-4 py-5 lg:px-none overflow-y-auto styled-scrollbar">
        <div className="pb-5 mb-5">
          <InputText
            error={errors.contact_name ?? false}
            label="Contact Name*"
            id="contact_name"
            placeholder="contact name"
            value={formDetails.contact_name}
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, contact_name: value });
            }}
          />
          <InputText
            error={errors.email ?? false}
            label="Email*"
            id="email"
            placeholder="email"
            value={formDetails.email}
            isEmail
            onChange={value => {
              setErrors({});
              setFormDetails({ ...formDetails, email: value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
