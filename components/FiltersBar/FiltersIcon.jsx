import { useSpring, animated } from 'react-spring';

const FiltersIcon = ({ isOpen, theme }) => {
  const first = useSpring({
    transform: isOpen ? 'translate(5px, 32px) rotate(-45deg)' : 'translate(2px, 7px) rotate(0deg)'
  });
  const second = useSpring({
    transform: isOpen ? 'translate(10px, 4px) rotate(45deg)' : 'translate(2px, 19px) rotate(0deg)'
  });
  const third = useSpring({
    transform: isOpen ? 'translate(5px, 32px) rotate(-45deg)' : 'translate(2px, 31px) rotate(0deg)'
  });
  const ellipses = useSpring({
    opacity: isOpen ? 0 : 1
  });

  return (
    <div className="">
      <svg
        width="40"
        height="32"
        viewBox="0 0 44 44"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect width="40" height="4" rx="2" style={first} />
        <animated.ellipse rx="5" ry="5" cx="12" cy="9" style={ellipses} />
        <animated.rect width="40" height="4" rx="2" style={second} />
        <animated.ellipse rx="5" ry="5" cx="32" cy="21" style={ellipses} />
        <animated.rect width="40" height="4" rx="2" style={third} />
        <animated.ellipse rx="5" ry="5" cx="18" cy="33" style={ellipses} />
      </svg>
    </div>
  );
};

export default FiltersIcon;
