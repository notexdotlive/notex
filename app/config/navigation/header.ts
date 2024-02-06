interface HeaderLink {
  title: string;
  href: string;
  children?: HeaderLink[];
}

export const header: HeaderLink[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
];
