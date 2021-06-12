import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import GET_LOCAL_BY_NAME from '../../apollo/queries/local/getLocalByName.gql';

import LocalsSearch from '../LocalsSearch';

const LocalsFinder = ({onSelectLocal}) => {

  const [searchLocalsValue, setSearchLocalsValue] = useState('');
  const [locals, setLocals] = useState([]);

  const [searchPlace, {data: localsQueryResults, loading, refetch}] = useLazyQuery(GET_LOCAL_BY_NAME);

  let searchTimeout;

  useEffect(() => {
    setLocals(localsQueryResults?.winnibook_locals ? localsQueryResults.winnibook_locals : []);
  }, [localsQueryResults])

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchPlace({
        variables: {
          name: "%" + searchLocalsValue + "%"
        }
      });
    }, 300)
  }, [searchLocalsValue])

  return (
    <LocalsSearch
      items={locals}
      searchPlaceholder="FIND PLACE"
      onSearchChange={setSearchLocalsValue}
      onLocalClick={onSelectLocal}
    />
  );
};

export default LocalsFinder;
