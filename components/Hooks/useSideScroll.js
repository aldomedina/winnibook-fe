import { useRef, useEffect } from 'react';

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    if (el) {
      const onWheel = e => {
        const toLeft = e.deltaY < 0 && el.scrollLeft > 0;
        const toRight = e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth;
        if (toLeft || toRight) {
          e.preventDefault();
          const delta = isFirefox ? e.deltaY * 40 : e.deltaY * 2;
          el.scrollTo({
            left: el.scrollLeft + delta,
            behavior: 'smooth'
          });
        }
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  return elRef;
}
