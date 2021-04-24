import styled, { keyframes } from 'styled-components';
import useWindowSize from '../Hooks/useWindowSize';
const scrollAnimation = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  60% { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(25px); }
`;

const ScrollWheel = styled.div`
  animation-name: ${scrollAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
`;

const HomeBackHero = () => {
  const { isMobile } = useWindowSize();
  return (
    <div className="fixed inherit-0 h-full w-full" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="w-full md:w-50vw h-full flex flex-col justify-center items-center  py-16 px-5 md:px-20">
        <div className="mb-8 md:mb-12 flex flex-col justify-end">
          <div className="mx-auto height-max">
            <img src="/icons/logo-name-outline.svg" />
          </div>
          <h2 className="uppercase text-2xl text-center">winnipeg's guide of local business</h2>
        </div>

        <div className="mt-20 w-max">
          {isMobile ? (
            <div>swipe left</div>
          ) : (
            <div className="h-20 rounded-full w-12 border border-1 border-darkgreen-primary flex justify-center ">
              <ScrollWheel className="bg-darkgreen-primary w-2 h-3 rounded-full mt-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBackHero;
