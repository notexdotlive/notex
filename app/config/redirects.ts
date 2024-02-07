const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export const redirects = {
  '/new': `${baseUrl}/notes/new`,
  '/github': 'https://github.com/notexdotlive/notex',
  '/twitter': 'https://twitter.com/notexdotlive',
  '/x': 'https://x.com/notexdotlive',
};
