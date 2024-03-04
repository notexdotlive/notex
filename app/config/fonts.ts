import localFont from 'next/font/local';

const inter = localFont({
  src: '../../public/fonts/Inter.woff2',
  variable: '--font-inter',
});

const archivo = localFont({
  src: '../../public/fonts/Archivo.woff2',
  variable: '--font-archivo',
});

export { archivo, inter };
