import PlaceCard from '../PlaceCard';

const SimilarPlaces = ({ similar, main_category }) => {
  
  return (
    <div 
      className="
        max-w-80vw 
        md:max-w-60vw

        py-32
        px-32 

        flex 
        justify-center
      "
    >
      <div className="min-h-50vh max-h-full gap-3 flex flex-col w-full">
        <h3 className="uppercase mb-3 font-medium">Similar places</h3>
        <div className="flex flex-row h-full gap-3 md:gap-10">
          {similar?.map((item, i) => (
            <div key={`${item?.id}-${i}`} className="w-1/2 min-w-20vw">
              <a
                key={i}
                href={"/place/" + item.id}
              >
                <PlaceCard
                  name={item?.name}
                  theme={main_category === item?.main_category.id && item?.categories[0] ? item?.categories[0].category.theme : item?.main_category.theme}
                  onClick={() => console.log(item?.name)}
                  categories={item.categories.map((cat) => cat.category).concat([item?.main_category])}
                  big
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarPlaces;
