import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';
import { convertToHTML } from 'draft-convert';

import GET_ALL_CATEGORIES from '../../../apollo/queries/admin/categories/allCategories.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import CategoryFinder from '../../../components/CategoryFinder';

import PostEditor from '../../../components/PostEditor';
import PostBody from '../../../components/Post/PostBody';

import { ColorContext } from '../../../components/Theme';

const NewStory = () => {
  const router = useRouter();

  const mainImageInputRef = useRef();

  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [postCategories, setPostCategories] = useState([]);
  const [mainImage, setMainImage] = useState(undefined);
  const [postTitle, setPostTitle] = useState("");
  const [postSubtitle, setPostSubtitle] = useState("");
  const [postState, setPostState] = useState(undefined);
  const [convertedContent, setConvertedContent] = useState(null);

  const [showCategoriesSelector, setShowCategoriesSelector] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setColorTheme('dark');
  }, []);

  useEffect(() => {
    if (postState) {
      convertContentToHTML();
    }
  }, [postState]);

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

  const insertImage = async ( file ) => {

    if (file && file.size > 5242880) {
      console.log("Image size exceeds 5mb");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result);
    };
    reader.readAsDataURL(file);
    
  };
  
  const selectCategory = (category) => {
    if (!postCategories.filter((item) => item.id === category.id).length) {
      setPostCategories([...postCategories, category]);
      setShowCategoriesSelector(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col flex-grow p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">New story</h2>
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
                onClick={() => {}}
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
                  maxWidth: showPreview ? '' : '100%',
                  borderColor: showPreview ? 'inherit' : 'transparent'
                }
              }
            >

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

              <div className="min-h-30vh rounded-xl border overflow-hidden mb-4">
                <PostEditor
                  onChange={setPostState}
                />
              </div>

              <div className="w-full flex flex-wrap justify-between">
                
                <div className="w-2/3">
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

                    {
                      !showCategoriesSelector &&
                      <div
                        onClick={() => setShowCategoriesSelector(true)}
                      >
                        <Tag
                          name="Add more"
                          filterTag
                          big
                        />
                      </div>
                    }
                  </div>
                  
                  {
                    showCategoriesSelector &&
                    <CategoryFinder
                      onSelectCategory={selectCategory}
                    />
                  }
                </div>

                <div className="w-1/3">

                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero illum vel reiciendis, delectus hic doloremque nisi provident officia deleniti a culpa! Quas illo neque delectus fugiat, architecto dolorem laborum tempore!

                </div>

              </div>

            </div>

            <div 
              className="
                preview-wrapper
                max-w-1/2
                flex-grow
                bg-white
                p-10
                text-black
              "
              style={
                {
                  display: showPreview ? 'inherit' : 'none'
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

export default NewStory;
