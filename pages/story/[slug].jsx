import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import GET_STORY_BY_ID from '../../apollo/queries/story/getStoryById.gql';

import Head from '../../components/Head';
import TopNav from '../../components/TopNav';
import PlaceCard from '../../components/PlaceCard';
import PostBody from '../../components/Post/PostBody';
import DateBox from '../../components/DateBox';
import Tag from '../../components/Tag';
import { Icon } from '../../components/Icon';

import { ColorContext } from '../../components/Theme';
import Loader from '../../components/Loader';

const Story = ({ storyData }) => {
  const router = useRouter();

  const { colorTheme, setColorTheme } = useContext(ColorContext);
  const headerRef = useRef(null);

  const [story, setStory] = useState({});
  const { data: storyQueryResponse, loading } = useQuery(GET_STORY_BY_ID, {
    variables: {
      storyId: router.query.slug
    }
  });

  useEffect(() => {
    if (storyQueryResponse) {
      setStory(storyQueryResponse.winnibook_stories[0]);
    }
  }, [storyQueryResponse]);

  return (
    <div className="bg-white h-full">
      <Head title={story.title} />
      <TopNav reference={headerRef} hasBG showSearch />

      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Loader theme="base" />
        </div>
      ) : story.id ? (
        <div className="px-3 md:px-5 pt-5">
          <div className="story-header-grid gap-2 md:gap-3 mb-3 md:mb-6">
            {/* MAIN IMAGE */}
            {story?.images[0]?.image.url && (
              <div
                className="rounded-xl bg-image w-full h-70vh grid-item-img mb-10"
                style={{ backgroundImage: `url(${story?.images[0]?.image.url})` }}
              />
            )}

            {/* STORY DATE */}
            <div className="grid-item-date">
              <DateBox ts={story?.published_on} />
            </div>

            <div className="grid-item-titles max-w-152">
              <h1 className="uppercase text-2xl md:text-4xl mb-2 md:mb-4">{story?.title}</h1>
              <h3 className="font-serif md:text-xl">{story?.subtitle}</h3>
            </div>

            <div className="flex lg:flex-col justify-end lg:justify-start items-end grid-item-categories gap-1  md:gap-2 flex-wrap">
              {story.categories
                .map(cat => cat.category)
                .concat([story?.main_category])
                .splice(0, 3)
                ?.map(el => (
                  <Tag key={el.id} name={el.name} theme={el.theme} />
                ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* RELATED PLACES */}
            {story.locals && !!story.locals.length && (
              <div className="block mx-auto lg:mx-none max-w-full lg:mx-0 lg:sticky top-16 self-start">
                <h4 className="opacity-50 mb-3">on this article</h4>
                <div className="flex flex-row lg:flex-col md:overflow-y-visible overflow-x-auto md:overflow-x-visible w-full gap-3 mb-4">
                  {story?.locals.map(item => (
                    <a
                      key={item.local.id}
                      href={'/place/' + item.local.id}
                      className="w-44 h-36  min-w-44 min-h-36 md:overflow-y-visible"
                    >
                      <PlaceCard
                        name={item.local.name}
                        theme={item.local.main_category.theme}
                        categories={[item.local.main_category]}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* STORY BODY */}
            <div className="max-w-152 block mx-auto">
              <div className="lg:-ml-22 lg:mr-222">
                <PostBody content={story?.body} />

                <div className="pt-8 pb-16 flex justify-center">
                  <Icon icon="logo" w="30px" h="30px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params: { slug } }) {
  // ????  MOCK ALERT ????
  // TODO: create method to fetch story by slug
  return {
    props: {}
  };
}

export default Story;
