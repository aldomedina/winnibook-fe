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

`;

const PostEditor = ({onChange}) => {

  const editorRef = useRef();

  const [editorReady, setEditorReady] = useState(undefined);
  const [editorState, setEditorState] = useState(undefined);

  useEffect(async () => {
    setEditorState(
      () => EditorState.createEmpty(),
    )
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

  const insertImage = async ( url ) => {
    const base64Image = await imageToBase64(url);
    handleEditorChange(imagePlugin.addImage(editorState, "data:image;base64," + base64Image));
  };

  return (
    <PostEditorWrapper
      onClick={focusOnEditor}  
    >
      {
        editorReady ?
        <>
          
          <div 
            className="toolbar-wrapper"
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

                    <button onClick={() => insertImage('https://media-cdn.tripadvisor.com/media/photo-s/18/45/7c/f0/blue-restaurant-bar.jpg')}>
                      Add image
                    </button>
                  </div>
                )
              }
            </Toolbar>
          </div>

          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={handleEditorChange}
            plugins={plugins}
          /> 
        </> : ""
      }
    </PostEditorWrapper>
  );
};

export default PostEditor;
