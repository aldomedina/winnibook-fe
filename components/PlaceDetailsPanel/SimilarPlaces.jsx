import PlaceCard from '../PlaceCard';

const SimilarPlaces = ({ similar, main_category }) => {
  
  return (
    <div 
      className="
        max-w-80vw 
        md:max-w-60vw

        py-32
        pr-32 

        flex 
        justify-center
      "
    >
      <div className="min-h-50vh max-h-full gap-3 flex flex-col min-w-100vw md:min-w-min md:w-full">
        <h3 className="uppercase mb-3 font-medium">Similar places</h3>
        <div className="flex flex-row h-full gap-3 md:gap-10">
          {similar?.map((item, i) => (
            <div key={`${item?.id}-${i}`} className="min-w-50vw md:w-1/2 md:min-w-20vw">
              <a
                key={i}
                href={"/place/" + item.id}
              >
                <PlaceCard
                  name={item?.name}
                  theme={main_category === item?.main_category.id && item?.categories[0] ? item?.categories[0].category.theme : item?.main_category.theme}
                  categories={item.categories.map((cat) => cat.category).concat([item?.main_category])}
                  extraBig
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
