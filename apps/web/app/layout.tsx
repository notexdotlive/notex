import { ReactNode } from 'react';

import { LayoutProvider } from './layout-provider';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { fonts } from '@/config';

import '../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { archivo, inter } = fonts;

  return (
    <html lang="en-US" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        <title>Never throw away a thought | NoteX</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicons/favicon-light.png" type="image/png" />
      </head>

      <body className={`${archivo.className}`}>
        <main className="min-h-screen h-auto min-w-screen bg-zinc-50 text-zinc-950 overflow-hidden">
          <LayoutProvider>{children}</LayoutProvider>
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
