import { useState, useEffect } from 'react';

import styled from 'styled-components';
import DOMPurify from 'dompurify';

const PostBodyContent = styled.div`
  display: block;
  // max-width: 743px;
  overflow: visible;

  padding: 20px 0;

  background-color: #fff;

  figure {
    width: 100%;
    margin: 45px 0;
    transform: scale(1.05) translateX(18px);

    @media (max-width: 768px) {
      transform: none;
    }
  }

  img {
    width: 100%;

    border-radius: 15px;
  }

  h1,
  h2,
  h3,
  p,
  li {
    margin-bottom: 15px;

    font: normal normal 300 20px/28px piazzolla, serif;
    color: #000;
  }

  h1 {
    font: normal normal 800 47px/58px piazzolla, serif;
  }

  h2 {
    font: normal normal 800 38px/45px piazzolla, serif;
  }

  h3 {
    font: normal normal 800 30px/40px piazzolla, serif;
  }

  blockquote {
    position: relative;

    margin: 60px 0;

    font: normal normal bold 30px/47px Lexend, serif;
    color: #000;

    transform: translateX(150px);

    &:before {
      content: '“';
      position: absolute;

      top: -32px;
      left: -50px;

      font: normal normal bold 80px/97px Lexend, serif;
    }

    &:after {
      content: '”';
      position: absolute;

      bottom: -30px;
      right: -40px;

      font: normal normal bold 80px/97px Lexend, serif;
    }

    @media (max-width: 768px) {
      width: 70%;

      font: normal normal bold 24px/32px Lexend, serif;
      transform: translateX(35%);

      &:before,
      &:after {
        display: none;
      }
    }
  }

  ul,
  ol {
    list-style: disc;

    margin-bottom: 20px;

    li {
      margin-bottom: 5px;
    }

  }
`;

const PostBody = ({content}) => {

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <PostBodyContent
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
};

export default PostBody;
