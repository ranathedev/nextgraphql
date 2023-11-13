const github = {
  baseUrl: 'https://api.github.com/graphql',
  username: 'ranathedev',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'bearer ' + process.env.GITHUB_API_KEY,
  },
}

export default github
