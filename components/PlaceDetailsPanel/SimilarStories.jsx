import StoryCard from '../StoryCard';

const SimilarStories = ({ stories }) => {

  return (
    <div 
      className="
        max-w-90vw 
        md:max-w-60vw
        min-w-40vw 
        md:min-w-30vw 

        py-32
        pr-32 

        flex 
        justify-center
      "
    >
      <div className="max-h-50vh max-h-full gap-3 flex flex-col w-full">
        <h3 className="uppercase mb-3 font-medium">Featured In</h3>
        <div className="flex-1 flex flex-row h-full gap-5 md:gap-10">
          {stories?.map((item, i) => (
            <div key={`${item.story.id}-${i}`} className="flex-1 self-stretch">
              <a
                key={i}
                href={"/story/" + item.story.id}
              >
                <StoryCard
                  image={item.story.images[0]?.image.url}
                  title={item.story.title}
                  content={item.story.subtitle}
                  categories={[item.story.main_category]}
                  invertColors={false}
                  vertical
                  growWithSpace
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarStories;
