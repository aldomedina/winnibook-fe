import { useState, useEffect } from 'react';
import { convertToHTML } from 'draft-convert';

import PostEditor from '../../components/PostEditor';
import PostBody from '../../components/Post/PostBody';

const NewPost = () => {

  const [postState, setPostState] = useState(undefined);
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    if (postState) {
      convertContentToHTML();
    }
  }, [postState]);

  useEffect(() => {
    console.log(JSON.stringify(convertedContent));
  }, [convertedContent]);

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

  return (
    <div className="flex flex-col min-h-screen">

      <div className="
        flex-grow-0 
        p-5
        bg-white
        border-b
        border-gray-50
      ">
        <h1>aslkdjasdjlaskdj</h1>
      </div>

      <div className="flex flex-grow">
        <div 
          className="
            editor-wrapper
            w-1/2
            bg-white
            p-10
            border-r
            border-gray-50
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
          "
        >
          <h2 className="text-xl font-bold">Preview story</h2>
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
  );
};

export default NewPost;
