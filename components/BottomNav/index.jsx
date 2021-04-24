import { Icon } from '../Icon';

const BottomNav = ({ active, handleBottomNav, items }) => (
  <div className="fixed w-full bottom-1 left-0  overflow-x-scroll md:overflow-visible">
    <ul className="w-max md:w-full px-20vw md:px-0 flex h-8 md:h-16 items-start ">
      {items.map((el, i) => (
        <li
          key={el.id}
          className={`flex w-max h-full flex-1 justify-center items-center select-none cursor-pointer transition-opacity min-w-45vw md:min-w-0 ${
            i === active ? '' : 'hover:opacity-60 opacity-30'
          }`}
          onClick={() => handleBottomNav(i, el.id)}
        >
          <span className="w-max text-center">{el.icon ? <Icon icon="search" /> : el.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default BottomNav;
