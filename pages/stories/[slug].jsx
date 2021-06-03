import { useEffect, useRef } from 'react';

import TopNav from '../../components/TopNav';
import DateBox from '../../components/DateBox';
import Tag from '../../components/Tag';
import PlaceCard from '../../components/PlaceCard';

import getStoryData from '../../mock/story';

const Story = ({ storyData }) => {
  const { img, title, subtitle, categories, places, createdAt } = storyData;

  const headerRef = useRef(null);

  return (
    <div className="bg-white h-full">

      <TopNav
        reference={headerRef} 
        hasBG
        showSearch
      />

      <div className="px-3 md:px-5 pt-5">
        <div className="story-header-grid gap-2 md:gap-3 mb-3 md:mb-6">
          <div
            className="rounded-xl bg-image w-full h-55vh grid-item-img "
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="grid-item-date">
            <DateBox ts={createdAt} />
          </div>
          <div className="grid-item-titles justify-self-center max-w-152">
            <h1 className="uppercase text-2xl md:text-4xl mb-2 md:mb-4">{title}</h1>
            <h3 className="font-serif md:text-xl">{subtitle}</h3>
          </div>
          <div className="flex lg:flex-col justify-end lg:justify-start items-end grid-item-categories gap-1  md:gap-2 flex-wrap">
            {categories?.map(el => (
              <Tag key={el.id} name={el.name} theme={el.theme} />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="block mx-auto lg:mx-none max-w-full lg:mx-0 lg:sticky top-16 self-start">
            <h4 className="opacity-50 mb-3">on this article</h4>
            <div className="flex flex-row lg:flex-col md:overflow-y-visible overflow-x-auto md:overflow-x-visible w-full gap-3 mb-4">
              {places.map(place => (
                <div key={place.id} className="w-44 h-36  min-w-44 min-h-36 md:overflow-y-visible">
                  <PlaceCard name={place.name} theme={place.theme} categories={place.categories} />
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-152 block mx-auto">
            <div className="lg:-ml-22 lg:mr-22">
              <p className="font-serif mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur officia error
                natus et debitis consectetur quas voluptatibus possimus eligendi, quidem molestiae
                voluptates culpa modi expedita aut, iste rem harum iusto nemo! Aperiam facilis nihil
                rem exercitationem repudiandae dolores accusamus voluptatum. Nesciunt omnis,
                aspernatur quas recusandae veritatis pariatur at repellat quam ad nemo neque rem
                assumenda culpa eius officiis totam exercitationem dolores voluptates laboriosam
                iusto, delectus provident, vel possimus eaque. Facere eum sunt cupiditate quae
                molestiae illo aspernatur obcaecati, consectetur velit at maiores enim a doloremque
                numquam mollitia harum in provident nisi error magni impedit eligendi vero libero.
                Exercitationem, porro corporis repellendus dolores quod mollitia accusamus vero
                repudiandae numquam asperiores temporibus consequatur sequi sit dolorum, veniam fuga
                deleniti voluptates, nulla tempora.
              </p>
              <p className="font-serif mb-5">
                Dolor sit amet consectetur, adipisicing elit. Consequuntur officia error natus et
                debitis consectetur quas voluptatibus possimus eligendi, quidem molestiae voluptates
                culpa modi expedita aut, iste rem harum iusto nemo! Aperiam facilis nihil rem
                exercitationem repudiandae dolores accusamus voluptatum. Nesciunt omnis,
              </p>
              <p className="font-serif mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur officia error
                natus et debitis consectetur quas voluptatibus possimus eligendi, quidem molestiae
                voluptates culpa modi expedita aut, iste rem harum iusto nemo! Aperiam facilis nihil
                rem exercitationem repudiandae dolores accusamus voluptatum. Nesciunt omnis,
                aspernatur quas recusandae veritatis pariatur at repellat quam ad nemo neque rem
                assumenda culpa eius officiis totam exercitationem dolores voluptates laboriosam
                iusto, delectus provident, vel possimus eaque. Facere eum sunt cupiditate quae
                molestiae illo aspernatur obcaecati, consectetur velit at maiores enim a doloremque
                numquam mollitia harum in provident nisi error magni impedit eligendi vero libero.
                Exercitationem, porro corporis repellendus dolores quod mollitia accusamus vero
                repudiandae numquam asperiores temporibus consequatur sequi sit dolorum, veniam fuga
                deleniti voluptates, nulla tempora.
              </p>
              <p className="font-serif mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur officia error
                natus et debitis consectetur quas voluptatibus possimus eligendi, quidem molestiae
                voluptates culpa modi expedita aut, iste rem harum iusto nemo! Aperiam facilis nihil
                rem exercitationem repudiandae dolores accusamus voluptatum. Nesciunt omnis,
                aspernatur quas recusandae veritatis pariatur at repellat quam ad nemo neque rem
                assumenda culpa eius officiis totam exercitationem dolores voluptates laboriosam
                iusto, delectus provident, vel possimus eaque. Facere eum sunt cupiditate quae
                molestiae illo aspernatur obcaecati, consectetur velit at maiores enim a doloremque
                numquam mollitia harum in provident nisi error magni impedit eligendi vero libero.
                Exercitationem, porro corporis repellendus dolores quod mollitia accusamus vero
                repudiandae numquam asperiores temporibus consequatur sequi sit dolorum, veniam fuga
                deleniti voluptates, nulla tempora.
              </p>
              <p className="font-serif mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur officia error
                natus et debitis consectetur quas voluptatibus possimus eligendi, quidem molestiae
                voluptates culpa modi expedita aut, iste rem harum iusto nemo! Aperiam facilis nihil
                rem exercitationem repudiandae dolores accusamus voluptatum. Nesciunt omnis,
                aspernatur quas recusandae veritatis pariatur at repellat quam ad nemo neque rem
                assumenda culpa eius officiis totam exercitationem dolores voluptates laboriosam
                iusto, delectus provident, vel possimus eaque. Facere eum sunt cupiditate quae
                molestiae illo aspernatur obcaecati, consectetur velit at maiores enim a doloremque
                numquam mollitia harum in provident nisi error magni impedit eligendi vero libero.
                Exercitationem, porro corporis repellendus dolores quod mollitia accusamus vero
                repudiandae numquam asperiores temporibus consequatur sequi sit dolorum, veniam fuga
                deleniti voluptates, nulla tempora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // 🚨  MOCK ALERT 🚨
  // TODO: create method to fetch all story slugs
  const paths = [
    {
      params: {
        slug: 'mock-data'
      }
    },
    {
      params: {
        slug: 'other'
      }
    }
  ];
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  // 🚨  MOCK ALERT 🚨
  // TODO: create method to fetch story by slug
  const storyData = getStoryData(slug);
  return {
    props: {
      storyData
    }
  };
}

export default Story;
