import Tag from '../Tag';

const StoryCard = ({ image, title, categories, content }) => {
  return (
    <div className="group relative md:h-full flex cursor-pointer">
      {image && (
        <div
          className="transform transition group-hover:shadow-lg group-hover:-translate-y-0.5  bg-image h-32 md:h-auto w-32 md:w-48 rounded-xl mr-5"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="flex-1">
        <h3 className="uppercase md:text-xl mb-1 md:mb-3">{title}</h3>
        {content && <p className="font-serif">{content}</p>}
        {categories && (
          <div className="flex flex-wrap">
            {categories.map(cat => (
              <Tag
                primaryColor={cat.primaryColor}
                secondaryColor={cat.secondaryColor}
                secondaryCategory={cat.secondaryCategory}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCard;
