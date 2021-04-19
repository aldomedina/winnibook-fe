import { useRef, useEffect } from 'react';

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    if (el) {
      const onWheel = e => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        const delta = isFirefox ? e.deltaY * 20 : e.deltaY;
        el.scrollTo({
          left: el.scrollLeft + delta,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  return elRef;
}
