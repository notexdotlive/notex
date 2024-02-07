const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export const redirects = {
  /**
   * Shortcuts
   */
  '/new': `${baseUrl}/notes/new`,
  /**
   * Authentication
   */
  '/auth/login': `${baseUrl}/auth?action=login`,
  '/auth/register': `${baseUrl}/auth?action=register`,
  '/auth/forgot': `${baseUrl}/auth?action=forgot`,
  /**
   * Social Media
   */
  '/github': 'https://github.com/notexdotlive/notex',
  '/twitter': 'https://twitter.com/notexdotlive',
  '/x': 'https://x.com/notexdotlive',
};
