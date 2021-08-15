import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { EditorState } from 'draft-js';
import imageToBase64 from 'image-to-base64/browser';

import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';

const imagePlugin = createImagePlugin();
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [imagePlugin, staticToolbarPlugin];

const PostEditorWrapper = styled.div`
  position: relative;
  min-height: 100%;
  
  .DraftEditor-root {
    margin-top: 20px;
  }

  ul,
  ol {
    list-style: disc;

    margin: 0 0 20px 20px;

    li {
      margin-bottom: 5px;
    }

  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

`;

const PostEditor = ({onChange, initialContent}) => {

  const editorRef = useRef();
  const imageInputRef = useRef();

  const [editorReady, setEditorReady] = useState(undefined);
  const [editorState, setEditorState] = useState(undefined);

  useEffect(async () => {
    if(initialContent) {
      setEditorState(
        () => EditorState.createWithContent(initialContent)
      );
    } else {
      setEditorState(
        () => EditorState.createEmpty()
      )
    }

    setEditorReady(true);
  }, []);

  useEffect(() => {
    onChange && editorState ? onChange(editorState.getCurrentContent()) : '';
  }, [editorState]);

  const handleEditorChange = (state) => {
    setEditorState(state);
  }

  const focusOnEditor = () => {
    editorRef?.current?.focus()
  }

  const insertImage = async ( file ) => {

    if (file && file.size > 5242880) {
      console.log("Image size exceeds 5mb");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleEditorChange(imagePlugin.addImage(editorState, reader.result));
    };
    reader.readAsDataURL(file);

    // const base64Image = await imageToBase64(url);
    // handleEditorChange(imagePlugin.addImage(editorState, "data:image;base64," + base64Image));
  };

  return (
    <PostEditorWrapper
      onClick={focusOnEditor}  
    >
      {
        editorReady ?
        <>
          
          <div 
            className="toolbar-wrapper text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <Toolbar>
              {
                // may be use React.Fragment instead of div to improve perfomance after React 16
                (externalProps) => (
                  <div>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <Separator {...externalProps} />
                    <HeadlineOneButton {...externalProps} />
                    <HeadlineTwoButton {...externalProps} />
                    <HeadlineThreeButton {...externalProps} />
                    <Separator {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />

                    <div className="inline-block flex items-center">
                      <input 
                        ref={imageInputRef} 
                        className="hidden" 
                        type="file" 
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => {insertImage(e.target.files[0])}} 
                      />
                      <button onClick={() => imageInputRef.current.click()}>
                        Add image
                      </button>
                    </div>
                  </div>
                )
              }
            </Toolbar>
          </div>

          {
            editorState &&
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={handleEditorChange}
              plugins={plugins}
            />
          } 
        </> : ""
      }
    </PostEditorWrapper>
  );
};

export default PostEditor;
