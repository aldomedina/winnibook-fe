import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../../apollo/client';
import { convertToHTML } from 'draft-convert';

import GET_ALL_CATEGORIES from '../../../apollo/queries/admin/categories/allCategories.gql';

import AdminHeader from '../../../components/AdminHeader';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import PostEditor from '../../../components/PostEditor';
import PostBody from '../../../components/Post/PostBody';

import { ColorContext } from '../../../components/Theme';

const NewStory = () => {
  const router = useRouter();

  const mainImageInputRef = useRef();

  const { colorTheme, setColorTheme } = useContext(ColorContext);

  const [mainImage, setMainImage] = useState(undefined);
  const [postTitle, setPostTitle] = useState("");
  const [postSubtitle, setPostSubtitle] = useState("");
  const [postState, setPostState] = useState(undefined);
  const [convertedContent, setConvertedContent] = useState(null);

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

  return (
    <div className="flex flex-col min-h-screen">

      <AdminHeader/>

      <div className="flex flex-col flex-grow p-4">

        <div className="w-full flex p-4 justify-between">

          <div>
            <h2 className="text-2xl font-bold">New story</h2>
          </div>

          <div className="actions">

            <Button 
              title="Save"
              onClick={() => {}}
            />

          </div>

        </div>

        <div className="w-full flex flex-wrap py-4 justify-between">

          <div className="w-full rounded-xl overflow-hidden mb-4">
            <input 
              className="w-full border-0 text-black" 
              type="text" 
              placeholder="Story title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}

            />
          </div>

          <div className="w-full h-32 rounded-xl overflow-hidden">
            <textarea 
              className="w-full h-full border-0 text-black" 
              type="text" 
              placeholder="Story subtitle"
              value={postSubtitle}
              onChange={(e) => setPostSubtitle(e.target.value)}
            />
          </div>

        </div>
        
        <div class="flex-grow flex border rounded-3xl overflow-hidden">

          <div className="flex flex-grow">
            <div 
              className="
                editor-wrapper
                w-1/2
                p-10
                border-r
                border-gray-50
                bg-white
                text-black
              "
            >
              <PostEditor
                onChange={setPostState}
              />

            </div>

            <div 
              className="
                preview-wrapper
                w-1/2
                bg-white
                p-10
                text-black
              "
            >
              <h2 className="text-xl font-bold mb-4">Preview story</h2>

              <div
                onClick={() => mainImageInputRef.current.click()}
                className="
                  rounded-xl 

                  bg-image
                  bg-gray-300 
                  bg-center

                  w-full 
                  h-40vh 

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
                  onChange={(e) => {insertImage(e.target.files[0])}} 
                />
                
                {
                  !mainImage && <span>Add main image</span>
                }
              </div>

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
