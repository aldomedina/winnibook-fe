import styled from 'styled-components';

const RoundButton = ({ text, big, onClick, customClasses }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border transition-all hover:border-8 ${
        big ? 'w-52 h-52 border-2 text-2xl' : 'w-20 h-20 text-xl'
      } ${customClasses}`}
    >
      {text}
    </button>
  );
};

export default RoundButton;
