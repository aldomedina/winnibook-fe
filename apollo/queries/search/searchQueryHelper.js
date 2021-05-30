import gql from 'graphql-tag';

export const mountSearchQuery = (hasName, hasTags, hasMainCategory, hasCategory, hasRegions) => {

  const SEARCH_QUERY = gql`
    query MyQuery($name: String, $tagIds: [uuid!], $mainCategoryId: uuid, $categoryIds: [uuid!], $cityIds: [uuid!]) {
      winnibook_locals(
          where: {
            _and: [
              ${
                hasName ? 
                `{
                  name: {
                    _ilike: $name
                  },
                },` : ``
              }
              ${
                hasTags ? 
                `{
                    tags: {
                      tag: {
                        id: {
                          _in: $tagIds
                        }
                      }
                    },
                  },` : ``
              }
              ${
                hasMainCategory ? 
                `{
                    main_category: {
                      id: {
                        _eq: $mainCategoryId
                      }
                    },
                  },` : ``
              }
              ${
                hasCategory ? 
                `{
                    categories: {
                      category: {
                        id: {
                          _in: $categoryIds
                        }
                      }
                    }
                  }` : ``
              }
              ${
                hasRegions ? 
                `{
                    address: {
                      city: {
                        id: {
                          _in: $cityIds
                        }
                      }
                    }
                  }` : ``
              }
            ],
          }
        ) {
        id
        name
        categories {
          category {
            id
            name
            theme
          }
        }
        main_category {
          id
          name
          theme
        }
        address {
          city {
            name
          }
        }
      }
    }
  `

  return SEARCH_QUERY;

}