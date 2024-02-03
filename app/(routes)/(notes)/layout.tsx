'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { Icon } from '@/components/icon';

export default function NotesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between gap-4 w-full max-w-screen-hd h-16 mx-auto px-4">
        <a
          href="/"
          className="w-auto h-full object-contain"
          aria-label="NoteX Home"
        >
          <img
            src="/logos/logo-notex.svg"
            alt="NoteX Logo"
            className="w-auto h-full aspect-video object-contain select-none"
          />
        </a>

        {pathname === '/notes' ? (
          <form className="hidden sm:flex items-center justify-center gap-4 w-full">
            <label
              htmlFor="search"
              className="group flex items-center w-full max-w-md h-auto min-h-10 pl-4 pr-0 gap-2 bg-zinc-100 border border-zinc-200 rounded-lg focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-500 divide-x divide-zinc-200 overflow-hidden aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:select-none aria-[disabled=true]:opacity-50"
              aria-disabled="true"
            >
              <input
                type="text"
                placeholder="Search notes"
                className="w-full h-full bg-transparent focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
              />

              <button
                type="submit"
                className="px-4 py-2 h-auto min-h-10 !bg-zinc-100 hover:!bg-zinc-200 border-0 text-zinc-900 focus:outline-none group-aria-[disabled=true]:cursor-not-allowed group-aria-[disabled=true]:select-none group-aria-[disabled=true]:pointer-events-none"
              >
                <Icon name="Search" className="w-4 h-4" />
              </button>
            </label>
          </form>
        ) : (
          <div
            className="flex items-center justify-center gap-1 w-auto h-auto px-2 py-1 text-zinc-600"
            aria-disabled="true"
          >
            <a href="/notes">Notes</a>
            <p
              className="flex items-center justify-center w-4 h-4 text-zinc-900 pointer-events-none select-none"
              aria-hidden="true"
            >
              /
            </p>
            <a>{pathname.split('/').pop()}</a>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="group w-8 h-8 p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
            disabled
          >
            <div className="w-full h-full disabled:pointer-events-none">
              <Icon name="Plus" className="w-4 h-4" />
            </div>
          </button>

          <button
            type="button"
            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none disabled:bg-zinc-100 overflow-hidden"
            disabled
          >
            <div className="w-full h-full disabled:pointer-events-none">
              <img
                src="https://github.com/gelzinn.png"
                alt="User Avatar"
                className="aspect-square group-hover:opacity-80 group-disabled:opacity-100"
              />
            </div>
          </button>
        </div>
      </header>

      {children}
    </>
  );
}
