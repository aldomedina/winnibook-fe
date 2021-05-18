import Tag from '../Tag';
import RoundButton from '../Buttons/RoundButton';

const Submit = ({ formDetails, setFormDetails, errors, setErrors, active, handleClick }) => {
  return (
    <div>
      <h1 className="px-4 lg:px-none uppercase mb-3 lg:mb-8 lg:mt-8 text-lg">Sumary</h1>
      <div className="px-4 border-b pb-5 mb-5">
        <h3 className="uppercase text-sm mb-3">{formDetails.name}</h3>
        {formDetails.main_category && (
          <div>
            <Tag
              theme={formDetails.main_category.theme}
              name={formDetails.main_category.name}
              big
            />
          </div>
        )}
        {formDetails?.subcategories?.length && (
          <div className="flex gap-3 my-3">
            {formDetails.subcategories.map(cat => (
              <Tag theme={cat.theme} name={cat.name} />
            ))}
          </div>
        )}
        {formDetails.description && (
          <p className="font-serif text-sm  mb-3">{formDetails.description}</p>
        )}
        <p className=" text-sm  mb-3">
          <span className="font-medium">Address: </span>
          {formDetails.address1 && formDetails.address1},
          {formDetails.address2 && <span>{formDetails.address2}, </span>}
          <span>{formDetails.postcode}, </span>
          <span>{formDetails.city?.name}, </span>
        </p>
      </div>
      <div className="px-4 border-b pb-5 mb-5">
        <p className=" text-sm  mb-3 font-medium">Internal contact:</p>
        <p className=" text-sm  mb-3">{formDetails.contact_name}</p>
        <p className=" text-sm  mb-3">{formDetails.email}</p>
      </div>
      <div className="px-4 pb-5 mb-5">
        <p className=" text-sm  mb-3 font-medium">Public contact:</p>
        {formDetails.contact_value_1 && (
          <p className=" text-sm  mb-3">{formDetails.contact_value_1}</p>
        )}
        {formDetails.contact_value_2 && (
          <p className=" text-sm  mb-3">{formDetails.contact_value_2}</p>
        )}
        {formDetails.contact_value_3 && (
          <p className=" text-sm  mb-3">{formDetails.contact_value_3}</p>
        )}
        {formDetails.facebook && <p className=" text-sm  mb-3">facebook: {formDetails.facebook}</p>}
        {formDetails.instagram && (
          <p className=" text-sm  mb-3">instagram: {formDetails.instagram}</p>
        )}
        {formDetails.twitter && <p className=" text-sm  mb-3">twitter: {formDetails.twitter}</p>}
      </div>
      <div className="px-5 py-5">
        <RoundButton text="Submit" onClick={handleClick} big customClasses="block mx-auto" />
      </div>
    </div>
  );
};

export default Submit;
