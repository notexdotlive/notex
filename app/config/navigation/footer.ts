interface FooterLink {
  title: string;
  href?: string;
  children?: FooterLink[];
}

export const footer: FooterLink[] = [
  {
    title: 'Company',
    children: [
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Blog',
        href: '/blog',
      },
    ],
  },
  {
    title: 'Legal',
    children: [
      {
        title: 'Terms of Service',
        href: '/terms',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy',
      },
      {
        title: 'Cookie Policy',
        href: '/cookie',
      },
    ],
  },
];
