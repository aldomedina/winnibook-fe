import { useCallback, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionContext } from '.';

const SectionWrapper = ({
  children,
  reference,
  customClasses,
  i,
  sectionThreshold = 0.5,
  title,
  titleCenter
}) => {
  const [inViewRef, inView] = useInView({ threshold: sectionThreshold });
  const { selectActiveSection, activeSection } = useContext(SectionContext);
  useEffect(() => {
    inView && i !== activeSection && selectActiveSection(i);
  }, [inView]);

  const setRefs = useCallback(
    node => {
      reference.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  return (
    <div ref={setRefs} className={`h-full p-5 md:p-16 ${customClasses}`}>
      {title && (
        <h2
          className={`outline-title text-2xl md:max-w-40vw md:text-4xl mb-8 ${
            titleCenter ? 'mx-auto text-center' : ''
          }`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default SectionWrapper;
