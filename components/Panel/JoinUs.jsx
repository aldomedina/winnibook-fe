import RoundButton from '../Buttons/RoundButton';
import { Spring, animated } from 'react-spring';

import { Icon } from '../Icon';
import SectionWrapper from './SectionWrapper';

const JoinUs = ({ reference }) => {
  return (
    <SectionWrapper
      i={5}
      sectionThreshold={0.8}
      reference={reference}
      customClasses="w-screen md:w-70vw relative  md:rounded-br-50p pt-12 md:pt-40 h-full flex flex-col justify-center"
      title="Wanna be in the winnibook?"
      titleCenter
    >
      <div className="mx-auto block w-max animate-bounce">
        <Icon icon="big-arrow-down" w="2rem" h="4rem" />
      </div>

      <RoundButton customClasses="mx-auto block" text="JOIN US!" strokeColor="#103b40" big />
    </SectionWrapper>
  );
};

export default JoinUs;
