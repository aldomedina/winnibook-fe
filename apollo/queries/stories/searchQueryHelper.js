import gql from 'graphql-tag';

export const mountSearchQuery = (hasName, hasMainCategory, hasCategory) => {

  const SEARCH_QUERY = gql`
    query MyQuery($title: String, $mainCategoryId: uuid, $categoryIds: [uuid!]) {
      winnibook_stories(
          order_by: {published_on: asc, is_featured: asc}
          where: {
            _and: [
              ${
                hasName ? 
                `{
                  title: {
                    _ilike: $title
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
            ],
          }
        ) 
      {
        id
        title
        subtitle
        main_category {
          id
          name
          theme
        }
        categories {
          category {
            id
            name
            theme
          }
        }
        images(limit: 1) {
          image {
            url
            alt
          }
        }
        is_featured
        published_on
      }
    }
  `

  return SEARCH_QUERY;

}