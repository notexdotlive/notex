interface FooterLink {
  title: string;
  href?: string;
  children?: FooterLink[];
}

export const footer: FooterLink[] = [
  {
    title: 'NoteX',
    children: [
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Blog',
        href: '/blog',
      },
      {
        title: 'GitHub',
        href: '/github',
      },
    ],
  },
  {
    title: 'Get Started',
    children: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Account',
        href: '/account',
      },
      {
        title: 'Pricing',
        href: '/pricing',
      },
    ],
  },
  {
    title: 'Learn',
    children: [
      {
        title: 'Help',
        href: '/help',
      },
      {
        title: 'Guides',
        href: '/guides',
      },
      {
        title: 'Examples',
        href: '/examples',
      },
    ],
  },
  {
    title: 'Support',
    children: [
      {
        title: 'Help Center',
        href: '/help',
      },
      {
        title: 'Contact Us',
        href: '/contact',
      },
      {
        title: 'Guides',
        href: '/guides',
      },
    ],
  },
];
