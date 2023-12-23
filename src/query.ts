const username = 'ranathedev'

const query = (
  pageCount: number,
  queryString: string,
  paginationKeyword: string,
  paginationString: string
) => {
  return {
    query: `
    {
        user(login: "${username}") {
          avatarUrl
          name
          url
        }
        search(query: "${queryString} user:${username}", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
          repositoryCount
          edges {
            cursor
            node {
              ... on Repository {
                name
                id
                description
                viewerSubscription
                url
                licenseInfo {
                  spdxId
                  url
                }
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `,
  }
}

export default query
