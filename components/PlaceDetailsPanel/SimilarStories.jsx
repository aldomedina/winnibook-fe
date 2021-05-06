import StoryCard from '../StoryCard';

const SimilarStories = ({ stories }) => {
  return (
    <div className="min-w-90vw md:min-w-60vw px-3 md:px-5 flex items-center justify-center">
      <div className="min-h-50vh max-h-full gap-3 flex flex-col w-full">
        <h3 className="uppercase mb-3 font-medium">Featured In</h3>
        <div className="flex-1 flex flex-row h-full gap-5 md:gap-10">
          {stories?.map(story => (
            <div className="flex-1 self-stretch">
              <StoryCard
                key={story.id}
                image={story.image}
                title={story.title}
                categories={story.categories}
                invertColors={false}
                vertical
                growWithSpace
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarStories;
