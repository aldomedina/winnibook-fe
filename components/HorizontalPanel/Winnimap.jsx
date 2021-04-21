import SectionWrapper from './SectionWrapper';

const Winnimap = ({ reference }) => {
  return (
    <SectionWrapper
      i={4}
      reference={reference}
      customClasses="w-screen md:w-80vw bg-yellow-400 flex justify-center items-center"
    >
      Winnimap
    </SectionWrapper>
  );
};

export default Winnimap;
