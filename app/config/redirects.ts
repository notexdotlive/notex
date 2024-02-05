const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export const redirects = {
  '/new': `${baseUrl}/notes/new`,
  '/github': 'https://github.com/gelzinn/notex',
};
