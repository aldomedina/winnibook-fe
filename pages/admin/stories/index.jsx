import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';
import { getDayNumFromTS, getMonthNameFromTS, getYearFromTS } from '../../../utils';

import GET_ALL_STORIES from '../../../apollo/queries/admin/stories/allStories.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import { ColorContext } from '../../../components/Theme';

const Stories = ({ stories }) => {
  const router = useRouter();
  const { colorTheme, setColorTheme } = useContext(ColorContext);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col flex-grow p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">All stories</h2>
          </div>

          <div className="actions">

            <Button 
              title="New story"
              onClick={() => router.push("/admin/story/new")}
            />

          </div>

        </div>
        
        <div class="flex-grow flex border rounded-3xl py-4">
          <table class="table-auto flex-grow h-fit">
            <thead>
              <tr className="border-b">
                <th className="pb-4 px-4 max-w-1/4 text-left">ID</th>
                <th className="pb-4 px-4 text-left">Created on</th>
                <th className="pb-4 px-4 text-left">Title</th>
                <th className="pb-4 px-4 text-left">Subtitle</th>
                <th className="pb-4 px-4 text-left">Main Category</th>
                <th className="pb-4 px-4 text-left">Categories</th>
                <th className="pb-4 px-4 text-left">Published</th>
                <th className="pb-4 px-4 text-left">Featured</th>
              </tr>
            </thead>

            <tbody>
              {
                stories && stories.map((item) => (
                  <tr
                    className="border-b cursor-pointer hover:bg-white hover:bg-opacity-25"
                    onClick={() => router.push("/admin/story/" + item.id)}
                  >
                    <td className="p-4">{item.id}</td>
                    <td className="p-4">{`${getDayNumFromTS(item.published_on)} ${getMonthNameFromTS(item.published_on)}, ${getYearFromTS(item.published_on)}`}</td>
                    <td className="p-4">{item.title}</td>
                    <td className="p-4 w-1/4">{item.subtitle}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap">
                        <Tag key={item?.main_category.id} name={item?.main_category.name} theme={item?.main_category.theme} tagInfo={item.main_category} small />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap">
                        {
                          item.categories.map((itemCategories) => (
                            <Tag key={itemCategories.category?.id} name={itemCategories.category?.name} theme={itemCategories.category?.theme} tagInfo={itemCategories.category} small />
                          ))
                        }
                      </div>
                    </td>
                    <td className="p-4">{item.is_published ? "Yes" : "No"}</td>
                    <td className="p-4">{item.is_featured ? "Yes" : "No"}</td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_STORIES
  });

  // const { colorTheme, setColorTheme } = useContext(ColorContext);
  // setColorTheme(data.winnibook_stories[0].main_category.theme);

  return {
    props: {
      stories: data.winnibook_stories
    }
  };
}

export default Stories;
