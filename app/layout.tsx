import { SpeedInsights } from '@vercel/speed-insights/next';
import { archivo, inter } from './fonts';

import '../styles/globals.css';
import Header from './components/header';

export default function RootLayout({ children }: any) {
  return (
    <html lang="en-US" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        <title>Never throw away a thought | NoteX</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicons/favicon-light.png" type="image/png" />
      </head>

      <body>
        <main className="relative min-h-screen h-auto min-w-screen bg-zinc-50 text-zinc-950 overflow-hidden">
          <Header />
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
