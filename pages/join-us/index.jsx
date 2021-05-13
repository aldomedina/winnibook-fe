import { useState, useEffect, useContext } from 'react';
import { ColorContext } from '../../components/Theme';
import themeConfig from '../../components/Theme/colors';
import Stepper from '../../components/Stepper';
import { useSwipeable } from 'react-swipeable';
import { animated, useSpring } from '@react-spring/web';
import GeneralDetails from '../../components/JoinUsForm/GeneralDetails';
import ContactDetails from '../../components/JoinUsForm/ContactDetails';
import WinnibookInfo from '../../components/JoinUsForm/WinnibookInfo';
import Submit from '../../components/JoinUsForm/Submit';
import PublicContact from '../../components/JoinUsForm/PublicContact';

const JoinUs = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formDetails, setFormDetails] = useState({});
  const { colorTheme } = useContext(ColorContext);
  const handleSubmitForm = () => {
    console.log('form submitted', formDetails);
  };
  const BGAnimation = useSpring({
    backgroundColor: colorTheme === 'base' ? '#ffffff' : themeConfig.colors[colorTheme].bg
  });
  const componentsProps = {
    formDetails,
    setFormDetails,
    formDetails,
    setErrors,
    errors
  };
  const setData = [
    {
      step: 1,
      label: 'General Details',
      component: <GeneralDetails {...componentsProps} active={step === 1} />
    },
    {
      step: 2,
      label: 'Internal Contact',
      component: <ContactDetails {...componentsProps} active={step === 2} />
    },
    {
      step: 3,
      label: 'Winnibook Info',
      component: <WinnibookInfo {...componentsProps} active={step === 3} />
    },
    {
      step: 4,
      label: 'Public Contact',
      component: <PublicContact {...componentsProps} active={step === 4} />
    },
    {
      step: 5,
      label: 'Submit',
      component: <Submit {...componentsProps} active={step === 5} handleClick={handleSubmitForm} />
    }
  ];
  const translateProps = useSpring({
    transform: `translate3d(${100 * (step - 1) * -1}%, 0, 0)`
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => validateStep(step, 'next') && setStep(step + 1),
    onSwipedRight: () => validateStep(step, 'back') && setStep(step - 1)
  });

  const validateStep = (step, type) => {
    if ((type === 'next' && step >= setData.length) || (type === 'back' && step <= 1)) {
      return false;
    }

    const errors = {};
    if (type === 'next' && step === 1) {
      const { name, description, address1, address2, postcode, city } = formDetails;
      // Validate postcode
      if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postcode)) {
        errors['postcode'] = 'Invalid postcode for Canada';
      }

      // Validate address
      // with google api

      // Mandatory fields
      if (!name?.length) errors['name'] = 'Mandatory Field';
      if (!description?.length) errors['description'] = 'Mandatory Field';
      if (!address1?.length) errors['address1'] = 'Mandatory Field';
      if (!postcode?.length) errors['postcode'] = 'Mandatory Field';
      if (!city?.name) errors['city'] = 'Mandatory Field';
    }

    if (type === 'next' && step === 2) {
      const { contact_name, email } = formDetails;
      const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!emailRegex.test(email)) errors['email'] = 'Invalid email';
      if (!contact_name?.length) errors['contact_name'] = 'Mandatory Field';
    }
    if (type === 'next' && step === 3) {
      const { main_category } = formDetails;
      if (!main_category?.name) errors['main_category'] = 'Mandatory Field';
    }
    if (type === 'next' && step === 4) {
      const { facebook, twitter, instagram } = formDetails;
      const urlRegex =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      if (!urlRegex.test(facebook) && facebook?.length) errors['facebook'] = 'Invalid link';
    }

    if (Object.keys(errors).length === 0) {
      return true;
    }
    setErrors(errors);
    return false;
  };

  return (
    <div className="max-h-full flex flex-col">
      <div className="min-h-14" />
      <Stepper
        step={step}
        updateStep={newStep => validateStep(step, newStep > step ? 'next' : 'back') && setStep}
        setData={setData}
      />
      <form className="flex-1 w-screen overflow-x-hidden max-h-full pb-14">
        <animated.div className="flex max-h-full" style={translateProps} {...handlers}>
          {setData.map(el => (
            <div key={el.step} className=" min-w-100vw max-h-full">
              <div className="max-w-152 block mx-auto h-full">{el.component}</div>
            </div>
          ))}
        </animated.div>
      </form>
      <animated.div style={BGAnimation} className="py-5 px-5 lg:px-0 shadow-reverse z10">
        <div className="max-w-152 block mx-auto">
          <div className="w-full flex justify-between gap-5">
            <button
              className="btn border w-full disabled:opacity-30"
              disabled={step === 1}
              onClick={() => validateStep(step, 'back') && setStep(step - 1)}
            >
              BACK
            </button>
            <button
              className="btn border w-full"
              onClick={() => validateStep(step, 'next') && setStep(step + 1)}
            >
              NEXT
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default JoinUs;
