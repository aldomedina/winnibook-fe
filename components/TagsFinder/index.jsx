import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import GET_TAG_BY_NAME from '../../apollo/queries/tags/getTagsByName.gql';

import TagsSearch from '../TagsSearch';

const TagsFinder = ({onSelectTag}) => {

  const [searchTagsValue, setSearchTagsValue] = useState('');
  const [tags, setTags] = useState([]);

  const [searchTag, {data: tagsQueryResults, loading, refetch}] = useLazyQuery(GET_TAG_BY_NAME);

  let searchTimeout;

  useEffect(() => {
    setTags(tagsQueryResults?.winnibook_tags ? tagsQueryResults.winnibook_tags : []);
  }, [tagsQueryResults])

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchTag({
        variables: {
          name: "%" + searchTagsValue + "%"
        }
      });
    }, 300)
  }, [searchTagsValue])

  return (
    <TagsSearch
      items={tags}
      searchPlaceholder="FIND TAG"
      onSearchChange={setSearchTagsValue}
      onTagClick={onSelectTag}
    />
  );
};

export default TagsFinder;
