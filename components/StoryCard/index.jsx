import Tag from '../Tag';

const StoryCard = ({
  image,
  title,
  categories,
  content,
  vertical,
  growWithSpace,
  invertColors = true
}) => {
  return (
    <div
      className={`group relative md:h-full flex cursor-pointer ${
        vertical ? 'flex-col' : 'flex-row'
      }`}
    >
      {image && (
        <div
          className={`transform transition group-hover:shadow-lg group-hover:-translate-y-0.5  bg-image rounded-xl ${
            growWithSpace ? 'flex-1 w-full min-h-32' : 'h-32 md:h-auto w-32 md:w-48'
          } ${vertical ? 'mb-5' : 'mr-5'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="flex-1">
        <h3 className="uppercase md:text-xl mb-1 md:mb-3">{title}</h3>
        {content && <p className="font-serif">{content}</p>}
        {categories && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <Tag
                key={`${i}-${cat.name}`}
                theme={cat.theme}
                name={cat.name}
                invertColors={invertColors}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
