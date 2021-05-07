import PlaceCard from '../PlaceCard';

const SimilarPlaces = ({ similar }) => {
  return (
    <div className="min-w-80vw md:min-w-60vw px-3 md:px-5 flex items-center justify-center">
      <div className="min-h-50vh max-h-full gap-3 flex flex-col w-full">
        <h3 className="uppercase mb-3 font-medium">Similar places</h3>
        <div className="flex-1 flex flex-row h-full gap-3 md:gap-10">
          {similar?.map((place, i) => (
            <div className="flex-1 self-stretch">
              <PlaceCard
                key={`${place.id}-${i}`}
                name={place.name}
                theme={place.theme}
                onClick={() => console.log(place.name)}
                categories={place.categories}
                big
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarPlaces;
