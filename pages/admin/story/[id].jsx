import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { useMutation } from '@apollo/client';
import { client } from '../../../apollo/client';

import GET_STORY_BY_ID from '../../../apollo/queries/stories/getStoryById.gql';
import UPDATE_STORY from '../../../apollo/mutations/story/update.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import PlaceCard from '../../../components/PlaceCard';
import CategoryFinder from '../../../components/CategoryFinder';
import LocalsFinder from '../../../components/LocalsFinder';
import CustomSelect from '../../../components/CustomSelect';

import PostEditor from '../../../components/PostEditor';
import PostBody from '../../../components/Post/PostBody';

import { ColorContext } from '../../../components/Theme';
import { from } from 'apollo-link';

const isPublishedOptions = [
  {
    name: "Published",
    value: true
  },
  {
    name: "Unpublished",
    value: false
  }
];

const isFeaturedOptions = [
  {
    name: "Featured",
    value: true
  },
  {
    name: "Not featured",
    value: false
  }
];

const EditStory = ({ story }) => {
  const router = useRouter();

  const mainImageInputRef = useRef();

  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [postId, setPostId] = useState('');
  const [postCategories, setPostCategories] = useState([]);
  const [postLocals, setPostLocals] = useState([]);
  const [postIsPublished, setPostIsPublished] = useState(false);
  const [postIsFeatured, setPostIsFeatured] = useState(false);
  const [mainImage, setMainImage] = useState(undefined);
  const [postTitle, setPostTitle] = useState("");
  const [postSubtitle, setPostSubtitle] = useState("");
  const [postState, setPostState] = useState(undefined);

  const [convertedContent, setConvertedContent] = useState(null);
  const [showCategoriesSelector, setShowCategoriesSelector] = useState(false);
  const [showLocalsSelector, setShowLocalsSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [addStoryMutation, { data }] = useMutation(UPDATE_STORY);

  useEffect(() => {
    setColorTheme('dark');

    console.log(story);

    setPostId(story.id);
    setPostTitle(story.title);
    setPostSubtitle(story.subtitle);

    let allCategories = story.categories.reduce((obj, item) => {return [...obj, item.category]}, []);
    allCategories.unshift(story.main_category);
    console.log(allCategories);
    setPostCategories(allCategories);
    setPostLocals(story.locals.reduce((obj, item) => {return [...obj, item.local]}, []));

    setMainImage(story.images[0]?.image.url);

    setPostIsPublished(story.is_published);
    setPostIsFeatured(story.is_featured);

    setConvertedContent(story.body);
    convertContentFromHTML(story.body);
  }, []);

  useEffect(() => {
    if (postState) {
      convertContentToHTML();
    }
  }, [postState]);

  const addStory = async () => {

    if (
      postTitle && postTitle !== "" &&
      convertedContent && convertedContent !== "" &&
      postCategories.filter((item) => !item.parent_category_id || item.parent_category_id === '').length > 0
    ) {
      let variables = { 
        id: story.id,
        title: postTitle,
        subtitle: postSubtitle,
        body: convertedContent,
        main_category_id: postCategories.filter((item) => !item.parent_category_id || item.parent_category_id === '')[0].id,
        categories: postCategories.filter((item) => item.parent_category_id && item.parent_category_id !== '').reduce((obj, item) => [...obj, {stories_id: story.id, categories_id: item.id}], []),
        locals: postLocals.reduce((obj, item) => [...obj, {stories_id: story.id, locals_id: item.id}], []),
        mainImage: mainImage,
        imageId: story.images[0]?.image.id,
        is_featured: postIsFeatured,
        is_published: postIsPublished
      };

      console.log(variables);
  
      try {
        await addStoryMutation(
          { 
            variables: variables
          }
        ); 

        router.push("/admin/stories");
      } catch (error) {
        
      }
    }
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'IMAGE') {
          return <img src={entity.data?.src} />;
        }
        return originalText;
      }
    })(postState);
    setConvertedContent(currentContentAsHTML);
  }

  const convertContentFromHTML = (content) => {
    let currentContentFromHTML = convertFromHTML({
      htmlToEntity: (nodeName, node, createEntity) => {
        if (nodeName === 'img') {
            return createEntity(
                'IMAGE',
                {src: node.href}
            )
        }
      },
    })(content);

    setPostState(currentContentFromHTML);
  }

  const insertImage = async ( file ) => {

    if (file && file.size > 5242880) {
      console.log("Image size exceeds 5mb");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result);
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
    
  };
  
  const selectCategory = (category) => {
    if (!postCategories.filter((item) => item.id === category.id).length) {

      if (!category.parent_category_id || category.parent_category_id === '') {
        setPostCategories([category, ...postCategories]);
      } else {
        setPostCategories([...postCategories, category]);
      }
    }
    setShowCategoriesSelector(false);
  }

  const selectLocal = (local) => {
    console.log(postLocals, local);
    if (!postLocals.filter((item) => item.id === local.id).length) {
      setPostLocals([...postLocals, local]);
    }
    setShowLocalsSelector(false);
  }

  const checkHasParentCategory = () => {
    return !postCategories.filter((item) => !item.parent_category_id || item.parent_category_id === '').length > 0;
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col flex-grow p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">Edit story</h2>
          </div>

          <div className="actions flex">

            <div className="action mr-4">
              <Button 
                title={showPreview ? "Hide preview" : "Show preview"}
                onClick={() => setShowPreview(!showPreview)}
              />
            </div>

            <div className="action">
              <Button 
                title="Save"
                onClick={addStory}
              />
            </div>

          </div>

        </div>
        
        <div class="flex-grow flex border rounded-3xl overflow-hidden">

          <div className="flex flex-grow">
            <div 
              className="
                editor-wrapper
                max-w-1/2
                flex-grow
                p-10
                border-r
                border-gray-50
                bg-white
                text-black
              "
              style={
                {
                  maxWidth: showPreview ? '66.6%' : '100%',
                  borderColor: showPreview ? 'inherit' : 'transparent'
                }
              }
            >

              <div className="w-full flex flex-wrap justify-between">

                <div className="w-1/4 py-4 pr-4">
                  <div
                    onClick={() => mainImageInputRef.current.click()}
                    className="
                      rounded-xl 

                      bg-image
                      bg-gray-300 
                      bg-center

                      w-full 
                      min-h-20vh 

                      grid-item-img 
                      mb-10

                      flex
                      justify-center
                      items-center
                    "
                    style={{ backgroundImage: `url(${mainImage})` }}
                  >
                    <input 
                      ref={mainImageInputRef} 
                      className="hidden" 
                      type="file" 
                      accept=".png,.jpeg,.jpg" 
                      onChange={(e) => {if (e.target?.files[0]) {insertImage(e.target.files[0])}}} 
                    />
                    
                    {
                      !mainImage && <span>Add main image</span>
                    }
                  </div>
                </div>

                <div className="w-1/4 py-4">
                  
                  {
                    (!showCategoriesSelector && postCategories.length > 0) &&
                    <div className="w-full flex flex-wrap mb-4">
                      {
                        postCategories.map((item, index) => (

                          <div
                            onClick={() => setPostCategories(postCategories.filter((cat) => cat.id !== item.id))}
                          >
                            <Tag
                              name={item?.name}
                              tagInfo={item}
                              theme={item?.theme}
                              big
                            />
                          </div>

                        ))
                      }

                      <div
                        onClick={() => setShowCategoriesSelector(true)}
                      >
                        <Tag
                          name="Add more"
                          filterTag
                          big
                        />
                      </div>
                    </div>
                  }
                  
                  {
                    (showCategoriesSelector || postCategories.length <= 0) &&
                    <CategoryFinder
                      hasParent={checkHasParentCategory()}
                      onSelectCategory={selectCategory}
                    />
                  }
                </div>

                <div className="w-1/4 p-4 pr-0">

                  {
                    !showLocalsSelector &&
                    <div className="w-full flex flex-wrap mb-4">
                      {
                        postLocals.map((item, index) => (

                          <div
                            className="flex-grow pb-2 pr-2"
                            onClick={() => setPostLocals(postLocals.filter((local) => local.id !== item.id))}
                          >
                            <PlaceCard name={item.name} theme={item.main_category.theme} categories={[item.main_category]} />
                          </div>

                        ))
                      }
                      
                      <div
                        className="flex-grow pb-2 pr-2"
                        onClick={() => setShowLocalsSelector(true)}
                      >
                        <PlaceCard name="ADD MORE" theme="base" categories={[]}/>
                      </div>
                    </div>
                  }

                  {
                    showLocalsSelector &&
                    <LocalsFinder
                      onSelectLocal={selectLocal}
                    />
                  }

                </div>

                <div className="w-1/4 p-4 pr-0">

                  <div className="mb-4">
                    <CustomSelect
                      options={isPublishedOptions}
                      placeholder="Publish story"
                      value={postIsPublished}
                      onChange={(value) => setPostIsPublished(value)}
                    />
                  </div>

                  <div className="mb-4">
                    <CustomSelect
                      options={isFeaturedOptions}
                      placeholder="Featured story"
                      value={postIsFeatured}
                      onChange={(value) => setPostIsFeatured(value)}
                    />
                  </div>

                </div>

              </div>

              <div className="w-full flex flex-wrap justify-between">

                <div className="w-full rounded-xl border overflow-hidden mb-4">
                  <input 
                    className="w-full border-0 text-black" 
                    type="text" 
                    placeholder="Story title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}

                  />
                </div>

                <div className="w-full h-24 rounded-xl border overflow-hidden mb-4">
                  <textarea 
                    className="w-full h-full border-0 text-black" 
                    type="text" 
                    placeholder="Story subtitle"
                    value={postSubtitle}
                    onChange={(e) => setPostSubtitle(e.target.value)}
                  />
                </div>

              </div>

              <div className="min-h-70vh rounded-xl border overflow-hidden mb-4">
                {
                  postState &&
                  <PostEditor
                    initialContent={postState}
                    onChange={setPostState}
                  />
                }
              </div>

            </div>

            <div 
              className="
                preview-wrapper
                max-w-1/3
                flex-grow
                flex
                bg-white
                p-10
                text-black
              "
              style={
                {
                  display: showPreview ? 'block' : 'none'
                }
              }
            >
              <h2 className="text-xl font-bold mb-4">Preview story</h2>

              {
                mainImage &&
                <div
                  onClick={() => mainImageInputRef.current.click()}
                  className="
                    rounded-xl 

                    bg-image
                    bg-gray-300 
                    bg-center

                    w-full 
                    min-h-40vh 

                    grid-item-img 
                    mb-10

                    flex
                    justify-center
                    items-center
                  "
                  style={{ backgroundImage: `url(${mainImage})` }}
                />
              }

              <div>
                <h1 className="uppercase text-2xl md:text-4xl mb-2 md:mb-4">{postTitle}</h1>
                <h3 className="font-serif md:text-xl">{postSubtitle}</h3>
              </div>

              {
                postState ? 
                  <PostBody
                    content={convertedContent}
                  />
                : ""
              }
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {

  const { data } = await client.query({
    query: GET_STORY_BY_ID,
    variables: {
      storyId: id
    }
  });

  return {
    props: {
      story: data.winnibook_stories[0] ? data.winnibook_stories[0] : {}
    }
  };
}

export default EditStory;
