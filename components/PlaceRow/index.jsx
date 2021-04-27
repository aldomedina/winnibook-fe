const PlaceRow = ({ place }) => {
  const { name, location } = place;
  return (
    <li className="container mb-5 md:mb-2">
      <div className="flex flex-col md:flex-row">
        <h3 className="uppercase text-2xl md:text-4xl">{name}</h3>
        <div className="flex-1 border-b-2 border-dotted opacity-30 hidden md:block" />
        <h4 className="uppercase text-lg font-light md:text-2xl">{location}</h4>
      </div>
    </li>
  );
};

export default PlaceRow;
