'use client';

import { useEffect, useState } from 'react';
import { header } from '@/config';

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleToggleMenu = () => {
    if (typeof window === 'undefined') return;

    const html = document.querySelector('html');
    const body = document.querySelector('body');

    if (!body || !html) return;

    if (open) {
      setOpen(false);
      body.classList.remove('overflow-hidden');
      html.classList.remove('overflow-hidden');
    } else {
      setOpen(true);
      body.classList.add('overflow-hidden');
      html.classList.add('overflow-hidden');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.querySelector('html');
    const body = document.querySelector('body');

    if (!body || !html) return;

    const handleResize = () => {
      if (window.innerWidth > 640) {
        setOpen(false);
        body.classList.remove('overflow-hidden');
        html.classList.remove('overflow-hidden');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full bg-zinc-50 z-20 pt-16 ${
          open
            ? 'translate-y-0 h-full'
            : '-translate-y-full pointer-events-none h-0 opacity-0'
        } transition-all duration-300 ease-in-out`}
        id="overlay"
      >
        <nav className="flex flex-col flex-1 items-center justify-center gap-2 h-full p-4">
          {header.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center justify-center gap-2 p-2 text-lg text-zinc-900"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      <header className="flex items-center justify-between min-w-screen w-full h-16 mx-auto bg-zinc-100 border-b border-zinc-200 z-30">
        <div
          className="flex flex-1 items-center justify-between gap-4 w-full max-w-screen-hd h-full mx-auto px-4 py-2"
          id="header-content"
        >
          <div className="flex items-center justify-start gap-4">
            <a href="/" className="flex items-center justify-start gap-2">
              <img
                src="/logos/logo-notex.svg"
                alt="NoteX Logo"
                className="w-auto min-h-8 h-8 object-contain sm:ml-1"
              />
            </a>

            <nav className="hidden sm:flex flex-1 items-center justify-start gap-2 ml-2">
              {header.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center justify-center gap-2 p-2 text-sm text-zinc-900"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-2">
            <a
              href="/"
              className="flex flex-1 items-center justify-center gap-4 px-4 py-2 w-auto h-10 text-sm text-pretty text-zinc-50 sm:text-zinc-950 bg-zinc-900 sm:bg-zinc-100 border border-transparent sm:border-zinc-200 rounded-md whitespace-nowrap transition duration-300 ease-in-out"
            >
              <span
                className="flex items-center justify-center"
                id="sign-in-button"
              >
                <span className="font-semibold">Login</span>
              </span>
            </a>

            <a
              href="/"
              className="hidden sm:flex flex-1 items-center justify-center gap-4 px-4 py-2 text-sm text-pretty text-zinc-50 bg-zinc-900 rounded-md"
            >
              <span
                className="flex items-center justify-center whitespace-nowrap"
                id="sign-up-button"
              >
                <span className="font-semibold">Sign Up</span>
                <span className="mx-1.5">—</span>
                <span className="italic font-normal">it&apos;s free</span>
              </span>
            </a>

            <button
              type="button"
              onClick={handleToggleMenu}
              className="flex items-center justify-center p-2 w-10 h-10 text-zinc-900 bg-zinc-100 border border-zinc-200 rounded-md sm:hidden"
              aria-label="Open menu"
              id="open-menu-button"
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
