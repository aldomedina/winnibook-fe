import SectionWrapper from './SectionWrapper';
import { stories as s } from '../../mock/home';
import Tag from '../Tag';
import StoryCard from '../StoryCard';

const Stories = ({ reference }) => {
  const { featured, latest } = s;
  return (
    <SectionWrapper reference={reference} i={2} customClasses="w-90vw pt-14 md:pt-20">
      <div className="flex flex-col gap-4 md:flex-row h-full w-full overflow-y-scroll md:overflow-y-hidden">
        <div className="group w-full min-h-50vh md:h-auto md:w-7/12 flex flex-col gap-2 md:gap-5 cursor-pointer md:mr-5">
          <div
            className="transform transition group-hover:shadow-lg flex-1 md:flex-auto group-hover:-translate-y-0.5 h-30vh md:h-3/6 w-full rounded-20p bg-image"
            style={{ backgroundImage: `url(${featured.img})` }}
          />
          <div>
            <h3 className="h-max text-2xl md:text-4xl uppercase mb-1 md:mb-5">{featured.title}</h3>
            <div className="w-max grid gap-4 grid-flow-col auto-cols-auto mb-5">
              {featured.categories.map((cat, i) => (
                <Tag
                  key={`${i}-${cat.name}`}
                  primaryColor={cat.primaryColor}
                  secondaryColor={cat.secondaryColor}
                  secondaryCategory={cat.secondaryCategory}
                />
              ))}
            </div>
            <p className="font-serif hidden md:block">{featured.body}</p>
          </div>
        </div>
        <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-5">
          {latest.map((s, i) => (
            <div key={`${i}-${s.title}`} className="flex-1 ">
              <StoryCard title={s.title} image={s.img} categories={s.categories} />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Stories;
